import type { PlayerState } from './playerState';

/** Physics constants (pixels per second, at original scale before SPRITE_SCALE) */
const GRAVITY = 900;
export const MOVE_SPEED = 200;
const JUMP_VELOCITY = 550;
const CLIMB_SPEED = 150;
const TERMINAL_VELOCITY = 800;

/** Ice zone constants */
const ICE_SLIDE_SPEED = MOVE_SPEED * 0.5; // px/s slide speed
const ICE_SLIDE_DISTANCE = 40; // px to slide after releasing input
const ICE_ROPE_SLIP = 30; // px/s downward slip when idle on rope

export function applyPhysics(player: PlayerState, dt: number, isIceZone: boolean): void {
  const dtSec = dt / 1000;

  if (player.isOnRope) {
    // Rope physics: only vertical movement
    player.vx = 0;

    if (isIceZone && player.vy === 0) {
      // Slip downward on ice ropes when idle (involuntary)
      player.vy = ICE_ROPE_SLIP;
      player.isIceSlipping = true;
    } else {
      player.isIceSlipping = false;
    }

    player.y += player.vy * dtSec;
    return;
  }

  // Not on rope — clear slip flag
  player.isIceSlipping = false;

  // Ice slide: carry momentum after releasing input
  if (isIceZone && player.isOnGround && player.vx === 0 && player.iceSlideDistance > 0) {
    const dir = player.facingLeft ? -1 : 1;
    const step = Math.min(ICE_SLIDE_SPEED * dtSec, player.iceSlideDistance);
    player.x += dir * step;
    player.iceSlideDistance -= step;
  }

  // Apply gravity when airborne
  if (!player.isOnGround) {
    player.vy += GRAVITY * dtSec;
    if (player.vy > TERMINAL_VELOCITY) player.vy = TERMINAL_VELOCITY;
  }

  player.x += player.vx * dtSec;
  player.y += player.vy * dtSec;
}

/** Called by input handler when player stops moving in ice zone */
export function startIceSlide(player: PlayerState, isIceZone: boolean): void {
  if (isIceZone && player.isOnGround && player.vx !== 0) {
    player.iceSlideDistance = ICE_SLIDE_DISTANCE;
  } else {
    player.iceSlideDistance = 0;
  }
}

export function startMoveLeft(player: PlayerState): void {
  player.vx = -MOVE_SPEED;
}

export function startMoveRight(player: PlayerState): void {
  player.vx = MOVE_SPEED;
}

export function jump(player: PlayerState): void {
  if (player.isOnGround && !player.isOnRope) {
    player.vy = -JUMP_VELOCITY;
    player.isOnGround = false;
    let dir = 0;
    if (player.vx < 0) dir = -1;
    else if (player.vx > 0) dir = 1;
    player.jumpDir = dir;
  }
}

export function startClimbUp(player: PlayerState): void {
  if (player.isOnRope) {
    player.vy = -CLIMB_SPEED;
  }
}

export function startClimbDown(player: PlayerState): void {
  if (player.isOnRope) {
    player.vy = CLIMB_SPEED;
  }
}

export function stopClimb(player: PlayerState): void {
  if (player.isOnRope) {
    player.vy = 0;
  }
}
