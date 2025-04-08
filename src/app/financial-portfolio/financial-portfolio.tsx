import { IgrAvatar } from 'igniteui-react';
import { IgrCellTemplateContext, IgrColumn, IgrGrid, IgrGridToolbar, IgrGridToolbarActions, IgrGridToolbarExporter, IgrGridToolbarHiding, IgrGridToolbarPinning, IgrGridToolbarTitle } from 'igniteui-react-grids';
import { useGetTable1List as financeUseGetTable1List } from '../hooks/finance-hooks';
import createClassTransformer from '../style-utils';

IgrAvatarModule.register();
IgrGridModule.register();

export default function FinancialPortfolio() {
  const classes = createClassTransformer(styles);
  const uuid = () => crypto.randomUUID();
  const { financeTable1 } = financeUseGetTable1List();

  const columnBodyTemplate = (ctx: { dataContext: IgrCellTemplateContext }) => {
    return (
      <>
        <IgrAvatar src="/src/assets/Zoom.png" shape="rounded" className={classes("avatar")}></IgrAvatar>
        <p className={classes("typography__body-1 text")}>
          <span>{ctx.dataContext.cell.value}</span>
        </p>
      </>
    )
  }

  const columnBodyTemplate1 = (ctx: { dataContext: IgrCellTemplateContext }) => {
    return (
      <>
        <p className={classes("typography__body-1 text")}>
          <span>{ctx.dataContext.cell.value}</span>
        </p>
        <p className={classes("typography__body-1 text")}>
          <span> days</span>
        </p>
      </>
    )
  }

  return (
    <>
      <div className={classes("row-layout financial-portfolio-container")}>
        <IgrGrid data={financeTable1} primaryKey="id" rowSelection="multiple" className={classes("ig-typography ig-scrollbar grid")} key={uuid()}>
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
          <IgrColumn field="id" dataType="string" header="Symbol" sortable={true} filterable={false} selectable={false}></IgrColumn>
          <IgrColumn field="holdingName" dataType="string" header="holdingName" sortable={true} bodyTemplate={columnBodyTemplate} filterable={false} selectable={false}></IgrColumn>
          <IgrColumn field="positions" dataType="number" header="Positions" sortable={true} filterable={false} selectable={false}></IgrColumn>
          <IgrColumn field="value.boughtPrice" dataType="currency" header="Average Cost/Share" sortable={true} filterable={false} selectable={false}></IgrColumn>
          <IgrColumn field="value.currentPrice" dataType="currency" header="Last Price" sortable={true} filterable={false} selectable={false}></IgrColumn>
          <IgrColumn header="Daily Change %" sortable={true} filterable={false} selectable={false} key="edd5fd57-f366-41a7-ab71-4f54f6ebd8a4"></IgrColumn>
          <IgrColumn header="Market Value" sortable={true} filterable={false} selectable={false} key="20ffb91b-55c9-4294-8286-0de1c30febeb"></IgrColumn>
          <IgrColumn header="NET Profit/Loss" sortable={true} filterable={false} selectable={false} key="7aaf09c0-8ee8-4f54-b0bf-6c124aed404e"></IgrColumn>
          <IgrColumn header="NET Profit/Loss %" sortable={true} filterable={false} selectable={false} key="0305822a-4055-45f0-9319-31b73605aee8"></IgrColumn>
          <IgrColumn header="Allocation" sortable={true} filterable={false} selectable={false} key="46776679-446b-41bd-8db3-dbe47a7e1e45"></IgrColumn>
          <IgrColumn field="holdingPeriod" dataType="number" header="Holding Period" sortable={true} bodyTemplate={columnBodyTemplate1} filterable={false} selectable={false}></IgrColumn>
        </IgrGrid>
      </div>
    </>
  );
}
