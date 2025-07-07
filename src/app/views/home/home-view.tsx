import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { IgrButton, IgrIcon, registerIcon } from 'igniteui-react';
import 'igniteui-react-grids/grids/themes/light/material.css';
import './home-view.scss';

import FILE_DOWNLOAD from '../../data/icons/file_download.svg';
import VIEW_MORE from '../../data/icons/view_more.svg';
import FULL_SCREEN from '../../data/icons/full_screen.svg';

export interface TabInfo {
  title: string;
  content: string;
  theme: string;
  themeMode: string;
  moreLink: string;
  downloadLink: string;
}

interface TabItemProps {
  isActive?: boolean,
  tabInfo?: TabInfo,
}

interface TabItemInfoProps {
  tabName: string;
  tabInfo: Map<string, TabInfo>;
  onDownloadClick: (event: MouseEvent, tabName: string) => void;
  onViewMoreClick: (event: MouseEvent, tabName: string) => void;
  onFullscreenClick: (event: MouseEvent) => void;
}

export function TabItem({isActive, tabInfo}: TabItemProps) {

  return (
    <div className="tab-item-container">
      <div className={"tab-item" + (isActive ? " tab-item--selected": "") }>
        <div className={"tab-header" + (!isActive ? " tab-header--disabled" : "" )}>
          {tabInfo?.title.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export function TabItemInfo({
  tabName,
  tabInfo,
  onDownloadClick,
  onViewMoreClick,
  onFullscreenClick,
}: TabItemInfoProps) {
  const info = tabInfo.get(tabName);

  return (
    <div className="current-tab-info">
      <div className="sample-info">
        <div className="tab-header">{info?.title}</div>
        <div className="tab-description">{info?.content}</div>
      </div>

      <div className="sample-actions">
        <div className="theme-info">Theme: {info?.theme}</div>
        <div className="theme-info">Mode: {info?.themeMode}</div>

        <div>
          <IgrButton
            variant="outlined"
            className="custom-button"
            style={{ marginRight: '8px' }}
            onClick={(e) => onDownloadClick(e.nativeEvent as MouseEvent, tabName)}
          >
            <IgrIcon key='downloadIcon' name="file_download" collection="custom"></IgrIcon>
            Download
          </IgrButton>

          <IgrButton
            variant="outlined"
            className="custom-button"
            style={{ marginRight: '8px' }}
            onClick={(e) => onViewMoreClick(e.nativeEvent as MouseEvent, tabName)}
          >
            <IgrIcon key='viewMoreIcon' name="view_more" collection="custom"></IgrIcon>
            View More
          </IgrButton>

          <IgrButton variant="outlined" className="custom-button" onClick={(e) => onFullscreenClick(e.nativeEvent as MouseEvent)}>
            <IgrIcon key='fullscreenIcon' name="full_screen" collection="custom"></IgrIcon>
            Fullscreen
          </IgrButton>
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
        theme: "Material",
        themeMode: 'Light',
        content: "Tracking and managing quantity, location and details of products in stock.",
        moreLink: "https://www.infragistics.com/products/ignite-ui-angular/angular/components/hierarchicalgrid/hierarchical-grid",
        downloadLink: "https://www.infragistics.com/resources/sample-applications/erp-inventory-sample-app-react",
      },
    ],
    [
      "hr-portal",
      {
        title: "Org Chart/HR Portal",
        theme: "Fluent",
        themeMode: 'Light',
        content: "Displaying company's hierarchical structure and showing employees data.",
        moreLink: "https://www.infragistics.com/products/ignite-ui-angular/angular/components/treegrid/tree-grid",
        downloadLink: "https://www.infragistics.com/resources/sample-applications/org-charthr-portal-sample-app-react",
      },
    ],
    [
      "finance",
      {
        title: "Financial Portfolio",
        theme: "Bootstrap",
        themeMode: 'Light',
        content: "Asset tracking, profit and loss analysis, featuring interactive dynamic charts.",
        moreLink: "https://www.infragistics.com/products/ignite-ui-angular/angular/components/grid/grid",
        downloadLink: "https://www.infragistics.com/resources/sample-applications/financial-portfolio-sample-app-react",
      },
    ],
    [
      "sales",
      {
        title: "Sales Dashboard",
        theme: "Indigo",
        themeMode: 'Light',
        content: "For trend analysis, KPIs and viewing sales summaries by region, product, etc.",
        moreLink: "https://www.infragistics.com/products/ignite-ui-angular/angular/components/pivotGrid/pivot-grid",
        downloadLink: "https://www.infragistics.com/resources/sample-applications/sales-grid-sample-app-react",
      },
    ],
    [
      "fleet",
      {
        title: "Fleet Management",
        theme: "Material",
        themeMode: 'Dark',
        content: "A master-detail grid for managing vehicle acquisition, operations, and maintenance.",
        moreLink: "https://www.infragistics.com/products/ignite-ui-angular/angular/components/grid/master-detail",
        downloadLink: "https://www.infragistics.com/resources/sample-applications/fleet-management-sample-app-react",
      },
    ],
  ]);
  const location = useLocation();
  const [gridView, setGridView] = useState("inventory");

  useEffect(() => {
    registerIcon("file_download", FILE_DOWNLOAD, "custom");
    registerIcon("view_more", VIEW_MORE, "custom");
    registerIcon("full_screen", FULL_SCREEN, "custom");
  }, []);

  useEffect(() => {
    setGridView(location.pathname.replace("/home/", ""));
  }, [location]);


  const onDownloadClick = (event: MouseEvent, tabName: string) => {
    event.preventDefault();
    event.stopPropagation();

    const downloadLink = tabInfo.get(tabName)?.downloadLink;
    if (downloadLink) {
      window.open(downloadLink, '_blank')?.focus();
    }
  };

  const onViewMoreClick = (event: MouseEvent, tabName: string) => {
    event.preventDefault();
    event.stopPropagation();

    const moreLink = tabInfo.get(tabName)?.moreLink;
    if (moreLink) {
      window.open(moreLink, '_blank')?.focus();
    }
  };

  const onFullscreenClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const origin = window.location.origin;
    const pathname = window.location.pathname;
    const trimmedPath = pathname.replace('/home', '');
    const url = origin + trimmedPath;
    window.open(url, '_blank');
  };

  return (
    <div className="demo-container">
      <div className="tab-container ">
        {['inventory', 'hr-portal', 'finance', 'sales', 'fleet'].map(tabName =>
          <NavLink key={tabName} to={`/home/${tabName}`}>
            {({ isActive }) => (
              <TabItem  isActive={isActive} tabInfo={tabInfo.get(tabName)}/>
            )}
          </NavLink>
        )}
      </div>

      <TabItemInfo
        tabName={gridView}
        tabInfo={tabInfo}
        onDownloadClick={onDownloadClick}
        onViewMoreClick={onViewMoreClick}
        onFullscreenClick={onFullscreenClick}></TabItemInfo>

      <div className="router-container">
        <iframe src={import.meta.env.BASE_URL+ gridView} height='100%' width='100%' style={{ border: 0 }}/>
      </div>
    </div>
  );
}
