import { useEffect, useRef, useState } from 'react';
import smallBird from './images/small-bird.png';
import smallCloud1 from './images/small-cloud-1.png';
import smallCloud2 from './images/small-cloud-2.png';
import smallFlock from './images/small-flock-of-birds.png';
import doorBase from './images/the-door-cutout.jpg';
import overlay1 from './images/the-door-cutout-overlay-1.png';
import overlay2 from './images/the-door-cutout-overlay-2.png';
import overlay3 from './images/the-door-cutout-overlay-3.png';
import overlayHover from './images/the-door-cutout-overlay-hover.png';

interface FrontDoorProps {
  onNavigate: (slide: 'welcome') => void;
}

const overlays = [overlay1, overlay2, overlay3];

const floatingDetails = [
  { src: smallCloud1, alt: 'Moln', duration: '28s', delay: '0s', top: '10%', maxWidth: 128, reverse: false },
  { src: smallCloud2, alt: 'Moln', duration: '34s', delay: '8s', top: '55%', maxWidth: 269, reverse: false },
  { src: smallBird, alt: 'Fågel', duration: '18s', delay: '4s', top: '35%', maxWidth: 32, reverse: true },
  { src: smallFlock, alt: 'Fåglar', duration: '22s', delay: '12s', top: '75%', maxWidth: 132, reverse: true },
];

type TransitionPhase = 'idle' | 'active';

export default function FrontDoor({ onNavigate }: FrontDoorProps) {
  const [activeOverlay, setActiveOverlay] = useState(0);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [transition, setTransition] = useState<TransitionPhase>('idle');
  const [doorHovered, setDoorHovered] = useState(false);
  const transitionRef = useRef<TransitionPhase>('idle');

  // Overlay animation cycle: 4 frames (0 = none, 1–3 = overlay index)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveOverlay((prev) => (prev + 1) % 4);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Delayed tooltip
  useEffect(() => {
    const timeout = setTimeout(() => setTooltipVisible(true), 3000);
    return () => clearTimeout(timeout);
  }, []);

  const handleDoorClick = () => {
    if (transitionRef.current !== 'idle') return;
    transitionRef.current = 'active';
    setTransition('active');

    setTimeout(() => {
      onNavigate('welcome');
    }, 2000);
  };

  return (
    <div className="relative flex min-h-[100svh] flex-col items-center bg-edge-light overflow-hidden">
      {/* Sky area: heading + floating details */}
      <div className="relative z-20 flex flex-1 w-full flex-col items-center overflow-hidden">
        {/* Floating detail images — positioned randomly within the sky area */}
        {floatingDetails.map((detail) => (
          <img
            key={detail.src}
            src={detail.src}
            alt={detail.alt}
            className="pointer-events-none absolute left-0 z-10 opacity-70"
            style={{
              top: detail.top,
              maxWidth: `${detail.maxWidth}px`,
              animation: `${detail.reverse ? 'drift-reverse' : 'drift'} ${detail.duration} ${detail.delay} linear infinite backwards`,
            }}
          />
        ))}

        {/* Heading */}
        <div className="z-20 mx-auto max-w-3xl px-6 pt-12 pb-8 text-center sm:pt-16 md:pt-20">
          <h1 className="font-display text-2xl text-text sm:text-3xl md:text-4xl">
            Baptistkyrkan Sundsvall &amp; Bilda Presenterar
          </h1>
        </div>
      </div>

      {/* Door image with overlays */}
      <div
        className="relative z-20 w-full max-w-2xl px-4"
        style={{
          transformOrigin: '50% 63%',
          transform: transition === 'active' ? 'scale(2.5)' : 'scale(1)',
          transition: 'transform 2s ease-in',
        }}
      >
        <img
          src={doorBase}
          alt="En magisk dörr"
          className="relative z-0 block w-full"
        />

        {overlays.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className="pointer-events-none absolute inset-0 z-10 h-full w-full"
            style={{
              opacity: activeOverlay === i + 1 ? 1 : 0,
              transition: 'opacity 0.6s ease-in',
            }}
          />
        ))}

        {/* Hover overlay */}
        <img
          src={overlayHover}
          alt=""
          className="pointer-events-none absolute inset-0 z-10 h-full w-full"
          style={{
            opacity: doorHovered || transition === 'active' ? 1 : 0,
            transition: 'opacity 0.3s ease-in',
          }}
        />

        {/* Click target: precise rectangle on desktop, full image on mobile */}
        <button
          type="button"
          onClick={handleDoorClick}
          onMouseEnter={() => setDoorHovered(true)}
          onMouseLeave={() => setDoorHovered(false)}
          aria-label="Öppna dörren"
          className="absolute inset-0 z-20 cursor-pointer md:top-[52%] md:left-[44%] md:h-[23%] md:w-[12%] md:inset-auto"
        />
      </div>

      {/* Tooltip */}
      <p
        className="z-20 mt-4 mb-8 text-sm text-subtle transition-opacity duration-700"
        style={{ opacity: tooltipVisible ? 1 : 0 }}
      >
        Tryck på dörren för att fortsätta
      </p>

      {/* Transition overlay — always mounted, starts transparent */}
      <div
        className="fixed inset-0 z-50 pointer-events-none"
        style={{
          backgroundColor: transition === 'active' ? '#fce250' : 'rgba(252, 226, 80, 0)',
          transition: 'background-color 2s ease-in-out',
          paddingBottom: 'env(safe-area-inset-bottom)',
          bottom: 'calc(-1 * env(safe-area-inset-bottom))',
        }}
      />
    </div>
  );
}
