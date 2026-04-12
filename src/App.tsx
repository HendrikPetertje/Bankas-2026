import { useState } from 'react';

type SlideId = 'front' | 'welcome' | 'info' | 'program' | 'contact';

function App() {
  const [activeSlide] = useState<SlideId>('front');

  const renderSlide = () => {
    switch (activeSlide) {
      case 'front':
        return <div>front</div>;
      case 'welcome':
        return <div>welcome</div>;
      case 'info':
        return <div>info</div>;
      case 'program':
        return <div>program</div>;
      case 'contact':
        return <div>contact</div>;
      default: {
        const _exhaustive: never = activeSlide;
        return _exhaustive;
      }
    }
  };

  return renderSlide();
}

export default App;
