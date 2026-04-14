import { useEffect, useRef, useState } from 'react';
import type { Components } from 'react-markdown';
import Markdown from 'react-markdown';
import type { SlideId } from '../../App';
import Slide from '../../components/Slide';
import dragon from './images/dragon.png';
import flockOfBirds from './images/flock-of-birds.png';
import fluffyClouds from './images/fluffy-clouds.png';
import content1 from './images/IMG_1029.jpg';
import content2 from './images/IMG_7916.jpg';
import content3 from './images/IMG_8492.jpg';
import mainPicCutout from './images/main-pic-cutout.png';
import clouds1 from './images/main-pic-cutout-clouds-1.png';
import clouds2 from './images/main-pic-cutout-clouds-2.png';
import overlay1 from './images/main-pic-cutout-overlay-1.png';
import overlay2 from './images/main-pic-cutout-overlay-2.png';
import overlay3 from './images/main-pic-cutout-overlay-3.png';
import smoke1 from './images/main-pic-cutout-smoke-1.png';
import smoke2 from './images/main-pic-cutout-smoke-2.png';
import { infoContent } from './slideContent';

interface MountaintopInfoProps {
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

const creatures = [
  { src: dragon, alt: 'Drake', duration: '20s', delay: '0s', top: '18%', reverse: false },
  { src: fluffyClouds, alt: 'Moln', duration: '30s', delay: '4s', top: '42%', reverse: true },
  { src: flockOfBirds, alt: 'Fåglar', duration: '22s', delay: '8s', top: '62%', reverse: true },
];

const markdownComponents: Components = {
  h1({ children }) {
    return <h1 className="font-display text-2xl text-text mb-4 mt-6">{children}</h1>;
  },
  h2({ children }) {
    return <h2 className="font-display text-xl text-text mb-3 mt-5">{children}</h2>;
  },
  h3({ children }) {
    return <h3 className="font-display text-lg text-text mb-2 mt-4">{children}</h3>;
  },
  blockquote({ children }) {
    return <blockquote className="pl-4 border-l-2 border-rose my-4 text-subtle italic">{children}</blockquote>;
  },
  a({ href, children }) {
    return (
      <a
        href={href}
        className="text-pine no-underline border-b-2 border-pine"
      >
        {children}
      </a>
    );
  },
  p({ children }) {
    return <p className="mb-4 leading-relaxed">{children}</p>;
  },
};

export default function MountaintopInfo({
  activeSlide,
  onNavigate,
  transitioning,
  transitionDirection,
  dipToActive,
}: MountaintopInfoProps) {
  // Cloud overlay: crossfade between clouds-1 and clouds-2 every 4s, 1s transition
  const [showClouds2, setShowClouds2] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowClouds2((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Smoke overlay: crossfade between smoke-1 and smoke-2 every 3s, 600ms transition
  const [showSmoke2, setShowSmoke2] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowSmoke2((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
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
      dipFrom="#575279"
      dipTo="#56949f"
      activeSlide={activeSlide}
      onNavigate={onNavigate}
      transitioning={transitioning}
      transitionDirection={transitionDirection}
      dipToActive={dipToActive}
      picture={
        <div className="relative w-full">
          {/* Base image */}
          <img
            src={mainPicCutout}
            alt="Bergstoppen"
            className="block w-full"
          />

          {/* Cloud overlays (lowest z) */}
          <img
            src={clouds1}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{
              opacity: showClouds2 ? 0 : 1,
              transition: 'opacity 1000ms ease-in-out',
            }}
          />
          <img
            src={clouds2}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{
              opacity: showClouds2 ? 1 : 0,
              transition: 'opacity 1000ms ease-in-out',
            }}
          />

          {/* Smoke overlays (middle z) */}
          <img
            src={smoke1}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{
              opacity: showSmoke2 ? 0 : 1,
              transition: 'opacity 600ms ease-in-out',
            }}
          />
          <img
            src={smoke2}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{
              opacity: showSmoke2 ? 1 : 0,
              transition: 'opacity 600ms ease-in-out',
            }}
          />

          {/* Detail overlays (highest z) */}
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
        </div>
      }
    >
      <div className="relative overflow-hidden">
        {/* Flying creatures */}
        {creatures.map((creature) => (
          <img
            key={creature.src}
            src={creature.src}
            alt={creature.alt}
            className="pointer-events-none absolute left-0 z-10 scale-[0.7] opacity-70 md:scale-100"
            style={{
              top: creature.top,
              animation: `${creature.reverse ? 'drift-reverse' : 'drift'} ${creature.duration} ${creature.delay} linear infinite backwards`,
            }}
          />
        ))}

        {/* Content area */}
        <div className="relative z-20 mx-auto max-w-2xl px-6 pt-8 pb-4">
          {/* Heading */}
          <h2 className="font-display text-2xl text-text mb-4 md:text-3xl">För dig som ska resa in i riket</h2>

          {/* Markdown content */}
          <Markdown components={markdownComponents}>{infoContent}</Markdown>

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
