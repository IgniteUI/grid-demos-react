import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LineChartSample from "./LineChartSample.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LineChartSample />
  </StrictMode>
);
