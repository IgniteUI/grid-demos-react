import lightMaterial from "igniteui-react-grids/grids/themes/light/material.css?inline";
import sampleStyles from "../../../../../projects/charts/bar-chart/src/BarChartSample.scss?inline";
import BarChartSample from "../../../../../projects/charts/bar-chart/src/BarChartSample";

export default function BarChartView() {
  return (
    <>
      <style>
        {lightMaterial}
        {sampleStyles}
      </style>
      <BarChartSample />
    </>
  );
}
