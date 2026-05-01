import { useMemo, useState } from 'react';
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';
import GardenFrame from './GardenFrame';
// Import all assets for preloading
import { base } from './GardenGrid';
import IntroFrame from './IntroFrame';
import cleaningFork from './images/button-images/cleaning-fork.png';
import harvestingShears from './images/button-images/harvesting-shears.png';
import seedPackets from './images/button-images/seed-packets.png';
import wateringCan from './images/button-images/watering-can.png';
import introImage from './images/intro-image.png';
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
import carrotFruit from './images/score-fruits/carrot.png';
import lettuceFruit from './images/score-fruits/lettuce.png';
import pumpkinFruit from './images/score-fruits/pumkin.png';
import tomatoFruit from './images/score-fruits/tomato.png';
import carrotSeed from './images/seed-packet-choices/carrot.png';
import lettuceSeed from './images/seed-packet-choices/lettuce.png';
import pumpkinSeed from './images/seed-packet-choices/pumkin.png';
import tomatoSeed from './images/seed-packet-choices/tomato.png';
import LoadingOverlay from './LoadingOverlay';
import LoginFrame from './LoginFrame';
import type { GameFrame, Garden } from './types';

const ALL_ASSETS = [
  base,
  introImage,
  seedPackets,
  wateringCan,
  cleaningFork,
  harvestingShears,
  carrotSeed,
  lettuceSeed,
  pumpkinSeed,
  tomatoSeed,
  carrotFruit,
  lettuceFruit,
  pumpkinFruit,
  tomatoFruit,
  seedOverlay,
  sprout1,
  sprout2,
  youngCarrot,
  youngLettuce,
  youngPumpkin,
  youngTomato,
  finishedCarrot,
  finishedLettuce,
  finishedPumpkin,
  finishedTomato,
  driedOut,
  someWeeds,
  weedOvergrowth,
];

export default function FarmingGame() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [frame, setFrame] = useState<GameFrame>('intro');
  const [token, setToken] = useState<string | null>(null);
  const [garden, setGarden] = useState<Garden | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  const assets = useMemo(() => ALL_ASSETS, []);

  if (!assetsLoaded) {
    return (
      <div className="min-h-[100svh] md:min-h-[60vh]">
        <LoadingScreen
          assets={assets}
          onDone={() => setAssetsLoaded(true)}
          isGame
        />
      </div>
    );
  }

  if (frame === 'intro') {
    return <IntroFrame onStart={() => setFrame('login')} />;
  }

  if (frame === 'login') {
    return (
      <div className="relative">
        {loginError && (
          <div className="bg-love/90 px-4 py-2 text-center text-white font-body text-sm">{loginError}</div>
        )}
        <LoginFrame
          onAuthenticated={(t, g, _username) => {
            setToken(t);
            setGarden(g);
            setFrame('garden');
          }}
          onError={setLoginError}
        />
      </div>
    );
  }

  // Garden frame
  if (!token || !garden) {
    return <LoadingOverlay />;
  }

  return (
    <GardenFrame
      token={token}
      initialGarden={garden}
      onAuthExpired={() => {
        setToken(null);
        setGarden(null);
        setFrame('login');
        setLoginError('Sessionen har gått ut. Logga in igen.');
      }}
    />
  );
}
