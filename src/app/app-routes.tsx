import { redirect, RouteObject } from 'react-router-dom';
import ERPHGridView from './views/erp-hgrid/erp-hgrid-view';
import HRPortalView from './views/hr-portal/hr-portal-view';
import FinanceView from './views/finance/finance-view';
import SalesView from './views/sales/sales-view';
import FleetManagementView from './views/fleet-management/fleet-management-view';
import HomeView from './views/home/home-view';

export const routes: RouteObject[] = [
  { index: true, loader: () => redirect('home') },
  { path: 'home', element: <HomeView />,
    children: [
      { index: true, loader: () => redirect('inventory') },
      { path: 'inventory', element: <ERPHGridView /> },
      { path: 'hr-portal', element: <HRPortalView /> },
      { path: 'finance', element: <FinanceView />},
      { path: 'sales', element: <SalesView /> },
      { path: 'fleet', element: <FleetManagementView /> },
    ]
  },
  { path: 'inventory', element: <ERPHGridView /> },
  { path: 'hr-portal', element: <HRPortalView /> },
  { path: 'finance', element: <FinanceView />},
  { path: 'sales', element: <SalesView /> },
  { path: 'fleet', element: <FleetManagementView /> },
];
