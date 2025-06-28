import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import GuitarlaApp from "./GuitarlaApp.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GuitarlaApp />
  </StrictMode>
);
