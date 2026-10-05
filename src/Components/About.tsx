import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-12 min-h-[75vh] flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="flex-1 space-y-8 relative z-10">
        <div>
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-200 mb-6 inline-block">
            {t("info.aboutTitle")}
          </h1>

          <div className="flex gap-2 items-center">
            <span className="w-16 h-1.5 bg-orange-500 rounded-full"></span>
            <span className="w-4 h-1.5 bg-yellow-400 rounded-full"></span>
            <span className="w-1.5 h-1.5 bg-amber-200 rounded-full"></span>
          </div>
        </div>

        <p className="text-amber-100/90 text-lg md:text-xl leading-relaxed md:leading-loose text-justify font-light border-s-4 border-orange-500/40 ps-6">
          {t("info.aboutText")}
        </p>
      </div>

      <div className="hidden md:flex flex-1 justify-center items-center relative mt-12 md:mt-0">
        <div className="relative w-72 h-72 md:w-80 md:h-80">
          <div className="absolute top-0 right-4 w-48 h-48 bg-gradient-to-br from-orange-500 to-orange-400 rounded-full opacity-80 mix-blend-screen shadow-[0_0_50px_rgba(249,115,22,0.4)] animate-pulse"></div>

          <div className="absolute bottom-0 left-4 w-52 h-52 bg-gradient-to-tr from-yellow-500 to-amber-300 rounded-full opacity-60 mix-blend-screen shadow-[0_0_50px_rgba(234,179,8,0.3)]"></div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl flex items-center justify-center shadow-2xl rotate-12 hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-pointer group">
            <div className="text-center transform -rotate-12 group-hover:rotate-0 transition-all duration-500">
              <span className="block text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-amber-100 drop-shadow-md">
                Foodino
              </span>
              <span className="block text-xs text-orange-200/70 tracking-[0.3em] mt-3 font-light">
                PREMIUM
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
