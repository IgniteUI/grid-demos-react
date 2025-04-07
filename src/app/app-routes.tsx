import { redirect, RouteObject } from 'react-router-dom';
import ERPInventory from './erpinventory/erpinventory';
import OrgChartHRPortal from './org-chart-hr-portal/org-chart-hr-portal';
import FinancialPortfolio from './financial-portfolio/financial-portfolio';
import SalesDashboard from './sales-dashboard/sales-dashboard';
import FleetManagement from './fleet-management/fleet-management';
import HomeView from './home-view/home-view';

export const routes: RouteObject[] = [
  { index: true, loader: () => redirect('home') },
  { path: 'home', element: <HomeView />,
    children: [
      { index: true, loader: () => redirect('inventory') },
      { path: 'inventory', element: <ERPInventory /> },
      { path: 'hr-portal', element: <OrgChartHRPortal /> },
      { path: 'finance', element: <FinancialPortfolio />},
      { path: 'sales', element: <SalesDashboard /> },
      { path: 'fleet', element: <FleetManagement /> },
    ]
  },
  { path: 'inventory', element: <ERPInventory /> },
  { path: 'hr-portal', element: <OrgChartHRPortal /> },
  { path: 'finance', element: <FinancialPortfolio />},
  { path: 'sales', element: <SalesDashboard /> },
  { path: 'fleet', element: <FleetManagement /> },
];
