import { FetchApi } from './fetch-api';
import { Table1TypeFinance } from '../models/Finance/table1-type-finance';

export async function getTable1List(): Promise<Table1TypeFinance[]> {
  return await FetchApi.fetchApiResponse<Table1TypeFinance[]>('https://www.infragistics.com/grid-examples-data/data/finance/finance.json', []);
}
