import { Link } from "react-router-dom";
import { useEffect } from "react";
const heroImage = "/Assets/Hero.webp";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "../Hooks/useIsMobile";
import { useLocalStorage } from "../Hooks/useLocalStorage";

const Hero = () => {
  const isMobile = useIsMobile();
  const { t, i18n } = useTranslation();

  const [savedLang] = useLocalStorage("app-lang", "en");

  useEffect(() => {
    if (savedLang) {
      i18n.changeLanguage(savedLang);
      document.documentElement.dir = savedLang === "fa" ? "rtl" : "ltr";
    }
  }, [savedLang]);
  return (
    <section className="relative w-full h-100 md:h-137.5 overflow-hidden flex items-center">
      <img
        className="absolute inset-0 w-full h-full object-cover -z-10 rtl:-scale-x-100 transition-transform duration-300"
        src={heroImage}
        alt="hero"
      />

      <div className="absolute inset-0 ltr:bg-liner-to-r rtl:bg-liner-to-l from-black/95 via-black/50 to-transparent"></div>

      <div className="relative z-10 flex flex-col w-full max-w-7xl px-4 text-start me-auto ms-4 md:ms-12 lg:ms-24">
        <h1 className="text-[clamp(1.8rem,5vw,4rem)] font-extrabold text-white mb-6 drop-shadow-xl max-w-2xl leading-tight">
          {t("hero.heading")}
        </h1>

        <Link
          to="/menu"
          className="w-fit bg-orange-600 hover:from-orange-500 hover:to-orange-400 text-white font-bold py-3 px-10 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_4px_15px_rgba(234,88,12,0.4)] hover:shadow-[0_8px_25px_rgba(234,88,12,0.6)]"
        >
          {t("hero.btn")}
        </Link>
      </div>
    </section>
  );
};

export default Hero;
