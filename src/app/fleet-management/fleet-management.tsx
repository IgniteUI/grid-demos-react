import { IgrColumn, IgrGrid, IgrGridModule, IgrGridToolbar, IgrGridToolbarActions, IgrGridToolbarExporter, IgrGridToolbarHiding, IgrGridToolbarPinning, IgrGridToolbarTitle } from 'igniteui-react-grids';
import { useGetTable1List as vehiclesUseGetTable1List } from '../hooks/vehicles-hooks';
import 'igniteui-react-grids/grids/combined.js';
import styles from './fleet-management.module.css';
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
          <IgrColumn field="vehicleId" dataType="string" header="vehicleId" sortable="true" filterable="false" selectable="false"></IgrColumn>
          <IgrColumn field="licensePlate" dataType="string" header="licensePlate" sortable="true" filterable="false" selectable="false"></IgrColumn>
          <IgrColumn field="make" dataType="string" header="make" sortable="true" filterable="false" selectable="false"></IgrColumn>
          <IgrColumn field="model" dataType="string" header="model" sortable="true" filterable="false" selectable="false"></IgrColumn>
          <IgrColumn field="type" dataType="string" header="type" sortable="true" filterable="false" selectable="false"></IgrColumn>
          <IgrColumn field="vin" dataType="string" header="vin" sortable="true" filterable="false" selectable="false"></IgrColumn>
          <IgrColumn field="status" dataType="string" header="status" sortable="true" filterable="false" selectable="false"></IgrColumn>
          <IgrColumn field="locationCity" dataType="string" header="locationCity" sortable="true" filterable="false" selectable="false"></IgrColumn>
          <IgrColumn field="locationGps" dataType="string" header="locationGps" sortable="true" filterable="false" selectable="false"></IgrColumn>
          <IgrColumn field="details.generation" dataType="string" header="details generation" sortable="true" filterable="false" selectable="false"></IgrColumn>
          <IgrColumn field="details.yearOfManufacture" dataType="number" header="details yearOfManufacture" sortable="true" filterable="false" selectable="false"></IgrColumn>
          <IgrColumn field="details.fuelType" dataType="string" header="details fuelType" sortable="true" filterable="false" selectable="false"></IgrColumn>
          <IgrColumn field="details.doors" dataType="number" header="details doors" sortable="true" filterable="false" selectable="false"></IgrColumn>
          <IgrColumn field="details.seats" dataType="number" header="details seats" sortable="true" filterable="false" selectable="false"></IgrColumn>
          <IgrColumn field="details.transmission" dataType="string" header="details transmission" sortable="true" filterable="false" selectable="false"></IgrColumn>
          <IgrColumn field="details.engine" dataType="string" header="details engine" sortable="true" filterable="false" selectable="false"></IgrColumn>
          <IgrColumn field="details.power" dataType="string" header="details power" sortable="true" filterable="false" selectable="false"></IgrColumn>
          <IgrColumn field="details.mileage" dataType="string" header="details mileage" sortable="true" filterable="false" selectable="false"></IgrColumn>
          <IgrColumn field="details.cubature" dataType="string" header="details cubature" sortable="true" filterable="false" selectable="false"></IgrColumn>
          <IgrColumn field="details.color" dataType="string" header="details color" sortable="true" filterable="false" selectable="false"></IgrColumn>
          <IgrColumn field="details.msrp" dataType="string" header="details msrp" sortable="true" filterable="false" selectable="false"></IgrColumn>
          <IgrColumn field="details.tollPassId" dataType="string" header="details tollPassId" sortable="true" filterable="false" selectable="false"></IgrColumn>
        </IgrGrid>
      </div>
    </>
  );
}
