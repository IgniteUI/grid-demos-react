import { IgrCategoryChart, IgrLegend, LegendOrientation } from "igniteui-react-charts";
import { dataService } from "../../services/data.service";
import { useRef } from "react";


export default function UtilizationChartComponent({ vehicleId }: { vehicleId: string }) {
  const chartRef = useRef<IgrCategoryChart>(null);
  const legendRef = useRef<IgrLegend>(null);

  return (
    <div className="content-wrapper">
      <div className="chart-content utilization-chart-container">
        <h6>Utilization per Month</h6>
        <div style={{ width: '350px', height: '350px' }}>
          <IgrLegend key={`legend-${vehicleId}`} ref={legendRef} orientation={LegendOrientation.Horizontal}></IgrLegend>
        </div>

        <div className="column-chart-two-series">
          <IgrCategoryChart
            key={`chart-${vehicleId}`}
            ref={chartRef}
            legend={legendRef}
            chartType="Column"
            dataSource={dataService.getUtilizationData(vehicleId)}
            yAxisTitle="Miles"
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
  );
}
