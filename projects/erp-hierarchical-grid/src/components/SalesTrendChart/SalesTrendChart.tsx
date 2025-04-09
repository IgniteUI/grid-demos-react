import { useEffect } from "react";
import { DataPoint } from "../../models/DataPoint";
import {
  IgrCategoryXAxis,
  IgrCategoryXAxisModule,
  IgrColumnSeries,
  IgrColumnSeriesModule,
  IgrDataChart,
  IgrDataChartCoreModule,
  IgrDataChartInteractivityModule,
  IgrDataChartVisualDataModule,
  IgrNumericYAxis,
  IgrNumericYAxisModule,
} from "igniteui-react-charts";

IgrDataChartCoreModule.register();
IgrCategoryXAxisModule.register();
IgrNumericYAxisModule.register();
IgrColumnSeriesModule.register();
IgrDataChartVisualDataModule.register();
IgrDataChartInteractivityModule.register();

export const MyChart = ({ trendData }: { trendData: DataPoint[] }) => {
  useEffect(() => {}, []);

  return (
    <IgrDataChart
      width="100%"
      height="100%"
      plotAreaBackground="transparent"
      highlightingMode="FadeOthersSpecific"
      highlightingBehavior="NearestItemsAndSeries"
    >
      <IgrCategoryXAxis
        name="xAxis"
        label="month"
        labelVisibility="collapsed"
        gap={0.4}
        stroke="transparent"
        dataSource={trendData}
      ></IgrCategoryXAxis>

      <IgrNumericYAxis
        name="yAxis"
        labelVisibility="collapsed"
        majorStroke="transparent"
        stroke="transparent"
      ></IgrNumericYAxis>

      <IgrColumnSeries
        xAxisName="xAxis"
        yAxisName="yAxis"
        radiusX={2}
        radiusY={2}
        name="series1"
        title="Sold Units"
        valueMemberPath="unitsSold"
        showDefaultTooltip={true}
        brush="#8A8A8A"
        outline="#8A8A8A"
        highlightingFadeOpacity={0.3}
        dataSource={trendData}
      ></IgrColumnSeries>
    </IgrDataChart>
  );
};
