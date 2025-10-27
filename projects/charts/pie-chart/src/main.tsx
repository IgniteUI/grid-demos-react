import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PieChartSample from "./PieChartSample";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PieChartSample />
  </StrictMode>
);
