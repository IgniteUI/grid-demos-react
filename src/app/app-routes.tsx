import { redirect } from 'react-router-dom';
import ERPInventory from './erpinventory/erpinventory';
import OrgChartHRPortal from './org-chart-hr-portal/org-chart-hr-portal';
import FinancialPortfolio from './financial-portfolio/financial-portfolio';
import SalesDashboard from './sales-dashboard/sales-dashboard';
import FleetManagement from './fleet-management/fleet-management';

export const routes = [
  { index: true, loader: () => redirect('erpinventory') },
  { path: 'erpinventory', element: <ERPInventory />, text: 'ERPInventory' },
  { path: 'org-chart-hr-portal', element: <OrgChartHRPortal />, text: 'Org ChartHR Portal' },
  { path: 'financial-portfolio', element: <FinancialPortfolio />, text: 'Financial Portfolio' },
  { path: 'sales-dashboard', element: <SalesDashboard />, text: 'Sales Dashboard' },
  { path: 'fleet-management', element: <FleetManagement />, text: 'Fleet Management' }
];
