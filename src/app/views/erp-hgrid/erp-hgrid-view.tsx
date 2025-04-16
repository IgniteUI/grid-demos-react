import { IgrCellTemplateContext, IgrColumn, IgrGridToolbar, IgrGridToolbarActions, IgrGridToolbarExporter, IgrGridToolbarHiding, IgrGridToolbarPinning, IgrGridToolbarTitle, IgrHierarchicalGrid, IgrRowIsland } from 'igniteui-react-grids';
import { IgrRating } from 'igniteui-react';
import { useGetTable1List as eRPProductsUseGetTable1List } from '../../hooks/erpproducts-hooks';

import styles from './erp-hgrid-view.module.css';
import createClassTransformer from '../../style-utils';

function ERPHGrid () {
  const classes = createClassTransformer(styles);
  const uuid = () => crypto.randomUUID();
  const { eRPProductsTable1 } = eRPProductsUseGetTable1List();

  const columnBodyTemplate = (ctx: { dataContext: IgrCellTemplateContext }) => {
    return (
      <>
        <IgrRating value={ctx.dataContext.cell.value} className={classes("rating")}></IgrRating>
      </>
    )
  }

  return (
    <div className={classes("row-layout erpinventory-container")}>
      <IgrHierarchicalGrid data={eRPProductsTable1} primaryKey="sku" rowSelection="multiple" allowFiltering={true} filterMode="quickFilter" className={classes("ig-typography ig-scrollbar hierarchical-grid")} key={uuid()}>
        <IgrGridToolbar>
          <IgrGridToolbarActions>
            <IgrGridToolbarPinning></IgrGridToolbarPinning>
            <IgrGridToolbarHiding></IgrGridToolbarHiding>
            <IgrGridToolbarExporter></IgrGridToolbarExporter>
          </IgrGridToolbarActions>
          <IgrGridToolbarTitle>
            <span key={uuid()}>Inventory</span>
          </IgrGridToolbarTitle>
        </IgrGridToolbar>
        <IgrRowIsland childDataKey="orders" primaryKey="orderId" allowFiltering={true} filterMode="excelStyleFilter" className={classes("ig-scrollbar")}>
          <IgrColumn field="orderId" dataType="number" header="orderId" sortable={true} selectable={false}></IgrColumn>
          <IgrColumn field="status" dataType="string" header="status" sortable={true} selectable={false}></IgrColumn>
        </IgrRowIsland>
        <IgrColumn field="sku" dataType="string" header="SKU" sortable={true} selectable={false}></IgrColumn>
        <IgrColumn field="imageUrl" dataType="image" header="Image" sortable={true} selectable={false}></IgrColumn>
        <IgrColumn field="productName" dataType="string" header="Product Name" sortable={true} selectable={false}></IgrColumn>
        <IgrColumn field="category" dataType="string" header="Category" sortable={true} selectable={false}></IgrColumn>
        <IgrColumn field="rating" dataType="number" header="Rating" sortable={true} bodyTemplate={columnBodyTemplate} selectable={false}></IgrColumn>
        <IgrColumn header="Sold Units Last Month" sortable={true} selectable={false} key="86f2766e-c724-4e27-bdc0-d17d845eb299"></IgrColumn>
        <IgrColumn header="Montly Sales Trends" sortable={true} selectable={false} key="bb1b0e09-b31c-4c2d-a985-155db4ad6906"></IgrColumn>
        <IgrColumn field="grossPrice" dataType="currency" header="Gross Price" sortable={true} selectable={false}></IgrColumn>
        <IgrColumn field="netPrice" dataType="currency" header="Net Price" sortable={true} selectable={false}></IgrColumn>
        <IgrColumn header="Net Profit" sortable={true} selectable={false} key="0a4cffbd-702e-4f7a-af19-4c3fac55f63e"></IgrColumn>
      </IgrHierarchicalGrid>
    </div>
  );
}

export default function ERPHGridView() {
  const classes = createClassTransformer(styles);

  return (
    <>
      <ERPHGrid />
    </>
  );
}
