import { useCallback, useMemo, useRef, useState } from 'react';
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';
import type { CharacterKind } from './assets/Character';
import { defaultLevel } from './assets/defaultLevel';
import assetspriteUrl from './assets/images/assetsprite.png';
import platformspriteUrl from './assets/images/platformsprite.png';
import GameCanvas from './components/GameCanvas';
import IntroScreen from './components/IntroScreen';
import SelectionScreen from './components/SelectionScreen';
import VictoryScreen from './components/VictoryScreen';
import { loadImages } from './engine/renderer';

const GAME_ASSETS = [assetspriteUrl, platformspriteUrl];

type GameScreen = 'intro' | 'selection' | 'fade' | 'playing' | 'victory';

export default function ClimbingGame() {
  const [loaded, setLoaded] = useState(false);
  const [screen, setScreen] = useState<GameScreen>('intro');
  const [selectedKind, setSelectedKind] = useState<CharacterKind>('female');
  const [elapsedMs, setElapsedMs] = useState(0);
  const gameKeyRef = useRef(0);
  const [images, setImages] = useState<{ asset: HTMLImageElement; platform: HTMLImageElement } | null>(null);

  const assets = useMemo(() => GAME_ASSETS, []);

  const handleLoaded = useCallback(() => {
    // Images are already in browser cache from LoadingScreen — loadImages() will be instant
    loadImages()
      .then((imgs) => {
        setImages(imgs);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const handleContinueToSelection = useCallback(() => {
    setScreen('selection');
  }, []);

  const handleSelect = useCallback((kind: CharacterKind) => {
    setSelectedKind(kind);
    setScreen('fade');
    gameKeyRef.current += 1;

    setTimeout(() => {
      setScreen('playing');
    }, 1000);
  }, []);

  const handleVictory = useCallback((ms: number) => {
    setElapsedMs(ms);
    setScreen('victory');
  }, []);

  const handlePlayAgain = useCallback(() => {
    setScreen('intro');
  }, []);

  if (!loaded) {
    return (
      <LoadingScreen
        assets={assets}
        onDone={handleLoaded}
        isGame
      />
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {screen === 'intro' && <IntroScreen onContinue={handleContinueToSelection} />}

      {screen === 'selection' && images && (
        <SelectionScreen
          assetImg={images.asset}
          platformImg={images.platform}
          onSelect={handleSelect}
        />
      )}

      {screen === 'fade' && <div className="flex-1 animate-pulse bg-overlay" />}

      {screen === 'playing' && (
        <GameCanvas
          key={gameKeyRef.current}
          kind={selectedKind}
          level={defaultLevel}
          onVictory={handleVictory}
        />
      )}

      {screen === 'victory' && images && (
        <VictoryScreen
          elapsedMs={elapsedMs}
          assetImg={images.asset}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
}
