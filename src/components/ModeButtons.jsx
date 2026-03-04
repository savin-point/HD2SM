import { useLang } from "../i18n";

const FILTER_OPTIONS = [
  { value: null,       label: "전체 랜덤" },
  { value: "attack",   label: "무기" },
  { value: "defense",  label: "방어" },
  { value: "supply",   label: "보급" },
  { value: "mission",  label: "임무" },
];

export default function ModeButtons({ gameState, onStart, onReset, secondsLeft, onFilterChange }) {
  const { t } = useLang();
  const { mode, status, score, categoryFilter } = gameState;
  const isActive = status !== "idle" && status !== "gameover";

  return (
    <div className="mode-section">
      {/* Category filter — shown for infinite mode when active */}
      {isActive && mode === "infinite" && (
        <div className="status-bar">
          <div className="segment-control">
            {FILTER_OPTIONS.map(opt => (
              <button
                key={String(opt.value)}
                className={`segment-btn ${categoryFilter === opt.value ? "segment-btn--active" : ""}`}
                onClick={() => onFilterChange(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Score / Timer badge — shown for time attack when active */}
      {isActive && mode === "timeattack" && (
        <div className="status-bar">
          <span className="status-score">성공: {score}</span>
          <span className="status-timer">
            {t("timeLeft")}: {secondsLeft}s
          </span>
        </div>
      )}

      <div className="mode-buttons">
        <button
          className={`button ${mode === "infinite" && isActive ? "button--active" : ""}`}
          onClick={() => onStart("infinite")}
        >
          <img src="/resource/mode-shuffle.svg" alt="infinite" className="mode-icon" />
          {t("infinite")}
        </button>
        <button
          className={`button ${mode === "timeattack" && isActive ? "button--active" : ""}`}
          onClick={() => onStart("timeattack")}
        >
          <img src="/resource/mode-timer.svg" alt="time attack" className="mode-icon" />
          {t("timeattack")}
        </button>
      </div>
    </div>
  );
}
