import { useCallback, useEffect, useRef, useState } from 'react';
import Tooltip from '../../../components/Tooltip/Tooltip';
import cleaningFork from './images/button-images/cleaning-fork.png';
import harvestingShears from './images/button-images/harvesting-shears.png';
import wateringCan from './images/button-images/watering-can.png';
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
import base from './images/grid/base.png';
import driedOut from './images/plant-overlays/dried-out-plant-overlay.png';
import finishedCarrot from './images/plant-overlays/finished-carrot-overlay.png';
import finishedLettuce from './images/plant-overlays/finished-lettuce-overlay.png';
import finishedPumpkin from './images/plant-overlays/finished-pumkin-overlay.png';
import finishedTomato from './images/plant-overlays/finished-tomato-overlay.png';
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

// Returns opacity 0-1 for dry overlay: starts fading in at 55min, fully visible at 60min
function getDryOpacity(lastWateredAt: string | null): number {
  if (!lastWateredAt) return 1;
  const elapsed = Date.now() - new Date(lastWateredAt).getTime();
  const minutes = elapsed / (60 * 1000);
  if (minutes >= 60) return 1;
  if (minutes <= 55) return 0;
  return (minutes - 55) / 5;
}

function getPlotTiles(plot: Plot): { wet: string; dry: string } {
  const key = plotToRowCol(plot.number);
  const tiles = TILE_MAP[key];
  if (plot.state === 'BARREN') return { wet: tiles.barren, dry: tiles.barrenDry };
  return { wet: tiles.clean, dry: tiles.cleanDry };
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

  if (isHarvestable && plot.water_stars === 1) {
    return { src: driedOut, brownFilter: false };
  }

  const brownFilter = (plot.water_stars === 1 || plot.weed_stars === 1) && !isHarvestable;

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

// Returns { src, opacity } for weed overlay with gradual fade-in
function getWeedOverlay(plot: Plot): { src: string; opacity: number } | null {
  if (!plot.last_weeds_removed_at) return null;
  const elapsed = Date.now() - new Date(plot.last_weeds_removed_at).getTime();
  const minutes = elapsed / (60 * 1000);

  if (minutes >= 120) {
    // Overgrowth: fully visible after 2h, fades in from 115-120min
    if (minutes >= 120) return { src: weedOvergrowth, opacity: 1 };
    return { src: weedOvergrowth, opacity: (minutes - 115) / 5 };
  }
  if (minutes >= 45) {
    // Some weeds: fully visible after 45min, fades in from 40-45min
    return { src: someWeeds, opacity: 1 };
  }
  if (minutes >= 40) {
    // Fading in
    return { src: someWeeds, opacity: (minutes - 40) / 5 };
  }
  return null;
}

function formatDuration(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}:${String(minutes).padStart(2, '0')} ${String(seconds).padStart(2, '0')}s`;
}

interface GardenGridProps {
  plots: Plot[];
  plants: Plant[];
  disabled: boolean;
  onPlotClick: (plotNumber: number) => void;
}

export default function GardenGrid({ plots, plants, disabled, onPlotClick }: GardenGridProps) {
  const [hoveredPlot, setHoveredPlot] = useState<number | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const [, setTick] = useState(0);
  const buttonRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  // Tick every second to update timers and opacity transitions
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = useCallback(
    (plotNumber: number) => {
      const plot = plots.find((p) => p.number === plotNumber);
      if (!plot || plot.state !== 'SEEDED') return;
      setHoveredPlot(plotNumber);
      const btn = buttonRefs.current[plotNumber];
      if (btn) setAnchorRect(btn.getBoundingClientRect());
    },
    [plots],
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredPlot(null);
    setAnchorRect(null);
  }, []);

  // Compute tooltip content
  const tooltipPlot = hoveredPlot ? plots.find((p) => p.number === hoveredPlot) : null;
  const tooltipPlantInfo = tooltipPlot?.plant_kind ? plants.find((p) => p.kind === tooltipPlot.plant_kind) : null;

  let harvestTimeLeft = 0;
  let timeSinceWater = 0;
  let timeSinceClean = 0;

  if (tooltipPlot && tooltipPlantInfo && tooltipPlot.planted_at) {
    const elapsed = Date.now() - new Date(tooltipPlot.planted_at).getTime();
    harvestTimeLeft = Math.max(0, tooltipPlantInfo.growing_time_s * 1000 - elapsed);
    timeSinceWater = tooltipPlot.last_watered_at ? Date.now() - new Date(tooltipPlot.last_watered_at).getTime() : 0;
    timeSinceClean = tooltipPlot.last_weeds_removed_at
      ? Date.now() - new Date(tooltipPlot.last_weeds_removed_at).getTime()
      : 0;
  }

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
        const tiles = getPlotTiles(plot);
        const dryOpacity = getDryOpacity(plot.last_watered_at);
        const weed = getWeedOverlay(plot);
        const crop = getCropOverlay(plot, plants);
        const offset = CROP_OFFSETS[plot.number];

        return (
          <div key={plot.number}>
            {/* Wet tile (always visible as base) */}
            <img
              src={tiles.wet}
              alt=""
              className="absolute inset-0 w-full h-full pointer-events-none"
            />

            {/* Dry tile fading in on top */}
            {dryOpacity > 0 && (
              <img
                src={tiles.dry}
                alt=""
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ opacity: dryOpacity }}
              />
            )}

            {/* Weed overlay (behind plant, lower z) */}
            {weed && (
              <img
                src={weed.src}
                alt=""
                className="absolute pointer-events-none"
                style={{
                  left: `${(offset.x / BASE_WIDTH) * 100}%`,
                  top: `${(offset.y / BASE_HEIGHT) * 100}%`,
                  width: `${(CROP_WIDTH / BASE_WIDTH) * 100}%`,
                  height: `${(CROP_HEIGHT / BASE_HEIGHT) * 100}%`,
                  zIndex: 2,
                  opacity: weed.opacity,
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
              ref={(el) => {
                buttonRefs.current[plot.number] = el;
              }}
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
              onMouseEnter={() => handleMouseEnter(plot.number)}
              onMouseLeave={handleMouseLeave}
            />
          </div>
        );
      })}

      {/* Tooltip */}
      <Tooltip
        anchorRect={anchorRect}
        visible={hoveredPlot !== null && tooltipPlot?.state === 'SEEDED'}
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <img
              src={harvestingShears}
              alt=""
              className="w-4 h-4"
            />
            <span className="font-body text-xs text-text">
              {harvestTimeLeft > 0 ? formatDuration(harvestTimeLeft) : 'Redo!'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <img
              src={wateringCan}
              alt=""
              className="w-4 h-4"
            />
            <span className="font-body text-xs text-text">{formatDuration(timeSinceWater)} sedan</span>
          </div>
          <div className="flex items-center gap-2">
            <img
              src={cleaningFork}
              alt=""
              className="w-4 h-4"
            />
            <span className="font-body text-xs text-text">{formatDuration(timeSinceClean)} sedan</span>
          </div>
        </div>
      </Tooltip>
    </div>
  );
}
