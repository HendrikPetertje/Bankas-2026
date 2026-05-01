import BlueButton from '../../../components/BlueButton/BlueButton';
import carrotFruit from './images/score-fruits/carrot.png';
import lettuceFruit from './images/score-fruits/lettuce.png';
import pumpkinFruit from './images/score-fruits/pumkin.png';
import tomatoFruit from './images/score-fruits/tomato.png';
import type { PlantKind } from './types';

interface HarvestOverlayProps {
  plantKind: PlantKind;
  gramsHarvested: number;
  stars: number;
  onDismiss: () => void;
}

const FRUIT_IMAGES: Record<PlantKind, string> = {
  CARROT: carrotFruit,
  LETTUCE: lettuceFruit,
  PUMPKIN: pumpkinFruit,
  TOMATO: tomatoFruit,
};

const STAR_MESSAGES: Record<number, string> = {
  1: 'Inte den bästa skörden... men det gick!',
  2: 'Det kunde gått bättre, men du fick något!',
  3: 'Bra jobbat! En helt okej skörd.',
  4: 'Riktigt bra skörd! Snyggt jobbat!',
  5: 'Perfekt skörd! Du är en mästerträdgårdare!',
};

export default function HarvestOverlay({ plantKind, gramsHarvested, stars, onDismiss }: HarvestOverlayProps) {
  const message = STAR_MESSAGES[Math.max(1, Math.min(5, stars))] ?? STAR_MESSAGES[3];

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-overlay/80">
      <div className="bg-surface rounded-xl p-6 shadow-lg flex flex-col items-center gap-4 max-w-xs mx-4">
        <img
          src={FRUIT_IMAGES[plantKind]}
          alt=""
          className="w-24 h-24 object-contain"
        />
        <p className="font-display text-lg text-text text-center">{(gramsHarvested / 1000).toFixed(1)} kg skördad!</p>
        <p className="font-body text-sm text-muted text-center">{message}</p>
        <BlueButton onClick={onDismiss}>Fortsätt</BlueButton>
      </div>
    </div>
  );
}
