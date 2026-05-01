import wateringCan from './images/button-images/watering-can.png';

export default function LoadingOverlay() {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-edge-light/95">
      <img
        src={wateringCan}
        alt=""
        className="w-20 h-20 animate-bounce"
      />
      <p className="font-display text-lg text-text">Laddar...</p>
    </div>
  );
}
