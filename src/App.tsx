import { useCallback, useRef, useState } from 'react';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
// SlideNav images
import cityImg from './components/SlideNav/images/city-button.png';
import cityActiveImg from './components/SlideNav/images/city-button-active.png';
// MobileMapOverlay images
import closeImg from './components/SlideNav/images/close-button.png';
import doorImg from './components/SlideNav/images/door-button.png';
import doorActiveImg from './components/SlideNav/images/door-button-active.png';
import fieldImg from './components/SlideNav/images/field-button.png';
import fieldActiveImg from './components/SlideNav/images/field-button-active.png';
import forestImg from './components/SlideNav/images/forest-button.png';
import forestActiveImg from './components/SlideNav/images/forest-button-active.png';
import lgCityImg from './components/SlideNav/images/lg-city-button.png';
import lgCityActiveImg from './components/SlideNav/images/lg-city-button-active.png';
import lgDoorImg from './components/SlideNav/images/lg-door-button.png';
import lgDoorActiveImg from './components/SlideNav/images/lg-door-button-active.png';
import lgFieldImg from './components/SlideNav/images/lg-field-button.png';
import lgFieldActiveImg from './components/SlideNav/images/lg-field-button-active.png';
import lgForestImg from './components/SlideNav/images/lg-forest-button.png';
import lgForestActiveImg from './components/SlideNav/images/lg-forest-button-active.png';
import lgMountainImg from './components/SlideNav/images/lg-mountain-button.png';
import lgMountainActiveImg from './components/SlideNav/images/lg-mountain-button-active.png';
import mapImg from './components/SlideNav/images/mobile-map-button.png';
import mountainImg from './components/SlideNav/images/mountain-button.png';
import mountainActiveImg from './components/SlideNav/images/mountain-button-active.png';
import { SLIDE_ORDER } from './components/SlideNav/SlideNav';
import CoastContact from './slides/CoastContact/CoastContact';
// CoastContact images
import ccBilda from './slides/CoastContact/images/bilda.png';
import ccClouds from './slides/CoastContact/images/clouds.png';
import ccFlockOfPigeons from './slides/CoastContact/images/flock-of-pigeons.png';
import ccContent1 from './slides/CoastContact/images/IMG_7381.jpg';
import ccContent2 from './slides/CoastContact/images/IMG_7552.jpg';
import ccContent3 from './slides/CoastContact/images/IMG_8034.jpg';
import ccMainPic from './slides/CoastContact/images/main-pic.jpg';
import ccOverlay1 from './slides/CoastContact/images/main-pic-overlay-1.png';
import ccOverlay2 from './slides/CoastContact/images/main-pic-overlay-2.png';
import ccOverlay3 from './slides/CoastContact/images/main-pic-overlay-3.png';
import ccSoccerBall from './slides/CoastContact/images/soccer-ball.png';
import ForestWelcome from './slides/ForestWelcome/ForestWelcome';
// ForestWelcome images
import fwBackground from './slides/ForestWelcome/images/background.jpg';
import fwContent1 from './slides/ForestWelcome/images/content-1.jpg';
import fwContent2 from './slides/ForestWelcome/images/content-2.jpg';
import fwContent3 from './slides/ForestWelcome/images/content-3.jpg';
import fwLogo from './slides/ForestWelcome/images/logo.png';
import fwOverlay1 from './slides/ForestWelcome/images/overlay-1.png';
import fwOverlay2 from './slides/ForestWelcome/images/overlay-2.png';
import fwOverlay3 from './slides/ForestWelcome/images/overlay-3.png';
import fwSmallBird from './slides/ForestWelcome/images/small-bird.png';
import fwSmallDragon from './slides/ForestWelcome/images/small-dragon.png';
import fwSmallEagle from './slides/ForestWelcome/images/small-eagle.png';
import FrontDoor from './slides/FrontDoor/FrontDoor';
// FrontDoor images
import fdSmallBird from './slides/FrontDoor/images/small-bird.png';
import fdSmallCloud1 from './slides/FrontDoor/images/small-cloud-1.png';
import fdSmallCloud2 from './slides/FrontDoor/images/small-cloud-2.png';
import fdSmallFlock from './slides/FrontDoor/images/small-flock-of-birds.png';
import fdDoorBase from './slides/FrontDoor/images/the-door-cutout.jpg';
import fdOverlay1 from './slides/FrontDoor/images/the-door-cutout-overlay-1.png';
import fdOverlay2 from './slides/FrontDoor/images/the-door-cutout-overlay-2.png';
import fdOverlay3 from './slides/FrontDoor/images/the-door-cutout-overlay-3.png';
import fdOverlayHover from './slides/FrontDoor/images/the-door-cutout-overlay-hover.png';
// MountaintopInfo images
import miDragon from './slides/MountaintopInfo/images/dragon.png';
import miFlockOfBirds from './slides/MountaintopInfo/images/flock-of-birds.png';
import miFluffyClouds from './slides/MountaintopInfo/images/fluffy-clouds.png';
import miContent1 from './slides/MountaintopInfo/images/IMG_1029.jpg';
import miContent2 from './slides/MountaintopInfo/images/IMG_7916.jpg';
import miContent3 from './slides/MountaintopInfo/images/IMG_8492.jpg';
import miMainPic from './slides/MountaintopInfo/images/main-pic-cutout.jpg';
import miClouds1 from './slides/MountaintopInfo/images/main-pic-cutout-clouds-1.png';
import miClouds2 from './slides/MountaintopInfo/images/main-pic-cutout-clouds-2.png';
import miDetailOverlay1 from './slides/MountaintopInfo/images/main-pic-cutout-overlay-1.png';
import miDetailOverlay2 from './slides/MountaintopInfo/images/main-pic-cutout-overlay-2.png';
import miDetailOverlay3 from './slides/MountaintopInfo/images/main-pic-cutout-overlay-3.png';
import miSmoke1 from './slides/MountaintopInfo/images/main-pic-cutout-smoke-1.png';
import miSmoke2 from './slides/MountaintopInfo/images/main-pic-cutout-smoke-2.png';
import MountaintopInfo from './slides/MountaintopInfo/MountaintopInfo';
import PlainsProgram from './slides/PlainsProgram/PlainsProgram';

