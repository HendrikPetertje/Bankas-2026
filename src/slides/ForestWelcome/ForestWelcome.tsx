import { useEffect, useRef, useState } from 'react';
import type { Components } from 'react-markdown';
import Markdown from 'react-markdown';
import type { SlideId } from '../../App';
import Slide from '../../components/Slide';
import background from './images/background.png';
import content1 from './images/content-1.jpg';
import content2 from './images/content-2.jpg';
import content3 from './images/content-3.jpg';
import logo from './images/logo.png';
import overlay1 from './images/overlay-1.png';
import overlay2 from './images/overlay-2.png';
import overlay3 from './images/overlay-3.png';
import smallBird from './images/small-bird.png';
import smallDragon from './images/small-dragon.png';
import smallEagle from './images/small-eagle.png';
import { welcomeContent } from './slideContent';

interface ForestWelcomeProps {
  activeSlide: SlideId;
  onNavigate: (target: SlideId) => void;
  transitioning: boolean;
  transitionDirection: 'forward' | 'backward' | null;
  dipToActive: boolean;
}

const overlays = [overlay1, overlay2, overlay3];

const contentImages = [
  { src: content1, alt: 'Bild från lägret', rotate: '-3deg' },
  { src: content2, alt: 'Bild från lägret', rotate: '2deg' },
  { src: content3, alt: 'Bild från lägret', rotate: '-1.5deg' },
];

const creatures = [
  { src: smallDragon, alt: 'Drake', duration: '20s', delay: '0s', top: '15%', maxWidth: 64, reverse: false },
  { src: smallBird, alt: 'Fågel', duration: '14s', delay: '6s', top: '8%', maxWidth: 36, reverse: false },
  { src: smallEagle, alt: 'Örn', duration: '18s', delay: '3s', top: '25%', maxWidth: 72, reverse: true },
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

export default function ForestWelcome({
  activeSlide,
  onNavigate,
  transitioning,
  transitionDirection,
  dipToActive,
}: ForestWelcomeProps) {
  const [activeOverlay, setActiveOverlay] = useState(-1);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  // Overlay cycling: 2s visible, 4s gap, looping through 3 overlays
  useEffect(() => {
    let cancelled = false;

    function scheduleNext(index: number) {
      if (cancelled) return;
      // Show overlay
      setActiveOverlay(index);

      // After 2s visible, hide it
      timeoutRef.current = setTimeout(() => {
        if (cancelled) return;
        setActiveOverlay(-1);

        // After 4s gap, show next overlay
        timeoutRef.current = setTimeout(() => {
          if (cancelled) return;
          scheduleNext((index + 1) % 3);
        }, 4000);
      }, 2000);
    }

    // Start first overlay after initial 4s pause
    timeoutRef.current = setTimeout(() => {
      if (!cancelled) scheduleNext(0);
    }, 4000);

    return () => {
      cancelled = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Slide
      dipFrom="#ea9d34"
      dipTo="#575279"
      activeSlide={activeSlide}
      onNavigate={onNavigate}
      transitioning={transitioning}
      transitionDirection={transitionDirection}
      dipToActive={dipToActive}
      picture={
        <div className="relative w-full">
          <img
            src={background}
            alt="Skogen vid Bänkåsviken"
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
        {/* Flying creatures */}
        {creatures.map((creature) => (
          <img
            key={creature.src}
            src={creature.src}
            alt={creature.alt}
            className="pointer-events-none absolute left-0 z-10 opacity-70"
            style={{
              top: creature.top,
              maxWidth: `${creature.maxWidth}px`,
              animation: `${creature.reverse ? 'drift-reverse' : 'drift'} ${creature.duration} ${creature.delay} linear infinite backwards`,
            }}
          />
        ))}

        {/* Content area */}
        <div className="relative z-20 mx-auto max-w-2xl px-6 pt-8 pb-4">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <img
              src={logo}
              alt="Konungens Rike"
              className="max-w-[160px] md:max-w-[200px]"
            />
          </div>

          {/* Welcome heading */}
          <h2 className="font-display text-2xl text-text mb-4 md:text-3xl">Välkommen</h2>

          {/* Markdown content */}
          <Markdown components={markdownComponents}>{welcomeContent}</Markdown>

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
