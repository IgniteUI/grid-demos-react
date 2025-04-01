import { useCallback, useEffect, useState } from 'react';
import { getSales } from '../services/financial';
import { SalesType } from '../models/Financial/sales-type';

export const useGetSales = () => {
  const [sales, setSales] = useState<SalesType[]>([]);

  const requestSales = useCallback(() => {
    let ignore = false;
    getSales()
      .then((data) => {
        if (!ignore) {
          setSales(data);
        }
      })
    return () => {
      ignore = true;
    }
  }, []);

  useEffect(() => {
    requestSales();
  }, [requestSales]);

  return { requestFinancialSales: requestSales, financialSales: sales, setFinancialSales: setSales };
}
