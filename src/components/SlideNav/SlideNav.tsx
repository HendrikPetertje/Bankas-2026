import { useCallback, useRef, useState } from 'react';
import type { SlideId } from '../../App';
import cityImg from './images/city-button.png';
import cityActiveImg from './images/city-button-active.png';
import doorImg from './images/door-button.png';
import doorActiveImg from './images/door-button-active.png';
import fieldImg from './images/field-button.png';
import fieldActiveImg from './images/field-button-active.png';
import forestImg from './images/forest-button.png';
import forestActiveImg from './images/forest-button-active.png';
import mapImg from './images/mobile-map-button.png';
import mountainImg from './images/mountain-button.png';
import mountainActiveImg from './images/mountain-button-active.png';
import MobileMapOverlay from './MobileMapOverlay';

export const SLIDE_ORDER: SlideId[] = ['front', 'welcome', 'info', 'program', 'contact'];

const SLIDE_LINKS: { id: SlideId; label: string; src: string; activeSrc: string }[] = [
  { id: 'front', label: 'Start', src: doorImg, activeSrc: doorActiveImg },
  { id: 'welcome', label: 'Välkommen', src: forestImg, activeSrc: forestActiveImg },
  { id: 'info', label: 'Lägerinfo', src: mountainImg, activeSrc: mountainActiveImg },
  { id: 'program', label: 'Program', src: fieldImg, activeSrc: fieldActiveImg },
  { id: 'contact', label: 'Kontakt', src: cityImg, activeSrc: cityActiveImg },
];

interface SlideNavProps {
  activeSlide: SlideId;
  onNavigate: (target: SlideId) => void;
  transitioning: boolean;
}

// --- Proximity scaling ---

const BASE_SCALE = 1;
const MAX_SCALE = 1.6;
const INFLUENCE_RADIUS = 80;

function computeScales(mouseX: number, itemCenters: number[]): number[] {
  return itemCenters.map((cx) => {
    const dist = Math.abs(mouseX - cx);
    if (dist > INFLUENCE_RADIUS) return BASE_SCALE;
    const t = 1 - dist / INFLUENCE_RADIUS;
    const scale = BASE_SCALE + (MAX_SCALE - BASE_SCALE) * ((1 + Math.cos(Math.PI * (1 - t))) / 2);
    return Math.max(scale, BASE_SCALE);
  });
}

// Closed bar height. On hover, expands to cover icon + text with a bubble arc.
const BAR_CLOSED_H = 36;
const BAR_EXPANDED_H = 115;

// --- Desktop top navigation bar ---

function TopNavBar({ activeSlide, onNavigate, transitioning }: SlideNavProps) {
  const [scales, setScales] = useState<number[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [barHovered, setBarHovered] = useState(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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
      setBarHovered(true);
      handleMouseMove(e);
    },
    [handleMouseMove],
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setBarHovered(false);
    setScales([]);
  }, []);

  const barHeight = barHovered ? BAR_EXPANDED_H : BAR_CLOSED_H;

  return (
    <div
      role="toolbar"
      className="hidden md:block fixed top-0 left-0 right-0 z-50"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glass bubble backdrop */}
      <div
        className="absolute top-0 left-0 right-0 backdrop-blur-xl bg-base/25 shadow-lg transition-all duration-300 ease-out pointer-events-none"
        style={{
          height: `${barHeight}px`,
          borderRadius: barHovered ? '0 0 50% 50% / 0 0 40% 40%' : '0',
        }}
      />

      {/* Items */}
      <nav
        aria-label="Huvudnavigation"
        className="relative flex items-start justify-center gap-6 px-4 pt-2"
        style={{ overflow: barHovered ? 'visible' : 'hidden', height: barHovered ? 'auto' : `${BAR_CLOSED_H}px` }}
      >
        {SLIDE_LINKS.map((link, i) => {
          const scale = isHovering && scales[i] ? scales[i] : BASE_SCALE;
          const isActive = activeSlide === link.id;
          const tileSrc = isActive ? link.activeSrc : link.src;

          return (
            <div
              key={link.id}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              style={{
                transform: `scale(${scale})`,
                transition: 'transform 150ms ease-out',
                transformOrigin: 'top center',
              }}
            >
              <button
                type="button"
                onClick={() => !transitioning && onNavigate(link.id)}
                disabled={transitioning}
                className={`flex flex-col items-center cursor-pointer disabled:cursor-not-allowed ${isActive ? 'border-b-2 border-foam' : ''}`}
              >
                {/* Tile image — above text, scales in on hover */}
                <img
                  src={tileSrc}
                  alt=""
                  className="w-12 rounded-xl transition-all duration-200 ease-out"
                  style={{
                    transformOrigin: 'top center',
                    height: barHovered ? '48px' : '0px',
                    opacity: barHovered ? 1 : 0,
                    transform: barHovered ? 'scale(1)' : 'scale(0)',
                  }}
                />
                <span
                  className={`font-body text-sm transition-colors duration-150 ${isActive ? 'text-foam font-semibold' : 'text-text hover:text-foam'}`}
                >
                  {link.label}
                </span>
              </button>
            </div>
          );
        })}
      </nav>
    </div>
  );
}

// --- Mobile top-right nav pill ---

function MobileTopNav({ onMapOpen }: { onMapOpen: () => void }) {
  const [tapped, setTapped] = useState(false);

  const handleTap = () => {
    setTapped(true);
    setTimeout(() => setTapped(false), 120);
    onMapOpen();
  };

  return (
    <div className="group fixed top-2 right-2 z-50 md:hidden backdrop-blur-xl bg-base/25 rounded-2xl shadow-lg p-2 flex items-center justify-center transition-all duration-400 ease-out">
      <button
        type="button"
        onClick={handleTap}
        className="cursor-pointer flex items-center justify-center leading-none"
        style={{
          transform: tapped ? 'scale(1.1)' : undefined,
          transition: 'transform 120ms ease-out',
          transformOrigin: 'center center',
        }}
      >
        <img
          src={mapImg}
          alt="Karta"
          className="h-10 w-auto block transition-all duration-400 ease-out group-hover:h-14"
        />
      </button>
    </div>
  );
}

// --- Root component ---

export default function SlideNav({ activeSlide, onNavigate, transitioning }: SlideNavProps) {
  const [mapOpen, setMapOpen] = useState(false);

  const handleMobileNavigate = (target: SlideId) => {
    setMapOpen(false);
    onNavigate(target);
  };

  return (
    <>
      <TopNavBar
        activeSlide={activeSlide}
        onNavigate={onNavigate}
        transitioning={transitioning}
      />

      <MobileTopNav onMapOpen={() => setMapOpen(true)} />

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
