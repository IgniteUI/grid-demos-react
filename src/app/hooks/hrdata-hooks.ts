import { useCallback, useEffect, useState } from 'react';
import { getTable1List } from '../services/hrdata';
import { Table1TypeHRData } from '../models/HRData/table1-type-hrdata';

export const useGetTable1List = () => {
  const [table1, setTable1] = useState<Table1TypeHRData[]>([]);

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

  return { requestHRDataTable1: requestTable1, hRDataTable1: table1, setHRDataTable1: setTable1 };
}
