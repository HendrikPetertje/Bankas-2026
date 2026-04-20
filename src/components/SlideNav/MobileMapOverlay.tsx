import { useEffect, useState } from 'react';
import type { SlideId } from '../../App';
import closeImg from './images/close-button.png';
import lgCityImg from './images/lg-city-button.png';
import lgCityActiveImg from './images/lg-city-button-active.png';
import lgDoorImg from './images/lg-door-button.png';
import lgDoorActiveImg from './images/lg-door-button-active.png';
import lgFieldImg from './images/lg-field-button.png';
import lgFieldActiveImg from './images/lg-field-button-active.png';
import lgForestImg from './images/lg-forest-button.png';
import lgForestActiveImg from './images/lg-forest-button-active.png';
import lgMountainImg from './images/lg-mountain-button.png';
import lgMountainActiveImg from './images/lg-mountain-button-active.png';

const SLIDE_BUTTONS: { id: SlideId; src: string; activeSrc: string; alt: string; label: string }[] = [
  { id: 'front', src: lgDoorImg, activeSrc: lgDoorActiveImg, alt: 'Dörren', label: 'Start' },
  { id: 'welcome', src: lgForestImg, activeSrc: lgForestActiveImg, alt: 'Skogen', label: 'Välkommen' },
  { id: 'info', src: lgMountainImg, activeSrc: lgMountainActiveImg, alt: 'Berget', label: 'Lägerinfo' },
  { id: 'program', src: lgFieldImg, activeSrc: lgFieldActiveImg, alt: 'Fältet', label: 'Program' },
  { id: 'contact', src: lgCityImg, activeSrc: lgCityActiveImg, alt: 'Staden', label: 'Kontakt' },
];

interface MobileMapOverlayProps {
  activeSlide: SlideId;
  onNavigate: (target: SlideId) => void;
  transitioning: boolean;
  onClose: () => void;
}

export default function MobileMapOverlay({ activeSlide, onNavigate, transitioning, onClose }: MobileMapOverlayProps) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Trigger expansion on next frame so the initial state renders first
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setExpanded(true);
      });
    });
  }, []);

  const handleClose = () => {
    setExpanded(false);
    setTimeout(onClose, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6">
      {/* Bubble backdrop — expands from top center */}
      <div
        className="absolute inset-0 backdrop-blur-2xl bg-base/10 backdrop-saturate-150 transition-all duration-500 ease-out"
        style={{
          transformOrigin: 'top center',
          borderRadius: expanded ? '0' : '0 0 50% 50%',
          transform: expanded ? 'scale(1)' : 'scale(0)',
          opacity: expanded ? 1 : 0,
        }}
      />

      {/* Close button — fixed to top-right of the overlay */}
      <button
        type="button"
        onClick={handleClose}
        className="absolute top-6 right-6 z-20 cursor-pointer transition-all duration-200 hover:brightness-90"
        style={{ opacity: expanded ? 1 : 0, transitionDelay: expanded ? '200ms' : '0ms' }}
      >
        <img
          src={closeImg}
          alt="Stäng"
          className="h-10 w-10"
        />
      </button>

      {/* Content — fades in after bubble expands */}
      <div
        className="relative z-10 flex flex-col items-center justify-center w-full transition-opacity duration-300 ease-out"
        style={{ opacity: expanded ? 1 : 0, transitionDelay: expanded ? '200ms' : '0ms' }}
      >
        {/* Slide buttons: 2-column grid, last one centered */}
        <div className="grid w-full max-w-sm grid-cols-2 gap-4 justify-items-center">
          {SLIDE_BUTTONS.map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => onNavigate(btn.id)}
              disabled={transitioning}
              className={`flex flex-col items-center cursor-pointer transition-all duration-200 hover:brightness-90 disabled:cursor-not-allowed ${
                btn.id === 'contact' ? 'col-span-2' : ''
              }`}
            >
              <img
                src={activeSlide === btn.id ? btn.activeSrc : btn.src}
                alt={btn.alt}
                className="h-auto w-full max-w-[160px] rounded-2xl"
              />
              <p
                className={`text-sm font-body text-center mt-1 ${activeSlide === btn.id ? 'text-foam font-semibold border-b-2 border-foam' : 'text-text'}`}
              >
                {btn.label}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
