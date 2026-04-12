import type { SlideId } from '../../App';
import Slide from '../../components/Slide';

interface MountaintopInfoProps {
  activeSlide: SlideId;
  onNavigate: (target: SlideId) => void;
  transitioning: boolean;
  transitionDirection: 'forward' | 'backward' | null;
  dipToActive: boolean;
}

export default function MountaintopInfo({
  activeSlide,
  onNavigate,
  transitioning,
  transitionDirection,
  dipToActive,
}: MountaintopInfoProps) {
  return (
    <Slide
      dipFrom="#f2e9e1"
      dipTo="#f2e9e1"
      activeSlide={activeSlide}
      onNavigate={onNavigate}
      transitioning={transitioning}
      transitionDirection={transitionDirection}
      dipToActive={dipToActive}
      picture={<div className="p-8 text-center text-subtle">TODO: Mountaintop Info image content</div>}
    >
      <div className="p-8 text-center text-subtle">TODO: Mountaintop Info content</div>
    </Slide>
  );
}
