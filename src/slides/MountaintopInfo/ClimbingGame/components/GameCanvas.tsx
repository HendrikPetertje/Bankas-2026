import { useCallback, useEffect, useRef, useState } from 'react';
import type { CharacterKind } from '../assets/Character';
import type { LevelConfig } from '../assets/LevelConfig';
import { WORLD_HEIGHT } from '../assets/LevelConfig';
import { assetSprites, FEET_LEFT, FEET_RIGHT, platformSprites, SPRITE_SCALE } from '../assets/sprites';
import type { Camera } from '../engine/camera';
import { createCamera, updateCamera } from '../engine/camera';
import { checkPlatformCollisions, checkRopeOverlap, clampToScreen, resolveAllRopes } from '../engine/collision';
import { createGameLoop } from '../engine/gameLoop';
import type { InputState } from '../engine/input';
import { createInputState, setupKeyboardInput } from '../engine/input';
import {
  applyPhysics,
  jump,
  MOVE_SPEED,
  startClimbDown,
  startClimbUp,
  startIceSlide,
  startMoveLeft,
  startMoveRight,
  stopClimb,
} from '../engine/physics';
import type { PlayerState } from '../engine/playerState';
import { createPlayerState, updateAnimation, updateCharacterState } from '../engine/playerState';
import type { CloudState } from '../engine/renderer';
import {
  createCloudState,
  loadImages,
  renderClouds,
  renderPlatforms,
  renderPlayer,
  renderRopes,
  updateClouds,
} from '../engine/renderer';
import TouchControls from './TouchControls';

interface GameCanvasProps {
  kind: CharacterKind;
  level: LevelConfig;
  onVictory: (elapsedMs: number) => void;
}

/** Reference screen width — at this width SPRITE_SCALE is 1:1 */
const REF_WIDTH = 675;
const MAX_CANVAS_DPR = 1.5;

function getCanvasDpr(): number {
  return Math.min(window.devicePixelRatio || 1, MAX_CANVAS_DPR);
}

