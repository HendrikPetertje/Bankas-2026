// biome-ignore-all format: No formatting!

// All elements

/**
 * various aasset sprites
 *
 * startX and startY are the pixel positions where the top-left corner of the element starts
 * width is the pixel-width of the element
 * height is the pixel-height of the element
 * groundLineY is the pixel distance from the top of the element to the ground line (the line on which the character stands)
 *
 * Characters always have a width of 197, their feet are between 71 and 137 pixels from the left
 * all characters (except for climbing) are right-facing;
 * when they walk left, jump left or stop after walking or jumping left they should be mirrored in the UI (so they face left)
 *
 * characters should cycle through their different staning, climbingRest, climbing and walking positions at 10ms intervals
 *
 * all images should be scaled 60% down in the UI as these elements are a bit bigger to accomodate Retina screens.
 */
export const sprites = {
  /** from assetsprite.png **/
  AssetSpritePositions: {
    // Characters
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
      ]
    },
    maleFacingRight: {
      standing: [
        { startX: 0, startY: 253, width: 197, height: 321 },
      ],
      climbingRest: [
        { startX: 197, startY: 253, width: 197, height: 321 },
      ],
      climbing: [
        { startX: 197, startY: 253, width: 197, height: 321 },
        { startX: 394, startY: 253, width: 197, height: 321 },
      ],
      walking: [
        { startX: 591, startY: 253, width: 197, height: 321 },
        { startX: 788, startY: 253, width: 197, height: 321 },
        { startX: 985, startY: 253, width: 197, height: 321 },
        { startX: 1182, startY: 253, width: 197, height: 321 },
        { startX: 1379, startY: 253, width: 197, height: 321 },
      ],
      jumping: [
        { startX: 1379, startY: 253, width: 197, height: 321 },
      ]
    },
    // Finish platform
    finishPlatform: {
      startX: 201, startY: 532, width: 214, height: 328, groundLineY: 150,
    },
    // on-screen joy stick
    joyStick: {
      directionalStick: { startX: 0, startY: 532, width: 101, height: 100 },
      directionalBackground: { startX: 201, startY: 860, width: 193, height: 195 },
      jumpButton: { startX: 101, startY: 532, width: 100, height: 100 },
    },
    // Rope element
    rope: {
      top: { startX: 0, startY: 632, width: 37, height: 38 },
      repeatableMiddle: { startX: 0, startY: 682, width: 37, height: 345 },
      bottom: { startX: 0, startY: 1060, width: 37, height: 59 },
    },
    clouds: {
      cloud1: { startX: 616, startY: 532, width: 1317, height: 262 },
      cloud2: { startX: 616, startY: 794, width: 1317, height: 262 },
    },
  },

  /** from platformsprite.png **/
  platformSpritePositions: {
    forest: [
      { startX: 0, startY: 449, width: 406, height: 258, groundLineY: 110 },
      { startX: 406, startY: 449, width: 350, height: 258, groundLineY: 110 },
      { startX: 756, startY: 449, width: 401, height: 258, groundLineY: 110 },
    ],
    forestLong: [
      { startX: 1157, startY: 449, width: 1478, height: 258, groundLineY: 110 },
      { startX: 0, startY: 707, width: 1758, height: 272, groundLineY: 110 },
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
    ]
  },
}

