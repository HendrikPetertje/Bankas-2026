/**
 * Level configuration for the climbing game.
 *
 * All x/y positions are measured from the bottom-left of the game world
 * (y=0 is the very bottom). The renderer converts to canvas top-down coordinates.
 *
 * Platform variants index into the sprite arrays:
 *   level1 → forest[variant], level2 → stone[variant], level3 → snow[variant]
 */

export interface PlatformPlacement {
  x: number;
  y: number;
  variant: 0 | 1 | 2;
  /** Optional rope attached to this platform. */
  rope?: {
    /** Horizontal position (world units, bottom-left origin) */
    x: number;
    /** Vertical offset — rope top starts at the platform's groundLineY */
    y: number;
    /** How far down the rope extends from groundLineY */
    length: number;
  };
}

export interface LevelConfig {
  /** Full-width forest platform at the very bottom */
  basePlatform: { x: number; y: number };

  /** Forest platforms (level 1, 0–2000px) */
  level1: PlatformPlacement[];

  /** Full-width stone platform starting level 2 */
  level2BasePlatform: { x: number; y: number };
  /** Stone platforms (level 2, 2000–4000px) */
  level2: PlatformPlacement[];

  /** Full-width snow platform starting level 3 */
  level3BasePlatform: { x: number; y: number };
  /** Snow/ice platforms (level 3, 4000–6000px) */
  level3: PlatformPlacement[];

  /** Small finish platform at the very top */
  finalPlatform: { x: number; y: number };
}

/** Total world height in game units (pixels before scaling) */
export const WORLD_HEIGHT = 6200;
