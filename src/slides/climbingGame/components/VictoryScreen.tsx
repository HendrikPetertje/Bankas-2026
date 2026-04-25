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
  const femW = female.width * SPRITE_SCALE;
  const femH = female.height * SPRITE_SCALE;
  const maleW = male.width * SPRITE_SCALE;
  const maleH = male.height * SPRITE_SCALE;

  // Ground line: distance from top of platform sprite to where characters stand
  const groundFromPlatTop = fp.groundLineY * SPRITE_SCALE;

  // Canvas height: tallest character above ground + platform below ground
  const maxCharH = Math.max(femH, maleH);
  const canvasH = maxCharH + (platH - groundFromPlatTop);

  // Platform top Y in canvas coords
  const platTopY = maxCharH - groundFromPlatTop;

  // Characters feet at ground line
  const groundY = platTopY + groundFromPlatTop;
  const femY = groundY - femH;
  const maleY = groundY - maleH;

  // Horizontal: female left of center, male right (mirrored)
  const femX = platW / 2 - femW - 5;
  const maleX = platW / 2 + 5;

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-16 text-center text-text">
      <div className="max-w-md space-y-4">
        <h2 className="font-display text-2xl text-pine">Du klarade det!</h2>

        <p className="font-body text-[length:1rem] leading-relaxed">
          Från toppen är utsikten helt fantastisk och långt i fjärran kan man se fält med små tält och bakom dem en
          mäktig hamnstad!
        </p>

        {/* Characters on finish platform */}
        <div
          className="relative mx-auto"
          style={{ width: platW, height: canvasH }}
        >
          <canvas
            ref={(canvas) => {
              if (!canvas) return;
              const ctx = canvas.getContext('2d');
              if (!ctx) return;
              const dpr = window.devicePixelRatio || 1;
              canvas.width = platW * dpr;
              canvas.height = canvasH * dpr;
              ctx.scale(dpr, dpr);

              // Draw platform
              ctx.drawImage(assetImg, fp.startX, fp.startY, fp.width, fp.height, 0, platTopY, platW, platH);

              // Draw female
              ctx.drawImage(
                assetImg,
                female.startX,
                female.startY,
                female.width,
                female.height,
                femX,
                femY,
                femW,
                femH,
              );

              // Draw male (mirrored to face the girl)
              ctx.save();
              ctx.translate(maleX + maleW, maleY);
              ctx.scale(-1, 1);
              ctx.drawImage(assetImg, male.startX, male.startY, male.width, male.height, 0, 0, maleW, maleH);
              ctx.restore();
            }}
            style={{ width: platW, height: canvasH }}
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
