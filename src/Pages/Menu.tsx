import FoodCard from "../Components/FoodCard";
import { useIsMobile } from "../Hooks/useIsMobile";
import { useTranslation } from "react-i18next";

const Menu = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  return (
    <div className={`max-w-7xl mx-auto ${isMobile ? "p-4 mt-4" : "p-8 mt-8"}`}>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-orange-500 mb-2">
          {t("nav.menu")}
        </h1>
        <div className="w-16 h-1.5 bg-orange-500 rounded-full mt-3"></div>
      </div>

      <FoodCard />
    </div>
  );
};

export default Menu;
