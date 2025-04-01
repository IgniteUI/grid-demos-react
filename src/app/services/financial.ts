import { SalesType } from '../models/Financial/sales-type';

export async function getSales(): Promise<SalesType[]> {
  const response = await fetch('../../static-data/financial-sales-type.json');
  if (!response.ok) {
    return Promise.resolve([]);
  }
  return response.json();
}
