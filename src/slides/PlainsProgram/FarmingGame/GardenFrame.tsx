import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import GardenGrid from './GardenGrid';
import HarvestOverlay from './HarvestOverlay';
import cleaningFork from './images/button-images/cleaning-fork.png';
import harvestingShears from './images/button-images/harvesting-shears.png';
import infoButton from './images/button-images/info-button.png';
import seedPackets from './images/button-images/seed-packets.png';
import wateringCan from './images/button-images/watering-can.png';
import SeedPicker from './SeedPicker';
import ToolBar, { TOOL_CURSORS } from './ToolBar';
import type { Garden } from './types';
import useGarden from './useGarden';

interface GardenFrameProps {
  token: string;
  initialGarden: Garden;
  onAuthExpired: () => void;
}

export default function GardenFrame({ token, initialGarden, onAuthExpired }: GardenFrameProps) {
  const {
    garden,
    plants,
    activeTool,
    setActiveTool,
    actionLoading,
    error,
    harvestResult,
    dismissHarvest,
    handlePlotClick,
    seedPickerPlot,
    closeSeedPicker,
    pickSeed,
    authExpired,
  } = useGarden(token, initialGarden);

  const [infoOpen, setInfoOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse position for custom cursor
  useEffect(() => {
    if (!activeTool) {
      setCursorPos(null);
      return;
    }
    function handleMove(e: MouseEvent) {
      setCursorPos({ x: e.clientX, y: e.clientY });
    }
    function handleLeave() {
      setCursorPos(null);
    }
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [activeTool]);

  if (authExpired) {
    onAuthExpired();
    return null;
  }

  const cursorUrl = activeTool ? TOOL_CURSORS[activeTool] : null;

  return (
    <div
      ref={containerRef}
      className="flex flex-col relative"
      style={{ cursor: activeTool ? 'none' : undefined }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2">
        <h3 className="font-display text-base text-text">{garden?.user_name ?? ''}</h3>
        <span className="text-subtle">&bull;</span>
        <span className="font-body text-sm text-subtle">{((garden?.produced_g ?? 0) / 1000).toFixed(1)} kg</span>
        <span className="text-subtle">&bull;</span>
        <button
          type="button"
          className="cursor-pointer border-0 bg-transparent p-0"
          onClick={() => setInfoOpen(true)}
        >
          <img
            src={infoButton}
            alt="Info"
            className="w-7 h-7"
          />
        </button>
      </div>

      {/* Error bar */}
      {error && (
        <div className="absolute top-0 left-0 right-0 z-40 bg-love/90 px-4 py-2 text-center text-white font-body text-sm">
          {error}
        </div>
      )}

      {/* Garden grid */}
      {garden && (
        <GardenGrid
          plots={garden.plots}
          plants={plants}
          disabled={actionLoading}
          onPlotClick={handlePlotClick}
        />
      )}

      {/* Tool bar */}
      <ToolBar
        activeTool={activeTool}
        onSelectTool={setActiveTool}
      />

      {/* Seed picker overlay */}
      {seedPickerPlot !== null && (
        <SeedPicker
          plants={plants}
          onPick={pickSeed}
          onClose={closeSeedPicker}
        />
      )}

      {/* Harvest overlay */}
      {harvestResult && (
        <HarvestOverlay
          plantKind={harvestResult.plantKind}
          gramsHarvested={harvestResult.grams}
          stars={harvestResult.stars}
          onDismiss={dismissHarvest}
        />
      )}

      {/* Info modal */}
      {infoOpen && (
        <div
          role="dialog"
          className="absolute inset-0 z-50 flex items-center justify-center bg-overlay/80"
          onClick={() => setInfoOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setInfoOpen(false);
          }}
        >
          <div
            role="document"
            className="bg-surface rounded-xl p-5 shadow-lg max-w-sm w-full mx-4 flex flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <h3 className="font-display text-base text-text">Hur man odlar</h3>
            <p className="font-body text-base text-text leading-relaxed">
              Börja med att rengöra en ruta med gaffeln{' '}
              <img
                src={cleaningFork}
                alt=""
                className="inline w-5 h-5 align-text-bottom"
              />{' '}
              och vattna den med vattenkannan{' '}
              <img
                src={wateringCan}
                alt=""
                className="inline w-5 h-5 align-text-bottom"
              />
              . Sedan kan du så frön{' '}
              <img
                src={seedPackets}
                alt=""
                className="inline w-5 h-5 align-text-bottom"
              />
              !
            </p>
            <p className="font-body text-base text-text leading-relaxed">
              Använd gaffeln{' '}
              <img
                src={cleaningFork}
                alt=""
                className="inline w-5 h-5 align-text-bottom"
              />{' '}
              för att ta bort ogräs och vattna{' '}
              <img
                src={wateringCan}
                alt=""
                className="inline w-5 h-5 align-text-bottom"
              />{' '}
              trädgården då och då för bästa resultat.
            </p>
            <p className="font-body text-base text-text leading-relaxed">
              När grönsakerna är klara kan du skörda dem med saxen{' '}
              <img
                src={harvestingShears}
                alt=""
                className="inline w-5 h-5 align-text-bottom"
              />
              . Ju bättre du sköter din odling, desto mer får du!
            </p>
            <button
              type="button"
              className="mt-2 self-center rounded-lg bg-pine px-5 py-2 font-body text-sm text-white cursor-pointer border-0 hover:opacity-85 transition-opacity"
              onClick={() => setInfoOpen(false)}
            >
              Stäng
            </button>
          </div>
        </div>
      )}
      {cursorUrl &&
        cursorPos &&
        createPortal(
          <div
            className="pointer-events-none fixed z-[9999] flex items-center justify-center w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60"
            style={{ left: cursorPos.x, top: cursorPos.y }}
          >
            <img
              src={cursorUrl}
              alt=""
              className="w-8 h-8"
            />
          </div>,
          document.body,
        )}
    </div>
  );
}
