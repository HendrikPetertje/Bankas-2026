import cleaningFork from './images/button-images/cleaning-fork.png';
import harvestingShears from './images/button-images/harvesting-shears.png';
import seedPackets from './images/button-images/seed-packets.png';
import wateringCan from './images/button-images/watering-can.png';
import type { ToolType } from './types';

interface ToolBarProps {
  activeTool: ToolType;
  onSelectTool: (tool: ToolType) => void;
}

const tools: { id: ToolType; src: string; label: string }[] = [
  { id: 'seed', src: seedPackets, label: 'Såda' },
  { id: 'water', src: wateringCan, label: 'Vattna' },
  { id: 'clean', src: cleaningFork, label: 'Rengöra' },
  { id: 'harvest', src: harvestingShears, label: 'Skörda' },
];

export default function ToolBar({ activeTool, onSelectTool }: ToolBarProps) {
  return (
    <div className="grid grid-cols-4 w-full">
      {tools.map((tool) => (
        <button
          key={tool.id}
          type="button"
          className="flex flex-col items-center gap-1 py-3 cursor-pointer border-0 transition-colors"
          style={{
            backgroundColor: activeTool === tool.id ? 'var(--color-highlight-low)' : 'transparent',
            borderTop: activeTool === tool.id ? '2px solid var(--color-foam)' : '2px solid transparent',
          }}
          onClick={() => onSelectTool(activeTool === tool.id ? null : tool.id)}
        >
          <img
            src={tool.src}
            alt={tool.label}
            className="w-10 h-10 object-contain"
          />
          <span className="font-body text-xs text-text">{tool.label}</span>
        </button>
      ))}
    </div>
  );
}

// Export cursor URLs for use in the modal container
export const TOOL_CURSORS: Record<string, string> = {
  seed: seedPackets,
  water: wateringCan,
  clean: cleaningFork,
  harvest: harvestingShears,
};