export default function GameCanvas({ kind, level, onVictory }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef<PlayerState | null>(null);
  const cameraRef = useRef<Camera>(createCamera());
  const inputRef = useRef<InputState>(createInputState());
  const cloudsRef = useRef<CloudState>(createCloudState());
  const startTimeRef = useRef(0);
  const victoryTimerRef = useRef(0);
  const imagesRef = useRef<{ asset: HTMLImageElement; platform: HTMLImageElement } | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const initPlayer = useCallback(() => {
    // Start on the base platform
    const fl = platformSprites.forestLong[0];
    const groundY = WORLD_HEIGHT - level.basePlatform.y - fl.height * SPRITE_SCALE + fl.groundLineY * SPRITE_SCALE;
    return createPlayerState(kind, 100, groundY);
  }, [kind, level]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cleanup: (() => void) | undefined;

    const init = async () => {
      const imgs = await loadImages();
      imagesRef.current = imgs;
      setImagesLoaded(true);

      const player = initPlayer();
      playerRef.current = player;
      startTimeRef.current = performance.now();

      const input = inputRef.current;
      const camera = cameraRef.current;
      const clouds = cloudsRef.current;

      const removeKeyboard = setupKeyboardInput(input);

      function update(dt: number): boolean {
        if (!playerRef.current || !canvas) return false;
        const dpr = getCanvasDpr();
        const cssWidth = canvas.width / dpr;
        const gameScale = cssWidth / REF_WIDTH;
        const screenWidth = REF_WIDTH;
        const screenHeight = canvas.height / dpr / gameScale;
        const p = playerRef.current;

        // Determine zone
        const isIceZone = p.y < WORLD_HEIGHT - 4000;

        // Process input
        if (p.justLeftRope && !input.up && !input.down) {
          p.justLeftRope = false;
        }

        if (!p.isOnRope) {
          if (p.isOnGround) {
            // On ground: free movement
            if (input.left) {
              startMoveLeft(p);
              p.iceSlideDistance = 0;
            } else if (input.right) {
              startMoveRight(p);
              p.iceSlideDistance = 0;
            } else if (p.vx !== 0) {
              // Key just released — trigger slide then zero vx
              startIceSlide(p, isIceZone);
              p.vx = 0;
            }
          } else {
            // Airborne: set jumpDir from velocity if walked off edge
            if (p.jumpDir === 0 && p.vx !== 0) {
              p.jumpDir = p.vx < 0 ? -1 : 1;
            }

            // Airborne: can only move in jump direction, or drift
            if (p.jumpDir === 0) {
              // Neutral jump: no horizontal movement
              p.vx = 0;
            } else if (input.left && p.jumpDir < 0) startMoveLeft(p);
            else if (input.right && p.jumpDir > 0) startMoveRight(p);
            else p.vx = p.jumpDir * MOVE_SPEED * 0.5;
          }

          if (input.jump) {
            jump(p);
            input.jump = false; // consume
          }
        } else {
          if (input.up) startClimbUp(p);
          else if (input.down) startClimbDown(p);
          else stopClimb(p);
        }

        // Check if player wants to grab a rope
        if (!p.isOnRope && !p.justLeftRope && (input.up || input.down)) {
          const rope = checkRopeOverlap(p, level);
          if (rope) {
            p.isOnRope = true;
            p.isOnGround = false;
            p.vx = 0;
            p.vy = 0;
            p.jumpDir = 0;
            // Snap player to rope range if grabbing from below
            if (p.y > rope.bottomY) p.y = rope.bottomY;
            // Nudge up so player clears the platform ground line
            if (input.up) p.y -= 1;
            // Center player feet on rope center
            const ropeHalfWidth = (37 * SPRITE_SCALE) / 2;
            const ropeCenterX = rope.screenX + ropeHalfWidth;
            const feetCenterOffset = ((FEET_LEFT + FEET_RIGHT) / 2) * SPRITE_SCALE;
            p.x = ropeCenterX - feetCenterOffset;
          }
        }

        applyPhysics(p, dt, isIceZone);
        if (!p.isOnRope) {
          checkPlatformCollisions(p, level, screenWidth);
        }
        clampToScreen(p, screenWidth, level);

        // If on rope, check if climbed past top or bottom
        if (p.isOnRope) {
          const rope = checkRopeOverlap(p, level);
          if (!rope || p.y > rope.bottomY || p.y < rope.topY) {
            p.isOnRope = false;
            p.justLeftRope = true;
          }
        }

        updateCharacterState(p);
        updateAnimation(p, dt);
        updateClouds(clouds, dt, screenWidth);
        updateCamera(camera, p.y, screenHeight);

        // Victory check: on final platform ground line for 200ms
        const fpGroundY =
          WORLD_HEIGHT -
          level.finalPlatform.y -
          assetSprites.finishPlatform.height * SPRITE_SCALE +
          assetSprites.finishPlatform.groundLineY * SPRITE_SCALE;
        if (p.isOnGround && Math.abs(p.y - fpGroundY) < 20) {
          victoryTimerRef.current += dt;
          if (victoryTimerRef.current >= 1000) {
            const elapsed = performance.now() - startTimeRef.current;
            onVictory(elapsed);
            return true; // stop the loop
          }
        } else {
          victoryTimerRef.current = 0;
        }

        return false;
      }

      function render() {
        if (!imagesRef.current || !playerRef.current || !ctx || !canvas) return;
        const { asset, platform } = imagesRef.current;
        const camera = cameraRef.current;
        const dpr = getCanvasDpr();
        const cssWidth = canvas.width / dpr;
        const gameScale = cssWidth / REF_WIDTH;
        const screenWidth = REF_WIDTH;
        const screenHeight = canvas.height / dpr / gameScale;

        ctx.save();
        ctx.scale(dpr * gameScale, dpr * gameScale);
        ctx.clearRect(0, 0, screenWidth, screenHeight);

        // Platforms
        renderPlatforms(ctx, platform, asset, level, camera, screenWidth, screenHeight);

        // Ropes
        const ropes = resolveAllRopes(level);
        renderRopes(ctx, asset, ropes, camera, screenHeight);

        // Player
        renderPlayer(ctx, asset, playerRef.current, camera);

        // Clouds (level 2) — rendered in front of player/platforms but behind controls
        renderClouds(ctx, asset, cloudsRef.current, camera, level.level2BasePlatform.y);
        ctx.restore();
      }

      const loop = createGameLoop(update, render);
      loop.start();

      cleanup = () => {
        loop.stop();
        removeKeyboard();
      };
    };

    init().catch(() => {
      // Image loading failed silently
    });

    return () => {
      if (cleanup) cleanup();
    };
  }, [level, onVictory, initPlayer]);

  // Resize canvas to fill container
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    function resize() {
      if (!canvas || !parent) return;
      const dpr = getCanvasDpr();
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
      />
      {imagesLoaded && imagesRef.current && (
        <TouchControls
          input={inputRef.current}
          assetImg={imagesRef.current.asset}
        />
      )}
    </div>
  );
}
