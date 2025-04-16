import { redirect, RouteObject } from 'react-router-dom';
import SalesGrid from './sales-grid/sales-grid';

export const routes: RouteObject[] = [
  { index: true, loader: () => redirect('sales-grid') },
  { path: 'sales-grid', element: <SalesGrid /> }
];
