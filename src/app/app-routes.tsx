import { redirect, RouteObject } from "react-router-dom";
import ERPHGridView from "./views/grids/erp-hgrid/erp-hgrid-view";
import HRPortalView from "./views/grids/hr-portal/hr-portal-view";
import FinanceView from "./views/grids/finance/finance-view";
import SalesView from "./views/grids/sales/sales-view";
import FleetManagementView from "./views/grids/fleet-management/fleet-management-view";
import HomeView from "./views/home/home-view";
import ColumnChartView from "./views/charts/column-chart/column-chart-view";
import BarChartView from "./views/charts/bar-chart/bar-chart-view";
import LineChartView from "./views/charts/line-chart/line-chart-view";
import PieChartView from "./views/charts/pie-chart/pie-chart-view";
import StepChartView from "./views/charts/step-chart/step-chart-view";
import PolarChartView from "./views/charts/polar-chart/polar-chart-view";

export const routes: RouteObject[] = [
  { index: true, loader: () => redirect("home") },
  {
    path: "home",
    element: <HomeView />,
    children: [
      { index: true, loader: () => redirect("grids/inventory") },
      {
        path: "grids",
        children: [
          { path: "inventory", element: <ERPHGridView /> },
          { path: "hr-portal", element: <HRPortalView /> },
          { path: "finance", element: <FinanceView /> },
          { path: "sales", element: <SalesView /> },
          { path: "fleet", element: <FleetManagementView /> },
        ],
      },
      {
        path: "charts",
        children: [
          { path: "column-chart", element: <ColumnChartView /> },
          { path: "bar-chart", element: <BarChartView /> },
          { path: "line-chart", element: <LineChartView /> },
          { path: "pie-chart", element: <PieChartView /> },
          { path: "step-chart", element: <StepChartView /> },
          { path: "polar-chart", element: <PolarChartView /> },
        ],
      },
    ],
  },
  {
    path: "grids",
    children: [
      { path: "inventory", element: <ERPHGridView /> },
      { path: "hr-portal", element: <HRPortalView /> },
      { path: "finance", element: <FinanceView /> },
      { path: "sales", element: <SalesView /> },
      { path: "fleet", element: <FleetManagementView /> },
    ],
  },
  {
    path: "charts",
    children: [
      { path: "column-chart", element: <ColumnChartView /> },
      { path: "bar-chart", element: <BarChartView /> },
      { path: "line-chart", element: <LineChartView /> },
      { path: "pie-chart", element: <PieChartView /> },
      { path: "step-chart", element: <StepChartView /> },
      { path: "polar-chart", element: <PolarChartView /> },
    ],
  },
];
