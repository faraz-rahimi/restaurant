import { useIsMobile } from "../Hooks/useIsMobile.ts";
import { useLocalStorage } from "../Hooks/useLocalStorage.ts";
import { useState, useEffect } from "react";
import Logo from "./Logo.tsx";
import LoginIcon from "./LoginIcon.tsx";
import api from "../API/users.ts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface UserData {
  id: string;
  username: string;
}

const Header = () => {
  const isMobile = useIsMobile();
  const [isOpen, setOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [savedLang, setSavedLang] = useLocalStorage("app-lang", "en");

  useEffect(() => {
    if (savedLang) {
      i18n.changeLanguage(savedLang);
      document.documentElement.dir = savedLang === "en" ? "ltr" : "rtl";
    }
  }, [savedLang, i18n]);

  useEffect(() => {
    let active = true;
    const fetchFreshUserData = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        setUser(null);
        return;
      }

      try {
        const response = await api.get(`/${userId}`);
        if (active) setUser(response.data);
      } catch (error) {
        console.error("مشکل در دریافت اطلاعات کاربر:", error);
        if (active) {
          localStorage.removeItem("userId");
          setUser(null);
        }
      }
    };

    fetchFreshUserData();
    return () => {
      active = false;
    };
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setUser(null);
    setIsProfileOpen(false);
  };

  const dropDown = () => {
    setOpen((open) => !open);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setIsProfileOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const handleLanguageSelect = (lng: string) => {
    setSavedLang(lng);
    setOpen(false);
  };

  const handleScrollToSection = (sectionId: string) => {
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  return (
    <header className="flex justify-between w-full items-center py-3 px-4 relative z-50">
      <Link className="flex gap-2" to="/">
        <Logo />
      </Link>

      <nav
        className={
          isMobile
            ? "fixed w-full bottom-0 inset-s-0 justify-center p-5 bg-amber-600 z-40 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]"
            : ""
        }
      >
        <ul
          className={`flex list-none items-center ${isMobile ? "justify-around gap-2" : "gap-8"}`}
        >
          <li>
            <Link
              to="/menu"
              className={
                isMobile
                  ? "text-black font-semibold text-lg"
                  : "text-orange-600 transition-colors"
              }
            >
              {t("nav.menu")}
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={() => handleScrollToSection("contact")}
              className={
                isMobile
                  ? "text-black font-semibold text-lg cursor-pointer"
                  : "text-orange-600 transition-colors cursor-pointer"
              }
            >
              {t("nav.contact")}
            </button>
          </li>

          <li>
            <button
              type="button"
              onClick={() => handleScrollToSection("about")}
              className={
                isMobile
                  ? "text-black font-semibold text-lg cursor-pointer"
                  : "text-orange-600 transition-colors cursor-pointer"
              }
            >
              {t("nav.about")}
            </button>
          </li>
          <li>
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  aria-expanded={isProfileOpen}
                  aria-haspopup="true"
                  onClick={() => setIsProfileOpen((open) => !open)}
                  className="flex items-center gap-2 text-orange-600 font-bold bg-orange-100 px-4 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  <span>{user.username}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isProfileOpen && (
                  <div
                    className={`absolute ${isMobile ? "bottom-full mb-2" : "top-full mt-2"} end-0 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 flex flex-col overflow-hidden`}
                  >
                    <Link
                      to="/orders"
                      onClick={() => setIsProfileOpen(false)}
                      className="px-5 py-3 text-gray-700 font-medium hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center gap-2"
                    >
                      {t("user.orders")}
                    </Link>

                    <div className="h-px bg-gray-100 my-1 w-full"></div>

                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        handleLogout();
                      }}
                      className="px-5 py-3 text-red-500 font-bold hover:bg-red-50 transition-colors text-start flex items-center gap-2"
                    >
                      {t("user.exit")}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className={
                  isMobile
                    ? "text-black font-semibold text-lg flex gap-1 items-center"
                    : "text-white bg-orange-600 px-4 py-2 rounded-lg font-semibold text-lg flex gap-2 items-center hover:bg-orange-700 transition-colors"
                }
              >
                <LoginIcon />
                {t("user.login")}
              </Link>
            )}
          </li>
        </ul>
      </nav>

      <div className="relative">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          className="text-orange-600 font-semibold text-xl flex items-center gap-1 hover:text-orange-700 transition-colors"
          onClick={dropDown}
        >
          <span>{t("lang.title")}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-full mt-2 min-w-28 bg-black border border-orange-600 rounded-lg shadow-lg flex flex-col gap-1 p-2 z-50 inset-e-0">
            <button
              className="w-full text-left bg-transparent hover:bg-orange-950 align-middle text-orange-700 px-4 py-2 rounded-md font-semibold transition-colors"
              onClick={() => handleLanguageSelect("en")}
            >
              English
            </button>
            <button
              className="w-full text-right bg-transparent hover:bg-amber-950 text-orange-700 px-4 py-2 rounded-md font-bold transition-colors font-[Vazirmatn]"
              onClick={() => handleLanguageSelect("fa")}
            >
              فارسی
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
