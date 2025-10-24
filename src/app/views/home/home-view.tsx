import { useEffect, useRef, useState, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IgrButton, IgrIcon, registerIcon } from "igniteui-react";
import "igniteui-react-grids/grids/themes/light/material.css";
import "./home-view.scss";

import FILE_DOWNLOAD from "../../data/icons/file_download.svg";
import VIEW_MORE from "../../data/icons/view_more.svg";
import FULL_SCREEN from "../../data/icons/full_screen.svg";
import EXIT_FULL_SCREEN from "../../data/icons/exit_full_screen.svg";

export interface TabInfo {
  title: string;
  content: string;
  theme: string;
  themeMode: string;
  moreLink: string;
  downloadLink: string;
}

export function TabItem({ isActive, tabInfo }: { isActive?: boolean; tabInfo?: TabInfo }) {
  return (
    <div className="tab-item-container">
      <div className={"tab-item" + (isActive ? " tab-item--selected" : "")}>
        <div
          className={"tab-header" + (!isActive ? " tab-header--disabled" : "")}
        >
          {tabInfo?.title.toUpperCase()}
        </div>
      </div>
    </div>
  );
}

export function TabItemInfo({
  tabName,
  tabInfo,
  isFullscreen,
  onDownloadClick,
  onViewMoreClick,
  onToggleFullscreen,
}: {
  tabName: string;
  tabInfo: Map<string, TabInfo>;
  isFullscreen: boolean;
  onDownloadClick: (event: MouseEvent, tabName: string) => void;
  onViewMoreClick: (event: MouseEvent, tabName: string) => void;
  onToggleFullscreen: (event: MouseEvent) => void;
}) {
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

        <div className="action-buttons">
          <IgrButton
            variant="outlined"
            className="custom-button"
            onClick={(e) =>
              onDownloadClick(e.nativeEvent as MouseEvent, tabName)
            }
          >
            <IgrIcon
              key="downloadIcon"
              name="file_download"
              collection="custom"
            ></IgrIcon>
            Download
          </IgrButton>

          <IgrButton
            variant="outlined"
            className="custom-button"
            onClick={(e) =>
              onViewMoreClick(e.nativeEvent as MouseEvent, tabName)
            }
          >
            <IgrIcon
              key="viewMoreIcon"
              name="view_more"
              collection="custom"
            ></IgrIcon>
            View More
          </IgrButton>

          <IgrButton
            variant="outlined"
            className="custom-button"
            onClick={(e) => onToggleFullscreen(e.nativeEvent as MouseEvent)}
          >
            <IgrIcon
              key="fullscreenIcon"
              name={isFullscreen ? "exit_full_screen" : "full_screen"}
              collection="custom"
            ></IgrIcon>
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </IgrButton>
        </div>
      </div>
    </div>
  );
}

