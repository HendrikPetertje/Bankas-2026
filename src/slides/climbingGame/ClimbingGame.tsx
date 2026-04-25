import { useCallback, useEffect, useState } from 'react';
import type { CharacterKind } from './assets/Character';
import { defaultLevel } from './assets/defaultLevel';
import GameCanvas from './components/GameCanvas';
import IntroScreen from './components/IntroScreen';
import SelectionScreen from './components/SelectionScreen';
import VictoryScreen from './components/VictoryScreen';
import { loadImages } from './engine/renderer';

type GameScreen = 'intro' | 'selection' | 'fade' | 'playing' | 'victory';

export default function ClimbingGame() {
  const [screen, setScreen] = useState<GameScreen>('intro');
  const [selectedKind, setSelectedKind] = useState<CharacterKind>('female');
  const [elapsedMs, setElapsedMs] = useState(0);
  const [images, setImages] = useState<{ asset: HTMLImageElement; platform: HTMLImageElement } | null>(null);

  // Preload images on mount
  useEffect(() => {
    loadImages()
      .then(setImages)
      .catch(() => {
        // Image loading failed silently
      });
  }, []);

  const handleContinueToSelection = useCallback(() => {
    setScreen('selection');
  }, []);

  const handleSelect = useCallback((kind: CharacterKind) => {
    setSelectedKind(kind);
    setScreen('fade');

    // Fade to black, then start playing
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

  return (
    <div className="flex flex-1 flex-col">
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
