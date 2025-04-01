import { FetchApi } from './fetch-api';
import { Table1Type } from '../models/Vehicles/table1-type';

export async function getTable1List(): Promise<Table1Type[]> {
  return await FetchApi.fetchApiResponse<Table1Type[]>('https://www.infragistics.com/grid-examples-data/data/fleet/vehicles.json', []);
}
