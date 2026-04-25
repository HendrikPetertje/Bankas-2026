import BlueButton from '../../../components/BlueButton/BlueButton';
import { assetSprites, SPRITE_SCALE } from '../assets/sprites';

interface VictoryScreenProps {
  elapsedMs: number;
  assetImg: HTMLImageElement;
  onPlayAgain: () => void;
}

export default function VictoryScreen({ elapsedMs, assetImg, onPlayAgain }: VictoryScreenProps) {
  const totalSec = Math.floor(elapsedMs / 1000);
  const mm = String(Math.floor(totalSec / 60)).padStart(2, '0');
  const ss = String(totalSec % 60).padStart(2, '0');

  const fp = assetSprites.finishPlatform;
  const female = assetSprites.femaleFacingRight.standing[0];
  const male = assetSprites.maleFacingRight.standing[0];

  const platW = fp.width * SPRITE_SCALE;
  const platH = fp.height * SPRITE_SCALE;
  const femH = female.height * SPRITE_SCALE;
  const maleH = male.height * SPRITE_SCALE;

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-16 text-center text-text">
      <div className="max-w-md space-y-4">
        <h2 className="font-display text-2xl text-pine">Du klarade det!</h2>

        <p className="font-body text-[length:1rem] leading-relaxed">
          Från toppen är utsikten helt fantastisk och långt i fjärran kan man se slätter med små tält och bakom dem en
          mäktig hamnstad!
        </p>

        {/* Characters on finish platform */}
        <div
          className="relative mx-auto"
          style={{ width: platW, height: platH + Math.max(femH, maleH) }}
        >
          <canvas
            ref={(canvas) => {
              if (!canvas) return;
              const ctx = canvas.getContext('2d');
              if (!ctx) return;
              const dpr = window.devicePixelRatio || 1;
              canvas.width = platW * dpr;
              canvas.height = (platH + Math.max(femH, maleH)) * dpr;
              ctx.scale(dpr, dpr);

              // Draw characters
              const charY = Math.max(femH, maleH) - fp.groundLineY * SPRITE_SCALE;
              ctx.drawImage(
                assetImg,
                female.startX,
                female.startY,
                female.width,
                female.height,
                platW / 2 - female.width * SPRITE_SCALE - 5,
                charY - femH,
                female.width * SPRITE_SCALE,
                femH,
              );
              ctx.drawImage(
                assetImg,
                male.startX,
                male.startY,
                male.width,
                male.height,
                platW / 2 + 5,
                charY - maleH,
                male.width * SPRITE_SCALE,
                maleH,
              );

              // Draw platform
              ctx.drawImage(
                assetImg,
                fp.startX,
                fp.startY,
                fp.width,
                fp.height,
                0,
                Math.max(femH, maleH),
                platW,
                platH,
              );
            }}
            style={{ width: platW, height: platH + Math.max(femH, maleH) }}
          />
        </div>

        <p className="font-body text-lg font-semibold">
          Du klättrade berget på{' '}
          <strong>
            {mm}:{ss}
          </strong>
        </p>

        <BlueButton onClick={onPlayAgain}>Spela igen</BlueButton>
      </div>
    </div>
  );
}
