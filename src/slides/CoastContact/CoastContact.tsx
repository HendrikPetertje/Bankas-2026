import { useEffect, useRef, useState } from 'react';
import type { SlideId } from '../../App';
import MarkdownContent from '../../components/MarkdownContent/MarkdownContent';
import Slide from '../../components/Slide';
import bildaLogo from './images/bilda.png';
import clouds from './images/clouds.png';
import flockOfPigeons from './images/flock-of-pigeons.png';
import content1 from './images/IMG_7381.jpg';
import content2 from './images/IMG_7552.jpg';
import content3 from './images/IMG_8034.jpg';
import mainPic from './images/main-pic.jpg';
import overlay1 from './images/main-pic-overlay-1.png';
import overlay2 from './images/main-pic-overlay-2.png';
import overlay3 from './images/main-pic-overlay-3.png';
import soccerBall from './images/soccer-ball.png';
import { contactContent } from './slideContent';

interface CoastContactProps {
  activeSlide: SlideId;
  onNavigate: (target: SlideId) => void;
  transitioning: boolean;
  transitionDirection: 'forward' | 'backward' | null;
  dipToActive: boolean;
}

const overlays = [overlay1, overlay2, overlay3];

const contentImages = [
  { src: content1, alt: 'Bild från lägret', rotate: '-2deg' },
  { src: content2, alt: 'Bild från lägret', rotate: '2.5deg' },
  { src: content3, alt: 'Bild från lägret', rotate: '-1deg' },
];

const driftingLayers = [
  { src: clouds, alt: 'Moln', duration: '32s', delay: '0s', top: '10%', reverse: false },
  { src: flockOfPigeons, alt: 'Duvor', duration: '26s', delay: '8s', top: '38%', reverse: true },
];

export default function CoastContact({
  activeSlide,
  onNavigate,
  transitioning,
  transitionDirection,
  dipToActive,
}: CoastContactProps) {
  const [activeOverlay, setActiveOverlay] = useState(-1);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    let cancelled = false;

    function scheduleNext(index: number) {
      if (cancelled) return;
      setActiveOverlay(index);

      timeoutRef.current = setTimeout(() => {
        if (cancelled) return;
        setActiveOverlay(-1);

        timeoutRef.current = setTimeout(() => {
          if (cancelled) return;
          scheduleNext((index + 1) % 3);
        }, 5000);
      }, 2000);
    }

    timeoutRef.current = setTimeout(() => {
      if (!cancelled) scheduleNext(0);
    }, 5000);

    return () => {
      cancelled = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Slide
      dipFrom="#f2e9e1"
      dipTo="#f2e9e1"
      activeSlide={activeSlide}
      onNavigate={onNavigate}
      transitioning={transitioning}
      transitionDirection={transitionDirection}
      dipToActive={dipToActive}
      picture={
        <div className="relative w-full">
          <img
            src={mainPic}
            alt="Staden"
            className="block w-full"
          />
          {overlays.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full"
              style={{
                opacity: activeOverlay === i ? 1 : 0,
                transition: 'opacity 500ms ease-in-out',
              }}
            />
          ))}
        </div>
      }
    >
      <div className="relative overflow-hidden">
        {/* Drifting cloud and pigeon layers */}
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

        {/* Soccer ball arc layer */}
        <img
          src={soccerBall}
          alt=""
          className="pointer-events-none absolute left-0 z-10 w-10 opacity-80"
          style={{
            top: '62%',
            animation: 'soccer-ball-arc 18s 4s linear infinite backwards',
          }}
        />

        {/* Content area */}
        <div className="relative z-20 mx-auto max-w-2xl px-6 pt-8 pb-4">
          <h2 className="font-display mb-4 text-2xl text-text md:text-3xl">Frågor, information &amp; Bilda</h2>

          <MarkdownContent>{contactContent}</MarkdownContent>

          {/* Bilda logo */}
          <div className="my-6 flex justify-center">
            <a
              href="https://bilda.nu"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity duration-200 hover:opacity-60"
            >
              <img
                src={bildaLogo}
                alt="Bilda"
                className="h-16 w-auto"
              />
            </a>
          </div>

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
