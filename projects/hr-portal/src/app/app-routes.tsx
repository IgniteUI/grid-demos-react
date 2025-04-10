import { redirect, RouteObject } from 'react-router-dom';
import HRPortal from './hr-portal/hr-portal';

export const routes: RouteObject[] = [
  { index: true, loader: () => redirect('hr-portal') },
  { path: 'hr-portal', element: <HRPortal /> }
];
