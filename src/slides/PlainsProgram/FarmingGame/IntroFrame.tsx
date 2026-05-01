import BlueButton from '../../../components/BlueButton/BlueButton';
import introImage from './images/intro-image.png';

interface IntroFrameProps {
  onStart: () => void;
}

export default function IntroFrame({ onStart }: IntroFrameProps) {
  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <div className="max-w-md flex flex-col gap-4 text-center">
        <p className="font-body text-lg text-text leading-relaxed">
          Du har kommit till slätterna som leder upp mot stadslottet. Tält är utspridda över området, andra barn och
          ledare verkar också ha anlänt till den här världen!
        </p>
        <p className="font-body text-lg text-text leading-relaxed">
          Det är dags att börja tänka på middag, men din packning har inte så mycket mat. En gammal butter bonde går
          förbi och börjar förklara att jorden runt staden alltid har varit lite magisk. Den är så rik att växter kan
          växa på bara timmar eller ibland till och med minuter!
        </p>
        <p className="font-body text-lg text-text leading-relaxed">
          Han ger dig några frön och vinkar mot några odlingslotter som förberetts. Du ser nu att nästan varje tält har
          en liten odling bredvid sig och att ledare och barn sköter sina grödor medan de sitter och slappnar av framför
          sina tält.
        </p>
        <p className="font-body text-lg text-text leading-relaxed italic">
          Kanske är en liten odling inte så dumt ändå!
        </p>
        <div className="flex justify-center mt-2">
          <BlueButton onClick={onStart}>Starta spelet</BlueButton>
        </div>
      </div>
      <img
        src={introImage}
        alt=""
        className="w-48 opacity-80 object-contain"
      />
    </div>
  );
}
