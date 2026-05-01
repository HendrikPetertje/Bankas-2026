import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  anchorRect: DOMRect | null;
  children: ReactNode;
  visible: boolean;
}

export default function Tooltip({ anchorRect, children, visible }: TooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  useEffect(() => {
    if (!anchorRect || !visible || !tooltipRef.current) return;

    const tooltip = tooltipRef.current;
    const tooltipRect = tooltip.getBoundingClientRect();
    const padding = 8;

    // Default: below and centered on anchor
    let top = anchorRect.bottom + padding;
    let left = anchorRect.left + anchorRect.width / 2 - tooltipRect.width / 2;

    // Prevent going off right edge
    if (left + tooltipRect.width > window.innerWidth - padding) {
      left = window.innerWidth - tooltipRect.width - padding;
    }
    // Prevent going off left edge
    if (left < padding) {
      left = padding;
    }
    // If no room below, show above
    if (top + tooltipRect.height > window.innerHeight - padding) {
      top = anchorRect.top - tooltipRect.height - padding;
    }
    // Prevent going off top
    if (top < padding) {
      top = padding;
    }

    setPosition({ top, left });
  }, [anchorRect, visible]);

  if (!visible || !anchorRect) return null;

  return createPortal(
    <div
      ref={tooltipRef}
      className="fixed z-[200] rounded-lg bg-surface shadow-lg border border-highlight-med px-3 py-2 pointer-events-none"
      style={{ top: position.top, left: position.left }}
    >
      {children}
    </div>,
    document.body,
  );
}
