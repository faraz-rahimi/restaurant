import { useCallback, useEffect, useRef, useState } from "react";
import FoodCard from "../Components/FoodCard";
import { useIsMobile } from "../Hooks/useIsMobile";
import { useTranslation } from "react-i18next";

const SCROLL_THRESHOLD = 4;
const SCROLL_RATIO = 0.75;

const Menu = () => {
  const isMobile = useIsMobile();
  const { t, i18n } = useTranslation();

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
    const hasContentLeft =
      hasOverflow && position > SCROLL_THRESHOLD;
    const hasContentRight =
      hasOverflow &&
      position < maxScroll - SCROLL_THRESHOLD;

    setCanScrollLeft(hasContentLeft);
    setCanScrollRight(hasContentRight);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    let frameId = 0;

    const scheduleUpdate = () => {
      cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        updateScrollButtons();
      });
    };

    const resizeObserver = new ResizeObserver(scheduleUpdate);

    resizeObserver.observe(slider);

    const observeChildren = () => {
      Array.from(slider.children).forEach((child) => {
        resizeObserver.observe(child);
      });

      scheduleUpdate();
    };

    const mutationObserver = new MutationObserver(() => {
      observeChildren();
    });

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

    const amount = slider.clientWidth * SCROLL_RATIO;

    slider.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      className={`mx-auto max-w-7xl ${
        isMobile ? "mt-4 p-4" : "mt-8 p-8"
      }`}
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl font-extrabold text-orange-500 md:text-4xl">
            {t("nav.menu")}
          </h1>

          <div className="h-1.5 w-16 rounded-full bg-orange-500" />
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            aria-label={isRtl ? "حرکت به چپ" : "Scroll left"}
            aria-controls="menu-slider"
            onClick={() => scrollSlider("left")}
            disabled={!canScrollLeft}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-100 bg-white text-orange-500 shadow-md transition-colors hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
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
            aria-controls="menu-slider"
            onClick={() => scrollSlider("right")}
            disabled={!canScrollRight}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-100 bg-white text-orange-500 shadow-md transition-colors hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
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

      <div className="mt-6">
        <div
          id="menu-slider"
          ref={sliderRef}
          dir="ltr"
          className="flex w-full flex-row flex-nowrap gap-6 overflow-x-auto scroll-smooth pb-8 pt-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <FoodCard />
        </div>
      </div>
    </section>
  );
};

export default Menu;
