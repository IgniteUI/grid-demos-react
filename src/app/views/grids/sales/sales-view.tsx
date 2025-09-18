import SalesGrid from '../../../../../projects/grids/sales-grid/src/app/sales-grid/sales-grid';

import lightIndigo from 'igniteui-react-grids/grids/themes/light/indigo.css?inline';
import sampleStyles from '../../../../../projects/grids/sales-grid/src/app/sales-grid/sales-grid.scss?inline';


export default function SalesView() {
  return (
    <>
      <style>
        {lightIndigo}
        {sampleStyles}
      </style>
      <SalesGrid></SalesGrid>
    </>
  );
}
