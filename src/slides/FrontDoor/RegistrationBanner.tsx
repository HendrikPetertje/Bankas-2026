const REGISTRATION_OPENS = new Date(2026, 4, 3, 20, 0, 0);

export default function RegistrationBanner() {
  const isOpen = new Date() >= REGISTRATION_OPENS;

  return (
    <div className="z-20 w-full max-w-2xl px-8 py-2 mb-6">
      <div className="rotate-[3deg] bg-white border-t-2 border-b-2 border-gold px-6 py-3 text-center">
        {isOpen ? (
          <a
            href="https://www.ecclisify.com/form/baptistsundsvall/lageranmalan26"
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
