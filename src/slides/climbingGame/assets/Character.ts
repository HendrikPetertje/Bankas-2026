import type { SpriteFrame } from './sprites';
import { assetSprites } from './sprites';

export type CharacterKind = 'female' | 'male';

export type CharacterState =
  | 'walkingLeft'
  | 'walkingRight'
  | 'jumpingLeft'
  | 'jumpingRight'
  | 'standing'
  | 'standingLeft'
  | 'climbing-idle'
  | 'climbing';

/** Map a character kind + state to the sprite frames and whether to mirror horizontally. */
export function getCharacterFrames(
  kind: CharacterKind,
  state: CharacterState,
): { frames: readonly SpriteFrame[]; mirror: boolean } {
  const data = kind === 'female' ? assetSprites.femaleFacingRight : assetSprites.maleFacingRight;

  switch (state) {
    case 'standing':
      return { frames: data.standing, mirror: false };
    case 'standingLeft':
      return { frames: data.standing, mirror: true };
    case 'walkingRight':
      return { frames: data.walking, mirror: false };
    case 'walkingLeft':
      return { frames: data.walking, mirror: true };
    case 'jumpingRight':
      return { frames: data.jumping, mirror: false };
    case 'jumpingLeft':
      return { frames: data.jumping, mirror: true };
    case 'climbing-idle':
      return { frames: data.climbingRest, mirror: false };
    case 'climbing':
      return { frames: data.climbing, mirror: false };
  }
}
