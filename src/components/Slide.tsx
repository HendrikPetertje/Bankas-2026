import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import type { SlideId } from '../App';
import activatorIcon from './images/activator.png';
import closeImg from './SlideNav/images/close-button.png';
import SlideNav from './SlideNav/SlideNav';

interface SlideProps {
  children: ReactNode;
  picture: ReactNode;
  pictureFooter?: ReactNode;
  dipFrom?: string;
  dipTo?: string;
  activeSlide: SlideId;
  onNavigate: (target: SlideId) => void;
  transitioning: boolean;
  transitionDirection: 'forward' | 'backward' | null;
  dipToActive: boolean;
  gameContent?: ReactNode;
  isGameOpen?: boolean;
  onGameOpen?: () => void;
  onGameClose?: () => void;
}

export default function Slide({
  children,
  picture,
  pictureFooter,
  dipFrom,
  dipTo,
  activeSlide,
  onNavigate,
  transitioning,
  transitionDirection,
  dipToActive,
  gameContent,
  isGameOpen,
  onGameOpen,
  onGameClose,
}: SlideProps) {
  // Direction-aware overlay colors:
  // Forward/initial: exit = dipTo, entry = dipFrom
  // Backward: exit = dipFrom, entry = dipTo
  const isBackward = transitionDirection === 'backward';
  const exitColor = isBackward ? dipFrom : dipTo;
  const entryColor = isBackward ? dipTo : dipFrom;

  // Entry overlay: starts opaque, fades to transparent over 2s on mount
  const [entryVisible, setEntryVisible] = useState(!!entryColor);

  // Lock body scroll when game modal is open (iOS needs position:fixed)
  useEffect(() => {
    if (!isGameOpen) return;
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }, [isGameOpen]);

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

  // Picture zoom: animate scale(1) → scale(1.8) on the *exiting* slide while
  // the exit overlay fades in (dipToActive=true). The entering slide always
  // starts and stays at scale(1) — no zoom needed there.

  function getPictureScale(): string {
    if (!dipToActive) return 'scale(1)';
    if (transitionDirection === 'forward') return 'scale(1.8)';
    if (transitionDirection === 'backward') return 'scale(0.6)';
    return 'scale(1)';
  }

  return (
    <div className="relative flex min-h-[100svh] flex-col bg-edge-light overflow-y-auto overflow-x-clip">
      {/* Navigation — sticky to top */}
      <SlideNav
        activeSlide={activeSlide}
        onNavigate={onNavigate}
        transitioning={transitioning}
      />

      {/* Content slot — expands to fill available space; pt-9 offsets fixed top nav */}
      <div
        className="flex-1 pt-9"
        style={{ background: 'linear-gradient(170deg, #add5f0 0%, #add5f000 60%)' }}
      >
        {children}
      </div>

      {/* Picture slot with zoom transition — intrinsic size only */}
      <div
        className="relative flex-shrink-0 px-4 md:px-8"
        style={{
          transform: getPictureScale(),
          transition: dipToActive ? 'transform 2s ease-in-out' : 'none',
          transformOrigin: 'center center',
        }}
      >
        {picture}
        {/* Joystick overlay — top-right of picture, only when game is available */}
        {gameContent && onGameOpen && (
          <button
            type="button"
            onClick={onGameOpen}
            className="absolute p-2 top-0 right-6 z-30 cursor-pointer border-0 bg-transparent p-0 transition-transform duration-200 hover:scale-110 md:right-10 xl:right-[15%]"
          >
            <img
              src={activatorIcon}
              alt="Spela spel"
              className="w-12 md:h-16 drop-shadow-lg"
            />
          </button>
        )}
      </div>

      {/* Picture footer — outside the zoom transform */}
      {pictureFooter && <div className="flex-shrink-0 px-4 md:px-8">{pictureFooter}</div>}

      {/* Entry overlay — starts opaque, fades to transparent */}
      {entryColor && (
        <div
          className="fixed inset-x-0 top-0 z-50 pointer-events-none"
          style={{
            backgroundColor: entryColor,
            opacity: entryVisible ? 1 : 0,
            transition: 'opacity 2s ease-in-out',
            bottom: '-300px',
          }}
        />
      )}

      {/* Exit overlay — starts transparent, becomes opaque when navigating away */}
      {exitColor && (
        <div
          className="fixed inset-x-0 top-0 z-50 pointer-events-none"
          style={{
            backgroundColor: exitColor,
            opacity: showExit ? 1 : 0,
            transition: showExit ? 'opacity 2s ease-in-out' : 'none',
            bottom: '-300px',
          }}
        />
      )}

      {/* Game modal — full-screen mobile, max-width desktop, backdrop does NOT dismiss */}
      {gameContent && isGameOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
          {/* Modal container */}
          <div className="relative z-10 flex h-full w-full flex-col overflow-hidden backdrop-blur-2xl bg-base/70 backdrop-saturate-150 md:my-8 md:h-[calc(100vh-4rem)] md:max-w-2xl md:rounded-2xl md:shadow-xl md:overflow-y-auto">
            {/* Close button */}
            <button
              type="button"
              onClick={onGameClose}
              className="absolute top-4 right-4 z-20 cursor-pointer transition-all duration-200 hover:brightness-90"
            >
              <img
                src={closeImg}
                alt="Stäng"
                className="h-10 w-10"
              />
            </button>
            <div className="flex min-h-0 flex-1 flex-col pt-8">{gameContent}</div>
          </div>
        </div>
      )}
    </div>
  );
}
