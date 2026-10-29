import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home.tsx";
import Menu from "./Pages/Menu.tsx";
import Cart from "./Pages/Cart.tsx";
import Header from "./Components/Header.tsx";
import Footer from "./Components/Footer.jsx";
import Login from "./Pages/Profile/Login.jsx";
import SignUp from "./Pages/Profile/SignUp.tsx";
import PageNotFound from "./Pages/PageNotFound.tsx";

const App = () => {
  const [introVisible, setIntroVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");

    if (!hasSeenIntro) {
      setIntroVisible(true);
      sessionStorage.setItem("hasSeenIntro", "true");

      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 4200);

      const removeTimer = setTimeout(() => {
        setIntroVisible(false);
      }, 5000);

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(removeTimer);
      };
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {introVisible && (
        <div
          dir="rtl"
          style={{ background: "rgb(15, 6, 2)" }}
          className={`fixed top-0 left-0 w-full h-full z-100 flex items-center justify-center transition-transform duration-700 ease-in-out ${
            isExiting ? "-translate-y-full" : "translate-y-0"
          }`}
        >
          <div className="relative flex items-center justify-center w-64 h-32 animate-slide-in">
            <div className="absolute inset-0 flex items-center justify-center animate-cloche-assembly">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute w-20 h-20 text-orange-600 z-10 drop-shadow-sm"
              >
                <path d="M3 18h18" />
              </svg>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute w-20 h-20 text-orange-600 z-30 animate-cloche-top drop-shadow-md bg-transparent"
              >
                <path d="M4 14a8 8 0 0 1 16 0" />
                <path d="M12 9v-4" />
                <path d="M10 5h4" />
              </svg>
            </div>

            <span className="absolute z-20 text-4xl font-bold text-orange-600 animate-text font-sans select-none">
              Foodino
            </span>
          </div>
        </div>
      )}

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            direction: "rtl",
            fontFamily: "inherit",
            background: "#18181b",
            color: "#fff",
            border: "1px solid rgba(249, 115, 22, 0.35)",
          },
          success: {
            iconTheme: { primary: "#22c55e", secondary: "#fff" },
          },
          error: {
            iconTheme: { primary: "#f97316", secondary: "#fff" },
          },
        }}
      />
      <Header />
      <main className="height-full">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/orders" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
