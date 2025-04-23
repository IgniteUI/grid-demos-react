import ErpHGrid from '../../../../projects/erp-hierarchical-grid/src/components/ErpHGrid/ErpHGrid';
import createClassTransformer from '../../style-utils';

import styles from './erp-hgrid-view.module.css';
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
