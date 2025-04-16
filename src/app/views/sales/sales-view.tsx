import SalesGrid from '../../../../projects/sales-grid/src/app/sales-grid/sales-grid';
import createClassTransformer from '../../style-utils';

import styles from './sales-view.module.css';
import lightIndigo from 'igniteui-react-grids/grids/themes/light/indigo.css?inline';
import sampleStyles from '../../../../projects/sales-grid/src/app/sales-grid/sales-grid.scss?inline';


export default function SalesView() {
  const classes = createClassTransformer(styles);

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
