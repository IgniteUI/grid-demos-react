import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import StepChartSample from "./StepChartSample.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StepChartSample />
  </StrictMode>
);