export default function HomeView() {
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [gridView, setGridView] = useState("inventory");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const requestFullscreen = (el: HTMLElement) =>
    el.requestFullscreen?.() || (el as any).webkitRequestFullscreen?.();

  const exitFullscreen = () =>
    document.exitFullscreen?.() ||
    (document as any).webkitExitFullscreen?.();

  const checkFullscreen = () =>
    !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (window.innerHeight === screen.height &&
        window.innerWidth === screen.width)
    );

  const onToggleFullscreen = useCallback(async () => {
    const el = fullscreenRef.current;
    if (!el) return;

    try {
      if (!isFullscreen) {
        await requestFullscreen(el);
      } else {
        await exitFullscreen();
      }

      setIsFullscreen(checkFullscreen());
    } catch (err) {
      console.error("Fullscreen toggle failed", err);
    }
  }, [isFullscreen]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(checkFullscreen());
    };

    const onResize = () => {
      setIsFullscreen(checkFullscreen());
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", onFullscreenChange); // Safari / Mac
    window.addEventListener("resize", onResize);

    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const tabs = [
    { key: "inventory" },
    { key: "hr-portal" },
    { key: "finance" },
    { key: "sales" },
    { key: "fleet" },
  ];
  const tabInfo = new Map<string, TabInfo>([
    [
      "inventory",
      {
        title: "ERP/ Inventory",
        theme: "Material",
        themeMode: "Light",
        content:
          "Tracking and managing quantity, location and details of products in stock.",
        moreLink:
          "https://www.infragistics.com/products/ignite-ui-angular/angular/components/hierarchicalgrid/hierarchical-grid",
        downloadLink:
          "https://www.infragistics.com/resources/sample-applications/erp-inventory-sample-app-react",
      },
    ],
    [
      "hr-portal",
      {
        title: "Org Chart/HR Portal",
        theme: "Fluent",
        themeMode: "Light",
        content:
          "Displaying company's hierarchical structure and showing employees data.",
        moreLink:
          "https://www.infragistics.com/products/ignite-ui-angular/angular/components/treegrid/tree-grid",
        downloadLink:
          "https://www.infragistics.com/resources/sample-applications/org-charthr-portal-sample-app-react",
      },
    ],
    [
      "finance",
      {
        title: "Financial Portfolio",
        theme: "Bootstrap",
        themeMode: "Light",
        content:
          "Asset tracking, profit and loss analysis, featuring interactive dynamic charts.",
        moreLink:
          "https://www.infragistics.com/products/ignite-ui-angular/angular/components/grid/grid",
        downloadLink:
          "https://www.infragistics.com/resources/sample-applications/financial-portfolio-sample-app-react",
      },
    ],
    [
      "sales",
      {
        title: "Sales Dashboard",
        theme: "Indigo",
        themeMode: "Light",
        content:
          "For trend analysis, KPIs and viewing sales summaries by region, product, etc.",
        moreLink:
          "https://www.infragistics.com/products/ignite-ui-angular/angular/components/pivotGrid/pivot-grid",
        downloadLink:
          "https://www.infragistics.com/resources/sample-applications/sales-grid-sample-app-react",
      },
    ],
    [
      "fleet",
      {
        title: "Fleet Management",
        theme: "Material",
        themeMode: "Dark",
        content:
          "A master-detail grid for managing vehicle acquisition, operations, and maintenance.",
        moreLink:
          "https://www.infragistics.com/products/ignite-ui-angular/angular/components/grid/master-detail",
        downloadLink:
          "https://www.infragistics.com/resources/sample-applications/fleet-management-sample-app-react",
      },
    ],
  ]);
  useEffect(() => {
    registerIcon("file_download", FILE_DOWNLOAD, "custom");
    registerIcon("view_more", VIEW_MORE, "custom");
    registerIcon("full_screen", FULL_SCREEN, "custom");
    registerIcon("exit_full_screen", EXIT_FULL_SCREEN, "custom");
  }, []);

  useEffect(() => {
    setGridView(location.pathname.replace("/home/", ""));
  }, [location]);

  const onDownloadClick = (event: MouseEvent, tabName: string) => {
    event.preventDefault();
    event.stopPropagation();
    const downloadLink = tabInfo.get(tabName)?.downloadLink;
    if (downloadLink) {
      window.open(downloadLink, "_blank")?.focus();
    }
  };

  const onViewMoreClick = (event: MouseEvent, tabName: string) => {
    event.preventDefault();
    event.stopPropagation();
    const moreLink = tabInfo.get(tabName)?.moreLink;
    if (moreLink) {
      window.open(moreLink, "_blank")?.focus();
    }
  };

  return (
    <div className="demo-container" ref={fullscreenRef}>
      {!isFullscreen && (
        <div className="tab-container">
          {tabs.map(({ key }) => (
            <NavLink key={key} to={`/home/${key}`}>
              {({ isActive }) => (
                <TabItem isActive={isActive} tabInfo={tabInfo.get(key)} />
              )}
            </NavLink>
          ))}
        </div>
      )}

      <TabItemInfo
        tabName={gridView}
        tabInfo={tabInfo}
        isFullscreen={isFullscreen}
        onDownloadClick={onDownloadClick}
        onViewMoreClick={onViewMoreClick}
        onToggleFullscreen={onToggleFullscreen}
      ></TabItemInfo>

      <div className="router-container">
        <iframe
          src={import.meta.env.BASE_URL + gridView}
          height="100%"
          width="100%"
          style={{ border: 0 }}
        />
      </div>
    </div>
  );
}
