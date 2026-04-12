import type { SlideId } from '../../App';
import Slide from '../../components/Slide';

interface ForestWelcomeProps {
  activeSlide: SlideId;
  onNavigate: (target: SlideId) => void;
  transitioning: boolean;
  transitionDirection: 'forward' | 'backward' | null;
  dipToActive: boolean;
}

export default function ForestWelcome({
  activeSlide,
  onNavigate,
  transitioning,
  transitionDirection,
  dipToActive,
}: ForestWelcomeProps) {
  return (
    <Slide
      dipFrom="#ea9d34"
      dipTo="#f2e9e1"
      activeSlide={activeSlide}
      onNavigate={onNavigate}
      transitioning={transitioning}
      transitionDirection={transitionDirection}
      dipToActive={dipToActive}
      picture={<div className="p-8 text-center text-subtle">TODO: Forest Welcome image content</div>}
    >
      <div className="p-8 text-center text-subtle">TODO: Forest Welcome content</div>
    </Slide>
  );
}
