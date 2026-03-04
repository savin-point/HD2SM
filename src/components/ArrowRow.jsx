import ArrowUp    from "../assets/arrows/arrow-up.svg?react";
import ArrowDown  from "../assets/arrows/arrow-down.svg?react";
import ArrowLeft  from "../assets/arrows/arrow-left.svg?react";
import ArrowRight from "../assets/arrows/arrow-right.svg?react";

const ARROW_COMPONENTS = { up: ArrowUp, down: ArrowDown, left: ArrowLeft, right: ArrowRight };

// status: "neutral" | "done" | "active" | "fail"
export default function ArrowRow({ arrows, progress, gameStatus }) {
  return (
    <div className="arrows">
      {arrows.map((dir, i) => {
        let cls = "arrow-icon";
        if (gameStatus === "fail" && i === progress.length) {
          cls += " arrow-fail";
        } else if (i < progress.length) {
          cls += " arrow-done";
        } else if (i === progress.length) {
          cls += " arrow-active";
        }
        const ArrowSvg = ARROW_COMPONENTS[dir];
        return <ArrowSvg key={i} className={cls} />;
      })}
    </div>
  );
}
