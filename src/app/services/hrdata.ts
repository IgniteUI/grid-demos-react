import { FetchApi } from './fetch-api';
import { Table1TypeHRData } from '../models/HRData/table1-type-hrdata';

export async function getTable1List(): Promise<Table1TypeHRData[]> {
  return await FetchApi.fetchApiResponse<Table1TypeHRData[]>('https://www.infragistics.com/grid-examples-data/data/hr/hr.json', []);
}
