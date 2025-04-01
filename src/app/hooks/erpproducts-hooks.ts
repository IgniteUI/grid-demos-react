import { useCallback, useEffect, useState } from 'react';
import { getTable1List } from '../services/erpproducts';
import { Table1TypeERPProducts } from '../models/ERPProducts/table1-type-erpproducts';

export const useGetTable1List = () => {
  const [table1, setTable1] = useState<Table1TypeERPProducts[]>([]);

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

  return { requestERPProductsTable1: requestTable1, eRPProductsTable1: table1, setERPProductsTable1: setTable1 };
}
