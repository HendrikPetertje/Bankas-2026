import { useEffect, useRef, useState } from 'react';
import type { SlideId } from '../../App';
import MarkdownContent from '../../components/MarkdownContent/MarkdownContent';
import Slide from '../../components/Slide';
import FarmingGame from './FarmingGame/FarmingGame';
import bigClouds from './images/big-clouds.png';
import clouds from './images/clouds.png';
import flockOfBirds from './images/flock-of-birds.png';
import content1 from './images/IMG_1762.jpg';
import content2 from './images/IMG_2849.jpg';
import content3 from './images/IMG_9718.jpg';
import mainPic from './images/main-pic.jpg';
import overlay1 from './images/main-pic-overlay-1.png';
import overlay2 from './images/main-pic-overlay-2.png';
import overlay3 from './images/main-pic-overlay-3.png';
import chimneySmoke1 from './images/main-pic-overlay-chimney-smoke-1.png';
import chimneySmoke2 from './images/main-pic-overlay-chimney-smoke-2.png';
import hoverOverlay from './images/plains-mouse-over-overlay.png';
import { programContent } from './slideContent';

interface PlainsProgramProps {
  activeSlide: SlideId;
  onNavigate: (target: SlideId) => void;
  transitioning: boolean;
  transitionDirection: 'forward' | 'backward' | null;
  dipToActive: boolean;
}

const detailOverlays = [overlay1, overlay2, overlay3];

const contentImages = [
  { src: content1, alt: 'Bild från lägret', rotate: '-3deg' },
  { src: content2, alt: 'Bild från lägret', rotate: '2deg' },
  { src: content3, alt: 'Bild från lägret', rotate: '-1.5deg' },
];

const driftingLayers = [
  { src: bigClouds, alt: 'Stora moln', duration: '25s', delay: '0s', top: '10%', reverse: false },
  { src: clouds, alt: 'Moln', duration: '35s', delay: '5s', top: '35%', reverse: false },
  { src: flockOfBirds, alt: 'Fåglar', duration: '28s', delay: '10s', top: '58%', reverse: true },
];

export default function PlainsProgram({
  activeSlide,
  onNavigate,
  transitioning,
  transitionDirection,
  dipToActive,
}: PlainsProgramProps) {
  // Chimney smoke overlay: crossfade between smoke-1 and smoke-2 every 3s, 600ms transition
  const [showSmoke2, setShowSmoke2] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowSmoke2((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Tooltip: fades in after 3s
  useEffect(() => {
    const t = setTimeout(() => setTooltipVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // Detail overlay: sequential cycling (5s gap, 2s visible)
  const [activeDetailOverlay, setActiveDetailOverlay] = useState(-1);
  const detailTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    let cancelled = false;

    function scheduleNext(index: number) {
      if (cancelled) return;
      setActiveDetailOverlay(index);

      detailTimeoutRef.current = setTimeout(() => {
        if (cancelled) return;
        setActiveDetailOverlay(-1);

        detailTimeoutRef.current = setTimeout(() => {
          if (cancelled) return;
          scheduleNext((index + 1) % 3);
        }, 5000);
      }, 2000);
    }

    detailTimeoutRef.current = setTimeout(() => {
      if (!cancelled) scheduleNext(0);
    }, 5000);

    return () => {
      cancelled = true;
      if (detailTimeoutRef.current) clearTimeout(detailTimeoutRef.current);
    };
  }, []);

  return (
    <Slide
      dipFrom="#56949f"
      dipTo="#ea9d34"
      activeSlide={activeSlide}
      onNavigate={onNavigate}
      transitioning={transitioning}
      transitionDirection={transitionDirection}
      dipToActive={dipToActive}
      gameContent={<FarmingGame />}
      isGameOpen={gameOpen}
      onGameOpen={() => setGameOpen(true)}
      onGameClose={() => setGameOpen(false)}
      picture={
        <div className="relative w-full">
          {/* Base image */}
          <img
            src={mainPic}
            alt="Slätterna"
            className="block w-full"
          />

          {/* Chimney smoke overlays (lower z) */}
          <img
            src={chimneySmoke1}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{
              opacity: showSmoke2 ? 0 : 1,
              transition: 'opacity 600ms ease-in-out',
            }}
          />
          <img
            src={chimneySmoke2}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{
              opacity: showSmoke2 ? 1 : 0,
              transition: 'opacity 600ms ease-in-out',
            }}
          />

          {/* Detail overlays (higher z) */}
          {detailOverlays.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full"
              style={{
                opacity: activeDetailOverlay === i ? 1 : 0,
                transition: 'opacity 500ms ease-in-out',
              }}
            />
          ))}

          {/* Hover overlay */}
          <img
            src={hoverOverlay}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{
              opacity: hovered || clicked ? 1 : 0,
              transition: 'opacity 300ms ease',
            }}
          />
          {/* Mobile: full-image click target */}
          <button
            type="button"
            className="absolute inset-0 cursor-pointer bg-transparent border-0 p-0 md:hidden"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => {
              setClicked(true);
              onNavigate('contact');
            }}
          />
          {/* Desktop: precise click target top 6%–34%, left 22%–44% */}
          <button
            type="button"
            className="absolute hidden cursor-pointer bg-transparent border-0 p-0 md:block"
            style={{ top: '6%', left: '22%', width: '22%', height: '28%' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => {
              setClicked(true);
              onNavigate('contact');
            }}
          />
        </div>
      }
      pictureFooter={
        <p
          className="m-0 pb-8 text-center text-sm font-body text-text transition-opacity duration-700"
          style={{ opacity: tooltipVisible ? 1 : 0 }}
        >
          Klicka på stadsslottet för att fortsätta.
        </p>
      }
    >
      <div className="relative overflow-hidden">
        {/* Drifting background layers */}
        {driftingLayers.map((layer) => (
          <img
            key={layer.src}
            src={layer.src}
            alt={layer.alt}
            className="pointer-events-none absolute left-0 z-10 scale-[0.7] opacity-70 md:scale-100"
            style={{
              top: layer.top,
              animation: `${layer.reverse ? 'drift-reverse' : 'drift'} ${layer.duration} ${layer.delay} linear infinite backwards`,
            }}
          />
        ))}

        {/* Content area */}
        <div className="relative z-20 mx-auto max-w-2xl px-6 pt-8 pb-4">
          {/* Heading */}
          <h2 className="font-display mb-4 text-2xl text-text md:text-3xl">Dagsprogram</h2>

          {/* Markdown content */}
          <MarkdownContent>{programContent}</MarkdownContent>

          {/* Content images */}
          <div className="mt-6 mb-4 flex items-center justify-center gap-4 md:gap-6">
            {contentImages.map((img) => (
              <img
                key={img.src}
                src={img.src}
                alt={img.alt}
                className="w-[28%] max-w-[180px] rounded-sm shadow-md"
                style={{ transform: `rotate(${img.rotate})` }}
              />
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}
