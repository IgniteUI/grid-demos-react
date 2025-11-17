import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PolarChartSample from "./PolarChartSample.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PolarChartSample />
  </StrictMode>
);
