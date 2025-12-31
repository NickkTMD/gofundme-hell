import { useReducer, useEffect, useMemo, useState, useRef } from "react";
import {
  getShuffledCampaigns,
  getPlaceholderImage,
  type Campaign,
} from "../data/campaigns";
import CampaignCard from "../components/game/CampaignCard";
import ActionButtons from "../components/game/ActionButtons";
import NavBar from "../components/NavBar";
import { CheckCircle, XCircle, Trophy, RotateCcw, Share2, Home } from "lucide-react";
import { Link } from "react-router-dom";
const TOTAL_ROUNDS = 8;

const medicalDebtComparison = {
  us: {
    amount: 220_000_000_000,
    flag: "🇺🇸",
  },
  otherCountries: [
    { name: "United Kingdom", flag: "🇬🇧" },
    { name: "Canada", flag: "🇨🇦" },
    { name: "France", flag: "🇫🇷" },
    { name: "Germany", flag: "🇩🇪" },
    { name: "Australia", flag: "🇦🇺" },
    { name: "Norway", flag: "🇳🇴" },
    { name: "Sweden", flag: "🇸🇪" },
    { name: "Denmark", flag: "🇩🇰" },
    { name: "Finland", flag: "🇫🇮" },
    { name: "Spain", flag: "🇪🇸" },
    { name: "Italy", flag: "🇮🇹" },
    { name: "Portugal", flag: "🇵🇹" },
    { name: "Netherlands", flag: "🇳🇱" },
    { name: "Belgium", flag: "🇧🇪" },
    { name: "Austria", flag: "🇦🇹" },
    { name: "Switzerland", flag: "🇨🇭" },
    { name: "Japan", flag: "🇯🇵" },
    { name: "South Korea", flag: "🇰🇷" },
  ],
};

// Import america images for background
import img1 from "../assets/america/1.jpg";
import img2 from "../assets/america/2.jpg";
import img3 from "../assets/america/3.jpg";
import img4 from "../assets/america/4.jpg";
import img5 from "../assets/america/5.jpg";
import img6 from "../assets/america/6.jpg";
import img7 from "../assets/america/7.jpg";
import img8 from "../assets/america/8.jpg";
import img9 from "../assets/america/9.jpg";
import img10 from "../assets/america/10.jpg";
import img11 from "../assets/america/11.jpg";
import img12 from "../assets/america/12.jpg";
import img13 from "../assets/america/13.jpg";
import img14 from "../assets/america/14.jpg";
import img15 from "../assets/america/15.jpg";
import img16 from "../assets/america/16.jpg";
import img17 from "../assets/america/17.jpg";
import img18 from "../assets/america/18.jpg";
import img19 from "../assets/america/19.jpg";
import img20 from "../assets/america/20.webp";
import img21 from "../assets/america/21.avif";
import img22 from "../assets/america/22.avif";
import img23 from "../assets/america/23.webp";
import img24 from "../assets/america/24.webp";
import img25 from "../assets/america/25.avif";
import img26 from "../assets/america/26.jpg";

const allImages = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
  img19,
  img20,
  img21,
  img22,
  img23,
  img24,
  img25,
  img26,
];

function getRandomImages(count: number) {
  const shuffled = [...allImages].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

interface GameState {
  campaigns: Campaign[];
  currentIndex: number;
  totalSeen: number;
  phase: "guessing" | "showing_result" | "animating" | "game_over";
  userGuess: boolean | null;
  isCorrect: boolean | null;
  correctCount: number;
  incorrectCount: number;
  totalRaised: number;
}

type GameAction =
  | { type: "MAKE_GUESS"; guess: boolean }
  | { type: "START_SWIPE" }
  | { type: "NEXT_CAMPAIGN" }
  | { type: "RESET_GAME" };

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "MAKE_GUESS": {
      const currentCampaign = state.campaigns[state.currentIndex];
      const isCorrect = action.guess === currentCampaign.fundedSuccessfully;
      const addToRaised = currentCampaign.fundedSuccessfully
        ? currentCampaign.goal
        : 0;
      return {
        ...state,
        phase: "showing_result",
        userGuess: action.guess,
        isCorrect,
        correctCount: state.correctCount + (isCorrect ? 1 : 0),
        incorrectCount: state.incorrectCount + (isCorrect ? 0 : 1),
        totalRaised: state.totalRaised + addToRaised,
      };
    }
    case "START_SWIPE":
      return {
        ...state,
        phase: "animating",
      };
    case "NEXT_CAMPAIGN": {
      // Check if game is over (completed all rounds)
      if (state.totalSeen >= TOTAL_ROUNDS) {
        return {
          ...state,
          phase: "game_over",
        };
      }
      const nextIndex = state.currentIndex + 1;
      const newTotalSeen = state.totalSeen + 1;
      // Loop back and reshuffle when we reach the end
      if (nextIndex >= state.campaigns.length) {
        return {
          ...state,
          campaigns: getShuffledCampaigns(),
          currentIndex: 0,
          totalSeen: newTotalSeen,
          phase: "guessing",
          userGuess: null,
          isCorrect: null,
        };
      }
      return {
        ...state,
        currentIndex: nextIndex,
        totalSeen: newTotalSeen,
        phase: "guessing",
        userGuess: null,
        isCorrect: null,
      };
    }
    case "RESET_GAME":
      return {
        campaigns: getShuffledCampaigns(),
        currentIndex: 0,
        totalSeen: 1,
        phase: "guessing",
        userGuess: null,
        isCorrect: null,
        correctCount: 0,
        incorrectCount: 0,
        totalRaised: 0,
      };
    default:
      return state;
  }
}

