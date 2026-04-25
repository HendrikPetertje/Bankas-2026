/**
 * Input handling for keyboard and touch controls.
 */

export interface InputState {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  jump: boolean;
}

export function createInputState(): InputState {
  return { left: false, right: false, up: false, down: false, jump: false };
}

export function setupKeyboardInput(input: InputState): () => void {
  function onKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowLeft':
        input.left = true;
        e.preventDefault();
        break;
      case 'ArrowRight':
        input.right = true;
        e.preventDefault();
        break;
      case 'ArrowUp':
        input.up = true;
        e.preventDefault();
        break;
      case 'ArrowDown':
        input.down = true;
        e.preventDefault();
        break;
      case ' ':
        input.jump = true;
        e.preventDefault();
        break;
    }
  }

  function onKeyUp(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowLeft':
        input.left = false;
        break;
      case 'ArrowRight':
        input.right = false;
        break;
      case 'ArrowUp':
        input.up = false;
        break;
      case 'ArrowDown':
        input.down = false;
        break;
      case ' ':
        input.jump = false;
        break;
    }
  }

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  return () => {
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
  };
}

/**
 * Update input state from touch d-pad.
 * Called by the TouchControls component.
 */
export function setDpadDirection(input: InputState, dx: number, dy: number): void {
  const threshold = 0.3;
  input.left = dx < -threshold;
  input.right = dx > threshold;
  input.up = dy < -threshold;
  input.down = dy > threshold;
}

export function setJumpPressed(input: InputState, pressed: boolean): void {
  input.jump = pressed;
}
