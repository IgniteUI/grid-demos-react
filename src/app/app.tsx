import { Outlet } from 'react-router-dom';
import createClassTransformer from './style-utils';
import styles from './app.module.css';

export default function App() {
  const classes = createClassTransformer(styles);

  return (
    <>
      <Outlet></Outlet>
    </>
  );
}
