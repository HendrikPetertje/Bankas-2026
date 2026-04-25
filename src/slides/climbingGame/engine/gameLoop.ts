/**
 * Game loop using requestAnimationFrame with fixed-timestep accumulator.
 */

const FIXED_DT = 1000 / 60; // ~16.67ms per physics step

export interface GameLoop {
  start: () => void;
  stop: () => void;
  reset: () => void;
}

export function createGameLoop(update: (dt: number) => boolean, render: () => void): GameLoop {
  let rafId = 0;
  let lastTime = 0;
  let accumulator = 0;
  let running = false;

  function frame(time: number) {
    if (!running) return;

    if (lastTime === 0) lastTime = time;
    const elapsed = Math.min(time - lastTime, 100); // cap to avoid spiral of death
    lastTime = time;
    accumulator += elapsed;

    while (accumulator >= FIXED_DT) {
      const shouldStop = update(FIXED_DT);
      accumulator -= FIXED_DT;
      if (shouldStop) {
        running = false;
        render();
        return;
      }
    }

    render();
    rafId = requestAnimationFrame(frame);
  }

  return {
    start() {
      if (running) return;
      running = true;
      lastTime = 0;
      accumulator = 0;
      rafId = requestAnimationFrame(frame);
    },
    stop() {
      running = false;
      cancelAnimationFrame(rafId);
    },
    reset() {
      this.stop();
      lastTime = 0;
      accumulator = 0;
    },
  };
}
