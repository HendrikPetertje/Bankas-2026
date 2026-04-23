import type { ReactNode } from 'react';
import buttonBg from './button-background.png';
import buttonLeft from './button-left.png';
import buttonRight from './button-right.png';

interface BlueButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export default function BlueButton({ children, onClick }: BlueButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative inline-flex items-stretch cursor-pointer border-0 bg-transparent p-0 transition-opacity duration-150 hover:opacity-85 active:opacity-70"
    >
      <img
        src={buttonLeft}
        alt=""
        className="block h-auto w-auto"
        draggable={false}
      />
      <span
        className="flex items-center justify-center px-4 font-display text-base text-white whitespace-nowrap md:text-lg"
        style={{
          backgroundImage: `url(${buttonBg})`,
          backgroundSize: 'auto 100%',
          backgroundRepeat: 'repeat-x',
        }}
      >
        {children}
      </span>
      <img
        src={buttonRight}
        alt=""
        className="block h-auto w-auto"
        draggable={false}
      />
    </button>
  );
}
