import { useCallback, useEffect, useState } from 'react';
import { getTable1List } from '../services/finance';
import { Table1TypeFinance } from '../models/Finance/table1-type-finance';

export const useGetTable1List = () => {
  const [table1, setTable1] = useState<Table1TypeFinance[]>([]);

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

  return { requestFinanceTable1: requestTable1, financeTable1: table1, setFinanceTable1: setTable1 };
}
