import lightMaterial from "igniteui-react-grids/grids/themes/light/material.css?inline";
import sampleStyles from "../../../../../projects/charts/polar-chart/src/PolarChartSample.scss?inline";
import PolarChartSample from "../../../../../projects/charts/polar-chart/src/PolarChartSample";

export default function PolarChartView() {
  return (
    <>
      <style>
        {lightMaterial}
        {sampleStyles}
      </style>
      <PolarChartSample />
    </>
  );
}
