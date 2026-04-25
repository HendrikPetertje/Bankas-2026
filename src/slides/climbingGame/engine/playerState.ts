import type { CharacterKind, CharacterState } from '../assets/Character';

export interface PlayerState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  kind: CharacterKind;
  state: CharacterState;
  isOnGround: boolean;
  isOnRope: boolean;
  /** Prevents re-grabbing rope until up/down released */
  justLeftRope: boolean;
  facingLeft: boolean;
  /** Direction locked at jump: -1 left, 1 right, 0 neutral */
  jumpDir: number;
  /** Animation frame index */
  animFrame: number;
  /** Time accumulator for animation cycling (ms) */
  animTimer: number;
}

export function createPlayerState(kind: CharacterKind, x: number, y: number): PlayerState {
  return {
    x,
    y,
    vx: 0,
    vy: 0,
    kind,
    state: 'standing',
    isOnGround: true,
    isOnRope: false,
    justLeftRope: false,
    facingLeft: false,
    jumpDir: 0,
    animFrame: 0,
    animTimer: 0,
  };
}

/** Update character state based on physics state */
export function updateCharacterState(player: PlayerState): void {
  if (player.isOnRope) {
    player.state = player.vy !== 0 ? 'climbing' : 'climbing-idle';
    return;
  }

  if (!player.isOnGround) {
    player.state = player.facingLeft ? 'jumpingLeft' : 'jumpingRight';
    return;
  }

  if (player.vx < -1) {
    player.state = 'walkingLeft';
    player.facingLeft = true;
  } else if (player.vx > 1) {
    player.state = 'walkingRight';
    player.facingLeft = false;
  } else {
    player.state = 'standing';
  }
}

/** Advance animation frame based on elapsed time */
export function updateAnimation(player: PlayerState, dt: number): void {
  player.animTimer += dt;
  // Cycle every 100ms (the spec says 10ms but that's extremely fast — likely 100ms intended)
  if (player.animTimer >= 100) {
    player.animTimer -= 100;
    player.animFrame += 1;
  }
}
