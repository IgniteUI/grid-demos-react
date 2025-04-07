import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { IgrChip, IgrIcon, IgrIconButton, IgrRipple, registerIcon } from 'igniteui-react';
import 'igniteui-react-grids/grids/themes/light/material.css';
import './home-view.scss';

import FILE_DOWNLOAD from '../data/icons/file_download.svg';

export interface TabInfo {
  title: string;
  theme: string;
  content: string;
  moreLink: string;
  downloadLink: string;
}

interface TabItemProps {
  isActive?: boolean,
  tabInfo?: TabInfo,
}

export function TabItem({isActive, tabInfo}: TabItemProps) {

  function onLinkClick(event: any) {
    const targetHTML = event.currentTarget as HTMLAnchorElement;
    window.open(targetHTML.href, "_blank")?.focus();
    event.preventDefault();
    event.stopPropagation();
  }

  function onDownloadClick(event: any) {
    const downloadLink = tabInfo?.downloadLink;
    window.open(downloadLink, "_blank")?.focus();
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <div className="tab-item-container">
      <div className={"tab-item" + (isActive ? " tab-item--selected": "") }>
        <div className={"tab-header" + (!isActive ? " tab-header--disabled" : "" )}>
          {tabInfo?.title}
          <IgrChip disabled={!isActive}><span key='chipText'>{tabInfo?.theme}</span></IgrChip>
        </div>
        <div className={"tab-content" + (!isActive ? " tab-content--disabled" : "")}>
          <span>{tabInfo?.content}</span>
        </div>
        <div className="tab-actions">
          <a className={"learn-text" + (!isActive ? " link--disabled" : "" )} href={tabInfo?.moreLink} onClick={onLinkClick}>Learn more</a>
          <div className="tooltip">
            <IgrIconButton className={"button" + (isActive ? "--enabled" : "--disabled")} onClick={onDownloadClick}>
                <IgrRipple key='downloadRipple'></IgrRipple>
                <IgrIcon key='downloadIcon' name="file_download" collection="custom"></IgrIcon>
            </IgrIconButton>
            <span className="tooltip--text">Download sample.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HomeView() {
  const tabInfo = new Map<string, TabInfo>([
    [
      "inventory",
      {
        title: "ERP/ Inventory",
        theme: "Material Light",
        content: "Tracking and managing quantity, location and details of products in stock.",
        moreLink: "https://www.infragistics.com/products/ignite-ui-angular/angular/components/hierarchicalgrid/hierarchical-grid",
        downloadLink: "https://www.infragistics.com/resources/sample-applications/erp-inventory-sample-app",
      },
    ],
    [
      "hr-portal",
      {
        title: "Org Chart/HR Portal",
        theme: "Fluent Light",
        content: "Displaying company's hierarchical structure and showing employees data.",
        moreLink: "https://www.infragistics.com/products/ignite-ui-angular/angular/components/treegrid/tree-grid",
        downloadLink: "https://www.infragistics.com/resources/sample-applications/org-charthr-portal-sample-app",
      },
    ],
    [
      "finance",
      {
        title: "Financial Portfolio",
        theme: "Bootstrap Light",
        content: "Asset tracking, profit and loss analysis, featuring interactive dynamic charts.",
        moreLink: "https://www.infragistics.com/products/ignite-ui-angular/angular/components/grid/grid",
        downloadLink: "https://www.infragistics.com/resources/sample-applications/financial-portfolio-sample-app",
      },
    ],
    [
      "sales",
      {
        title: "Sales Dashboard",
        theme: "Indigo Light",
        content: "For trend analysis, KPIs and viewing sales summaries by region, product, etc.",
        moreLink: "https://www.infragistics.com/products/ignite-ui-angular/angular/components/pivotGrid/pivot-grid",
        downloadLink: "https://www.infragistics.com/resources/sample-applications/sales-grid-sample-app",
      },
    ],
    [
      "fleet",
      {
        title: "Fleet Management",
        theme: "Material Dark",
        content: "A master-detail grid for managing vehicle acquisition, operations, and maintenance.",
        moreLink: "https://www.infragistics.com/products/ignite-ui-angular/angular/components/grid/master-detail",
        downloadLink: "https://www.infragistics.com/resources/sample-applications/fleet-management-sample-app",
      },
    ],
  ]);

  useEffect(() => {
    registerIcon("file_download", FILE_DOWNLOAD, "custom");
  }, []);

  return (
    <div className="demo-container">
      <div className="tab-container ">
        {['inventory', 'hr-portal', 'finance', 'sales', 'fleet'].map(tabName =>
          <NavLink to={`/home/${tabName}`}>
            {({ isActive }) => (
              <TabItem key={tabName} isActive={isActive} tabInfo={tabInfo.get(tabName)}/>
            )}
          </NavLink>
        )}
      </div>
      <div className="router-container">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
