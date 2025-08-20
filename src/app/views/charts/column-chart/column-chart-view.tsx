import lightMaterial from "igniteui-react-grids/grids/themes/light/material.css?inline";
import sampleStyles from "../../../../../projects/charts/column-chart/src/ColumnChartSample.scss?inline";
import ColumnChartSample from "../../../../../projects/charts/column-chart/src/ColumnChartSample";

export default function ColumnChartView() {
  return (
    <>
      <style>
        {lightMaterial}
        {sampleStyles}
      </style>
      <ColumnChartSample />
    </>
  );
}
