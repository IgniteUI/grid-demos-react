import { IgrCellTemplateContext, IgrColumn, IgrGrid, IgrGridMasterDetailContext, IgrGridToolbar, IgrGridToolbarActions, IgrGridToolbarAdvancedFiltering, IgrGridToolbarExporter, IgrGridToolbarHiding, IgrGridToolbarPinning, IgrGridToolbarTitle } from 'igniteui-react-grids';
import 'igniteui-react-grids/grids/combined.js';
import './fleet-management-grid.scss';
import { IgrAvatar, IgrBadge, IgrCarousel, IgrCarouselSlide, IgrDivider, IgrIcon, IgrSelect, IgrSelectHeader, IgrSelectItem, IgrTab, IgrTabPanel, IgrTabs, registerIconFromText, StyleVariant } from 'igniteui-react';
import { useEffect, useState } from 'react';
import { check, delivery, wrench } from '@igniteui/material-icons-extended';
import CAR_PHOTO_MANIFEST from '../assets/car_photo_manifest.json';
import CAR_IMAGES from '../assets/car_images.json';
import VEHICLE_DETAILS from '../assets/vehicle_details.json';
import { dataService } from '../services/data.service';
import { IgrCategoryChart, IgrCategoryChartModule, IgrLegend, IgrLegendModule, IgrPieChart } from 'igniteui-react-charts';
import { ChartType, Period } from '../models/enums';
import TripHistoryGrid from '../trip-history-grid/trip-history-grid';
import MaintenanceGrid from '../maintenance-grid/maintenance-grid';

IgrLegendModule.register();
IgrCategoryChartModule.register();

