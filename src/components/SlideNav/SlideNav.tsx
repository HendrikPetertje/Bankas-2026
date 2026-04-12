import type { ReactNode } from 'react';
import { useCallback, useRef, useState } from 'react';
import type { SlideId } from '../../App';
import backImg from './images/back.png';
import cityImg from './images/city-button.png';
import doorImg from './images/door-button.png';
import fieldImg from './images/field-button.png';
import forestImg from './images/forest-button.png';
import mapImg from './images/mobile-map-button.png';
import mountainImg from './images/mountain-button.png';
import nextImg from './images/next.png';
import MobileMapOverlay from './MobileMapOverlay';

export const SLIDE_ORDER: SlideId[] = ['front', 'welcome', 'info', 'program', 'contact'];

const SLIDE_BUTTONS: { id: SlideId; src: string; alt: string }[] = [
  { id: 'front', src: doorImg, alt: 'Dörren' },
  { id: 'welcome', src: forestImg, alt: 'Skogen' },
  { id: 'info', src: mountainImg, alt: 'Berget' },
  { id: 'program', src: fieldImg, alt: 'Fältet' },
  { id: 'contact', src: cityImg, alt: 'Staden' },
];

interface SlideNavProps {
  activeSlide: SlideId;
  onNavigate: (target: SlideId) => void;
  transitioning: boolean;
}

// --- Dock proximity scaling ---

const BASE_SCALE = 1;
const MAX_SCALE = 1.8;
const INFLUENCE_RADIUS = 80; // px distance for falloff

function computeScales(mouseX: number, itemCenters: number[]): number[] {
  return itemCenters.map((cx) => {
    const dist = Math.abs(mouseX - cx);
    if (dist > INFLUENCE_RADIUS) return BASE_SCALE;
    const t = 1 - dist / INFLUENCE_RADIUS;
    const scale = BASE_SCALE + (MAX_SCALE - BASE_SCALE) * ((1 + Math.cos(Math.PI * (1 - t))) / 2);
    return Math.max(scale, BASE_SCALE);
  });
}

interface DockItem {
  key: string;
  src: string;
  alt: string;
  onClick: () => void;
  disabled: boolean;
  isActive?: boolean;
  isSpacer?: boolean;
  imgClass: string;
}

function DesktopDock({ activeSlide, onNavigate, transitioning }: SlideNavProps) {
  const currentIndex = SLIDE_ORDER.indexOf(activeSlide);
  const prevSlide = currentIndex > 0 ? SLIDE_ORDER[currentIndex - 1] : undefined;
  const nextSlide = currentIndex < SLIDE_ORDER.length - 1 ? SLIDE_ORDER[currentIndex + 1] : undefined;

  const [scales, setScales] = useState<number[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dockRef = useRef<HTMLDivElement>(null);

  const items: DockItem[] = [
    {
      key: 'back',
      src: backImg,
      alt: 'Tillbaka',
      onClick: () => prevSlide && onNavigate(prevSlide),
      disabled: transitioning || !prevSlide,
      imgClass: 'h-9 w-auto',
    },
    {
      key: 'next',
      src: nextImg,
      alt: 'Nästa',
      onClick: () => nextSlide && onNavigate(nextSlide),
      disabled: transitioning || !nextSlide,
      imgClass: 'h-9 w-auto',
    },
    ...SLIDE_BUTTONS.map((btn) => ({
      key: btn.id,
      src: btn.src,
      alt: btn.alt,
      onClick: () => onNavigate(btn.id),
      disabled: transitioning,
      isActive: activeSlide === btn.id,
      imgClass: 'h-12 w-12 rounded-xl',
    })),
  ];

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const centers = itemRefs.current.map((el) => {
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      return rect.left + rect.width / 2;
    });
    setScales(computeScales(e.clientX, centers));
  }, []);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      setIsHovering(true);
      handleMouseMove(e);
    },
    [handleMouseMove],
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setScales([]);
  }, []);

  return (
    <div
      ref={dockRef}
      role="toolbar"
      className="hidden md:flex items-end justify-center gap-2 px-4 py-2 rounded-2xl backdrop-blur-xl bg-base/25 shadow-lg overflow-visible"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {items.map((item, i) => {
        const scale = isHovering && scales[i] ? scales[i] : BASE_SCALE;

        return (
          <span
            key={item.key}
            className={i === 1 ? 'mr-4' : ''}
          >
            <button
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              type="button"
              onClick={item.onClick}
              disabled={item.disabled}
              className={`cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-90 ${
                item.isActive ? 'brightness-110 contrast-110' : 'brightness-95 contrast-95'
              }`}
              style={{
                transform: `scale(${scale})`,
                transition: 'transform 150ms ease-out',
                transformOrigin: 'bottom center',
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                className={item.imgClass}
              />
            </button>
          </span>
        );
      })}
    </div>
  );
}

// --- Mobile components (unchanged behavior) ---

function NavButton({ onClick, disabled, children }: { onClick: () => void; disabled: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="cursor-pointer transition-all duration-200 ease-out hover:brightness-90 disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}

function MobileBackNext({ activeSlide, onNavigate, transitioning }: SlideNavProps) {
  const currentIndex = SLIDE_ORDER.indexOf(activeSlide);
  const prevSlide = currentIndex > 0 ? SLIDE_ORDER[currentIndex - 1] : undefined;
  const nextSlide = currentIndex < SLIDE_ORDER.length - 1 ? SLIDE_ORDER[currentIndex + 1] : undefined;

  return (
    <div className="flex items-center gap-1">
      <NavButton
        onClick={() => prevSlide && onNavigate(prevSlide)}
        disabled={transitioning || !prevSlide}
      >
        <img
          src={backImg}
          alt="Tillbaka"
          className="h-8 w-auto"
        />
      </NavButton>
      <NavButton
        onClick={() => nextSlide && onNavigate(nextSlide)}
        disabled={transitioning || !nextSlide}
      >
        <img
          src={nextImg}
          alt="Nästa"
          className="h-8 w-auto"
        />
      </NavButton>
    </div>
  );
}

function MobileMapButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="md:hidden cursor-pointer transition-all duration-200 hover:brightness-90"
    >
      <img
        src={mapImg}
        alt="Karta"
        className="h-10 w-auto"
      />
    </button>
  );
}

export default function SlideNav({ activeSlide, onNavigate, transitioning }: SlideNavProps) {
  const [mapOpen, setMapOpen] = useState(false);

  const handleMobileNavigate = (target: SlideId) => {
    setMapOpen(false);
    onNavigate(target);
  };

  return (
    <>
      <nav className="sticky bottom-0 z-40 flex items-center justify-center p-3 pointer-events-none">
        <div className="pointer-events-auto md:mx-auto">
          <DesktopDock
            activeSlide={activeSlide}
            onNavigate={onNavigate}
            transitioning={transitioning}
          />
        </div>
        <div className="pointer-events-auto md:hidden ml-auto mr-2 flex items-center gap-2">
          <MobileBackNext
            activeSlide={activeSlide}
            onNavigate={onNavigate}
            transitioning={transitioning}
          />
          <MobileMapButton onClick={() => setMapOpen(true)} />
        </div>
      </nav>

      {mapOpen && (
        <MobileMapOverlay
          activeSlide={activeSlide}
          onNavigate={handleMobileNavigate}
          transitioning={transitioning}
          onClose={() => setMapOpen(false)}
        />
      )}
    </>
  );
}
