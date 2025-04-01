import { FetchApi } from './fetch-api';
import { Table1TypeERPProducts } from '../models/ERPProducts/table1-type-erpproducts';

export async function getTable1List(): Promise<Table1TypeERPProducts[]> {
  return await FetchApi.fetchApiResponse<Table1TypeERPProducts[]>('https://www.infragistics.com/grid-examples-data/data/erp/products.json', []);
}
