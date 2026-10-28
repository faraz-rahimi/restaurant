import { useEffect, useRef, useState, useCallback } from "react";
import FoodCard from "../Components/FoodCard";
import { useIsMobile } from "../Hooks/useIsMobile";
import { useTranslation } from "react-i18next";

const Menu = () => {
  const isMobile = useIsMobile();
  const { t, i18n } = useTranslation();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // بررسی جهت زبان (RTL یا LTR)
  const isRtl = i18n.dir() === "rtl";

  const updateScrollButtons = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const { scrollLeft, scrollWidth, clientWidth } = slider;

    if (isRtl) {
      // در حالت RTL محاسبه اسکرول متفاوت است
      // در مرورگرهای مختلف scrollLeft ممکن است منفی یا مثبت باشد
      const absScrollLeft = Math.abs(scrollLeft);
      setCanScrollLeft(absScrollLeft > 1);
      setCanScrollRight(absScrollLeft + clientWidth < scrollWidth - 1);
    } else {
      setCanScrollLeft(scrollLeft > 1);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  }, [isRtl]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    updateScrollButtons();

    const observer = new ResizeObserver(() => {
      updateScrollButtons();
    });

    observer.observe(slider);
    if (slider.firstElementChild) {
      observer.observe(slider.firstElementChild);
    }

    // اضافه کردن لیسنر برای رویداد scroll به شکل ایمن
    slider.addEventListener("scroll", updateScrollButtons, { passive: true });

    return () => {
      observer.disconnect();
      slider.removeEventListener("scroll", updateScrollButtons);
    };
  }, [updateScrollButtons]);

  const scrollSlider = (direction: "left" | "right") => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollAmount = slider.clientWidth * 0.8;
    
    // تنظیم جهت اسکرول با توجه به راست‌به‌چپ یا چپ‌به‌راست بودن زبان
    let targetDirection = direction;
    if (isRtl) {
      targetDirection = direction === "left" ? "right" : "left";
    }

    slider.scrollBy({
      left: targetDirection === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className={`max-w-7xl mx-auto ${isMobile ? "p-4 mt-4" : "p-8 mt-8"}`}>
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-orange-500 mb-2">
          {t("nav.menu")}
        </h1>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            aria-label="Scroll menu left"
            aria-controls="menu-slider"
            onClick={() => scrollSlider("left")}
            disabled={!canScrollLeft}
            className="rounded-full bg-white p-3 text-orange-500 shadow-md hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-40 transition-colors"
          >
            &#8249;
          </button>
          <button
            type="button"
            aria-label="Scroll menu right"
            aria-controls="menu-slider"
            onClick={() => scrollSlider("right")}
            disabled={!canScrollRight}
            className="rounded-full bg-white p-3 text-orange-500 shadow-md hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-40 transition-colors"
          >
            &#8250;
          </button>
        </div>
      </div>
      <div className="w-16 h-1.5 bg-orange-500 rounded-full -mt-5 mb-8"></div>

      <div className="relative">
        <div
          id="menu-slider"
          ref={sliderRef}
          className="overflow-x-auto scroll-smooth no-scrollbar flex gap-4 pb-4"
        >
          <FoodCard />
        </div>
      </div>
    </div>
  );
};

export default Menu;