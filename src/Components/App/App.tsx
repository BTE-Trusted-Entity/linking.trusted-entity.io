import { Navigate, Route, Routes } from 'react-router-dom';

import * as styles from './App.module.css';

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { paths } from '../../Utils/paths';
import { Imprint } from '../Imprint/Imprint';
import { Terms } from '../Terms/Terms';
import { Privacy } from '../Privacy/Privacy';
import { Maintenance } from '../Maintenance/Maintenance';
import { Main } from '../Main/Main';

export const App = () => {
  return (
    <div className={styles.body}>
      <Header />
      <Routes>
        <Route
          path={paths.home}
          element={
            process.env.REACT_APP_MAINTENANCE === 'true' ? (
              <Maintenance />
            ) : (
              <Main />
            )
          }
        />
        <Route path={paths.imprint} element={<Imprint />} />
        <Route path={paths.terms} element={<Terms />} />
        <Route path={paths.privacy} element={<Privacy />} />
        <Route path="*" element={<Navigate to={paths.home} replace />} />
      </Routes>
      <Footer />
    </div>
  );
};
