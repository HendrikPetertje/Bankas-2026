import type { CharacterKind } from '../assets/Character';
import { assetSprites, platformSprites, SPRITE_SCALE } from '../assets/sprites';

interface SelectionScreenProps {
  assetImg: HTMLImageElement;
  platformImg: HTMLImageElement;
  onSelect: (kind: CharacterKind) => void;
}

export default function SelectionScreen({ assetImg, platformImg, onSelect }: SelectionScreenProps) {
  const female = assetSprites.femaleFacingRight.standing[0];
  const male = assetSprites.maleFacingRight.standing[0];
  const plat = platformSprites.forest[0]; // small forest platform

  const platW = plat.width * SPRITE_SCALE;
  const platH = plat.height * SPRITE_SCALE;
  const femW = female.width * SPRITE_SCALE;
  const femH = female.height * SPRITE_SCALE;
  const maleW = male.width * SPRITE_SCALE;
  const maleH = male.height * SPRITE_SCALE;

  // Ground line: distance from top of platform to where characters stand
  const groundFromPlatTop = plat.groundLineY * SPRITE_SCALE;

  // Canvas dimensions: tallest character above ground + platform below ground
  const maxCharH = Math.max(femH, maleH);
  const canvasW = platW;
  const canvasH = maxCharH + (platH - groundFromPlatTop);

  // Y positions: platform top in canvas coordinates
  const platTopY = maxCharH - groundFromPlatTop;

  // Characters stand with feet at the ground line (platTopY + groundFromPlatTop)
  const groundY = platTopY + groundFromPlatTop;
  const femY = groundY - femH;
  const maleY = groundY - maleH;

  // Horizontal: female left of center, male right of center
  const femX = canvasW / 2 - femW - 5;
  const maleX = canvasW / 2 + 5;

  return (
    <div className="flex flex-1 flex-col items-center justify-center py-16">
      <p className="mb-6 font-body text-lg text-text">Välj din karaktär</p>

      <div
        className="relative"
        style={{ width: canvasW, height: canvasH }}
      >
        {/* Rendered scene */}
        <canvas
          ref={(canvas) => {
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = canvasW * dpr;
            canvas.height = canvasH * dpr;
            ctx.scale(dpr, dpr);

            // Draw platform stretched to full width
            ctx.drawImage(platformImg, plat.startX, plat.startY, plat.width, plat.height, 0, platTopY, platW, platH);

            // Draw female
            ctx.drawImage(assetImg, female.startX, female.startY, female.width, female.height, femX, femY, femW, femH);

            // Draw male (mirrored so he faces the girl)
            ctx.save();
            ctx.translate(maleX + maleW, maleY);
            ctx.scale(-1, 1);
            ctx.drawImage(assetImg, male.startX, male.startY, male.width, male.height, 0, 0, maleW, maleH);
            ctx.restore();
          }}
          style={{ width: canvasW, height: canvasH }}
        />

        {/* Invisible click targets over each character */}
        <button
          type="button"
          className="absolute cursor-pointer border-0 bg-transparent p-0"
          style={{ left: femX, top: femY, width: femW, height: femH }}
          onClick={() => onSelect('female')}
          aria-label="Kvinna"
        />
        <button
          type="button"
          className="absolute cursor-pointer border-0 bg-transparent p-0"
          style={{ left: maleX, top: maleY, width: maleW, height: maleH }}
          onClick={() => onSelect('male')}
          aria-label="Man"
        />
      </div>
    </div>
  );
}
