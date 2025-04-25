import { IgrSelect, IgrSelectHeader, IgrSelectItem } from "igniteui-react";
import { IgrPieChart } from "igniteui-react-charts";
import { useState, useEffect } from "react";
import { Period } from "../../models/enums";
import { dataService } from "../../services/data.service";

export default function CostPerTypeChartComponent({ vehicleId }: { vehicleId: string }) {
  const [chartData, setChartData] = useState<{ value: number; category: string; summary: string; }[]>([]);
  const [selectValue, setSelectValue] = useState(Period.YTD);

  useEffect(() => {
    const data = dataService.findCostsPerTypeData(vehicleId, selectValue);
    setChartData(data);
  }, [selectValue])

  const onPeriodChange = (event: any) => {
    setSelectValue(event.target.value)
  }

  return (
    <div className='chart-container pie-chart-container'>
      <div className="chart-header">
        <span className="chart-title">Cost per Type</span>
        <IgrSelect className="chart-select" value={selectValue}
          onChange={(event: any) => onPeriodChange(event)}>
          <IgrSelectHeader>Period</IgrSelectHeader>
          <IgrSelectItem value={Period.YTD}>YTD</IgrSelectItem>
          <IgrSelectItem value={Period.ThreeMonths}>Last 3 Months</IgrSelectItem>
          <IgrSelectItem value={Period.SixMonths}>Last 6 Months</IgrSelectItem>
          <IgrSelectItem value={Period.TwelveMonths}>Last 12 Months</IgrSelectItem>
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
            dataSource={chartData}
            actualLabelOuterColor='#ededed'
            width="100%"
            height="100%">
          </IgrPieChart>
        </div>
      </div>
    </div>
  )
}