import { useEffect, useRef, useState } from 'react';
import loadingImage from './images/loading-screen-image.jpg';

interface LoadingScreenProps {
  assets: string[];
  onDone: () => void;
}

export default function LoadingScreen({ assets, onDone }: LoadingScreenProps) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(true);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  // Safety timeout and image preloading
  useEffect(() => {
    if (assets.length === 0) {
      setDone(true);
      return;
    }

    const timeout = setTimeout(() => {
      setDone(true);
    }, 8000);

    for (const src of assets) {
      const img = new Image();
      const handler = () => {
        setLoadedCount((c) => c + 1);
      };
      img.onload = handler;
      img.onerror = handler;
      img.src = src;
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [assets]);

  // Mark done when all images loaded
  useEffect(() => {
    if (assets.length > 0 && loadedCount >= assets.length) {
      setDone(true);
    }
  }, [loadedCount, assets.length]);

  // Fade out then unmount when done
  useEffect(() => {
    if (!done) return;
    setVisible(false);
    const timeout = setTimeout(() => {
      onDoneRef.current();
    }, 600);
    return () => {
      clearTimeout(timeout);
    };
  }, [done]);

  const progress = assets.length === 0 ? 1 : Math.min(loadedCount / assets.length, 1);

  return (
    <div
      className="fixed inset-0 z-[100] bg-edge-light flex flex-col items-center justify-center gap-6"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 600ms ease-out',
      }}
    >
      <img
        src={loadingImage}
        alt="Konungens Rike"
        className="max-w-[320px] md:max-w-[400px] w-full object-contain"
      />
      <div className="w-64 h-2 bg-surface rounded-full overflow-hidden">
        <div
          className="bg-pine h-full rounded-full"
          style={{ width: `${progress * 100}%`, transition: 'width 200ms ease-out' }}
        />
      </div>
    </div>
  );
}
