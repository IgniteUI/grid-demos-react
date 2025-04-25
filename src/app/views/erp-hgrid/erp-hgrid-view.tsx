import ErpHGrid from '../../../../projects/erp-hierarchical-grid/src/components/ErpHGrid/ErpHGrid';

import lightMaterial from 'igniteui-react-grids/grids/themes/light/material.css?inline';
import sampleStyles from '../../../../projects/sales-grid/src/app/sales-grid/sales-grid.scss?inline';


export default function ERPHGridView() {
  return (
    <>
     <style>
        {lightMaterial}
        {sampleStyles}
      </style>
      <ErpHGrid />
    </>
  );
}
