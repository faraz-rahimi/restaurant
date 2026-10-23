import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// @ts-expect-error CSS imports are handled by the bundler.
import "./App.css"
import App from "./App.tsx";
import "./I18n/I18n.ts";

const document = window.document;

createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>,
);
