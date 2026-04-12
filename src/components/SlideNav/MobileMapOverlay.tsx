import type { SlideId } from '../../App';
import closeImg from './images/close-button.png';
import lgBackImg from './images/lg-back.png';
import lgCityImg from './images/lg-city-button.png';
import lgDoorImg from './images/lg-door-button.png';
import lgFieldImg from './images/lg-field-button.png';
import lgForestImg from './images/lg-forest-button.png';
import lgMountainImg from './images/lg-mountain-button.png';
import lgNextImg from './images/lg-next.png';
import { SLIDE_ORDER } from './SlideNav';

const SLIDE_BUTTONS: { id: SlideId; src: string; alt: string }[] = [
  { id: 'front', src: lgDoorImg, alt: 'Dörren' },
  { id: 'welcome', src: lgForestImg, alt: 'Skogen' },
  { id: 'info', src: lgMountainImg, alt: 'Berget' },
  { id: 'program', src: lgFieldImg, alt: 'Fältet' },
  { id: 'contact', src: lgCityImg, alt: 'Staden' },
];

interface MobileMapOverlayProps {
  activeSlide: SlideId;
  onNavigate: (target: SlideId) => void;
  transitioning: boolean;
  onClose: () => void;
}

export default function MobileMapOverlay({ activeSlide, onNavigate, transitioning, onClose }: MobileMapOverlayProps) {
  const currentIndex = SLIDE_ORDER.indexOf(activeSlide);
  const prevSlide = currentIndex > 0 ? SLIDE_ORDER[currentIndex - 1] : undefined;
  const nextSlide = currentIndex < SLIDE_ORDER.length - 1 ? SLIDE_ORDER[currentIndex + 1] : undefined;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-2xl bg-base/10 backdrop-saturate-150 px-6">
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 cursor-pointer transition-all duration-200 hover:brightness-90"
      >
        <img
          src={closeImg}
          alt="Stäng"
          className="h-10 w-10"
        />
      </button>

      <div className="flex w-full max-w-sm flex-col items-center gap-5">
        {/* Back / Next row */}
        <div className="flex w-full items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => prevSlide && onNavigate(prevSlide)}
            disabled={transitioning || !prevSlide}
            className="flex-1 cursor-pointer transition-all duration-200 hover:brightness-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <img
              src={lgBackImg}
              alt="Tillbaka"
              className="ml-auto h-auto w-full max-w-36"
            />
          </button>
          <button
            type="button"
            onClick={() => nextSlide && onNavigate(nextSlide)}
            disabled={transitioning || !nextSlide}
            className="flex-1 cursor-pointer transition-all duration-200 hover:brightness-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <img
              src={lgNextImg}
              alt="Nästa"
              className="mr-auto h-auto w-full max-w-36"
            />
          </button>
        </div>

        {/* Slide buttons: 2-column grid, last one centered */}
        <div className="grid w-full grid-cols-2 gap-4 justify-items-center">
          {SLIDE_BUTTONS.map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => onNavigate(btn.id)}
              disabled={transitioning}
              className={`cursor-pointer transition-all duration-200 hover:brightness-90 disabled:cursor-not-allowed ${
                activeSlide === btn.id ? 'brightness-110 contrast-110' : 'brightness-95 contrast-95'
              } ${btn.id === 'contact' ? 'col-span-2' : ''}`}
            >
              <img
                src={btn.src}
                alt={btn.alt}
                className="h-auto w-full max-w-40 rounded-2xl"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
