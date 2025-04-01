import { IgrColumn, IgrGridToolbar, IgrGridToolbarActions, IgrGridToolbarExporter, IgrGridToolbarHiding, IgrGridToolbarPinning, IgrGridToolbarTitle, IgrTreeGrid, IgrTreeGridModule } from 'igniteui-react-grids';
import { useGetTable1List as hRDataUseGetTable1List } from '../hooks/hrdata-hooks';
import 'igniteui-react-grids/grids/combined.js';
import styles from './org-chart-hr-portal.module.css';
import createClassTransformer from '../style-utils';

IgrTreeGridModule.register();

export default function OrgChartHRPortal() {
  const classes = createClassTransformer(styles);
  const uuid = () => crypto.randomUUID();
  const { hRDataTable1 } = hRDataUseGetTable1List();

  return (
    <>
      <div className={classes("row-layout org-charthr-portal-container")}>
        <IgrTreeGrid data={hRDataTable1} primaryKey="ID" childDataKey="Employees" rowSelection="multiple" allowFiltering="true" filterMode="excelStyleFilter" className={classes("ig-typography ig-scrollbar tree-grid")}>
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
          <IgrColumn field="ID" dataType="number" header="ID" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Name" dataType="string" header="Name" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="JobTitle" dataType="string" header="JobTitle" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Department" dataType="string" header="Department" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Location" dataType="string" header="Location" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Country" dataType="string" header="Country" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="GrossSalary" dataType="number" header="GrossSalary" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Phone" dataType="string" header="Phone" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Contacts" dataType="string" header="Contacts" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Picture" dataType="string" header="Picture" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Age" dataType="number" header="Age" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="HireDate" dataType="date" header="HireDate" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Employees" dataType="array" header="Employees" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="ID" dataType="number" header="Employees ID" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Name" dataType="string" header="Employees Name" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="JobTitle" dataType="string" header="Employees JobTitle" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Department" dataType="string" header="Employees Department" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Location" dataType="string" header="Employees Location" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Country" dataType="string" header="Employees Country" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="GrossSalary" dataType="number" header="Employees GrossSalary" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Phone" dataType="string" header="Employees Phone" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Contacts" dataType="string" header="Employees Contacts" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Picture" dataType="string" header="Employees Picture" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Age" dataType="number" header="Employees Age" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="HireDate" dataType="date" header="Employees HireDate" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Employees" dataType="array" header="Employees Employees" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="ID" dataType="number" header="Employees Employees ID" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Name" dataType="string" header="Employees Employees Name" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="JobTitle" dataType="string" header="Employees Employees JobTitle" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Department" dataType="string" header="Employees Employees Department" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Location" dataType="string" header="Employees Employees Location" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Country" dataType="string" header="Employees Employees Country" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="GrossSalary" dataType="number" header="Employees Employees GrossSalary" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Phone" dataType="string" header="Employees Employees Phone" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Contacts" dataType="string" header="Employees Employees Contacts" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Picture" dataType="string" header="Employees Employees Picture" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Age" dataType="number" header="Employees Employees Age" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="HireDate" dataType="date" header="Employees Employees HireDate" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Employees" dataType="array" header="Employees Employees Employees" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="ID" dataType="number" header="Employees Employees Employees ID" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Name" dataType="string" header="Employees Employees Employees Name" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="JobTitle" dataType="string" header="Employees Employees Employees JobTitle" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Department" dataType="string" header="Employees Employees Employees Department" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Location" dataType="string" header="Employees Employees Employees Location" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Country" dataType="string" header="Employees Employees Employees Country" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="GrossSalary" dataType="number" header="Employees Employees Employees GrossSalary" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Phone" dataType="string" header="Employees Employees Employees Phone" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Contacts" dataType="string" header="Employees Employees Employees Contacts" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Picture" dataType="string" header="Employees Employees Employees Picture" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="Age" dataType="number" header="Employees Employees Employees Age" sortable="true" selectable="false"></IgrColumn>
          <IgrColumn field="HireDate" dataType="date" header="Employees Employees Employees HireDate" sortable="true" selectable="false"></IgrColumn>
        </IgrTreeGrid>
      </div>
    </>
  );
}
