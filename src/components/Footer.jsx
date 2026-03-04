import { useLang } from "../i18n";

export default function Footer() {
  const { t } = useLang();
  return (
    <div className="text-area">
      <p>
        <a
          href="https://store.steampowered.com/app/553850/HELLDIVERS_2/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("joinDemocracy")}
        </a>
      </p>
      <p className="disclaimer">
        {t("disclaimer")} <br />
        {t("chromePc")}{" "}
        <a href="mailto:tjdud2402@gmail.com" style={{ fontSize: "inherit" }}>{t("contactHere")}</a>{t("contactSuffix")}
      </p>
      <p className="disclaimer copyright">
        Helldivers 2 and all related assets are property of Arrowhead Game Studios AB and Sony Interactive Entertainment LLC.
        This is an unofficial fan project not affiliated with or endorsed by the rights holders.
      </p>
      <div className="made-by">
        made by{" "}
        <img
          src="/resource/our-name.svg"
          alt="Made By room1803"
          className="small-image"
        />
      </div>
    </div>
  );
}
