import lightMaterial from "igniteui-react-grids/grids/themes/light/material.css?inline";
import sampleStyles from "../../../../../projects/charts/line-chart/src/LineChartSample.scss?inline";
import LineChartSample from "../../../../../projects/charts/line-chart/src/LineChartSample";

export default function LineChartView() {
  return (
    <>
      <style>
        {lightMaterial}
        {sampleStyles}
      </style>
      <LineChartSample />
    </>
  );
}
