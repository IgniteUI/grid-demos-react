import { IgrCategoryChart, IgrCategoryChartModule } from "igniteui-react-charts";
import "./ColumnChartSample.scss";

IgrCategoryChartModule.register();

function ColumnChartSample() {
  const chartData = [
    { month: "January", temperature: 3 },
    { month: "February", temperature: 4 },
    { month: "March", temperature: 9 },
    { month: "April", temperature: 15 },
    { month: "May", temperature: 21 },
    { month: "June", temperature: 26 },
    { month: "July", temperature: 29 },
    { month: "August", temperature: 28 },
    { month: "September", temperature: 24 },
    { month: "October", temperature: 18 },
    { month: "November", temperature: 11 },
    { month: "December", temperature: 5 },
  ];

  return (
    <div className="container">
      <IgrCategoryChart
        width="100%"
        height="100%"
        dataSource={chartData}
        chartType="Column"
        yAxisTitle="Temperature in °C"
        yAxisTitleLeftMargin={10}
        yAxisTitleRightMargin={5}
        yAxisLabelLeftMargin={0}
        highlightingMode="FadeOthersSpecific"
        highlightingBehavior="NearestItemsAndSeries"
        isHorizontalZoomEnabled={false}
        isVerticalZoomEnabled={false}
        brushes={["#C5E0FF"]}
        outlines={["#C5E0FF"]}
      />
    </div>
  );
}

export default ColumnChartSample;