export default function FleetManagement() {
  const [grid, setGrid] = useState<IgrGrid>();
  function gridRef(ref: IgrGrid) {
    setGrid(ref)
  }

  const [legend, setLegend] = useState<IgrLegend>();
  function legendRef(ref: IgrLegend) {
    setLegend(ref)
  }

  const uuid = () => crypto.randomUUID();
  const vehiclesData = dataService.getVehiclesData();
  let periods: { [vehicleId: string]: { costPerTypePeriod: Period, costPerMeterPeriod: Period, fuelCostPeriod: Period } | null } = {};

  useEffect(() => {
    registerIconFromText(check.name, check.value, "imx-icons");
    registerIconFromText(wrench.name, wrench.value, "imx-icons");
    registerIconFromText(delivery.name, delivery.value, "imx-icons");
  }, []);

  function breakThisShit() {
    console.log("breakpoint")
  }

  /** Templates */

  let masterDetailTemplate = (props: {dataContext: IgrGridMasterDetailContext}) => {
    const images: string[] = getPathToCarImage(props.dataContext.implicit.vehicleId);
    

    return (
      <IgrTabs key="tabs">
        <IgrTab panel="details" key="details-tab"><span>Details</span></IgrTab>
        <IgrTab panel="trip-history" key="trip-history-tab"><span>Trip History</span></IgrTab>
        <IgrTab panel="maintenance" key="maintenance-tab"><span>Maintenance</span></IgrTab>
        <IgrTab panel="cost" key="cost-tab"><span>Cost</span></IgrTab>
        <IgrTab panel="utilization" key="utilization-tab"><span>Utilization</span></IgrTab>

        <IgrTabPanel id="details" key="details-panel">
          <div className='details-container'>
            <div className="carousel-container">
              <IgrCarousel>
                {images.map((image, index) => (
                  <IgrCarouselSlide key={index}>
                    <div className="image-container">
                      <img src={image} alt={`Vehicle ${index}`} />
                    </div>
                  </IgrCarouselSlide>
                ))}
              </IgrCarousel>
            </div>

            <div className="details-table">
              {[VEHICLE_DETAILS.detailsCategories, VEHICLE_DETAILS.engineCategories].map(categorySet => (
                <div className="detail-block-container">
                  <div className="detail-category-container">
                    {categorySet.map(category => (
                      <div className="detail-item">
                        <span className="detail-category">{category.label}:</span>
                        <IgrDivider></IgrDivider>
                      </div>
                    ))}
                  </div>
                  <div className="detail-content-container">
                    {categorySet.map(category => (
                      <div className="detail-item">
                        <span className="detail-value">{getValueByPath(props.dataContext.implicit, category.key)}</span>
                        <IgrDivider></IgrDivider>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </IgrTabPanel>

        <IgrTabPanel id="trip-history" key="trip-history-panel">
          <TripHistoryGrid vehicleId={props.dataContext.implicit.vehicleId}></TripHistoryGrid>
        </IgrTabPanel>

        <IgrTabPanel id="maintenance" key="maintenance-panel">
          <MaintenanceGrid vehicleId={props.dataContext.implicit.vehicleId}></MaintenanceGrid>
        </IgrTabPanel>

        <IgrTabPanel id="cost" key="cost-panel">
              <div className="dashboard">
                <div className='chart-container pie-chart-container'>
                  <div className="chart-header">
                    <span className="chart-title">Cost per Type</span>
                    <IgrSelect className="chart-select" value={periods[props.dataContext.implicit.vehicleId]?.costPerTypePeriod || Period.YTD}
                    onChange={(event: any) => onPeriodChange(event, 'costsPerType', props.dataContext.implicit.vehicleId)}>
                      <IgrSelectHeader>Period</IgrSelectHeader>
                      <IgrSelectItem value={ Period.YTD }>YTD</IgrSelectItem>
                      <IgrSelectItem value={ Period.ThreeMonths }>Last 3 Months</IgrSelectItem>
                      <IgrSelectItem value={ Period.SixMonths }>Last 6 Months</IgrSelectItem>
                      <IgrSelectItem value={ Period.TwelveMonths }>Last 12 Months</IgrSelectItem>
                    </IgrSelect>
                  </div>
                  <div className="chart-content">
                    <div className="pie-chart-canvas">
                      <IgrPieChart
                        legendLabelMemberPath='category'
                        labelMemberPath='summary'
                        valueMemberPath='value'
                        labelsPosition="OutsideEnd"
                        radiusFactor="0.7"
                        labelExtent="15"
                        dataSource={dataService.getCostsPerTypeData(props.dataContext.implicit.vehicleId, periods[props.dataContext.implicit.vehicleId]?.costPerTypePeriod || Period.YTD)}
                        actualLabelOuterColor='#ededed'
                        width="100%"
                        height="100%">
                      </IgrPieChart>
                    </div>                    
                  </div>
                </div>

                <div className="chart-container area-chart-container">
                  <div className="chart-header">
                    <span className="chart-title">Cost per Meter, per Quarter</span>
                    <IgrSelect className="chart-select" value={periods[props.dataContext.implicit.vehicleId]?.costPerMeterPeriod || Period.YTD}
                    onChange={(event: any) => onPeriodChange(event, 'costsPerMeter', props.dataContext.implicit.vehicleId)}>
                      <IgrSelectHeader>Period</IgrSelectHeader>
                      <IgrSelectItem value="ytd">YTD</IgrSelectItem>
                      <IgrSelectItem value="'2023'">2023</IgrSelectItem>
                      <IgrSelectItem value="'2022'">2022</IgrSelectItem>
                      <IgrSelectItem value="'2021'">2021</IgrSelectItem>
                      <IgrSelectItem value="'2020'">2020</IgrSelectItem>
                    </IgrSelect>
                  </div>
                  <div className="chart-content">
                    <div className="chart-canvas">
                      <IgrCategoryChart
                        dataSource={dataService.getCostsPerMeterData(props.dataContext.implicit.vehicleId, periods[props.dataContext.implicit.vehicleId]?.costPerMeterPeriod || Period.YTD)}
                        chartType="Area"
                        isHorizontalZoomEnabled="false"
                        isVerticalZoomEnabled="false"
                        computedPlotAreaMarginMode="Series"
                        xAxisLabelTextColor="#ededed"
                        yAxisLabelTextColor="#ededed"
                        yAxisInterval="20"
                        yAxisMinimumValue="0"
                        yAxisMaximumValue="80"
                        yAxisLabelRightMargin="15"
                        areaFillOpacity="100"
                        width='100%'
                        height='100%'> 
                      </IgrCategoryChart>
                    </div>
                  </div>
                </div>

                <div className="chart-container column-chart-container">
                  <div className="chart-header">
                    <span className="chart-title">Fuel Costs per Month</span>
                    <IgrSelect className="chart-select" value={periods[props.dataContext.implicit.vehicleId]?.fuelCostPeriod || Period.YTD}
                    onChange={(event: any) => onPeriodChange(event, 'fuelCosts', props.dataContext.implicit.vehicleId)}>
                      <IgrSelectHeader>Period</IgrSelectHeader>
                      <IgrSelectItem value={ Period.YTD }>YTD</IgrSelectItem>
                      <IgrSelectItem value={ Period.ThreeMonths }>Last 3 Months</IgrSelectItem>
                      <IgrSelectItem value={ Period.SixMonths }>Last 6 Months</IgrSelectItem>
                      <IgrSelectItem value={ Period.TwelveMonths }>Last 12 Months</IgrSelectItem>
                    </IgrSelect>
                  </div>
                  <div className="chart-content">
                    <div className="column-chart">
                      <IgrCategoryChart
                        chartType="Column"
                        dataSource={dataService.getFuelCostsData(props.dataContext.implicit.vehicleId, periods[props.dataContext.implicit.vehicleId]?.fuelCostPeriod || Period.YTD)}
                        yAxisTitle="Costs in USD"
                        isHorizontalZoomEnabled="false"
                        isVerticalZoomEnabled="false"
                        xAxisLabelTextColor="#ededed"
                        yAxisLabelTextColor="#ededed"
                        yAxisTitleTextColor="#ededed"
                        yAxisMinimumValue="0"
                        xAxisMinimumGapSize="30"
                        yAxisLabelRightMargin="7.5"
                        width='95%'
                        height='420px'>
                      </IgrCategoryChart>
                    </div>                    
                  </div>
                </div>

              </div>
        </IgrTabPanel>

        <IgrTabPanel id="utilization" key="utilization-panel">
          <div className="content-wrapper">
            <div className="chart-content utilization-chart-container">
              <h6>Utilization per Month</h6>
              
              <IgrLegend orientation="Horizontal" ref={legendRef}></IgrLegend>
              <div className="column-chart-two-series">
                
                <IgrCategoryChart
                  
                  chartType="Column"
                  dataSource={dataService.getUtilizationData(props.dataContext.implicit.vehicleId)}
                  yAxisTitle="Miles"
                  legend={legendRef}
                  isHorizontalZoomEnabled="false"
                  isVerticalZoomEnabled="false"
                  xAxisLabelTextColor="#ededed"
                  yAxisLabelTextColor="#ededed"
                  xAxisTitleTextColor="#ededed"
                  yAxisTitleTextColor="#ededed"
                  yAxisMinimumValue="0"
                  yAxisInterval="200"
                  xAxisMinimumGapSize="20"
                  yAxisLabelRightMargin="7.5"
                  height='100%'
                  width='100%'>
                </IgrCategoryChart>
              </div>              
            </div>
          </div>
        </IgrTabPanel>
      </IgrTabs>
    )
  }

  let makeCellTemplate = (props: {dataContext: IgrCellTemplateContext}) => {
    return (
      <>
        <IgrAvatar className='logo-avatar' shape='rounded' src={getPathToLogoImage(props.dataContext.implicit)}></IgrAvatar>
        <span className='status-value'>{props.dataContext.implicit}</span>
      </>   
    );     
  }

  let statusCellTemplate = (props: {dataContext: IgrCellTemplateContext}) => {
    return (
      <>
      <IgrBadge variant={getStatusType(props.dataContext.implicit)}>
        <IgrIcon className='icon-style' collection='imx-icons' name={getStatusIcon(props.dataContext.implicit)}></IgrIcon>
      </IgrBadge>
      <span className="status-value">{props.dataContext.implicit}</span>
      </>
    );
  }

  let locationCellTemplate = (props: {dataContext: IgrCellTemplateContext}) => {
    return (
      <a className='link-style' href='#' onClick={() => console.log("CLICK")}>{props.dataContext.implicit}</a>
    );
  }

  /** Utility Functions */

  function getPathToLogoImage(value: string): string {
    return `cars/logos/${value}.png`
  }

  function getStatusType(status: string): StyleVariant {
    const types: Record<string, StyleVariant> = {
      "Available": "success",
      "In Maintenance": "danger",
      "Active": "info",
    };
    return types[status] || "primary";
  }

  function getStatusIcon(status: string): string {
    const icons: Record<string, string> = {
      "Available": "check",
      "In Maintenance": "wrench",
      "Active": "delivery"
    };
    return icons[status] || "info";
  }

  function getPathToCarImage(vehicleId: string): string[] {
    const carEntry = CAR_PHOTO_MANIFEST.find(car => car.id === vehicleId);

    if (!carEntry) {
      console.warn(`No vehicle found with ID: ${vehicleId}`)
      return [];
    }

    const folderName = carEntry.folder;
    const carPhotoNames = (CAR_IMAGES as Record<string, string[]>)[folderName];
    const carPathsToPhotos = carPhotoNames.map(photo => `cars/photos/${folderName}/${photo}`);

    return carPathsToPhotos;
  }

  function getValueByPath(obj: any, path: string) {
    return path.split('.').reduce((o, key) => (o && o[key] !== undefined) ? o[key] : 'N/A', obj);
  }

  function onPeriodChange(event: any, chart: string, vehicleId: string): void {
    if (!periods[vehicleId]) {
      periods[vehicleId] = {
        costPerTypePeriod: Period.YTD,
        costPerMeterPeriod: Period.YTD,
        fuelCostPeriod: Period.YTD
      };
    }

    if (chart === ChartType.CostPerType) {
      periods[vehicleId].costPerTypePeriod = event.detail.value;
    } else if (chart === ChartType.CostPerMeter) {
      periods[vehicleId].costPerMeterPeriod = event.detail.value;
    } else if (chart === ChartType.FuelCosts) {
      periods[vehicleId].fuelCostPeriod = event.detail.value;
    }

    grid?.markForCheck
  }

  return (
    <>
      <div className="row-layout fleet-management-container">
        <IgrGrid 
        data={vehiclesData} 
        primaryKey="vehicleId"
        detailTemplate={masterDetailTemplate} 
        className="ig-typography ig-scrollbar main-grid"
        allowAdvancedFiltering={true}
        ref={gridRef}>
          <IgrGridToolbar>
            <IgrGridToolbarActions>
              <IgrGridToolbarPinning></IgrGridToolbarPinning>
              <IgrGridToolbarHiding></IgrGridToolbarHiding>
              <IgrGridToolbarExporter></IgrGridToolbarExporter>
              <IgrGridToolbarAdvancedFiltering></IgrGridToolbarAdvancedFiltering>
            </IgrGridToolbarActions>
            <IgrGridToolbarTitle>
              <span key={uuid()}>Fleet Management</span>
            </IgrGridToolbarTitle>
          </IgrGridToolbar>
          <IgrColumn field="vehicleId" dataType="string" header="Vehicle ID" sortable={true}></IgrColumn>
          <IgrColumn field="licensePlate" dataType="string" header="License Plate" sortable={true}></IgrColumn>
          <IgrColumn field="make" dataType="string" header="Make" sortable={true} bodyTemplate={makeCellTemplate}></IgrColumn>
          <IgrColumn field="model" dataType="string" header="Model" sortable={true}></IgrColumn>
          <IgrColumn field="type" dataType="string" header="Type" sortable={true}></IgrColumn>
          <IgrColumn field="vin" dataType="string" header="VIN" sortable={true}></IgrColumn>
          <IgrColumn field="status" dataType="string" header="Status" sortable={true} bodyTemplate={statusCellTemplate}></IgrColumn>
          <IgrColumn field="locationCity" dataType="string" header="Location (City)" sortable={true}></IgrColumn>
          <IgrColumn field="locationGps" dataType="string" header="Location (GPS)" sortable={true} bodyTemplate={locationCellTemplate}></IgrColumn>
        </IgrGrid>
      </div>
    </>
  );
}
