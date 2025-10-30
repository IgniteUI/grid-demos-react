import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import BarChartSample from "./BarChartSample.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BarChartSample />
  </StrictMode>
);
