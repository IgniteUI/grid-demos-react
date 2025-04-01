import { IgrPivotDataSelector, IgrPivotDataSelectorModule, IgrPivotDateDimension, IgrPivotDateDimensionOptions, IgrPivotGrid, IgrPivotGridModule } from 'igniteui-react-grids';
import { useRef } from 'react';
import { useGetSales } from '../hooks/financial-hooks';
import 'igniteui-react-grids/grids/combined.js';
import styles from './sales-dashboard.module.css';
import createClassTransformer from '../style-utils';

IgrPivotDataSelectorModule.register();
IgrPivotGridModule.register();

export default function SalesDashboard() {
  const classes = createClassTransformer(styles);
  const dateDimensionOptions = { years: true, months: false, quarters: true} as IgrPivotDateDimensionOptions;
const dateDimension =  { memberName: 'Date', enabled: true, options: dateDimensionOptions } as IgrPivotDateDimension;
  const pivotConfigHierarchy: any = {
  columns: [
    {
      memberName: 'Country',
      enabled: true,
    },
    {
      memberName: 'Product',
      enabled: true,
    },
  ],
  rows: [
    dateDimension,
  ],
  values: [
    {
      member: 'Sales',
      aggregate: {
        aggregatorName: 'SUM',
        key: 'Sum Of Sales',
        label: 'Sum',
      },
      enabled: false,
      dataType: 'currency',
    },
    {
      member: 'Profit',
      aggregate: {
        aggregatorName: 'SUM',
        key: 'Sum Of Profit',
        label: 'Sum',
      },
      enabled: true,
      dataType: 'currency',
    },
  ],
  filters: [
    {
      memberName: 'MonthName',
      enabled: false,
    },
  ],
};
  const pivotGrid = useRef<IgrPivotGrid>(null);
  const pivotDataSelector = useRef<IgrPivotDataSelector>(null);
  const { financialSales } = useGetSales();

  return (
    <>
      <div className={classes("row-layout sales-dashboard-container")}>
        <div className={classes("row-layout group")}>
          <IgrPivotGrid data={financialSales} pivotConfiguration={pivotConfigHierarchy} superCompactMode="true" defaultExpandState="true" ref={pivotGrid} className={classes("ig-typography ig-scrollbar pivot-grid")}></IgrPivotGrid>
          <IgrPivotDataSelector grid={pivotGrid.current!} ref={pivotDataSelector}></IgrPivotDataSelector>
        </div>
      </div>
    </>
  );
}
