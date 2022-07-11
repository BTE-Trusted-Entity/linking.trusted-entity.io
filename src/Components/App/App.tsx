import React from 'react';

import styles from './App.module.css';

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Main } from '../Main/Main';

export const App = () => {
  return (
    <div className={styles.body}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
