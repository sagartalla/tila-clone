// import styles from './main.styl';
import React from 'react';
import { ModalContainer } from 'react-router-modal';
import { ToastContainer } from 'react-toastify';
import { mergeCss } from '../../utils/cssUtil';

const styles = mergeCss('');

const Layout = ({ children }) => (
  <div>
    <div className={styles['main-layout']}>
      {children}
    </div>
    <ModalContainer />
    <ToastContainer hideProgressBar autoClose={2000} />
  </div>
);

export default Layout;
