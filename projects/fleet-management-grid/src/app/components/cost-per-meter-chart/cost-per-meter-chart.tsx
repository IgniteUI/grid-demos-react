import { IgrSelect, IgrSelectHeader, IgrSelectItem } from "igniteui-react";
import { useState, useEffect } from "react";
import { Period } from "../../models/enums";
import { dataService } from "../../services/data.service";
import { IgrCategoryChart } from "igniteui-react-charts";

export default function CostPerMeterChartComponent({ vehicleId }: { vehicleId: string }) {
  const [chartData, setChartData] = useState<{ quarter: string; costPerMeter: number; }[]>([]);
  const [selectValue, setSelectValue] = useState(Period.YTD);

  useEffect(() => {
    const data = dataService.getCostsPerMeterData(vehicleId, selectValue);
    setChartData(data);
  }, [selectValue])

  const onPeriodChange = (event: any) => {
    setSelectValue(event.target.value)
  }

  return (
    <div className="chart-container area-chart-container">
      <div className="chart-header">
        <span className="chart-title">Cost per Meter, per Quarter</span>
        <IgrSelect className="chart-select" value={selectValue}
          onChange={(event: any) => onPeriodChange(event)}>
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
            dataSource={chartData}
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
  )
}