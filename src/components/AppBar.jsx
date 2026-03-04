import { useLang } from "../i18n";

export default function AppBar() {
  const { lang, toggle, t } = useLang();

  return (
    <div className="app-bar">
      <a
        href="https://store.steampowered.com/app/553850/HELLDIVERS_2/"
        target="_blank"
        rel="noopener noreferrer"
        className="appbar-button"
      >
        <img src="/resource/appbar-steam.svg" alt="Steam" className="icon" />
        {t("steamLink")}
      </a>
      <button className="appbar-button" onClick={toggle}>
        <img src="/resource/appbar-language.svg" alt="Language" className="icon" />
        {lang === "ko" ? "ENG" : "KOR"}
      </button>
    </div>
  );
}
