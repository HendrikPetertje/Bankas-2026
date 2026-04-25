import { getCharacterFrames } from '../assets/Character';
import assetspriteUrl from '../assets/images/assetsprite.png';
import platformspriteUrl from '../assets/images/platformsprite.png';
import type { LevelConfig, PlatformPlacement } from '../assets/LevelConfig';
import { WORLD_HEIGHT } from '../assets/LevelConfig';
import { assetSprites, platformSprites, SPRITE_SCALE } from '../assets/sprites';
import type { Camera } from './camera';
import type { ResolvedRope } from './collision';
import type { PlayerState } from './playerState';

/** Preload images */
export function loadImages(): Promise<{ asset: HTMLImageElement; platform: HTMLImageElement }> {
  return new Promise((resolve, reject) => {
    const asset = new Image();
    const platform = new Image();
    let loaded = 0;

    function check() {
      loaded++;
      if (loaded === 2) resolve({ asset, platform });
    }

    asset.onload = check;
    platform.onload = check;
    asset.onerror = reject;
    platform.onerror = reject;

    asset.src = assetspriteUrl;
    platform.src = platformspriteUrl;
  });
}

/** Convert bottom-up world Y to canvas Y */
function toCanvasY(worldY: number, cameraY: number): number {
  return worldY - cameraY;
}

/** Draw a sprite frame from a sprite sheet */
function drawSprite(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  sx: number,
  sy: number,
  sw: number,
  sh: number,
  dx: number,
  dy: number,
  mirror = false,
): void {
  const dw = sw * SPRITE_SCALE;
  const dh = sh * SPRITE_SCALE;

  if (mirror) {
    ctx.save();
    ctx.translate(dx + dw, dy);
    ctx.scale(-1, 1);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, dw, dh);
    ctx.restore();
  } else {
    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
  }
}

/** Render all platforms */
export function renderPlatforms(
  ctx: CanvasRenderingContext2D,
  platformImg: HTMLImageElement,
  assetImg: HTMLImageElement,
  config: LevelConfig,
  camera: Camera,
  screenWidth: number,
): void {
  const fl = platformSprites.forestLong[0];

  // Underground fill below base platform ground line (render before platform so it's behind)
  const baseY = toCanvasY(WORLD_HEIGHT - config.basePlatform.y - fl.height * SPRITE_SCALE, camera.y);
  const undergroundTop = baseY + fl.groundLineY * SPRITE_SCALE;
  const undergroundHeight = screenWidth * 2;
  const grad = ctx.createLinearGradient(0, undergroundTop, 0, undergroundTop + undergroundHeight);
  grad.addColorStop(0, '#5c3a1e');
  grad.addColorStop(0.3, '#3d2b1f');
  grad.addColorStop(1, '#0a0604');
  ctx.fillStyle = grad;
  ctx.fillRect(0, undergroundTop, screenWidth, undergroundHeight);

  // Base platform (forestLong[0], stretch to screen width)
  ctx.drawImage(
    platformImg,
    fl.startX,
    fl.startY,
    fl.width,
    fl.height,
    0,
    baseY,
    screenWidth,
    fl.height * SPRITE_SCALE,
  );

  // Level 1 forest platforms
  renderPlatformArray(ctx, platformImg, config.level1, 'forest', camera);

  // Level 2 base (longStone)
  const ls = platformSprites.longStone[0];
  const l2y = toCanvasY(WORLD_HEIGHT - config.level2BasePlatform.y - ls.height * SPRITE_SCALE, camera.y);
  ctx.drawImage(platformImg, ls.startX, ls.startY, ls.width, ls.height, 0, l2y, screenWidth, ls.height * SPRITE_SCALE);

  // Level 2 stone platforms
  renderPlatformArray(ctx, platformImg, config.level2, 'stone', camera);

  // Level 3 base (longSnow)
  const sn = platformSprites.longSnow[0];
  const l3y = toCanvasY(WORLD_HEIGHT - config.level3BasePlatform.y - sn.height * SPRITE_SCALE, camera.y);
  ctx.drawImage(platformImg, sn.startX, sn.startY, sn.width, sn.height, 0, l3y, screenWidth, sn.height * SPRITE_SCALE);

  // Level 3 snow platforms
  renderPlatformArray(ctx, platformImg, config.level3, 'snow', camera);

  // Finish platform — uses asset sprite sheet, not platform sheet
  const fp = assetSprites.finishPlatform;
  const fpY = toCanvasY(WORLD_HEIGHT - config.finalPlatform.y - fp.height * SPRITE_SCALE, camera.y);
  drawSprite(ctx, assetImg, fp.startX, fp.startY, fp.width, fp.height, config.finalPlatform.x * SPRITE_SCALE, fpY);
}

