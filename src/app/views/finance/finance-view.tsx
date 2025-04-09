import lightBootstrap from "igniteui-react-grids/grids/themes/light/bootstrap.css?inline";
import FinanceGrid from "../../../../projects/finance-grid/src/App";
import sampleStyles from "../../../../projects/finance-grid/src/App.scss?inline";

export default function FinanceView() {
  return (
    <>
      <style>{lightBootstrap}</style>
      <style>{sampleStyles}</style>

      <FinanceGrid />
    </>
  );
}