function getInitialState(): GameState {
  return {
    campaigns: getShuffledCampaigns(),
    currentIndex: 0,
    totalSeen: 1,
    phase: "guessing",
    userGuess: null,
    isCorrect: null,
    correctCount: 0,
    incorrectCount: 0,
    totalRaised: 0,
  };
}

function formatRaised(amount: number): string {
  if (amount >= 1000000) {
    const millions = amount / 1000000;
    return `$${millions >= 10 ? Math.round(millions) : millions.toFixed(1)}M`;
  }
  if (amount >= 1000) {
    const thousands = amount / 1000;
    return `$${
      thousands >= 10 ? Math.round(thousands) : thousands.toFixed(1)
    }k`;
  }
  return `$${amount}`;
}

const entrepreneurs = [
  {
    name: "Elon Musk",
    netWorth: 730_000_000_000,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/220px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
  },
  {
    name: "Jeff Bezos",
    netWorth: 244_000_000_000,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_%2839074799225%29_%28cropped%29.jpg/220px-Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_%2839074799225%29_%28cropped%29.jpg",
  },
  {
    name: "Mark Zuckerberg",
    netWorth: 228_000_000_000,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/220px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg",
  },
  {
    name: "Larry Ellison",
    netWorth: 247_000_000_000,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT27uPS33zQ_Guzg1Y2X72VYZpCd31QTfPSsg&s",
  },
  {
    name: "Larry Page",
    netWorth: 257_000_000_000,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Larry_Page_in_the_European_Parliament%2C_17.06.2009_%28cropped%29.jpg/220px-Larry_Page_in_the_European_Parliament%2C_17.06.2009_%28cropped%29.jpg",
  },
];

