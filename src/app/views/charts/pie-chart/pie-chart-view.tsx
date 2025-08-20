import lightMaterial from "igniteui-react-grids/grids/themes/light/material.css?inline";
import sampleStyles from "../../../../../projects/charts/pie-chart/src/PieChartSample.scss?inline";
import PieChartSample from "../../../../../projects/charts/pie-chart/src/PieChartSample";

export default function PieChartView() {
  return (
    <>
      <style>
        {lightMaterial}
        {sampleStyles}
      </style>
      <PieChartSample />
    </>
  );
}
