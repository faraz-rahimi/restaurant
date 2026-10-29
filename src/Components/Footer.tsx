
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language.startsWith("fa");

  return (
    <footer
      dir={isRTL ? "rtl" : "ltr"}
      className="mt-auto border-t border-white/10 bg-[#171311] text-[#f8f4ef]"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:px-8">
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block text-3xl font-extrabold tracking-tight text-orange-500"
          >
            Foodino<span className="text-white">.</span>
          </Link>

          <p className="max-w-xs text-sm leading-7 text-[#b8aaa0]">
            {t("footer.description")}
          </p>

          <div className="flex gap-3">
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label={t("footer.instagram")}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold transition hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-400"
            >
              IG
            </a>

            <a
              href="https://t.me/"
              target="_blank"
              rel="noreferrer"
              aria-label={t("footer.telegram")}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold transition hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-400"
            >
              TG
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-base font-bold">
            {t("footer.quickLinks")}
          </h3>

          <ul className="space-y-3 text-sm text-[#b8aaa0]">
            <li>
              <Link to="/" className="transition hover:text-orange-400">
                {t("footer.home")}
              </Link>
            </li>
            <li>
              <Link to="/menu" className="transition hover:text-orange-400">
                {t("footer.menu")}
              </Link>
            </li>
            <li>
              <Link to="/orders" className="transition hover:text-orange-400">
                {t("footer.cart")}
              </Link>
            </li>
            <li>
              <Link to="/login" className="transition hover:text-orange-400">
                {t("footer.login")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-base font-bold">
            {t("footer.whyFoodino")}
          </h3>

          <ul className="space-y-3 text-sm text-[#b8aaa0]">
            <li>{t("footer.feature1")}</li>
            <li>{t("footer.feature2")}</li>
            <li>{t("footer.feature3")}</li>
            <li>{t("footer.feature4")}</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-base font-bold">
            {t("footer.contactUs")}
          </h3>

          <p className="mb-4 text-sm leading-7 text-[#b8aaa0]">
            {t("footer.contactDescription")}
          </p>

          <a
            href="mailto:fwebstack@gmail.com"
            dir="ltr"
            className="inline-block break-all text-sm text-orange-400 transition hover:text-orange-300"
          >
            fwebstack@gmail.com
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-center text-xs text-[#8c7769] sm:flex-row sm:px-8">
          <p>
            {t("footer.copyright", {
              year: new Date().getFullYear(),
            })}
          </p>

          <p>{t("footer.madeWithLove")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