export default function Game() {
  const [state, dispatch] = useReducer(gameReducer, null, getInitialState);
  const bgImages = useMemo(() => getRandomImages(12), []);

  // Swipe handling - declare before useEffects that use it
  const [swipeOffset, setSwipeOffset] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 100;

  // Animated net worths - start 1% lower, only go up
  const [netWorths, setNetWorths] = useState(
    entrepreneurs.map((e) => e.netWorth * 0.99)
  );
  const [usDebt, setUsDebt] = useState(medicalDebtComparison.us.amount * 0.99);

  useEffect(() => {
    const interval = setInterval(() => {
      setNetWorths((prev) =>
        prev.map((worth) => {
          // Random increase between 0.001% and 0.005%
          const change = worth * (Math.random() * 0.00004 + 0.00001);
          return worth + change;
        })
      );
      setUsDebt((prev) => {
        const change = prev * (Math.random() * 0.00004 + 0.00001);
        return prev + change;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const currentCampaign = state.campaigns[state.currentIndex];

  // Preload next 3 images
  useEffect(() => {
    const preloadCount = 3;
    for (let i = 1; i <= preloadCount; i++) {
      const nextIndex = state.currentIndex + i;
      if (nextIndex < state.campaigns.length) {
        const campaign = state.campaigns[nextIndex];
        const img = new Image();
        img.src = campaign.imageUrl || getPlaceholderImage(campaign.id);
      }
    }
  }, [state.currentIndex, state.campaigns]);

  // Phase transitions with timers
  useEffect(() => {
    if (state.phase === "showing_result") {
      // Show result for 1.5s, then transition
      const timer = setTimeout(() => {
        // If swiped, skip animation and go directly to next
        if (swipeOffset !== 0) {
          dispatch({ type: "NEXT_CAMPAIGN" });
        } else {
          dispatch({ type: "START_SWIPE" });
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
    if (state.phase === "animating") {
      // After swipe animation (0.3s), go to next card
      const timer = setTimeout(() => {
        dispatch({ type: "NEXT_CAMPAIGN" });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [state.phase, swipeOffset]);

  const handleGuess = (funded: boolean) => {
    dispatch({ type: "MAKE_GUESS", guess: funded });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (state.phase !== "guessing") return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (state.phase !== "guessing" || touchStartX.current === null) return;
    const diff = e.touches[0].clientX - touchStartX.current;
    setSwipeOffset(diff);
  };

  const handleTouchEnd = () => {
    if (state.phase !== "guessing" || touchStartX.current === null) return;
    if (Math.abs(swipeOffset) > SWIPE_THRESHOLD) {
      // Keep the card swiped out, don't reset offset
      handleGuess(swipeOffset > 0);
    } else {
      // Only reset if swipe wasn't enough
      setSwipeOffset(0);
    }
    touchStartX.current = null;
  };

  // Reset swipe offset when campaign changes
  useEffect(() => {
    setSwipeOffset(0);
  }, [state.currentIndex]);

  const getAnimationClass = () => {
    if (state.phase !== "animating") return "";
    return state.userGuess ? "card-exit-right" : "card-exit-left";
  };

  const getSwipeStyle = (): React.CSSProperties => {
    // During showing_result after a swipe, animate card off screen
    if (state.phase === "showing_result" && swipeOffset !== 0) {
      const direction = swipeOffset > 0 ? 1 : -1;
      return {
        transform: `translateX(${direction * 150}%) rotate(${
          direction * 15
        }deg)`,
        transition: "transform 0.3s ease-out",
      };
    }
    // During active swiping
    if (state.phase === "guessing" && swipeOffset !== 0) {
      const rotation = swipeOffset * 0.05;
      return {
        transform: `translateX(${swipeOffset}px) rotate(${rotation}deg)`,
        transition: "none",
      };
    }
    return {};
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center md:px-4 md:py-8 relative overflow-hidden">
      {/* Collage background - desktop only */}
      <div className="absolute inset-0 hidden md:grid grid-cols-4 grid-rows-3 gap-1">
        {bgImages.map((img, i) => (
          <div key={i} className="overflow-hidden">
            <img src={img} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Blur/dark overlay - desktop only with gradient column */}
      <div
        className="absolute inset-0 backdrop-blur-sm hidden md:block"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)",
        }}
      ></div>
      <div
        className="absolute inset-0 bg-black/80 hidden md:block"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)",
        }}
      ></div>

      {/* Nav bar */}
      <NavBar />

      {/* Scoreboard - desktop only, fixed bottom left */}
      <div className="hidden md:flex fixed bottom-6 left-6 z-20 flex-col gap-2">
        <div className="bg-black/60 backdrop-blur-sm rounded-xl px-4 py-2 text-center">
          <div className="text-3xl font-bold text-white">
            {state.correctCount || 0}/
            {(state.correctCount || 0) + (state.incorrectCount || 0)}
          </div>
          <div className="text-xs text-gray-400 uppercase tracking-wide">
            Score
          </div>
        </div>
        <div className="bg-black/60 backdrop-blur-sm rounded-xl px-4 py-2 text-center">
          <div className="text-3xl font-bold text-white">
            {formatRaised(state.totalRaised || 0)}
          </div>
          <div className="text-xs text-gray-400 uppercase tracking-wide">
            Total Raised
          </div>
        </div>
      </div>

      {/* Top Entrepreneurs & Medical Debt - desktop only, fixed bottom right */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-20 flex-col gap-2">
        {(() => {
          const items = [
            ...entrepreneurs.map((person, i) => ({
              type: "person" as const,
              name: person.name,
              img: person.img,
              value: netWorths[i],
            })),
            {
              type: "usDebt" as const,
              name: "Total US Medical Debt",
              value: usDebt,
            },
          ].sort((a, b) => b.value - a.value);

          return items.map((item) =>
            item.type === "person" ? (
              <div
                key={item.name}
                className="bg-black/60 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-3"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <div className="text-white text-base font-medium">
                    {item.name}
                  </div>
                  <div className="text-green-400 text-base font-mono">
                    ${(item.value / 1_000_000_000).toFixed(1)}B
                  </div>
                </div>
              </div>
            ) : (
              <div
                key="usDebt"
                className="bg-black/60 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-3xl">
                  {medicalDebtComparison.us.flag}
                </div>
                <div className="text-left">
                  <div className="text-white text-base font-medium">
                    {item.name}
                  </div>
                  <div className="text-red-400 text-base font-mono">
                    ${(item.value / 1_000_000_000).toFixed(1)}B
                  </div>
                </div>
              </div>
            )
          );
        })()}

        {/* 18 Countries Combined */}
        <div className="bg-black/60 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-3">
          <div className="flex flex-wrap w-12 h-12 content-center gap-0.5">
            {medicalDebtComparison.otherCountries.map((country) => (
              <span
                key={country.name}
                className="text-[10px] leading-none"
                title={country.name}
              >
                {country.flag}
              </span>
            ))}
          </div>
          <div className="text-left">
            <div className="text-white text-xs font-medium max-w-[160px]">
              18 Developed Countries' Combined Medical Debt
            </div>
            <div className="text-green-400 text-base font-mono">$0.0B</div>
          </div>
        </div>
      </div>

      {/* Card container */}
      <div className="relative w-full max-w-xl flex-1 min-h-0 flex justify-center z-10">
        <div
          className="relative w-full h-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={getSwipeStyle()}
        >
          <CampaignCard
            key={currentCampaign.id}
            campaign={currentCampaign}
            animationClass={getAnimationClass()}
            number={state.totalSeen}
            overlay={
              state.phase === "showing_result" ? (
                <div className="absolute inset-x-0 bottom-0 z-20 bg-black/90 md:rounded-b-3xl p-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {state.isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-400" />
                    )}
                    <span className={`text-xl ${state.isCorrect ? "text-green-400" : "text-red-400"}`}>
                      {state.isCorrect ? "Correct!" : "Wrong!"}
                    </span>
                  </div>
                  <p className="text-white text-2xl md:text-3xl text-left">
                    {currentCampaign.name}'s {currentCampaign.idea}{" "}
                    <span className={currentCampaign.fundedSuccessfully ? "text-green-400" : "text-red-400"}>
                      {currentCampaign.fundedSuccessfully ? "was funded" : "was not funded"}
                    </span>
                  </p>
                </div>
              ) : undefined
            }
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="z-10 flex flex-col items-center mt-4 md:mt-6">
        <span className="text-white/80 text-sm font-medium mb-0">
          Did it get funded?
        </span>
        <ActionButtons
          onGuess={handleGuess}
          disabled={state.phase !== "guessing"}
        />
      </div>

      {/* Scoreboard - mobile only, below buttons */}
      <div className="flex md:hidden z-10 gap-3 mt-4">
        <div className="bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2 text-center">
          <div className="text-2xl font-bold text-white">
            {state.correctCount || 0}/
            {(state.correctCount || 0) + (state.incorrectCount || 0)}
          </div>
          <div className="text-xs text-gray-400 uppercase tracking-wide">
            Score
          </div>
        </div>
        <div className="bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2 text-center">
          <div className="text-2xl font-bold text-white">
            {formatRaised(state.totalRaised || 0)}
          </div>
          <div className="text-xs text-gray-400 uppercase tracking-wide">
            Total Raised
          </div>
        </div>
      </div>

      {/* Game Over Modal */}
      {state.phase === "game_over" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-3xl p-8 mx-4 max-w-md w-full text-center shadow-2xl border border-gray-700">
            <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-2">Game Over!</h2>
            <p className="text-gray-400 mb-6">
              You completed {TOTAL_ROUNDS} rounds
            </p>

            <div className="flex justify-center gap-6 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400">
                  {state.correctCount}
                </div>
                <div className="text-sm text-gray-400">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-400">
                  {state.incorrectCount}
                </div>
                <div className="text-sm text-gray-400">Wrong</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white">
                  {formatRaised(state.totalRaised)}
                </div>
                <div className="text-sm text-gray-400">Raised</div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => dispatch({ type: "RESET_GAME" })}
                className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                Play Again
              </button>
              <button
                onClick={() => {
                  const text = `I scored ${state.correctCount}/${TOTAL_ROUNDS} on GoFundMe Hell! Can you do better?`;
                  if (navigator.share) {
                    navigator.share({ text, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(
                      text + " " + window.location.href
                    );
                    alert("Copied to clipboard!");
                  }
                }}
                className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-xl transition-colors"
              >
                <Share2 className="w-5 h-5" />
                Share Score
              </button>
              <Link
                to="/"
                className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-colors"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
