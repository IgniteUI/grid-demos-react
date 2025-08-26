import HRPortal from '../../../../../projects/grids/hr-portal/src/app/hr-portal/hr-portal';
import lightFluent from 'igniteui-react-grids/grids/themes/light/fluent.css?inline';
import sampleStyles from '../../../../../projects/grids/hr-portal/src/app/hr-portal/hr-portal.scss?inline';

export default function SalesView() {

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
