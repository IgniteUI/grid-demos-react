import { useCallback, useEffect, useState } from 'react';
import { getTable1List } from '../services/vehicles';
import { Table1Type } from '../models/Vehicles/table1-type';

export const useGetTable1List = () => {
  const [table1, setTable1] = useState<Table1Type[]>([]);

  const requestTable1 = useCallback(() => {
    let ignore = false;
    getTable1List()
      .then((data) => {
        if (!ignore) {
          setTable1(data);
        }
      })
    return () => {
      ignore = true;
    }
  }, []);

  useEffect(() => {
    requestTable1();
  }, [requestTable1]);

  return { requestVehiclesTable1: requestTable1, vehiclesTable1: table1, setVehiclesTable1: setTable1 };
}
