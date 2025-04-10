import React, { useState, useEffect, useCallback, useRef } from 'react';
import './hr-portal.scss';

import {
  IgrTreeGrid,
  IgrGridToolbar,
  IgrGridToolbarTitle,
  IgrGridToolbarActions,
  IgrGridToolbarAdvancedFiltering,
  IgrGridToolbarHiding,
  IgrGridToolbarPinning,
  IgrGridToolbarExporter,
  IgrColumn,
  IgrPaginator,
  IgrCellTemplateContext,
} from 'igniteui-react-grids';
import { IgrIcon, IgrAvatar, IgrIconButton, IgrButton, registerIcon } from 'igniteui-react';
import 'igniteui-react-grids/grids/combined';
import 'igniteui-react-grids/grids/themes/light/fluent.css';
import { DataService } from './../services/data.service';
import { icons } from '../data/icons/Icons'

export default function HRPortal() {
  const [data, setData] = useState<any[]>([]);
  const [isSorted, setIsSorted] = useState(false);
  const dataService = React.useMemo(() => new DataService(), []);

  const gridRef = useRef<IgrTreeGrid | null>(null);

  useEffect(() => {
    dataService.fetchData().then((fetchedData: any) => {
      setData(fetchedData);
    });

    icons.forEach((element: { name: string; path: string; category: string }) => {
      registerIcon(element.name, element.path, element.category);
    });
  }, [dataService]);

  const avatarTemplate = (props: { dataContext: IgrCellTemplateContext }) => {
    const data = props.dataContext.cell.row.data;
    return (
      <div className="employeeDiv">
        <IgrAvatar shape="rounded" src={data.Picture} className="small" />
        <span>{data.Name}</span>
      </div>
    );
  };

  const countryIconTemplate = (props: { dataContext: IgrCellTemplateContext }) => {
    const data = props.dataContext.cell.row?.data;
    if (!data) {
      return <div>No Data</div>; // Fallback for missing data
    }
    return (
      <div className="flagDiv">
        <IgrIcon collection="country-icons" name={data.Country} />
        <span>{data.Location}, {data.Country}</span>
      </div>
    );
  };

  const contactsTemplate = (props: { dataContext: IgrCellTemplateContext }) => {
    const data = props.dataContext.cell.row.data;
    return (
      <div className="center-content small">
        <a href={`mailto:${data.Email}`}>
          <IgrIconButton collection="hr-icons" name="mail" variant="flat" />
        </a>
        <a href={`tel:${data.Phone}`}>
          <IgrIconButton collection="hr-icons" name="tel" variant="flat" />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
          <IgrIconButton collection="hr-icons" name="linkedIn" variant="flat" />
        </a>
      </div>
    );
  };

  const dateTemplate = (props: { dataContext: IgrCellTemplateContext }) => {
    const data = props.dataContext.cell.row.data;
    const formattedDate = new Date(data.HireDate).toISOString().split('T')[0];
    return <>{formattedDate}</>;
  };

  const clearSorting = useCallback(() => {
    if (gridRef.current) {
      gridRef.current.sortingExpressions = [];
    }
    setIsSorted(false);
  }, []);

  const handleSortingChanged = useCallback(() => {
    const grid = document.getElementById('treeGrid') as IgrTreeGrid;
    if (grid) {
      setIsSorted(grid.sortingExpressions.length > 0);
    }
  }, []);

  return (
    <div className="rootDiv ig-typography">
    <IgrTreeGrid
      id="treeGrid"
      autoGenerate={false}
      ref={gridRef}
      data={data}
      primaryKey="ID"
      childDataKey="Employees"
      rowSelection="multipleCascade"
      allowFiltering={true}
      filterMode="excelStyleFilter"
      className="gridStyle"
      onSortingExpressionsChange={handleSortingChanged}
    >
      <IgrPaginator perPage={20} />
      <IgrGridToolbar>
      <IgrGridToolbarTitle key="toolbarTitle">
        <span key="toolbarTitleText">HR Portal</span>
      </IgrGridToolbarTitle>
        <IgrGridToolbarActions>
          {isSorted && (
            <div className="icon-button-group">
              <IgrButton variant="flat" onClick={clearSorting}>
                <IgrIcon name="close" collection="hr-icons" className="medium" />
                Clear Sort
              </IgrButton>
            </div>
          )}
          <IgrGridToolbarHiding />
          <IgrGridToolbarPinning />
          <IgrGridToolbarExporter><span slot="excelText">Export</span></IgrGridToolbarExporter>
          <IgrGridToolbarAdvancedFiltering />
        </IgrGridToolbarActions>
      </IgrGridToolbar>

      <IgrColumn field="Name" width="300px" sortable={true} pinned={true} bodyTemplate={avatarTemplate} />
      <IgrColumn field="JobTitle" header="Job Title" dataType="string" minWidth="200px" sortable={true} />
      <IgrColumn field="Department" dataType="string" minWidth="200px" sortable={true} />
      <IgrColumn field="Location" dataType="string" sortable={true} bodyTemplate={countryIconTemplate} />
      <IgrColumn field="Contacts" dataType="string" minWidth="200px" filterable={false} bodyTemplate={contactsTemplate} />
      <IgrColumn field="HireDate" header="Hire Date" dataType="date" minWidth="100px" sortable={true} bodyTemplate={dateTemplate} />
      <IgrColumn field="GrossSalary" header="Gross Salary" dataType="currency" minWidth="100px" sortable={true} />
    </IgrTreeGrid>
    </div>
  );
};

