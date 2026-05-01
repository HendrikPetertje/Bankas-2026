import barren11 from './images/grid/1-1-barren.png';
import barrenDry11 from './images/grid/1-1-barren-dry.png';
import clean11 from './images/grid/1-1-clean.png';
import cleanDry11 from './images/grid/1-1-clean-dry.png';
import barren12 from './images/grid/1-2-barren.png';
import barrenDry12 from './images/grid/1-2-barren-dry.png';
import clean12 from './images/grid/1-2-clean.png';
import cleanDry12 from './images/grid/1-2-clean-dry.png';
import barren13 from './images/grid/1-3-barren.png';
import barrenDry13 from './images/grid/1-3-barren-dry.png';
import clean13 from './images/grid/1-3-clean.png';
import cleanDry13 from './images/grid/1-3-clean-dry.png';
import barren21 from './images/grid/2-1-barren.png';
import barrenDry21 from './images/grid/2-1-barren-dry.png';
import clean21 from './images/grid/2-1-clean.png';
import cleanDry21 from './images/grid/2-1-clean-dry.png';
import barren22 from './images/grid/2-2-barren.png';
import barrenDry22 from './images/grid/2-2-barren-dry.png';
import clean22 from './images/grid/2-2-clean.png';
import cleanDry22 from './images/grid/2-2-clean-dry.png';
import barren23 from './images/grid/2-3-barren.png';
import barrenDry23 from './images/grid/2-3-barren-dry.png';
import clean23 from './images/grid/2-3-clean.png';
import cleanDry23 from './images/grid/2-3-clean-dry.png';
import barren31 from './images/grid/3-1-barren.png';
import barrenDry31 from './images/grid/3-1-barren-dry.png';
import clean31 from './images/grid/3-1-clean.png';
import cleanDry31 from './images/grid/3-1-clean-dry.png';
import barren32 from './images/grid/3-2-barren.png';
import barrenDry32 from './images/grid/3-2-barren-dry.png';
import clean32 from './images/grid/3-2-clean.png';
import cleanDry32 from './images/grid/3-2-clean-dry.png';
import barren33 from './images/grid/3-3-barren.png';
import barrenDry33 from './images/grid/3-3-barren-dry.png';
import clean33 from './images/grid/3-3-clean.png';
import cleanDry33 from './images/grid/3-3-clean-dry.png';
// Grid tile images
import base from './images/grid/base.png';
import driedOut from './images/plant-overlays/dried-out-plant-overlay.png';
import finishedCarrot from './images/plant-overlays/finished-carrot-overlay.png';
import finishedLettuce from './images/plant-overlays/finished-lettuce-overlay.png';
import finishedPumpkin from './images/plant-overlays/finished-pumkin-overlay.png';
import finishedTomato from './images/plant-overlays/finished-tomato-overlay.png';
// Plant overlays
import seedOverlay from './images/plant-overlays/seed-overlay.png';
import someWeeds from './images/plant-overlays/some-weeds-overlay.png';
import sprout1 from './images/plant-overlays/sprout-1-overlay.png';
import sprout2 from './images/plant-overlays/sprout-2-overlay.png';
import weedOvergrowth from './images/plant-overlays/weed-overgrowth-overlay.png';
import youngCarrot from './images/plant-overlays/young-carrot-overlay.png';
import youngLettuce from './images/plant-overlays/young-lettuce-overlay.png';
import youngPumpkin from './images/plant-overlays/young-pumpkin-overlay.png';
import youngTomato from './images/plant-overlays/young-tomato-overlay.png';
import type { Plant, PlantKind, Plot } from './types';

export { base };

// Base image dimensions for percentage calculations
const BASE_WIDTH = 1200;
const BASE_HEIGHT = 1051;

// Crop overlay size
const CROP_WIDTH = 285;
const CROP_HEIGHT = 248;

