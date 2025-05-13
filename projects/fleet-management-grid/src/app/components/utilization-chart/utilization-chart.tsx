import { IgrCategoryChart, IgrLegend, LegendOrientation } from "igniteui-react-charts";
import { dataService } from "../../services/data.service";
import { useEffect, useRef } from "react";


export default function UtilizationChartComponent({ vehicleId }: { vehicleId: string }) {
  const chartRef = useRef<IgrCategoryChart>(null);
  const legendRef = useRef<IgrLegend>(null);

  useEffect(() => {
    if (chartRef.current && legendRef.current) {
      chartRef.current.legend = legendRef.current;
    }
  }, []);

  return (
    <div className="content-wrapper ig-typography">
      <div className="chart-content utilization-chart-container">
        <h6>Utilization per Month</h6>

        <IgrLegend key={`legend-${vehicleId}`}
          ref={legendRef}
          orientation={LegendOrientation.Horizontal}
          textColor="#edededed">
        </IgrLegend>

        <div className="column-chart-two-series">
          <IgrCategoryChart
            key={`chart-${vehicleId}`}
            ref={chartRef}
            chartType="Column"
            dataSource={dataService.findUtilizationDataById(vehicleId)}
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
