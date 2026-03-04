import { createContext, useContext, useState } from "react";

const translations = {
  ko: {
    steamLink: "Steam 바로가기",
    infinite: "무한연습",
    timeattack: "타임어택",
    startPrompt: "모드를 선택해 시작하세요",
    inputPrompt: "화살표 키를 입력하세요",
    correct: "정답!",
    wrong: "틀렸습니다",
    score: "점수",
    timeLeft: "남은 시간",
    gameOver: "게임 종료",
    playAgain: "다시 하기",
    categoryAll: "전체",
    categoryAttack: "공격",
    categoryDefense: "방어",
    categorySupply: "지원",
    categoryMission: "임무",
    disclaimer:
      "Arrowhead Studios와 어떤 연관 없이 그저 Helldivers2를 사랑하는 다이버로써 제작하였습니다 :)",
    chromePc: "Chrome/PC 환경을 권장하며, 문제가 있을 경우 즉각 조치하겠습니다.",
    contactHere: "여기",
    contactSuffix: "로 연락주세요!",
    joinDemocracy: "지금 당장 민주주의에 합류해보세요!",
  },
  en: {
    steamLink: "Go to Steam",
    infinite: "Infinite",
    timeattack: "Time Attack",
    startPrompt: "Select a mode to begin",
    inputPrompt: "Press arrow keys",
    correct: "Correct!",
    wrong: "Wrong",
    score: "Score",
    timeLeft: "Time Left",
    gameOver: "Game Over",
    playAgain: "Play Again",
    categoryAll: "All",
    categoryAttack: "Attack",
    categoryDefense: "Defense",
    categorySupply: "Supply",
    categoryMission: "Mission",
    disclaimer:
      "Made by a Helldivers 2 fan with no affiliation to Arrowhead Studios :)",
    chromePc: "Best experienced on Chrome / PC.",
    contactHere: "here",
    contactSuffix: " to contact us.",
    joinDemocracy: "Join Democracy now!",
  },
};

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState("ko");
  const t = (key) => translations[lang][key] ?? key;
  const toggle = () => setLang((l) => (l === "ko" ? "en" : "ko"));
  return (
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
