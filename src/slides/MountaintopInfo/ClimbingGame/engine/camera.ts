/**
 * Camera system — follows player vertically with a 25% deadzone above and below center.
 * No horizontal scrolling.
 */

export interface Camera {
  /** Top of visible area in world coordinates (y-down) */
  y: number;
}

export function createCamera(): Camera {
  return { y: 0 };
}

/**
 * Update camera position to follow the player.
 * The player can move 25% of viewport height above/below center before scrolling starts.
 */
export function updateCamera(camera: Camera, playerY: number, viewportHeight: number): void {
  const center = camera.y + viewportHeight / 2;
  const deadzone = viewportHeight * 0.25;

  if (playerY < center - deadzone) {
    camera.y = playerY - viewportHeight / 2 + deadzone;
  } else if (playerY > center + deadzone) {
    camera.y = playerY - viewportHeight / 2 - deadzone;
  }

  // Don't scroll past top or bottom of world
  if (camera.y < 0) camera.y = 0;
}
