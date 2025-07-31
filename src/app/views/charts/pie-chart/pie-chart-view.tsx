import lightIndigo from "igniteui-react-grids/grids/themes/light/indigo.css?inline";
import sampleStyles from "../../../../../projects/charts/pie-chart/src/PieChartSample.scss?inline";
import PieChartSample from "../../../../../projects/charts/pie-chart/src/PieChartSample";

export default function PieChartView() {
  return (
    <>
      <style>
        {lightIndigo}
        {sampleStyles}
      </style>
      <PieChartSample />
    </>
  );
}
