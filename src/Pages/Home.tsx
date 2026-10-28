import Hero from "../Components/Hero.tsx";
import Contact from "../Components/Contact.tsx";
import { useLocation } from "react-router-dom";
import FoodCard from "../Components/FoodCard.tsx";
import { useTranslation } from "react-i18next";
import About from "../Components/About.tsx";
import { useCallback, useEffect, useRef, useState } from "react";

const SCROLL_THRESHOLD = 4;
const SCROLL_RATIO = 0.75;

const Home = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const sliderRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const isRtl = i18n.dir() === "rtl";

  const updateScrollButtons = useCallback(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    const maxScroll = Math.max(
      0,
      slider.scrollWidth - slider.clientWidth
    );

    const position = Math.max(
      0,
      Math.min(slider.scrollLeft, maxScroll)
    );

    const hasOverflow = maxScroll > SCROLL_THRESHOLD;

    setCanScrollLeft(
      hasOverflow && position > SCROLL_THRESHOLD
    );

    setCanScrollRight(
      hasOverflow &&
        position < maxScroll - SCROLL_THRESHOLD
    );
  }, []);

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const sectionId = location.state.scrollTo;
      const element = document.getElementById(sectionId);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }

      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    let frameId = 0;

    const scheduleUpdate = () => {
      cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(updateScrollButtons);
    };

    const resizeObserver = new ResizeObserver(scheduleUpdate);

    resizeObserver.observe(slider);

    const observeChildren = () => {
      Array.from(slider.children).forEach((child) => {
        resizeObserver.observe(child);
      });

      scheduleUpdate();
    };

    const mutationObserver = new MutationObserver(observeChildren);

    mutationObserver.observe(slider, {
      childList: true,
      subtree: true,
    });

    slider.addEventListener("scroll", scheduleUpdate, {
      passive: true,
    });

    window.addEventListener("resize", scheduleUpdate);

    observeChildren();
    scheduleUpdate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      mutationObserver.disconnect();

      slider.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [updateScrollButtons]);

  const scrollSlider = (direction: "left" | "right") => {
    const slider = sliderRef.current;

    if (!slider) return;

    slider.scrollBy({
      left:
        direction === "left"
          ? -slider.clientWidth * SCROLL_RATIO
          : slider.clientWidth * SCROLL_RATIO,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Hero />

      <section id="about">
        <About />
      </section>

      <section
        className="mx-auto w-full max-w-7xl overflow-hidden px-4 py-8 md:px-8"
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-amber-100 md:text-3xl">
            {t("card.title")}
          </h2>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              aria-label={isRtl ? "حرکت به چپ" : "Scroll left"}
              aria-controls="home-food-slider"
              onClick={() => scrollSlider("left")}
              disabled={!canScrollLeft}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-300/30 bg-white/10 text-amber-100 transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={isRtl ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
                />
              </svg>
            </button>

            <button
              type="button"
              aria-label={isRtl ? "حرکت به راست" : "Scroll right"}
              aria-controls="home-food-slider"
              onClick={() => scrollSlider("right")}
              disabled={!canScrollRight}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-300/30 bg-white/10 text-amber-100 transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={isRtl ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          id="home-food-slider"
          ref={sliderRef}
          dir="ltr"
          className="flex w-full flex-nowrap gap-6 overflow-x-auto scroll-smooth pb-4 pt-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <FoodCard />
        </div>
      </section>

      <section id="contact">
        <Contact />
      </section>
    </>
  );
};

export default Home;