// Offset map: plot number -> { x, y } in pixels relative to base
const CROP_OFFSETS: Record<number, { x: number; y: number }> = {
  1: { x: 184, y: 167.5 },
  2: { x: 465, y: 167.5 },
  3: { x: 741, y: 167.5 },
  4: { x: 176, y: 403 },
  5: { x: 468, y: 403 },
  6: { x: 756, y: 403 },
  7: { x: 159, y: 657 },
  8: { x: 464, y: 657 },
  9: { x: 765, y: 657 },
};

// Plot state tile lookup: [row-col][state][dry]
type TileKey = `${1 | 2 | 3}-${1 | 2 | 3}`;
const TILE_MAP: Record<TileKey, { barren: string; barrenDry: string; clean: string; cleanDry: string }> = {
  '1-1': { barren: barren11, barrenDry: barrenDry11, clean: clean11, cleanDry: cleanDry11 },
  '1-2': { barren: barren12, barrenDry: barrenDry12, clean: clean12, cleanDry: cleanDry12 },
  '1-3': { barren: barren13, barrenDry: barrenDry13, clean: clean13, cleanDry: cleanDry13 },
  '2-1': { barren: barren21, barrenDry: barrenDry21, clean: clean21, cleanDry: cleanDry21 },
  '2-2': { barren: barren22, barrenDry: barrenDry22, clean: clean22, cleanDry: cleanDry22 },
  '2-3': { barren: barren23, barrenDry: barrenDry23, clean: clean23, cleanDry: cleanDry23 },
  '3-1': { barren: barren31, barrenDry: barrenDry31, clean: clean31, cleanDry: cleanDry31 },
  '3-2': { barren: barren32, barrenDry: barrenDry32, clean: clean32, cleanDry: cleanDry32 },
  '3-3': { barren: barren33, barrenDry: barrenDry33, clean: clean33, cleanDry: cleanDry33 },
};

const YOUNG_OVERLAYS: Record<PlantKind, string> = {
  CARROT: youngCarrot,
  LETTUCE: youngLettuce,
  PUMPKIN: youngPumpkin,
  TOMATO: youngTomato,
};

const FINISHED_OVERLAYS: Record<PlantKind, string> = {
  CARROT: finishedCarrot,
  LETTUCE: finishedLettuce,
  PUMPKIN: finishedPumpkin,
  TOMATO: finishedTomato,
};

function plotToRowCol(plotNumber: number): TileKey {
  const row = Math.ceil(plotNumber / 3) as 1 | 2 | 3;
  const col = (((plotNumber - 1) % 3) + 1) as 1 | 2 | 3;
  return `${row}-${col}`;
}

function isDry(lastWateredAt: string | null): boolean {
  if (!lastWateredAt) return true;
  return Date.now() - new Date(lastWateredAt).getTime() > 60 * 60 * 1000;
}

function getPlotTile(plot: Plot): string {
  const key = plotToRowCol(plot.number);
  const tiles = TILE_MAP[key];
  const dry = isDry(plot.last_watered_at);

  if (plot.state === 'BARREN') return dry ? tiles.barrenDry : tiles.barren;
  // CLEANED and SEEDED both use clean tile
  return dry ? tiles.cleanDry : tiles.clean;
}

interface CropOverlayInfo {
  src: string;
  brownFilter: boolean;
}

function getCropOverlay(plot: Plot, plants: Plant[]): CropOverlayInfo | null {
  if (plot.state !== 'SEEDED' || !plot.plant_kind || !plot.planted_at) return null;

  const plantInfo = plants.find((p) => p.kind === plot.plant_kind);
  if (!plantInfo) return null;

  const elapsed = (Date.now() - new Date(plot.planted_at).getTime()) / 1000;
  const growTime = plantInfo.growing_time_s;
  const progress = elapsed / growTime;
  const isHarvestable = progress >= 1;

  // Dried out at harvest with water_stars=1
  if (isHarvestable && plot.water_stars === 1) {
    return { src: driedOut, brownFilter: false };
  }

  // Brown filter conditions
  const brownFilter = (plot.water_stars === 1 || plot.weed_stars === 1) && !isHarvestable;

  // Growth stages
  let src: string;
  if (elapsed < 5 * 60) {
    src = seedOverlay;
  } else if (progress < 0.25) {
    src = sprout1;
  } else if (progress < 0.5) {
    src = sprout2;
  } else if (progress < 1) {
    src = YOUNG_OVERLAYS[plot.plant_kind];
  } else {
    src = FINISHED_OVERLAYS[plot.plant_kind];
  }

  return { src, brownFilter };
}

