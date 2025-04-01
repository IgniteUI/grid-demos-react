import { IgrChip, IgrChipModule, IgrIconButton, IgrIconButtonModule, IgrRipple, IgrRippleModule } from 'igniteui-react';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './app.module.css';
import createClassTransformer from './style-utils';

IgrChipModule.register();
IgrIconButtonModule.register();
IgrRippleModule.register();

export default function App() {
  const classes = createClassTransformer(styles);
  const uuid = () => crypto.randomUUID();
  const navigate = useNavigate();

  return (
    <>
      <div className={classes("column-layout master-view-container")}>
        <div className={classes("row-layout group")}>
          <div onClick={() => navigate(`/erpinventory`)} className={classes("column-layout group_1")}>
            <div className={classes("row-layout group_2")}>
              <h5 className={classes("content")}>
                <span>ERP/Inventory</span>
              </h5>
              <IgrChip className={classes("chip")}>
                <span key={uuid()}>Material Light</span>
              </IgrChip>
            </div>
            <div className={classes("row-layout group_2")}>
              <p className={classes("typography__body-1 content")}>
                <span>Tracking and managing quantity, location and details of products in stock.</span>
              </p>
            </div>
            <div className={classes("row-layout group_3")}>
              <a href="https://www.infragistics.com/products/ignite-ui-angular/angular/components/hierarchicalgrid/hierarchical-grid" className={classes("typography__body-1 hyperlink")}>
                <span>Learn more</span>
              </a>
              <IgrIconButton variant="flat">
                <span className={classes("material-icons")} key={uuid()}>
                  <span key={uuid()}>file_download</span>
                </span>
                <IgrRipple key={uuid()}></IgrRipple>
              </IgrIconButton>
            </div>
          </div>
          <div onClick={() => navigate(`/org-chart-hr-portal`)} className={classes("column-layout group_1")}>
            <div className={classes("row-layout group_2")}>
              <h5 className={classes("content")}>
                <span>Org Chart/HR Portal</span>
              </h5>
              <IgrChip className={classes("chip")}>
                <span key={uuid()}>Fluent Light</span>
              </IgrChip>
            </div>
            <div className={classes("row-layout group_2")}>
              <p className={classes("typography__body-1 content")}>
                <span>Displaying company's hierarchical structure and showing employees data.</span>
              </p>
            </div>
            <div className={classes("row-layout group_3")}>
              <a href="https://www.infragistics.com/products/ignite-ui-angular/angular/components/treegrid/tree-grid" className={classes("typography__body-1 hyperlink")}>
                <span>Learn more</span>
              </a>
              <IgrIconButton variant="flat">
                <span className={classes("material-icons")} key={uuid()}>
                  <span key={uuid()}>file_download</span>
                </span>
                <IgrRipple key={uuid()}></IgrRipple>
              </IgrIconButton>
            </div>
          </div>
          <div onClick={() => navigate(`/financial-portfolio`)} className={classes("column-layout group_1")}>
            <div className={classes("row-layout group_2")}>
              <h5 className={classes("content")}>
                <span>Financial Portfolio</span>
              </h5>
              <IgrChip className={classes("chip")}>
                <span key={uuid()}>Bootstrap Light</span>
              </IgrChip>
            </div>
            <div className={classes("row-layout group_2")}>
              <p className={classes("typography__body-1 content")}>
                <span>Asset tracking, profit and loss analysis, featuring interactive dynamic charts.</span>
              </p>
            </div>
            <div className={classes("row-layout group_3")}>
              <a href="https://www.infragistics.com/products/ignite-ui-angular/angular/components/grid/grid" className={classes("typography__body-1 hyperlink")}>
                <span>Learn more</span>
              </a>
              <IgrIconButton variant="flat">
                <span className={classes("material-icons")} key={uuid()}>
                  <span key={uuid()}>file_download</span>
                </span>
                <IgrRipple key={uuid()}></IgrRipple>
              </IgrIconButton>
            </div>
          </div>
          <div onClick={() => navigate(`/sales-dashboard`)} className={classes("column-layout group_1")}>
            <div className={classes("row-layout group_2")}>
              <h5 className={classes("content")}>
                <span>Sales Dashboard</span>
              </h5>
              <IgrChip className={classes("chip")}>
                <span key={uuid()}>Indigo Light</span>
              </IgrChip>
            </div>
            <div className={classes("row-layout group_2")}>
              <p className={classes("typography__body-1 content")}>
                <span>For trend analysis, KPIs and viewing sales summaries by region, product, etc.</span>
              </p>
            </div>
            <div className={classes("row-layout group_3")}>
              <a href="https://www.infragistics.com/products/ignite-ui-angular/angular/components/pivotGrid/pivot-grid" className={classes("typography__body-1 hyperlink")}>
                <span>Learn more</span>
              </a>
              <IgrIconButton variant="flat">
                <span className={classes("material-icons")} key={uuid()}>
                  <span key={uuid()}>file_download</span>
                </span>
                <IgrRipple key={uuid()}></IgrRipple>
              </IgrIconButton>
            </div>
          </div>
          <div onClick={() => navigate(`/fleet-management`)} className={classes("column-layout group_1")}>
            <div className={classes("row-layout group_2")}>
              <h5 className={classes("content")}>
                <span>Fleet Management</span>
              </h5>
              <IgrChip className={classes("chip")}>
                <span key={uuid()}>Material Dark</span>
              </IgrChip>
            </div>
            <div className={classes("row-layout group_2")}>
              <p className={classes("typography__body-1 content")}>
                <span>A master-detail grid for managing vehicle acquisition, operations, and maintenance.</span>
              </p>
            </div>
            <div className={classes("row-layout group_3")}>
              <a href="https://www.infragistics.com/products/ignite-ui-angular/angular/components/grid/master-detail" className={classes("typography__body-1 hyperlink")}>
                <span>Learn more</span>
              </a>
              <IgrIconButton variant="flat">
                <span className={classes("material-icons")} key={uuid()}>
                  <span key={uuid()}>file_download</span>
                </span>
                <IgrRipple key={uuid()}></IgrRipple>
              </IgrIconButton>
            </div>
          </div>
        </div>
        <div className={classes("column-layout group_4")}>
          <div className={classes("view-container")}>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
}
