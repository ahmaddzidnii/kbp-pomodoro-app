import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { NextUIProvider } from "@nextui-org/system";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </HelmetProvider>
  </StrictMode>,
);
