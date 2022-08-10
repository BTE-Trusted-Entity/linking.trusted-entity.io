import { Navigate, Route, Routes } from 'react-router-dom';

import styles from './App.module.css';

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Main } from '../Main/Main';
import { paths } from '../../Utilts/paths';
import { Imprint } from '../Imprint/Imprint';
import { Terms } from '../Terms/Terms';
import { Privacy } from '../Privacy/Privacy';
import { ScrollToTop } from '../ScrollToTop/ScrollToTop';

export const App = () => {
  return (
    <div className={styles.body}>
      <Header />
      <ScrollToTop>
        <Routes>
          <Route path={paths.home} element={<Main />} />
          <Route path={paths.imprint} element={<Imprint />} />
          <Route path={paths.terms} element={<Terms />} />
          <Route path={paths.privacy} element={<Privacy />} />
          <Route path="*" element={<Navigate to={paths.home} replace />} />
        </Routes>
      </ScrollToTop>
      <Footer />
    </div>
  );
};
