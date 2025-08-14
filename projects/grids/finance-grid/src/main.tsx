import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import FinanceGrid from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FinanceGrid />
  </StrictMode>
);
