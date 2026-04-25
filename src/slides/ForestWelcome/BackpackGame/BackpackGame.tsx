import { useCallback, useMemo, useState } from 'react';
import BlueButton from '../../../components/BlueButton/BlueButton';
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';
import card11 from './images/1-1.jpg';
import card12 from './images/1-2.jpg';
import card21 from './images/2-1.jpg';
import card22 from './images/2-2.jpg';
import card31 from './images/3-1.jpg';
import card32 from './images/3-2.jpg';
import card41 from './images/4-1.jpg';
import card42 from './images/4-2.jpg';
import card51 from './images/5-1.jpg';
import card52 from './images/5-2.jpg';
import card61 from './images/6-1.jpg';
import card62 from './images/6-2.jpg';
import card71 from './images/7-1.jpg';
import card72 from './images/7-2.jpg';
import card81 from './images/8-1.jpg';
import card82 from './images/8-2.jpg';
import backpackEnd from './images/backpack-end.png';
import backpackStart from './images/backpack-start.png';
import cardBack from './images/card-back.jpg';
import checkmark from './images/checkmark.png';

const PAIRS: [string, string][] = [
  [card11, card12],
  [card21, card22],
  [card31, card32],
  [card41, card42],
  [card51, card52],
  [card61, card62],
  [card71, card72],
  [card81, card82],
];

const ALL_GAME_ASSETS = [backpackStart, backpackEnd, cardBack, ...PAIRS.flat()];

interface Card {
  id: number;
  pairIndex: number;
  image: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function createCards(): Card[] {
  const cards: Card[] = [];
  let id = 0;
  for (let pairIndex = 0; pairIndex < PAIRS.length; pairIndex++) {
    cards.push({ id: id++, pairIndex, image: PAIRS[pairIndex][0] });
    cards.push({ id: id++, pairIndex, image: PAIRS[pairIndex][1] });
  }
  return shuffle(cards);
}

type Phase = 'intro' | 'playing' | 'complete';

export default function BackpackGame() {
  const [loaded, setLoaded] = useState(false);
  const [phase, setPhase] = useState<Phase>('intro');
  const [cards, setCards] = useState<Card[]>(createCards);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [attempts, setAttempts] = useState(0);
  const [lockBoard, setLockBoard] = useState(false);

  const assets = useMemo(() => ALL_GAME_ASSETS, []);

  const handleReset = useCallback(() => {
    setCards(createCards());
    setFlipped([]);
    setMatched(new Set());
    setAttempts(0);
    setLockBoard(false);
    setPhase('intro');
  }, []);

  const handleCardClick = useCallback(
    (cardId: number) => {
      if (lockBoard) return;
      if (matched.has(cardId)) return;
      if (flipped.includes(cardId)) return;

      const newFlipped = [...flipped, cardId];
      setFlipped(newFlipped);

      if (newFlipped.length === 2) {
        setAttempts((a) => a + 1);
        const [firstId, secondId] = newFlipped;
        const first = cards.find((c) => c.id === firstId);
        const second = cards.find((c) => c.id === secondId);

        if (first && second && first.pairIndex === second.pairIndex) {
          // Match found
          const newMatched = new Set(matched);
          newMatched.add(firstId);
          newMatched.add(secondId);
          setMatched(newMatched);
          setFlipped([]);
          // Check for game completion
          if (newMatched.size === cards.length) {
            setPhase('complete');
          }
        } else {
          // No match — flip back after delay
          setLockBoard(true);
          setTimeout(() => {
            setFlipped([]);
            setLockBoard(false);
          }, 800);
        }
      }
    },
    [cards, flipped, matched, lockBoard],
  );

  if (!loaded) {
    return (
      <LoadingScreen
        assets={assets}
        onDone={() => setLoaded(true)}
        isGame
      />
    );
  }

  if (phase === 'intro') {
    return (
      <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-16 text-center text-text">
        <img
          src={backpackStart}
          alt=""
          className="pointer-events-none absolute right-6 bottom-6 w-64 opacity-30"
        />
        <p className="max-w-md font-body text-sm leading-relaxed md:text-[length:1rem]">
          Du har hamnat i en helt ny värld. I fjärran ser du ett stort berg. Du och dina vänner bestämmer er för att
          utforska den här världen tillsammans.
        </p>
        <p className="mt-4 max-w-md font-body text-sm leading-relaxed md:text-[length:1rem]">
          Men för att göra det behöver ni lite utrustning.
        </p>
        <p className="mt-4 max-w-md font-body text-sm leading-relaxed md:text-[length:1rem]">
          En vänlig troll kommer fram och blir förvånad över era annorlunda t-shirts, jackor och telefoner. Han berättar
          att när den märkliga dörren bakom er öppnades, dök det plötsligt upp massor av föremål runt om i skogen. De
          flesta av dessa föremål separerades dock när de kom in i den här världen.
        </p>
        <p className="mt-4 max-w-md font-body text-sm leading-relaxed md:text-[length:1rem]">
          Varje föremål i skogen hör ihop med ett annat föremål i skogen. Hitta rätt kombinationer snabbt — att bestiga
          berget framför er är förmodligen ingen bra idé om det blir mörkt!
        </p>
        <div className="mt-8">
          <BlueButton onClick={() => setPhase('playing')}>Starta spelet</BlueButton>
        </div>
      </div>
    );
  }

  if (phase === 'complete') {
    return (
      <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-16 text-center text-text">
        <img
          src={backpackEnd}
          alt=""
          className="pointer-events-none absolute right-6 bottom-6 w-64 opacity-30"
        />
        <p className="max-w-md font-body text-[length:1rem] leading-relaxed md:text-[length:1.125rem]">
          Du hittade alla kombinationer och din ryggsäck är full och redo för resan!
        </p>
        <p className="mt-4 max-w-md font-body text-sm md:text-[length:1rem]">
          Du hittade alla kombinationer på{' '}
          <span className="text-[length:1.125rem] font-bold md:text-[length:1.25rem]">{attempts}</span> försök
        </p>
        <p className="mt-4 max-w-md font-body text-sm leading-relaxed md:text-[length:1rem]">
          Låt oss fortsätta resan och bestiga berget så att vi kan få en bättre utsikt över den här världen!
        </p>
        <div className="mt-8">
          <BlueButton onClick={handleReset}>Försök igen</BlueButton>
        </div>
      </div>
    );
  }

  // Playing phase — card grid
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-16">
      <div className="grid w-full max-w-xl grid-cols-4 gap-2 md:gap-3">
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.id) || matched.has(card.id);
          const isMatched = matched.has(card.id);
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => handleCardClick(card.id)}
              className="relative w-full cursor-pointer overflow-hidden rounded-lg border-0 bg-transparent p-0"
            >
              <img
                src={cardBack}
                alt="Kort"
                draggable={false}
                className="pointer-events-none block h-full w-full rounded-lg object-cover transition-opacity duration-300"
                style={{ opacity: isFlipped ? 0 : 1 }}
              />
              <img
                src={isFlipped ? card.image : cardBack}
                alt="Kort"
                draggable={false}
                className="pointer-events-none absolute inset-0 h-full w-full rounded-lg object-cover transition-opacity duration-300"
                style={{ opacity: isFlipped ? 1 : 0 }}
              />
              {isMatched && (
                <img
                  src={checkmark}
                  alt="Matchad"
                  className="absolute right-1 bottom-1 h-6 w-6 drop-shadow md:h-8 md:w-8"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
