import lightBootstrap from "igniteui-react-grids/grids/themes/light/bootstrap.css?inline";
import sampleStyles from "../../../../../projects/charts/line-chart/src/LineChartSample.scss?inline";
import LineChartSample from "../../../../../projects/charts/line-chart/src/LineChartSample";

export default function LineChartView() {
  return (
    <>
      <style>
        {lightBootstrap}
        {sampleStyles}
      </style>
      <LineChartSample />
    </>
  );
}
