import { IgrAvatar, IgrIconButton, IgrRipple } from 'igniteui-react';
import { IgrCellTemplateContext, IgrColumn, IgrGridToolbar, IgrGridToolbarActions, IgrGridToolbarExporter, IgrGridToolbarHiding, IgrGridToolbarPinning, IgrGridToolbarTitle, IgrTreeGrid } from 'igniteui-react-grids';
import { useGetTable1List as hRDataUseGetTable1List } from '../../hooks/hrdata-hooks';
import createClassTransformer from '../../style-utils';

import styles from './hr-portal-view.module.css';
import lightFluent from 'igniteui-react-grids/grids/themes/light/fluent.css?inline';

export default function HrPortalView() {
  const classes = createClassTransformer(styles);
  const uuid = () => crypto.randomUUID();
  const { hRDataTable1 } = hRDataUseGetTable1List();

  const columnBodyTemplate = (ctx: { dataContext: IgrCellTemplateContext }) => {
    return (
      <>
        <IgrAvatar src={ctx.dataContext.cell.row.data.Picture} shape="circle" className={classes("avatar")}></IgrAvatar>
        <p className={classes("typography__body-1 text")}>
          <span>{ctx.dataContext.cell.value}</span>
        </p>
      </>
    )
  }

  const columnBodyTemplate1 = (ctx: { dataContext: IgrCellTemplateContext }) => {
    return (
      <>
        <p className={classes("typography__body-1 text_1")}>
          <span>{ctx.dataContext.cell.value}</span>
        </p>
        <p className={classes("typography__body-1 text_1")}>
          <span>,</span>
        </p>
        <p className={classes("typography__body-1 text_1")}>
          <span>{ctx.dataContext.cell.row.data.Country}</span>
        </p>
      </>
    )
  }

  const columnBodyTemplate2 = () => {
    return (
      <>
        <IgrIconButton variant="flat">
          <span className={classes("material-icons")} key={uuid()}>
            <span key={uuid()}>email</span>
          </span>
          <IgrRipple key={uuid()}></IgrRipple>
        </IgrIconButton>
        <IgrIconButton variant="flat">
          <span className={classes("material-icons")} key={uuid()}>
            <span key={uuid()}>phone</span>
          </span>
          <IgrRipple key={uuid()}></IgrRipple>
        </IgrIconButton>
        <IgrIconButton variant="flat">
          <span className={classes("imx-icon imx-linkedin")} key={uuid()}></span>
          <IgrRipple key={uuid()}></IgrRipple>
        </IgrIconButton>
      </>
    )
  }

  return (
    <>
      <style>
        {lightFluent}
      </style>
      <div className={classes("row-layout org-charthr-portal-container")}>
        <IgrTreeGrid data={hRDataTable1} primaryKey="ID" childDataKey="Employees" rowSelection="multiple" allowFiltering={true} filterMode="excelStyleFilter" className={classes("ig-typography ig-scrollbar tree-grid")} key={uuid()}>
          <IgrGridToolbar>
            <IgrGridToolbarActions>
              <IgrGridToolbarPinning></IgrGridToolbarPinning>
              <IgrGridToolbarHiding></IgrGridToolbarHiding>
              <IgrGridToolbarExporter></IgrGridToolbarExporter>
            </IgrGridToolbarActions>
            <IgrGridToolbarTitle>
              <span key={uuid()}>HR Portal</span>
            </IgrGridToolbarTitle>
          </IgrGridToolbar>
          <IgrColumn field="ID" dataType="number" header="ID" hidden={true} sortable={true} selectable={false}></IgrColumn>
          <IgrColumn field="Name" dataType="string" header="Name" width="300px" pinned={true} sortable={true} bodyTemplate={columnBodyTemplate} selectable={false}></IgrColumn>
          <IgrColumn field="JobTitle" dataType="string" header="Job Title" sortable={true} selectable={false}></IgrColumn>
          <IgrColumn field="Department" dataType="string" header="Department" sortable={true} selectable={false}></IgrColumn>
          <IgrColumn field="Location" dataType="string" header="Location" sortable={true} bodyTemplate={columnBodyTemplate1} selectable={false}></IgrColumn>
          <IgrColumn field="Contacts" dataType="string" header="Contacts" sortable={true} bodyTemplate={columnBodyTemplate2} selectable={false}></IgrColumn>
          <IgrColumn field="HireDate" dataType="date" header="HireDate" sortable={true} selectable={false}></IgrColumn>
          <IgrColumn field="GrossSalary" dataType="number" header="GrossSalary" sortable={true} selectable={false}></IgrColumn>
        </IgrTreeGrid>
      </div>
    </>
  );
}
