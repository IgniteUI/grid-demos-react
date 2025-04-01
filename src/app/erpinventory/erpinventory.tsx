import { IgrColumn, IgrGridToolbar, IgrGridToolbarActions, IgrGridToolbarExporter, IgrGridToolbarHiding, IgrGridToolbarPinning, IgrGridToolbarTitle, IgrHierarchicalGrid, IgrHierarchicalGridModule, IgrRowIsland } from 'igniteui-react-grids';
import { useGetTable1List as eRPProductsUseGetTable1List } from '../hooks/erpproducts-hooks';
import 'igniteui-react-grids/grids/combined.js';
import styles from './erpinventory.module.css';
import createClassTransformer from '../style-utils';

IgrHierarchicalGridModule.register();

export default function ERPInventory() {
  const classes = createClassTransformer(styles);
  const uuid = () => crypto.randomUUID();
  const { eRPProductsTable1 } = eRPProductsUseGetTable1List();

  return (
    <>
      <div className={classes("row-layout erpinventory-container")}>
        <IgrHierarchicalGrid data={eRPProductsTable1} primaryKey="sku" rowSelection="multiple" allowFiltering="true" filterMode="quickFilter" className={classes("ig-typography ig-scrollbar hierarchical-grid")}>
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
          <IgrRowIsland childDataKey="orders" primaryKey="orderId" allowFiltering="true" filterMode="excelStyleFilter" className={classes("ig-scrollbar")}>
            <IgrColumn field="orderId" dataType="number" header="orderId" sortable="true" selectable="false"></IgrColumn>
            <IgrColumn field="status" dataType="string" header="status" sortable="true" selectable="false"></IgrColumn>
          </IgrRowIsland>
          <IgrColumn field="sku" dataType="string" header="sku" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="imageUrl" dataType="string" header="imageUrl" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="productName" dataType="string" header="productName" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="category" dataType="string" header="category" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="rating" dataType="number" header="rating" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="grossPrice" dataType="number" header="grossPrice" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="netPrice" dataType="number" header="netPrice" sortable="true" selectable="false"></IgrColumn>
        </IgrHierarchicalGrid>
      </div>
    </>
  );
}
