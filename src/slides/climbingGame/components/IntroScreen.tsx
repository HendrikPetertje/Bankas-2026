interface IntroScreenProps {
  onContinue: () => void;
}

export default function IntroScreen({ onContinue }: IntroScreenProps) {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-16 text-center text-text">
      <div className="max-w-md space-y-4">
        <h2 className="font-display text-2xl text-pine">Bergsklättringen</h2>

        <p className="font-body text-base leading-relaxed">
          Du och ditt lag ska klättra upp på berget. Det ser väldigt högt ut! Först börjar det med skogsbeklädda
          utsprång, sedan små utsprång och plattformar av sten, och bakom molnen kan man till och med skymta snö!
        </p>

        <p className="font-body text-base leading-relaxed">
          En vänlig drake landar bredvid er och förklarar att även om han inte kan bära er alla uppåt, kan han hjälpa
          till att fästa rep på de svåraste ställena så att ni kan klättra. Han flyger iväg med repet från din ryggsäck.
        </p>

        <p className="font-body text-sm text-muted italic">
          (Använd joysticken på mobil eller pekskärm, eller piltangenter och mellanslag på tangentbord)
        </p>

        <p className="font-body text-base font-semibold">Det är dags att börja klättra — vem ska gå först?</p>

        <button
          type="button"
          className="mt-4 rounded-lg bg-pine px-6 py-3 font-body text-base text-white transition-colors hover:bg-foam"
          onClick={onContinue}
        >
          Fortsätt
        </button>
      </div>
    </div>
  );
}
