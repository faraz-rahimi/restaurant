import { useEffect, useRef, useState } from "react";
import FoodCard from "../Components/FoodCard";
import { useIsMobile } from "../Hooks/useIsMobile";
import { useTranslation } from "react-i18next";

const Menu = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    setCanScrollLeft(slider.scrollLeft > 1);
    setCanScrollRight(slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 1);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    updateScrollButtons();
    const observer = new ResizeObserver(updateScrollButtons);
    observer.observe(slider);
    if (slider.firstElementChild) observer.observe(slider.firstElementChild);

    return () => observer.disconnect();
  }, []);

  const scrollSlider = (direction: "left" | "right") => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollBy({
      left: direction === "left" ? -slider.clientWidth * 0.8 : slider.clientWidth * 0.8,
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
            className="rounded-full bg-white p-3 text-orange-500 shadow-md hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            &#8249;
          </button>
          <button
            type="button"
            aria-label="Scroll menu right"
            aria-controls="menu-slider"
            onClick={() => scrollSlider("right")}
            disabled={!canScrollRight}
            className="rounded-full bg-white p-3 text-orange-500 shadow-md hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-40"
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
          onScroll={updateScrollButtons}
          className="overflow-x-auto scroll-smooth"
        >
          <FoodCard />
        </div>
      </div>
    </div>
  );
};

export default Menu;
