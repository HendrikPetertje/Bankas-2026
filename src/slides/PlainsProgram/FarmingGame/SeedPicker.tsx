import carrotSeed from './images/seed-packet-choices/carrot.png';
import lettuceSeed from './images/seed-packet-choices/lettuce.png';
import pumpkinSeed from './images/seed-packet-choices/pumkin.png';
import tomatoSeed from './images/seed-packet-choices/tomato.png';
import type { Plant, PlantKind } from './types';

interface SeedPickerProps {
  plants: Plant[];
  onPick: (kind: PlantKind) => void;
  onClose: () => void;
}

const SEED_IMAGES: Record<PlantKind, string> = {
  CARROT: carrotSeed,
  LETTUCE: lettuceSeed,
  PUMPKIN: pumpkinSeed,
  TOMATO: tomatoSeed,
};

const SEED_NAMES: Record<PlantKind, string> = {
  CARROT: 'Morot',
  LETTUCE: 'Sallad',
  PUMPKIN: 'Pumpa',
  TOMATO: 'Tomat',
};

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${minutes > 0 ? `${minutes}min` : ''}`.trim();
  return `${minutes}min`;
}

export default function SeedPicker({ plants, onPick, onClose }: SeedPickerProps) {
  return (
    <div
      role="dialog"
      className="absolute inset-0 z-40 flex items-center justify-center bg-overlay/80"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
    >
      <div
        className="bg-surface rounded-xl p-4 shadow-lg max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="document"
      >
        <h3 className="font-display text-base text-text mb-3 text-center">Välj frö</h3>
        <div className="grid grid-cols-2 gap-3">
          {[...plants]
            .sort((a, b) => a.growing_time_s - b.growing_time_s)
            .map((plant) => (
              <button
                key={plant.kind}
                type="button"
                className="flex flex-col items-center gap-1 rounded-lg border border-highlight-med p-3 cursor-pointer bg-highlight-low hover:bg-highlight-med transition-colors"
                onClick={() => onPick(plant.kind)}
              >
                <img
                  src={SEED_IMAGES[plant.kind]}
                  alt={SEED_NAMES[plant.kind]}
                  className="w-16 h-16 object-contain"
                />
                <span className="font-body text-sm text-text font-semibold">{SEED_NAMES[plant.kind]}</span>
                <span className="font-body text-xs text-muted">
                  {(plant.weight_g['5'] / 1000).toFixed(1)} kg &middot; {formatTime(plant.growing_time_s)}
                </span>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
