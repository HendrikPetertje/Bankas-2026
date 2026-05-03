// registration opens 3 may at 20:00 CET
const REGISTRATION_OPENS = new Date('2024-05-03T20:00:00+02:00');
const REGISTRATION_URL = import.meta.env.VITE_REGISTRATION_URL as string;

export default function RegistrationBanner() {
  const isOpen = new Date() >= REGISTRATION_OPENS;

  return (
    <div className="z-20 w-full max-w-2xl px-8 py-2 mb-6">
      <div className="rotate-[3deg] bg-white border-t-2 border-b-2 border-gold px-6 py-3 text-center">
        {isOpen ? (
          <a
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-2xl text-text hover:text-pine transition-colors"
          >
            Anmäl dig här nu
          </a>
        ) : (
          <p className="font-display text-2xl text-text">Anmälan öppnar kl 20:00 den 3 maj</p>
        )}
      </div>
    </div>
  );
}
