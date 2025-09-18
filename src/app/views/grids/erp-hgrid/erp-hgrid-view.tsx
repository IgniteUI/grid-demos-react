import ErpHGrid from '../../../../../projects/grids/erp-hierarchical-grid/src/components/ErpHGrid/ErpHGrid';

import lightMaterial from 'igniteui-react-grids/grids/themes/light/material.css?inline';
import sampleStyles from '../../../../../projects/grids/erp-hierarchical-grid/src/components/ErpHGrid/ErpHGrid.scss?inline';


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