function renderPlatformArray(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  platforms: PlatformPlacement[],
  type: 'forest' | 'stone' | 'snow',
  camera: Camera,
): void {
  const sprites = platformSprites[type];
  for (const p of platforms) {
    const s = sprites[p.variant];
    const cy = toCanvasY(WORLD_HEIGHT - p.y - s.height * SPRITE_SCALE, camera.y);
    drawSprite(ctx, img, s.startX, s.startY, s.width, s.height, p.x * SPRITE_SCALE, cy);
  }
}

/** Render all ropes */
export function renderRopes(
  ctx: CanvasRenderingContext2D,
  assetImg: HTMLImageElement,
  ropes: ResolvedRope[],
  camera: Camera,
): void {
  const { top, repeatableMiddle, bottom } = assetSprites.rope;

  for (const rope of ropes) {
    const rx = rope.screenX;

    // Draw top
    let cy = toCanvasY(rope.topY, camera.y);
    drawSprite(ctx, assetImg, top.startX, top.startY, top.width, top.height, rx, cy);
    cy += top.height * SPRITE_SCALE;

    // Draw repeatable middle segments
    const middleH = repeatableMiddle.height * SPRITE_SCALE;
    const totalRopeH = rope.bottomY - rope.topY;
    const ropeBodyLength = totalRopeH - (top.height + bottom.height) * SPRITE_SCALE;
    let drawn = 0;
    while (drawn < ropeBodyLength) {
      const segH = Math.min(middleH, ropeBodyLength - drawn);
      const srcH = segH / SPRITE_SCALE;
      ctx.drawImage(
        assetImg,
        repeatableMiddle.startX,
        repeatableMiddle.startY,
        repeatableMiddle.width,
        srcH,
        rx,
        cy,
        repeatableMiddle.width * SPRITE_SCALE,
        segH,
      );
      cy += segH;
      drawn += segH;
    }

    // Draw bottom
    drawSprite(ctx, assetImg, bottom.startX, bottom.startY, bottom.width, bottom.height, rx, cy);
  }
}

/** Render the player character */
export function renderPlayer(
  ctx: CanvasRenderingContext2D,
  assetImg: HTMLImageElement,
  player: PlayerState,
  camera: Camera,
): void {
  const { frames, mirror } = getCharacterFrames(player.kind, player.state);
  const frameIndex = player.animFrame % frames.length;
  const frame = frames[frameIndex];

  const dx = player.x;
  const dy = toCanvasY(player.y - frame.height * SPRITE_SCALE, camera.y);

  drawSprite(ctx, assetImg, frame.startX, frame.startY, frame.width, frame.height, dx, dy, mirror);
}

/** Cloud animation state */
export interface CloudState {
  cloud1X: number;
  cloud2X: number;
}

export function createCloudState(): CloudState {
  return {
    cloud1X: -assetSprites.clouds.cloud1.width * SPRITE_SCALE,
    cloud2X: -assetSprites.clouds.cloud2.width * SPRITE_SCALE - 400,
  };
}

export function updateClouds(clouds: CloudState, dt: number, screenWidth: number): void {
  const speed = 30; // px/s
  const dtSec = dt / 1000;

  clouds.cloud1X += speed * dtSec;
  clouds.cloud2X += speed * dtSec;

  const c1w = assetSprites.clouds.cloud1.width * SPRITE_SCALE;
  const c2w = assetSprites.clouds.cloud2.width * SPRITE_SCALE;

  if (clouds.cloud1X > screenWidth) clouds.cloud1X = -c1w;
  if (clouds.cloud2X > screenWidth) clouds.cloud2X = -c2w;
}

export function renderClouds(
  ctx: CanvasRenderingContext2D,
  assetImg: HTMLImageElement,
  clouds: CloudState,
  camera: Camera,
  level2BaseY: number,
): void {
  const c1 = assetSprites.clouds.cloud1;
  const c2 = assetSprites.clouds.cloud2;

  // Position clouds at two vertical spots within level 2
  const cloud1WorldY = WORLD_HEIGHT - level2BaseY - 600;
  const cloud2WorldY = WORLD_HEIGHT - level2BaseY - 1200;

  const cy1 = toCanvasY(cloud1WorldY, camera.y);
  const cy2 = toCanvasY(cloud2WorldY, camera.y);

  drawSprite(ctx, assetImg, c1.startX, c1.startY, c1.width, c1.height, clouds.cloud1X, cy1);
  drawSprite(ctx, assetImg, c2.startX, c2.startY, c2.width, c2.height, clouds.cloud2X, cy2);
}
