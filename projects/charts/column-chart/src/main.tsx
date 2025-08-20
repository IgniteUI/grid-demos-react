import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ColumnChartSample from "./ColumnChartSample.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ColumnChartSample />
  </StrictMode>
);
