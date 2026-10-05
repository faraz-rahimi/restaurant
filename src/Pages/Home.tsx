import Hero from "../Components/Hero.tsx";
import Contact from "../Components/Contact.tsx";
import { useLocation } from "react-router-dom";
import FoodCard from "../Components/FoodCard.tsx";
import { useTranslation } from "react-i18next";
import About from "../Components/About.tsx";
import { useEffect } from "react";

const Home = () => {
  const { t } = useTranslation();
  const location = useLocation();

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
  return (
    <>
      <Hero />
      <section id="about">
        <About />
      </section>

      <section>
        <h2 className="text-amber-100 m-2.5 text-3xl font-medium">
          {t("card.title")}
        </h2>
        <FoodCard />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </>
  );
};

export default Home;