export type SlideId = 'front' | 'welcome' | 'info' | 'program' | 'contact';

const PRELOAD_ASSETS: string[] = [
  // SlideNav
  doorImg,
  doorActiveImg,
  forestImg,
  forestActiveImg,
  mountainImg,
  mountainActiveImg,
  fieldImg,
  fieldActiveImg,
  cityImg,
  cityActiveImg,
  mapImg,
  // MobileMapOverlay
  closeImg,
  lgDoorImg,
  lgDoorActiveImg,
  lgForestImg,
  lgForestActiveImg,
  lgMountainImg,
  lgMountainActiveImg,
  lgFieldImg,
  lgFieldActiveImg,
  lgCityImg,
  lgCityActiveImg,
  // FrontDoor
  fdSmallBird,
  fdSmallCloud1,
  fdSmallCloud2,
  fdSmallFlock,
  fdDoorBase,
  fdOverlay1,
  fdOverlay2,
  fdOverlay3,
  fdOverlayHover,
  // ForestWelcome
  fwBackground,
  fwContent1,
  fwContent2,
  fwContent3,
  fwLogo,
  fwOverlay1,
  fwOverlay2,
  fwOverlay3,
  fwSmallBird,
  fwSmallDragon,
  fwSmallEagle,
  // MountaintopInfo
  miDragon,
  miFlockOfBirds,
  miFluffyClouds,
  miContent1,
  miContent2,
  miContent3,
  miMainPic,
  miClouds1,
  miClouds2,
  miDetailOverlay1,
  miDetailOverlay2,
  miDetailOverlay3,
  miSmoke1,
  miSmoke2,
  // CoastContact
  ccBilda,
  ccClouds,
  ccFlockOfPigeons,
  ccContent1,
  ccContent2,
  ccContent3,
  ccMainPic,
  ccOverlay1,
  ccOverlay2,
  ccOverlay3,
  ccSoccerBall,
];

function App() {
  const [showLoader, setShowLoader] = useState(true);
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
        window.scrollTo(0, 0);

        // After 2s dipFrom on the new slide, finish transitioning
        setTimeout(() => {
          setTransitioning(false);
          setTransitionDirection(null);
          transitioningRef.current = false;
        }, 2000);
      }, 2000);
    },
    [activeSlide],
  );

  if (showLoader) {
    return (
      <LoadingScreen
        assets={PRELOAD_ASSETS}
        onDone={() => setShowLoader(false)}
      />
    );
  }

  const slideProps = { activeSlide, onNavigate, transitioning, transitionDirection, dipToActive };

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
}

export default App;
