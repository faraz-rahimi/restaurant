import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";
import Footer from "./Footer.jsx";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="height-full flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
