import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Sample.tsx
import {
  IgrTreeGrid,
  IgrGridToolbar,
  IgrGridToolbarActions,
  IgrGridToolbarAdvancedFiltering,
  IgrGridToolbarHiding,
  IgrGridToolbarPinning,
  IgrGridToolbarExporter,
  IgrColumn,
  IgrPaginator,
  IgrCellTemplateContext
} from 'igniteui-react-grids';
import { IgrIcon, IgrAvatar, IgrIconButton, IgrButton } from 'igniteui-react';
import 'igniteui-react-grids/grids/combined';
import 'igniteui-react-grids/grids/themes/light/fluent.css';
import { DataService } from './services/data.service';

interface SampleState {
  data: any[];
  isSorted: boolean;
}


export default class Sample extends React.Component<object, SampleState> {
  private dataService: DataService;

  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      isSorted: false
    } as { data: any[]; isSorted: boolean };

    this.treeGridRef = this.treeGridRef.bind(this);
    this.clearSorting = this.clearSorting.bind(this);
    this.handleSortingChanged = this.handleSortingChanged.bind(this);

  }

  componentDidMount() {
    this.dataService.fetchData().then((data: any) => {
      this.setState({ data });
    });
  }


  public avatarTemplate = (props: { dataContext: IgrCellTemplateContext }) => {
    const data = props.dataContext.cell.row.data;
    return (
      <div className="employeeDiv">
        <IgrAvatar shape="rounded" src={data.Picture} />
        <span>{data.Name}</span>
      </div>
    );
  };

  public countryIconTemplate = (props: { dataContext: IgrCellTemplateContext }) => {
    const data = props.dataContext.cell.row.data;
    return (
      <div className="flagDiv">
        <IgrIcon collection="country-icons" name={data.Country} />
        <span>{data.Location}, {data.Country}</span>
      </div>
    );
  };

  public contactsTemplate = (props: { dataContext: IgrCellTemplateContext }) => {
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

  public dateTemplate = (props: { dataContext: IgrCellTemplateContext }) => {
    const data = props.dataContext.cell.row.data;
    const formattedDate = new Date(data.HireDate).toISOString().split('T')[0];
    return <>{formattedDate}</>;
  };

  private treeGridRef = (ref: IgrTreeGrid) => {
    if (ref) {
      this.setState({});
    }
  };

  private clearSorting = () => {
    const grid = document.getElementById('treeGrid') as IgrTreeGrid;
    if (grid) {
      grid.sortingExpressions = [];
    }
    this.setState({ isSorted: false });
  };

  private handleSortingChanged = () => {
    const grid = document.getElementById('treeGrid') as IgrTreeGrid;
    if (grid) {
      this.setState({ isSorted: grid.sortingExpressions.length > 0 });
    }
  };

  render() {
    return (
        <IgrTreeGrid
          id="treeGrid"
          autoGenerate={false}
          data={this.state.data}
          primaryKey="ID"
          childDataKey="Employees"
          rowSelection="multipleCascade"
          allowFiltering={true}
          filterMode="excelStyleFilter"
          className="gridStyle"
          onSortingExpressionsChange={this.handleSortingChanged}
          ref={this.treeGridRef}
        >
          <IgrPaginator perPage={20} />
          <IgrGridToolbar>
            <span slot="title">HR Portal</span>
            <IgrGridToolbarActions>
              {this.state.isSorted && (
                <div className="icon-button-group">
                  <IgrButton variant="flat" onClick={this.clearSorting}>
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

          <IgrColumn field="Name" width="300px" sortable={true} pinned={true} bodyTemplate={this.avatarTemplate} />
          <IgrColumn field="JobTitle" header="Job Title" dataType="string" minWidth="200px" sortable={true} />
          <IgrColumn field="Department" dataType="string" minWidth="200px" sortable={true} />
          <IgrColumn field="Location" dataType="string" sortable={true} bodyTemplate={this.countryIconTemplate} />
          <IgrColumn field="Contacts" dataType="string" minWidth="200px" filterable={false} bodyTemplate={this.contactsTemplate} />
          <IgrColumn field="HireDate" header="Hire Date" dataType="date" minWidth="100px" sortable={true} bodyTemplate={this.dateTemplate} />
          <IgrColumn field="GrossSalary" header="Gross Salary" dataType="currency" minWidth="100px" sortable={true} />
        </IgrTreeGrid>
    );
  }
}

// rendering above component in the React DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Sample/>);
