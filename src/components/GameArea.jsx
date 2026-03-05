import { useEffect, useRef, useState } from "react";
import ArrowRow from "./ArrowRow";
import ParticleEffect from "./ParticleEffect";
import { useLang } from "../i18n";
import ArrowUp    from "../assets/arrows/arrow-up.svg?react";
import ArrowDown  from "../assets/arrows/arrow-down.svg?react";
import ArrowLeft  from "../assets/arrows/arrow-left.svg?react";
import ArrowRight from "../assets/arrows/arrow-right.svg?react";

export default function GameArea({ state, inputArrow, secondsLeft, totalSeconds, onReset, onStart }) {
  const { lang, t } = useLang();
  const { mode, status, current, progress, score } = state;

  const [enterKey, setEnterKey] = useState(0);
  const prevIdRef = useRef(null);

  useEffect(() => {
    if (current?.id !== prevIdRef.current) {
      prevIdRef.current = current?.id;
      setEnterKey(k => k + 1);
    }
  }, [current?.id]);

  if (status === "idle") {
    return (
      <div className="game-area game-area--idle">
        <p className="idle-prompt">{t("startPrompt")}</p>
      </div>
    );
  }

  if (status === "gameover") {
    return (
      <>
      <ParticleEffect />
      <div className="game-area game-area--gameover">
        <div className="gameover-info">
          <p className="gameover-label">{t("gameOver")}</p>
          <p className="gameover-score">{score}{lang === "ko" ? "개 성공" : " cleared"}</p>
        </div>
        <button className="button button--playagain" onClick={() => onStart(mode)}>{t("playAgain")}</button>
      </div>
      </>
    );
  }

  const displayTitle = lang === "ko" ? (current.titleKo ?? current.title) : current.title;
  const setClass = `set ${status === "success" ? "set--exit" : "set--enter"}`;

  return (
    <div className="game-area">
      <div key={enterKey} className={setClass}>
        {/* Icon box */}
        <div className="icon-box" style={{ borderColor: current.color }}>
          <img src={current.icon} alt={current.title} className="problem-icon" />
        </div>

        {/* Title + arrows */}
        <div className="set-info">
          <div className="problem-title">{displayTitle}</div>
          <ArrowRow arrows={current.arrows} progress={progress} gameStatus={status} />
        </div>
      </div>

      {/* Timer bar */}
      {mode === "timeattack" && (
        <div className="timer-bar">
          <div
            className={`timer-bar-fill ${secondsLeft <= 8 ? "timer-bar-fill--critical" : ""}`}
            style={{ width: `${(secondsLeft / totalSeconds) * 100}%` }}
          />
        </div>
      )}

      {/* Mobile virtual d-pad */}
      <div className="dpad" aria-label="Virtual D-Pad">
        <div className="dpad-top-row">
          <button className="dpad-btn" onClick={() => inputArrow("up")}>
            <ArrowUp className="dpad-arrow" />
          </button>
        </div>
        <div className="dpad-bottom-row">
          <button className="dpad-btn" onClick={() => inputArrow("left")}>
            <ArrowLeft className="dpad-arrow" />
          </button>
          <button className="dpad-btn" onClick={() => inputArrow("down")}>
            <ArrowDown className="dpad-arrow" />
          </button>
          <button className="dpad-btn" onClick={() => inputArrow("right")}>
            <ArrowRight className="dpad-arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}
