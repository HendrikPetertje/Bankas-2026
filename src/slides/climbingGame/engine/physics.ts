import type { PlayerState } from './playerState';

/** Physics constants (pixels per second, at original scale before SPRITE_SCALE) */
const GRAVITY = 900;
export const MOVE_SPEED = 200;
const JUMP_VELOCITY = 550;
const CLIMB_SPEED = 150;

/** Ice zone friction — player slides extra after stopping */
const ICE_FRICTION = 0.95; // velocity multiplier per frame when not pressing input
const ICE_ROPE_SLIP = 30; // px/s downward slip when idle on rope in ice zone

export function applyPhysics(player: PlayerState, dt: number, isIceZone: boolean): void {
  const dtSec = dt / 1000;

  if (player.isOnRope) {
    // Rope physics: only vertical movement
    player.vx = 0;

    if (isIceZone && player.vy === 0 && player.state !== 'climbing') {
      // Slip downward on ice ropes when idle
      player.vy = ICE_ROPE_SLIP;
    }

    player.y += player.vy * dtSec;
    return;
  }

  // Horizontal movement
  if (isIceZone && player.vx !== 0 && player.state === 'standing') {
    // Ice sliding: gradually slow down
    player.vx *= ICE_FRICTION;
    if (Math.abs(player.vx) < 5) player.vx = 0;
  }

  // Apply gravity when airborne
  if (!player.isOnGround) {
    player.vy += GRAVITY * dtSec;
  }

  player.x += player.vx * dtSec;
  player.y += player.vy * dtSec;
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
