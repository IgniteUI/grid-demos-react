import lightMaterial from "igniteui-react-grids/grids/themes/light/material.css?inline";
import sampleStyles from "../../../../../projects/charts/step-chart/src/StepChartSample.scss?inline";
import StepChartSample from "../../../../../projects/charts/step-chart/src/StepChartSample";

export default function StepChartView() {
  return (
    <>
      <style>
        {lightMaterial}
        {sampleStyles}
      </style>
      <StepChartSample />
    </>
  );
}
