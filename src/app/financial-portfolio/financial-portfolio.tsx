import { IgrColumn, IgrGrid, IgrGridModule, IgrGridToolbar, IgrGridToolbarActions, IgrGridToolbarExporter, IgrGridToolbarHiding, IgrGridToolbarPinning, IgrGridToolbarTitle } from 'igniteui-react-grids';
import { useGetTable1List as financeUseGetTable1List } from '../hooks/finance-hooks';
import 'igniteui-react-grids/grids/combined.js';
import styles from './financial-portfolio.module.css';
import createClassTransformer from '../style-utils';

IgrGridModule.register();

export default function FinancialPortfolio() {
  const classes = createClassTransformer(styles);
  const uuid = () => crypto.randomUUID();
  const { financeTable1 } = financeUseGetTable1List();

  return (
    <>
      <div className={classes("row-layout financial-portfolio-container")}>
        <IgrGrid data={financeTable1} primaryKey="id" rowSelection="multiple" className={classes("ig-typography ig-scrollbar grid")}>
          <IgrGridToolbar>
            <IgrGridToolbarActions>
              <IgrGridToolbarPinning></IgrGridToolbarPinning>
              <IgrGridToolbarHiding></IgrGridToolbarHiding>
              <IgrGridToolbarExporter></IgrGridToolbarExporter>
            </IgrGridToolbarActions>
            <IgrGridToolbarTitle>
              <span key={uuid()}>Financial Portfolio</span>
            </IgrGridToolbarTitle>
          </IgrGridToolbar>
          <IgrColumn field="id" dataType="string" header="id" sortable="true" filterable="false" selectable="false"></IgrColumn>
          <IgrColumn field="holdingName" dataType="string" header="holdingName" sortable="true" filterable="false" selectable="false"></IgrColumn>
          <IgrColumn field="positions" dataType="number" header="positions" sortable="true" filterable="false" selectable="false"></IgrColumn>
          <IgrColumn field="holdingPeriod" dataType="number" header="holdingPeriod" sortable="true" filterable="false" selectable="false"></IgrColumn>
          <IgrColumn field="value.currentPrice" dataType="number" header="value currentPrice" sortable="true" filterable="false" selectable="false"></IgrColumn>
          <IgrColumn field="value.boughtPrice" dataType="number" header="value boughtPrice" sortable="true" filterable="false" selectable="false"></IgrColumn>
        </IgrGrid>
      </div>
    </>
  );
}
