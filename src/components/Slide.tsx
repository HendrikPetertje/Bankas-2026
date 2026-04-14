import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { SlideId } from '../App';
import SlideNav from './SlideNav/SlideNav';

interface SlideProps {
  children: ReactNode;
  picture: ReactNode;
  dipFrom?: string;
  dipTo?: string;
  activeSlide: SlideId;
  onNavigate: (target: SlideId) => void;
  transitioning: boolean;
  transitionDirection: 'forward' | 'backward' | null;
  dipToActive: boolean;
}

export default function Slide({
  children,
  picture,
  dipFrom,
  dipTo,
  activeSlide,
  onNavigate,
  transitioning,
  transitionDirection,
  dipToActive,
}: SlideProps) {
  // Direction-aware overlay colors:
  // Forward/initial: exit = dipTo, entry = dipFrom
  // Backward: exit = dipFrom, entry = dipTo
  const isBackward = transitionDirection === 'backward';
  const exitColor = isBackward ? dipFrom : dipTo;
  const entryColor = isBackward ? dipTo : dipFrom;

  // Entry overlay: starts opaque, fades to transparent over 2s on mount
  const [entryVisible, setEntryVisible] = useState(!!entryColor);

  useEffect(() => {
    if (!entryColor) return;
    // Double-rAF: first rAF queues after React commit, second rAF fires
    // after the browser has actually painted the opaque frame. Without this
    // the browser batches mount + state update into one frame and the
    // overlay jumps straight to transparent.
    let cancelled = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!cancelled) setEntryVisible(false);
      });
    });
    return () => {
      cancelled = true;
    };
  }, [entryColor]);

  // Exit overlay: starts transparent, becomes opaque when App signals navigate-away
  const showExit = dipToActive && !!exitColor;

  // Picture zoom: scale up on forward, scale down on backward
  const pictureRef = useRef<HTMLDivElement>(null);

  function getPictureScale(): string {
    if (!transitioning || !transitionDirection) return 'scale(1)';
    if (transitionDirection === 'forward') return 'scale(1.8)';
    return 'scale(0.6)';
  }

  return (
    <div className="relative flex min-h-[100svh] flex-col bg-edge-light overflow-y-auto">
      {/* Content slot — expands to fill available space */}
      <div
        className="flex-1"
        style={{ background: 'linear-gradient(170deg, #add5f0 0%, #add5f000 60%)' }}
      >
        {children}
      </div>

      {/* Picture slot with zoom transition — intrinsic size only */}
      <div
        ref={pictureRef}
        className="flex-shrink-0 px-4 md:px-8"
        style={{
          transform: getPictureScale(),
          transition: transitioning ? 'transform 2s ease-in-out' : 'none',
          transformOrigin: 'center center',
        }}
      >
        {picture}
      </div>

      {/* Navigation — sticky to bottom, overlaps content */}
      <SlideNav
        activeSlide={activeSlide}
        onNavigate={onNavigate}
        transitioning={transitioning}
      />

      {/* Entry overlay — starts opaque, fades to transparent */}
      {entryColor && (
        <div
          className="fixed inset-0 z-50 pointer-events-none"
          style={{
            backgroundColor: entryColor,
            opacity: entryVisible ? 1 : 0,
            transition: 'opacity 2s ease-in-out',
          }}
        />
      )}

      {/* Exit overlay — starts transparent, becomes opaque when navigating away */}
      {exitColor && (
        <div
          className="fixed inset-0 z-50 pointer-events-none"
          style={{
            backgroundColor: exitColor,
            opacity: showExit ? 1 : 0,
            transition: showExit ? 'opacity 2s ease-in-out' : 'none',
          }}
        />
      )}
    </div>
  );
}
