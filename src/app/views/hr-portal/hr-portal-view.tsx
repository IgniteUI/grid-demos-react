import HRPortal from '../../../../projects/hr-portal/src/app/hr-portal/hr-portal';
import createClassTransformer from '../../style-utils';

import styles from './hr-portal-view.module.css';
import lightFluent from 'igniteui-react-grids/grids/themes/light/fluent.css?inline';
import sampleStyles from '../../../../projects/hr-portal/src/app/hr-portal/hr-portal.scss?inline';


export default function SalesView() {
  const classes = createClassTransformer(styles);

  return (
    <>
      <style>
        {lightFluent}
        {sampleStyles}
      </style>
      <HRPortal />
    </>
  );
}
