import { useRef } from "react";
import FoodCard from "../Components/FoodCard";
import { useIsMobile } from "../Hooks/useIsMobile";
import { useTranslation } from "react-i18next";

const Menu = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: "left" | "right") => {
    sliderRef.current?.scrollBy({
      left: direction === "left" ? -sliderRef.current.clientWidth : sliderRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className={`max-w-7xl mx-auto ${isMobile ? "p-4 mt-4" : "p-8 mt-8"}`}>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-orange-500 mb-2">
          {t("nav.menu")}
        </h1>
        <div className="w-16 h-1.5 bg-orange-500 rounded-full mt-3"></div>
      </div>

      <div className="relative">
        <button
          type="button"
          aria-label="Scroll menu left"
          onClick={() => scrollSlider("left")}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 text-orange-500 shadow-md hover:bg-orange-50"
        >
          &#8249;
        </button>
        <div ref={sliderRef} className="overflow-x-auto scroll-smooth">
          <FoodCard />
        </div>
        <button
          type="button"
          aria-label="Scroll menu right"
          onClick={() => scrollSlider("right")}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 text-orange-500 shadow-md hover:bg-orange-50"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Menu;
