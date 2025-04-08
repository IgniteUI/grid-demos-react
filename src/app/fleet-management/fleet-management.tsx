import { IgrColumn, IgrGrid, IgrGridToolbar, IgrGridToolbarActions, IgrGridToolbarExporter, IgrGridToolbarHiding, IgrGridToolbarPinning, IgrGridToolbarTitle } from 'igniteui-react-grids';
import { useGetTable1List as vehiclesUseGetTable1List } from '../hooks/vehicles-hooks';
import createClassTransformer from '../style-utils';

IgrGridModule.register();

export default function FleetManagement() {
  const classes = createClassTransformer(styles);
  const uuid = () => crypto.randomUUID();
  const { vehiclesTable1 } = vehiclesUseGetTable1List();

  return (
    <>
      <div className={classes("row-layout fleet-management-container")}>
        <IgrGrid data={vehiclesTable1} primaryKey="vehicleId" className={classes("ig-typography ig-scrollbar grid")}>
          <IgrGridToolbar>
            <IgrGridToolbarActions>
              <IgrGridToolbarPinning></IgrGridToolbarPinning>
              <IgrGridToolbarHiding></IgrGridToolbarHiding>
              <IgrGridToolbarExporter></IgrGridToolbarExporter>
            </IgrGridToolbarActions>
            <IgrGridToolbarTitle>
              <span key={uuid()}>Fleet Management</span>
            </IgrGridToolbarTitle>
          </IgrGridToolbar>
          <IgrColumn field="vehicleId" dataType="string" header="Vehicle ID" sortable={true} filterable={false} selectable={false}></IgrColumn>
          <IgrColumn field="licensePlate" dataType="string" header="License Plate" sortable={true} filterable={false} selectable={false}></IgrColumn>
          <IgrColumn field="make" dataType="string" header="Make" sortable={true} filterable={false} selectable={false}></IgrColumn>
          <IgrColumn field="model" dataType="string" header="Model" sortable={true} filterable={false} selectable={false}></IgrColumn>
          <IgrColumn field="type" dataType="string" header="Type" sortable={true} filterable={false} selectable={false}></IgrColumn>
          <IgrColumn field="vin" dataType="string" header="VIN" sortable={true} filterable={false} selectable={false}></IgrColumn>
          <IgrColumn field="status" dataType="string" header="Status" sortable={true} filterable={false} selectable={false}></IgrColumn>
          <IgrColumn field="locationCity" dataType="string" header="Location (City)" sortable={true} filterable={false} selectable={false}></IgrColumn>
          <IgrColumn field="locationGps" dataType="string" header="Location (GPS)" sortable={true} filterable={false} selectable={false}></IgrColumn>
        </IgrGrid>
      </div>
    </>
  );
}
