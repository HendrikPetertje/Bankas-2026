import type { SlideId } from '../../App';
import Slide from '../../components/Slide';

interface PlainsProgramProps {
  activeSlide: SlideId;
  onNavigate: (target: SlideId) => void;
  transitioning: boolean;
  transitionDirection: 'forward' | 'backward' | null;
  dipToActive: boolean;
}

export default function PlainsProgram({
  activeSlide,
  onNavigate,
  transitioning,
  transitionDirection,
  dipToActive,
}: PlainsProgramProps) {
  return (
    <Slide
      dipFrom="#f2e9e1"
      dipTo="#f2e9e1"
      activeSlide={activeSlide}
      onNavigate={onNavigate}
      transitioning={transitioning}
      transitionDirection={transitionDirection}
      dipToActive={dipToActive}
      picture={<div className="p-8 text-center text-subtle">TODO: Plains Program image content</div>}
    >
      <div className="p-8 text-center text-subtle">TODO: Plains Program content</div>
    </Slide>
  );
}
