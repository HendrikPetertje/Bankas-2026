// biome-ignore-all format: Sprite position data — keep compact

/**
 * Sprite position data for the climbing game.
 *
 * startX/startY: top-left pixel in the sprite sheet
 * width/height: pixel dimensions of the element
 * groundLineY: pixel distance from top of element to ground line (where character stands)
 *
 * Characters are 197px wide; feet span pixels 71–137 from the left.
 * All character sprites (except climbing) face right; mirror for left-facing.
 * Animation frames cycle at 10ms intervals.
 * All sprites render at 60% scale in-game (retina assets).
 */

export const SPRITE_SCALE = 0.4;

export interface SpriteFrame {
  startX: number;
  startY: number;
  width: number;
  height: number;
}

export interface PlatformSprite extends SpriteFrame {
  groundLineY: number;
}

/** Asset sprite sheet: characters, UI, ropes, clouds */
export const assetSprites = {
  femaleFacingRight: {
    standing: [
      { startX: 0, startY: 0, width: 197, height: 231 },
    ],
    climbingRest: [
      { startX: 197, startY: 0, width: 197, height: 231 },
    ],
    climbing: [
      { startX: 197, startY: 0, width: 197, height: 231 },
      { startX: 394, startY: 0, width: 197, height: 231 },
    ],
    walking: [
      { startX: 591, startY: 0, width: 197, height: 231 },
      { startX: 788, startY: 0, width: 197, height: 231 },
      { startX: 985, startY: 0, width: 197, height: 231 },
      { startX: 1182, startY: 0, width: 197, height: 231 },
      { startX: 1379, startY: 0, width: 197, height: 231 },
    ],
    jumping: [
      { startX: 1379, startY: 0, width: 197, height: 231 },
    ],
  },
  maleFacingRight: {
    standing: [
      { startX: 0, startY: 253, width: 197, height: 231 },
    ],
    climbingRest: [
      { startX: 197, startY: 253, width: 197, height: 231 },
    ],
    climbing: [
      { startX: 197, startY: 253, width: 197, height: 231 },
      { startX: 394, startY: 253, width: 197, height: 231 },
    ],
    walking: [
      { startX: 591, startY: 253, width: 197, height: 231 },
      { startX: 788, startY: 253, width: 197, height: 231 },
      { startX: 985, startY: 253, width: 197, height: 231 },
      { startX: 1182, startY: 253, width: 197, height: 231 },
      { startX: 1379, startY: 253, width: 197, height: 231 },
    ],
    jumping: [
      { startX: 1379, startY: 253, width: 197, height: 231 },
    ],
  },
  finishPlatform: { startX: 201, startY: 532, width: 214, height: 328, groundLineY: 150 } as PlatformSprite,
  joyStick: {
    directionalStick: { startX: 0, startY: 532, width: 101, height: 100 },
    directionalBackground: { startX: 201, startY: 860, width: 193, height: 195 },
    jumpButton: { startX: 101, startY: 532, width: 100, height: 100 },
  },
  rope: {
    top: { startX: 0, startY: 632, width: 37, height: 38 },
    repeatableMiddle: { startX: 0, startY: 682, width: 37, height: 345 },
    bottom: { startX: 0, startY: 1060, width: 37, height: 59 },
  },
  clouds: {
    cloud1: { startX: 616, startY: 532, width: 1317, height: 262 },
    cloud2: { startX: 616, startY: 794, width: 1317, height: 262 },
  },
} as const;

/** Platform sprite sheet */
export const platformSprites = {
  forest: [
    { startX: 0, startY: 449, width: 406, height: 258, groundLineY: 110 },
    { startX: 406, startY: 449, width: 350, height: 258, groundLineY: 110 },
    { startX: 756, startY: 449, width: 401, height: 258, groundLineY: 110 },
  ],
  forestLong: [
    { startX: 0, startY: 707, width: 1758, height: 272, groundLineY: 110 },
    { startX: 1665, startY: 449, width: 970, height: 258, groundLineY: 110 },
  ],
  stone: [
    { startX: 0, startY: 0, width: 292, height: 210, groundLineY: 42 },
    { startX: 292, startY: 0, width: 297, height: 210, groundLineY: 42 },
    { startX: 589, startY: 0, width: 287, height: 210, groundLineY: 42 },
  ],
  longStone: [
    { startX: 0, startY: 210, width: 1357, height: 239, groundLineY: 63 },
  ],
  snow: [
    { startX: 876, startY: 0, width: 404, height: 210, groundLineY: 42 },
    { startX: 1280, startY: 0, width: 405, height: 210, groundLineY: 42 },
    { startX: 1685, startY: 0, width: 389, height: 210, groundLineY: 42 },
  ],
  longSnow: [
    { startX: 1357, startY: 210, width: 2802, height: 239, groundLineY: 63 },
  ],
} as const;

/** Character feet hitbox (original scale, before SPRITE_SCALE) */
export const CHARACTER_WIDTH = 197;
export const FEET_LEFT = 71;
export const FEET_RIGHT = 137;
