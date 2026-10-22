import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./App.tsx"
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
