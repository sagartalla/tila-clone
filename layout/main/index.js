// import styles from './main.styl';
import React from 'react';
import { ModalContainer } from 'react-router-modal';
import { ToastContainer } from 'react-toastify';
// import Cookie from 'universal-cookie';

import Betalogo from '../../components/common/Beta'

// const cookies = new Cookie();

import lang from '../../utils/language';

import styles_en from './main_en.styl';
import styles_ar from './main_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;

const Layout = ({ children }) => (
  <div>
    <Betalogo />
    <div className={styles['main-layout']}>
      {children}
    </div>
    <ModalContainer />
    <ToastContainer hideProgressBar autoClose={2000} />
  </div>
);

export default Layout;
