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
  // dipFrom: starts opaque, fades to transparent over 2s on mount
  const [dipFromVisible, setDipFromVisible] = useState(!!dipFrom);

  useEffect(() => {
    if (!dipFrom) return;
    // Double-rAF: first rAF queues after React commit, second rAF fires
    // after the browser has actually painted the opaque frame. Without this
    // the browser batches mount + state update into one frame and the
    // overlay jumps straight to transparent.
    let cancelled = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!cancelled) setDipFromVisible(false);
      });
    });
    return () => {
      cancelled = true;
    };
  }, [dipFrom]);

  // dipTo: starts transparent, becomes opaque when App signals navigate-away
  const showDipTo = dipToActive && !!dipTo;

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

      {/* dipFrom overlay — starts opaque, fades to transparent */}
      {dipFrom && (
        <div
          className="fixed inset-0 z-50 pointer-events-none"
          style={{
            backgroundColor: dipFrom,
            opacity: dipFromVisible ? 1 : 0,
            transition: 'opacity 2s ease-in-out',
          }}
        />
      )}

      {/* dipTo overlay — starts transparent, becomes opaque when navigating away */}
      {dipTo && (
        <div
          className="fixed inset-0 z-50 pointer-events-none"
          style={{
            backgroundColor: dipTo,
            opacity: showDipTo ? 1 : 0,
            transition: showDipTo ? 'opacity 2s ease-in-out' : 'none',
          }}
        />
      )}
    </div>
  );
}