function getWeedOverlay(plot: Plot): string | null {
  if (!plot.last_weeds_removed_at) return null;
  const elapsed = Date.now() - new Date(plot.last_weeds_removed_at).getTime();
  const minutes = elapsed / (60 * 1000);
  if (minutes > 120) return weedOvergrowth;
  if (minutes > 45) return someWeeds;
  return null;
}

interface GardenGridProps {
  plots: Plot[];
  plants: Plant[];
  disabled: boolean;
  onPlotClick: (plotNumber: number) => void;
}

export default function GardenGrid({ plots, plants, disabled, onPlotClick }: GardenGridProps) {
  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: `${BASE_WIDTH} / ${BASE_HEIGHT}` }}
    >
      {/* Base image */}
      <img
        src={base}
        alt="Odling"
        className="absolute inset-0 w-full h-full"
      />

      {/* Plot tiles and overlays */}
      {plots.map((plot) => {
        const tileSrc = getPlotTile(plot);
        const weedSrc = getWeedOverlay(plot);
        const crop = getCropOverlay(plot, plants);
        const offset = CROP_OFFSETS[plot.number];

        return (
          <div key={plot.number}>
            {/* Plot state tile (full-size overlay) */}
            <img
              src={tileSrc}
              alt=""
              className="absolute inset-0 w-full h-full pointer-events-none"
            />

            {/* Weed overlay (behind plant, lower z) */}
            {weedSrc && (
              <img
                src={weedSrc}
                alt=""
                className="absolute pointer-events-none"
                style={{
                  left: `${(offset.x / BASE_WIDTH) * 100}%`,
                  top: `${(offset.y / BASE_HEIGHT) * 100}%`,
                  width: `${(CROP_WIDTH / BASE_WIDTH) * 100}%`,
                  height: `${(CROP_HEIGHT / BASE_HEIGHT) * 100}%`,
                  zIndex: 2,
                }}
              />
            )}

            {/* Crop overlay */}
            {crop && (
              <img
                src={crop.src}
                alt=""
                className="absolute pointer-events-none"
                style={{
                  left: `${(offset.x / BASE_WIDTH) * 100}%`,
                  top: `${(offset.y / BASE_HEIGHT) * 100}%`,
                  width: `${(CROP_WIDTH / BASE_WIDTH) * 100}%`,
                  height: `${(CROP_HEIGHT / BASE_HEIGHT) * 100}%`,
                  zIndex: 3,
                  filter: crop.brownFilter ? 'sepia(0.8) saturate(0.5) brightness(0.7)' : undefined,
                }}
              />
            )}

            {/* Click target */}
            <button
              type="button"
              className="absolute border-0 bg-transparent p-0"
              style={{
                left: `${(offset.x / BASE_WIDTH) * 100}%`,
                top: `${(offset.y / BASE_HEIGHT) * 100}%`,
                width: `${(CROP_WIDTH / BASE_WIDTH) * 100}%`,
                height: `${(CROP_HEIGHT / BASE_HEIGHT) * 100}%`,
                zIndex: 10,
                opacity: disabled ? 0.5 : 1,
                cursor: 'inherit',
              }}
              disabled={disabled}
              onClick={() => onPlotClick(plot.number)}
            />
          </div>
        );
      })}
    </div>
  );
}
