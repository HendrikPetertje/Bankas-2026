import { useCallback, useRef, useState } from 'react';
import { SLIDE_ORDER } from './components/SlideNav/SlideNav';
import CoastContact from './slides/CoastContact/CoastContact';
import ForestWelcome from './slides/ForestWelcome/ForestWelcome';
import FrontDoor from './slides/FrontDoor/FrontDoor';
import MountaintopInfo from './slides/MountaintopInfo/MountaintopInfo';
import PlainsProgram from './slides/PlainsProgram/PlainsProgram';

export type SlideId = 'front' | 'welcome' | 'info' | 'program' | 'contact';

function App() {
  const [activeSlide, setSlide] = useState<SlideId>('front');
  const [transitioning, setTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'backward' | null>(null);
  const [dipToActive, setDipToActive] = useState(false);
  const transitioningRef = useRef(false);

  const onNavigate = useCallback(
    (target: SlideId) => {
      if (transitioningRef.current) return;
      if (target === activeSlide) return;

      transitioningRef.current = true;
      setTransitioning(true);

      const currentIndex = SLIDE_ORDER.indexOf(activeSlide);
      const targetIndex = SLIDE_ORDER.indexOf(target);
      const direction = targetIndex > currentIndex ? 'forward' : 'backward';
      setTransitionDirection(direction);
      setDipToActive(true);

      // After 2s dipTo, swap the slide
      setTimeout(() => {
        setDipToActive(false);
        setSlide(target);
        setTransitionDirection(null);
        window.scrollTo(0, 0);

        // After 2s dipFrom on the new slide, finish transitioning
        setTimeout(() => {
          setTransitioning(false);
          transitioningRef.current = false;
        }, 2000);
      }, 2000);
    },
    [activeSlide],
  );

  const slideProps = { activeSlide, onNavigate, transitioning, transitionDirection, dipToActive };

  const renderSlide = () => {
    switch (activeSlide) {
      case 'front':
        return <FrontDoor onNavigate={onNavigate} />;
      case 'welcome':
        return <ForestWelcome {...slideProps} />;
      case 'info':
        return <MountaintopInfo {...slideProps} />;
      case 'program':
        return <PlainsProgram {...slideProps} />;
      case 'contact':
        return <CoastContact {...slideProps} />;
      default: {
        const _exhaustive: never = activeSlide;
        return _exhaustive;
      }
    }
  };

  return renderSlide();
}

export default App;
