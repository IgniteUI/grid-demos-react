import { redirect } from 'react-router-dom';
import SalesGrid from './sales-grid/sales-grid';

export const routes = [
  { index: true, loader: () => redirect('sales-grid') },
  { path: 'sales-grid', element: <SalesGrid />, text: 'sales-grid' }
];
