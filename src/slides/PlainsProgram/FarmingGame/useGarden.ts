import { useCallback, useEffect, useRef, useState } from 'react';
import { AuthExpiredError, cleanPlot, getMyFarm, getPlantInfo, harvestPlot, seedPlot, waterPlot } from './api';
import type { Garden, Plant, PlantKind, ToolType } from './types';

interface HarvestResult {
  plantKind: PlantKind;
  grams: number;
  stars: number;
}

interface UseGardenReturn {
  garden: Garden | null;
  plants: Plant[];
  activeTool: ToolType;
  setActiveTool: (tool: ToolType) => void;
  actionLoading: boolean;
  error: string | null;
  harvestResult: HarvestResult | null;
  dismissHarvest: () => void;
  handlePlotClick: (plotNumber: number) => void;
  seedPickerPlot: number | null;
  closeSeedPicker: () => void;
  pickSeed: (kind: PlantKind) => void;
  authExpired: boolean;
}

export default function useGarden(token: string, initialGarden: Garden): UseGardenReturn {
  const [garden, setGarden] = useState<Garden>(initialGarden);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [activeTool, setActiveTool] = useState<ToolType>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [harvestResult, setHarvestResult] = useState<HarvestResult | null>(null);
  const [seedPickerPlot, setSeedPickerPlot] = useState<number | null>(null);
  const [authExpired, setAuthExpired] = useState(false);

  const actionInFlight = useRef(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>(null);

  // Load plant info on mount
  useEffect(() => {
    getPlantInfo()
      .then((res) => setPlants(res.plants))
      .catch(() => {});
  }, []);

  // Clear error after 4 seconds
  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(null), 4000);
    return () => clearTimeout(t);
  }, [error]);

  // Idle polling
  const resetIdleTimer = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      if (actionInFlight.current) return;
      getMyFarm(token)
        .then((res) => {
          if (!actionInFlight.current) {
            setGarden(res.garden);
          }
        })
        .catch((err: unknown) => {
          if (err instanceof AuthExpiredError) setAuthExpired(true);
        });
      resetIdleTimer();
    }, 20000);
  }, [token]);

  useEffect(() => {
    resetIdleTimer();
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [resetIdleTimer]);

  async function performAction(action: () => Promise<Garden>) {
    setActionLoading(true);
    actionInFlight.current = true;
    try {
      const newGarden = await action();
      setGarden(newGarden);
    } catch (err: unknown) {
      if (err instanceof AuthExpiredError) {
        setAuthExpired(true);
      } else {
        const msg = err instanceof Error ? err.message : 'Något gick fel.';
        setError(msg);
        // Reload garden after error
        try {
          const res = await getMyFarm(token);
          setGarden(res.garden);
        } catch {
          // ignore reload failure
        }
      }
    } finally {
      setActionLoading(false);
      actionInFlight.current = false;
      resetIdleTimer();
    }
  }

  function handlePlotClick(plotNumber: number) {
    if (actionLoading || !activeTool) return;
    const plot = garden.plots.find((p) => p.number === plotNumber);
    if (!plot) return;

    switch (activeTool) {
      case 'water':
        performAction(async () => (await waterPlot(token, plotNumber)).garden).catch(() => {});
        break;
      case 'clean':
        performAction(async () => (await cleanPlot(token, plotNumber)).garden).catch(() => {});
        break;
      case 'harvest': {
        if (plot.state !== 'SEEDED' || !plot.plant_kind) {
          setError('Den här rutan har inget att skörda.');
          return;
        }
        const plantInfo = plants.find((p) => p.kind === plot.plant_kind);
        if (plantInfo && plot.planted_at) {
          const elapsed = (Date.now() - new Date(plot.planted_at).getTime()) / 1000;
          if (elapsed < plantInfo.growing_time_s) {
            setError('Grödan är inte redo att skördas ännu.');
            return;
          }
        }
        const plantKind = plot.plant_kind;
        const prevGrams = garden.produced_g;
        performAction(async () => {
          const res = await harvestPlot(token, plotNumber);
          const harvested = res.garden.produced_g - prevGrams;
          const stars = Math.min(plot.water_stars ?? 5, plot.weed_stars ?? 5);
          setHarvestResult({
            plantKind,
            grams: harvested,
            stars,
          });
          return res.garden;
        }).catch(() => {});
        break;
      }
      case 'seed': {
        // Check eligibility: must be CLEANED and watered < 30 min ago
        if (plot.state !== 'CLEANED') {
          setError('Rutan måste rensas innan du kan så.');
          return;
        }
        if (!plot.last_watered_at) {
          setError('Rutan måste vattnas innan du kan så.');
          return;
        }
        const wateredAgo = Date.now() - new Date(plot.last_watered_at).getTime();
        if (wateredAgo > 30 * 60 * 1000) {
          setError('Rutan måste vattnas nyligen (inom 30 min) innan du kan så.');
          return;
        }
        setSeedPickerPlot(plotNumber);
        break;
      }
    }
  }

  function closeSeedPicker() {
    setSeedPickerPlot(null);
  }

  function pickSeed(kind: PlantKind) {
    if (seedPickerPlot === null) return;
    const plotNum = seedPickerPlot;
    setSeedPickerPlot(null);
    performAction(async () => (await seedPlot(token, plotNum, kind)).garden).catch(() => {});
  }

  function dismissHarvest() {
    setHarvestResult(null);
  }

  return {
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
  };
}
