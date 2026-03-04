import { useEffect } from "react";
import AppBar from "./components/AppBar";
import GameArea from "./components/GameArea";
import ModeButtons from "./components/ModeButtons";
import Footer from "./components/Footer";
import { useGame } from "./hooks/useGame";
import { useTimer } from "./hooks/useTimer";

const TIMEATTACK_SECONDS = 60;

export default function App() {
  const { state, startMode, reset, inputArrow, gameOver, setFilter } = useGame();
  const timer = useTimer(TIMEATTACK_SECONDS);

  function handleStart(mode) {
    startMode(mode);
    if (mode === "timeattack") {
      timer.start();
    } else {
      timer.reset();
    }
  }

  function handleReset() {
    reset();
    timer.reset();
  }

  // Time attack: end game when timer hits 0
  useEffect(() => {
    if (state.mode === "timeattack" && timer.isExpired && state.status === "playing") {
      gameOver();
    }
  }, [timer.isExpired, state.mode, state.status, gameOver]);

  return (
    <div className="layout">
      <AppBar />
      <div className="contents">
        <div className="logo-area">
          <img src="/resource/logo.png" alt="Helldivers2 Stratagem Master Logo" />
        </div>
        <GameArea
          state={state}
          inputArrow={inputArrow}
          secondsLeft={timer.secondsLeft}
          totalSeconds={TIMEATTACK_SECONDS}
          onReset={handleReset}
          onStart={handleStart}
        />
        <ModeButtons
          gameState={state}
          onStart={handleStart}
          onReset={handleReset}
          secondsLeft={timer.secondsLeft}
          onFilterChange={setFilter}
        />
        <Footer />
      </div>
    </div>
  );
}
