import type { LevelConfig, PlatformPlacement } from '../assets/LevelConfig';
import { WORLD_HEIGHT } from '../assets/LevelConfig';
import type { PlatformSprite } from '../assets/sprites';
import { FEET_LEFT, FEET_RIGHT, platformSprites, SPRITE_SCALE } from '../assets/sprites';
import type { PlayerState } from './playerState';

/** Scaled feet hitbox edges */
const FEET_L = FEET_LEFT * SPRITE_SCALE;
const FEET_R = FEET_RIGHT * SPRITE_SCALE;

interface ResolvedPlatform {
  x: number;
  y: number; // bottom-up y
  width: number;
  height: number;
  groundLineY: number;
}

/** A rope resolved to internal (top-down) world coordinates */
export interface ResolvedRope {
  /** Rope x in screen pixels */
  screenX: number;
  /** Internal top-down Y of the rope top */
  topY: number;
  /** Internal top-down Y of the rope bottom */
  bottomY: number;
}

function getSpriteForLevel(variant: 0 | 1 | 2, type: 'forest' | 'stone' | 'snow'): PlatformSprite {
  return platformSprites[type][variant];
}

/** Compute internal (top-down) groundLine Y for a platform placement */
function platformGroundLineY(platY: number, sprite: PlatformSprite): number {
  return WORLD_HEIGHT - platY - sprite.height * SPRITE_SCALE + sprite.groundLineY * SPRITE_SCALE;
}

function resolvePlatforms(config: LevelConfig, screenWidth: number): ResolvedPlatform[] {
  const platforms: ResolvedPlatform[] = [];

  // Base platform (forestLong, stretches full width)
  const fl = platformSprites.forestLong[0];
  platforms.push({
    x: config.basePlatform.x,
    y: config.basePlatform.y,
    width: screenWidth / SPRITE_SCALE,
    height: fl.height,
    groundLineY: fl.groundLineY,
  });

  // Level 1 forest
  for (const p of config.level1) {
    const s = platformSprites.forest[p.variant];
    platforms.push({ x: p.x, y: p.y, width: s.width, height: s.height, groundLineY: s.groundLineY });
  }

  // Level 2 base (longStone)
  const ls = platformSprites.longStone[0];
  platforms.push({
    x: config.level2BasePlatform.x,
    y: config.level2BasePlatform.y,
    width: screenWidth / SPRITE_SCALE,
    height: ls.height,
    groundLineY: ls.groundLineY,
  });

  // Level 2 stone
  for (const p of config.level2) {
    const s = platformSprites.stone[p.variant];
    platforms.push({ x: p.x, y: p.y, width: s.width, height: s.height, groundLineY: s.groundLineY });
  }

  // Level 3 base (longSnow)
  const sn = platformSprites.longSnow[0];
  platforms.push({
    x: config.level3BasePlatform.x,
    y: config.level3BasePlatform.y,
    width: screenWidth / SPRITE_SCALE,
    height: sn.height,
    groundLineY: sn.groundLineY,
  });

  // Level 3 snow
  for (const p of config.level3) {
    const s = platformSprites.snow[p.variant];
    platforms.push({ x: p.x, y: p.y, width: s.width, height: s.height, groundLineY: s.groundLineY });
  }

  return platforms;
}

/** Extract all ropes from platforms, resolved to internal coordinates */
function resolveRopesFromPlatforms(platforms: PlatformPlacement[], type: 'forest' | 'stone' | 'snow'): ResolvedRope[] {
  const ropes: ResolvedRope[] = [];
  for (const p of platforms) {
    if (!p.rope) continue;
    const sprite = getSpriteForLevel(p.variant, type);
    const glY = platformGroundLineY(p.y, sprite);
    // Rope top is at groundLine + rope.y offset (y and length are in screen pixels, not sprite coords)
    const topY = glY + p.rope.y;
    // Length extends downward (increasing Y in top-down)
    const bottomY = topY + p.rope.length;
    ropes.push({
      screenX: p.rope.x * SPRITE_SCALE,
      topY,
      bottomY,
    });
  }
  return ropes;
}

export function resolveAllRopes(config: LevelConfig): ResolvedRope[] {
  return [
    ...resolveRopesFromPlatforms(config.level1, 'forest'),
    ...resolveRopesFromPlatforms(config.level2, 'stone'),
    ...resolveRopesFromPlatforms(config.level3, 'snow'),
  ];
}

/**
 * Check platform collisions and resolve landing.
 */
export function checkPlatformCollisions(player: PlayerState, config: LevelConfig, screenWidth: number): void {
  const platforms = resolvePlatforms(config, screenWidth);

  const feetCenter = player.x + (FEET_L + FEET_R) / 2;
  const feetY = player.y;

  player.isOnGround = false;

  for (const plat of platforms) {
    const platTop = WORLD_HEIGHT - plat.y - plat.height * SPRITE_SCALE + plat.groundLineY * SPRITE_SCALE;
    const platLeft = plat.x * SPRITE_SCALE;
    const platRight = platLeft + plat.width * SPRITE_SCALE;

    // Check horizontal overlap — feet center must be on the platform
    if (feetCenter < platLeft || feetCenter > platRight) continue;

    // Check if player is falling onto platform surface
    // Use wider catch window for high-velocity falls to prevent tunneling
    const catchWindow = Math.max(20, player.vy * 0.02);
    if (player.vy > 30 && feetY >= platTop - 5 && feetY <= platTop + catchWindow) {
      player.y = platTop;
      player.vy = 0;
      player.isOnGround = true;
      player.jumpDir = 0;
      return;
    }

    // Standing check (already on platform, not moving vertically)
    if (feetY >= platTop - 3 && feetY <= platTop + 3 && Math.abs(player.vy) < 5) {
      player.y = platTop;
      player.isOnGround = true;
      player.jumpDir = 0;
      return;
    }
  }
}

/** How far below a rope's bottom the player can still grab it (shoulder height) */
const ROPE_GRAB_REACH = 50;

/**
 * Check if player overlaps a rope.
 * Returns the resolved rope if overlapping, null otherwise.
 */
export function checkRopeOverlap(player: PlayerState, config: LevelConfig): ResolvedRope | null {
  const ropes = resolveAllRopes(config);
  const feetCenterX = player.x + (FEET_L + FEET_R) / 2;
  const ropeHalfWidth = (37 * SPRITE_SCALE) / 2; // rope sprite width

  for (const rope of ropes) {
    const ropeCenterX = rope.screenX + ropeHalfWidth;

    if (Math.abs(feetCenterX - ropeCenterX) < ropeHalfWidth + 10) {
      if (player.y >= rope.topY && player.y <= rope.bottomY + ROPE_GRAB_REACH) {
        return rope;
      }
    }
  }

  return null;
}

/** Clamp player to screen boundaries and base platform floor */
export function clampToScreen(player: PlayerState, screenWidth: number, config: LevelConfig): void {
  if (player.x < 0) player.x = 0;

  const maxX = screenWidth - FEET_R;
  if (player.x > maxX) player.x = maxX;

  // Don't fall below the base platform ground line
  const fl = platformSprites.forestLong[0];
  const baseGroundY = platformGroundLineY(config.basePlatform.y, fl);
  if (player.y > baseGroundY) {
    player.y = baseGroundY;
    player.vy = 0;
    player.isOnGround = true;
    player.jumpDir = 0;
  }

  // Don't go above top
  if (player.y < 0) player.y = 0;
}
