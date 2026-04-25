import { useCallback, useRef, useState } from 'react';
import { assetSprites, SPRITE_SCALE } from '../assets/sprites';
import type { InputState } from '../engine/input';
import { setDpadDirection, setJumpPressed } from '../engine/input';

interface TouchControlsProps {
  input: InputState;
  assetImg: HTMLImageElement;
}

export default function TouchControls({ input, assetImg }: TouchControlsProps) {
  const dpadRef = useRef<HTMLDivElement>(null);
  const [knobOffset, setKnobOffset] = useState({ x: 0, y: 0 });

  const CONTROL_SCALE = 1.15;
  const bgW = assetSprites.joyStick.directionalBackground.width * SPRITE_SCALE * CONTROL_SCALE;
  const bgH = assetSprites.joyStick.directionalBackground.height * SPRITE_SCALE * CONTROL_SCALE;
  const knobW = assetSprites.joyStick.directionalStick.width * SPRITE_SCALE * CONTROL_SCALE;
  const knobH = assetSprites.joyStick.directionalStick.height * SPRITE_SCALE * CONTROL_SCALE;
  const jumpW = assetSprites.joyStick.jumpButton.width * SPRITE_SCALE * CONTROL_SCALE;
  const jumpH = assetSprites.joyStick.jumpButton.height * SPRITE_SCALE * CONTROL_SCALE;

  const handleDpadMove = useCallback(
    (clientX: number, clientY: number) => {
      const el = dpadRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (clientX - cx) / (rect.width / 2);
      const dy = (clientY - cy) / (rect.height / 2);
      setDpadDirection(input, dx, dy);

      // Move knob visually (clamped)
      const maxR = rect.width / 2 - knobW / 2;
      const rawX = clientX - cx;
      const rawY = clientY - cy;
      const dist = Math.sqrt(rawX * rawX + rawY * rawY);
      const clamp = dist > maxR ? maxR / dist : 1;
      setKnobOffset({ x: rawX * clamp, y: rawY * clamp });
    },
    [input, knobW],
  );

  const handleDpadEnd = useCallback(() => {
    setDpadDirection(input, 0, 0);
    setKnobOffset({ x: 0, y: 0 });
  }, [input]);

  const dpadBg = spriteStyle(assetImg, assetSprites.joyStick.directionalBackground, bgW, bgH);
  const knobBg = spriteStyle(assetImg, assetSprites.joyStick.directionalStick, knobW, knobH);
  const jumpBg = spriteStyle(assetImg, assetSprites.joyStick.jumpButton, jumpW, jumpH);

  return (
    <>
      {/* D-pad */}
      <div
        ref={dpadRef}
        role="slider"
        aria-label="D-pad"
        aria-valuenow={0}
        tabIndex={-1}
        className="absolute bottom-12 left-10 touch-none"
        style={{ width: bgW, height: bgH, ...dpadBg }}
        onTouchStart={(e) => {
          const t = e.touches[0];
          handleDpadMove(t.clientX, t.clientY);
        }}
        onTouchMove={(e) => {
          const t = e.touches[0];
          handleDpadMove(t.clientX, t.clientY);
        }}
        onTouchEnd={handleDpadEnd}
        onTouchCancel={handleDpadEnd}
        onMouseDown={(e) => {
          handleDpadMove(e.clientX, e.clientY);
          const onMove = (ev: MouseEvent) => handleDpadMove(ev.clientX, ev.clientY);
          const onUp = () => {
            handleDpadEnd();
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
          };
          window.addEventListener('mousemove', onMove);
          window.addEventListener('mouseup', onUp);
        }}
      >
        {/* Knob */}
        <div
          style={{
            width: knobW,
            height: knobH,
            ...knobBg,
            position: 'absolute',
            left: bgW / 2 - knobW / 2 + knobOffset.x,
            top: bgH / 2 - knobH / 2 + knobOffset.y,
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Jump button */}
      <button
        type="button"
        aria-label="Jump"
        tabIndex={-1}
        className="absolute bottom-16 right-10 touch-none cursor-pointer border-0 bg-transparent p-0"
        style={{ width: jumpW, height: jumpH, ...jumpBg }}
        onTouchStart={() => setJumpPressed(input, true)}
        onTouchEnd={() => setJumpPressed(input, false)}
        onTouchCancel={() => setJumpPressed(input, false)}
        onMouseDown={() => {
          setJumpPressed(input, true);
          const onUp = () => {
            setJumpPressed(input, false);
            window.removeEventListener('mouseup', onUp);
          };
          window.addEventListener('mouseup', onUp);
        }}
      />
    </>
  );
}

function spriteStyle(
  img: HTMLImageElement,
  sprite: { startX: number; startY: number; width: number; height: number },
  displayW: number,
  displayH: number,
): React.CSSProperties {
  const scaleX = displayW / sprite.width;
  const scaleY = displayH / sprite.height;
  return {
    backgroundImage: `url(${img.src})`,
    backgroundPosition: `-${sprite.startX * scaleX}px -${sprite.startY * scaleY}px`,
    backgroundSize: `${img.naturalWidth * scaleX}px ${img.naturalHeight * scaleY}px`,
    backgroundRepeat: 'no-repeat',
  };
}
