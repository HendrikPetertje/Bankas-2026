import type { LevelConfig } from './LevelConfig';

/**
 * Default level layout — 1 platform and 1 rope per section as placeholder.
 * Edit these arrays to add more platforms for the final level design.
 */
export const defaultLevel: LevelConfig = {
  basePlatform: { x: 0, y: 0 },

  level1: [
    { x: 80, y: 200, variant: 0, rope: { x: 160, y: 0, length: 150 } },
    { x: 900, y: 120, variant: 1 },
    { x: 700, y: 300, variant: 2 },
    { x: 1200, y: 400, variant: 0 },
    { x: 200, y: 600, variant: 1 },
    { x: 1200, y: 700, variant: 2, rope: { x: 1300, y: 0, length: 250 } },
    { x: 800, y: 800, variant: 1 },
    { x: 400, y: 950, variant: 0 },
    { x: 100, y: 1050, variant: 1 },
    { x: 600, y: 1150, variant: 2 },
    { x: 600, y: 1150, variant: 0 },
    { x: 700, y: 1500, variant: 1, rope: { x: 850, y: 0, length: 300 } },
    { x: 200, y: 1650, variant: 2 },
    { x: 1000, y: 1650, variant: 2 },
    { x: 1200, y: 1800, variant: 1 },
    { x: 900, y: 1900, variant: 0 },
  ],

  level2BasePlatform: { x: 0, y: 2000 },
  level2: [
    { x: 10, y: 2000, variant: 0, rope: { x: 80, y: 0, length: 1950 } },
    { x: 80, y: 2300, variant: 1, rope: { x: 160, y: 0, length: 250 } },
    { x: 600, y: 2450, variant: 2 },
    { x: 1000, y: 2600, variant: 1 },
    { x: 1350, y: 2700, variant: 0 },
    { x: 300, y: 2700, variant: 0 },
    { x: 850, y: 2850, variant: 0 },
    { x: 1350, y: 3000, variant: 2 },
    { x: 800, y: 3100, variant: 1 },
    { x: 500, y: 3500, variant: 0, rope: { x: 550, y: 0, length: 350 } },
    { x: 200, y: 3650, variant: 2 },
    { x: 400, y: 3800, variant: 0 },
    { x: 900, y: 3800, variant: 1 },
    { x: 1200, y: 3750, variant: 2, rope: { x: 1300, y: -260, length: 200 } },
  ],

  level3BasePlatform: { x: 0, y: 4000 },
  level3: [
    { x: 10, y: 4000, variant: 0, rope: { x: 80, y: 0, length: 1950 } },
    { x: 80, y: 4150, variant: 1 },
    { x: 400, y: 4300, variant: 2 },
    { x: 800, y: 4450, variant: 2 },
    { x: 800, y: 4750, variant: 0, rope: { x: 900, y: 0, length: 250 } },
    { x: 1200, y: 4900, variant: 2 },
    { x: 700, y: 5020, variant: 1 },
    { x: 200, y: 5080, variant: 0 },
    { x: 200, y: 5230, variant: 2 },
    { x: 1000, y: 5300, variant: 1 },
    { x: 500, y: 5420, variant: 0 },
    { x: 1050, y: 5560, variant: 2 },
    { x: 400, y: 5610, variant: 2, rope: { x: 450, y: -390, length: 340 } },
  ],

  finalPlatform: { x: 400, y: 6000 },
};
