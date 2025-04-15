import { redirect, RouteObject } from 'react-router-dom';
import FleetManagement from './fleet-management-grid/fleet-management-grid';

export const routes: RouteObject[] = [
  { index: true, loader: () => redirect('fleet-management') },
  { path: 'fleet-management', element: <FleetManagement /> }
];
