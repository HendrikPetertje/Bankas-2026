import type { LevelConfig, PlatformPlacement } from '../assets/LevelConfig';
import { WORLD_HEIGHT } from '../assets/LevelConfig';
import type { PlatformSprite } from '../assets/sprites';
import { assetSprites, FEET_LEFT, FEET_RIGHT, platformSprites, SPRITE_SCALE } from '../assets/sprites';
import type { PlayerState } from './playerState';

/** Scaled feet hitbox edges */
const FEET_L = FEET_LEFT * SPRITE_SCALE;
const FEET_R = FEET_RIGHT * SPRITE_SCALE;

export interface ResolvedPlatform {
  left: number;
  right: number;
  topY: number;
}

export interface ResolvedLevel {
  platforms: ResolvedPlatform[];
  ropes: ResolvedRope[];
  baseGroundY: number;
  finalPlatformGroundY: number;
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
  platforms.push(resolvePlatform(config.basePlatform.x, config.basePlatform.y, screenWidth / SPRITE_SCALE, fl));

  // Level 1 forest
  for (const p of config.level1) {
    const s = platformSprites.forest[p.variant];
    platforms.push(resolvePlatform(p.x, p.y, s.width, s));
  }

  // Level 2 base (longStone)
  const ls = platformSprites.longStone[0];
  platforms.push(
    resolvePlatform(config.level2BasePlatform.x, config.level2BasePlatform.y, screenWidth / SPRITE_SCALE, ls),
  );

  // Level 2 stone
  for (const p of config.level2) {
    const s = platformSprites.stone[p.variant];
    platforms.push(resolvePlatform(p.x, p.y, s.width, s));
  }

  // Level 3 base (longSnow)
  const sn = platformSprites.longSnow[0];
  platforms.push(
    resolvePlatform(config.level3BasePlatform.x, config.level3BasePlatform.y, screenWidth / SPRITE_SCALE, sn),
  );

  // Level 3 snow
  for (const p of config.level3) {
    const s = platformSprites.snow[p.variant];
    platforms.push(resolvePlatform(p.x, p.y, s.width, s));
  }

  // Final platform (from asset sprite sheet)
  const fp = assetSprites.finishPlatform;
  platforms.push(resolvePlatform(config.finalPlatform.x, config.finalPlatform.y, fp.width, fp));

  return platforms;
}

function resolvePlatform(x: number, y: number, width: number, sprite: PlatformSprite): ResolvedPlatform {
  const topY = platformGroundLineY(y, sprite);
  return {
    left: x * SPRITE_SCALE,
    right: (x + width) * SPRITE_SCALE,
    topY,
  };
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

export function resolveLevel(config: LevelConfig, screenWidth: number): ResolvedLevel {
  const fl = platformSprites.forestLong[0];
  const fp = assetSprites.finishPlatform;

  return {
    platforms: resolvePlatforms(config, screenWidth),
    ropes: resolveAllRopes(config),
    baseGroundY: platformGroundLineY(config.basePlatform.y, fl),
    finalPlatformGroundY: platformGroundLineY(config.finalPlatform.y, fp),
  };
}

/**
 * Check platform collisions and resolve landing.
 */
export function checkPlatformCollisions(player: PlayerState, platforms: ResolvedPlatform[]): void {
  const feetCenter = player.x + (FEET_L + FEET_R) / 2;
  const feetY = player.y;

  player.isOnGround = false;

  for (const plat of platforms) {
    const platTop = plat.topY;

    if (feetY < platTop - 8 || feetY > platTop + Math.max(20, player.vy * 0.02) + 3) {
      continue;
    }

    // Check horizontal overlap — feet center must be on the platform
    if (feetCenter < plat.left || feetCenter > plat.right) continue;

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

export function checkRopeOverlap(player: PlayerState, ropes: ResolvedRope[]): ResolvedRope | null {
  const feetCenterX = player.x + (FEET_L + FEET_R) / 2;
  const ropeHalfWidth = (37 * SPRITE_SCALE) / 2; // rope sprite width

  for (const rope of ropes) {
    if (player.y < rope.topY || player.y > rope.bottomY + ROPE_GRAB_REACH) continue;

    const ropeCenterX = rope.screenX + ropeHalfWidth;

    if (Math.abs(feetCenterX - ropeCenterX) < ropeHalfWidth + 10) {
      return rope;
    }
  }

  return null;
}

/** Clamp player to screen boundaries and base platform floor */
export function clampToScreen(player: PlayerState, screenWidth: number, baseGroundY: number): void {
  if (player.x < 0) player.x = 0;

  const maxX = screenWidth - FEET_R;
  if (player.x > maxX) player.x = maxX;

  // Don't fall below the base platform ground line
  if (player.y > baseGroundY) {
    player.y = baseGroundY;
    player.vy = 0;
    player.isOnGround = true;
    player.jumpDir = 0;
  }

  // Don't go above top
  if (player.y < 0) player.y = 0;
}
