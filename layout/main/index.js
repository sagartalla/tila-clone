// import styles from './main.styl';
import React from 'react';
import { ModalContainer } from 'react-router-modal';
import { ToastContainer } from 'react-toastify';
import { mergeCss } from '../../utils/cssUtil';
import Betalogo from '../../components/common/beta'

const styles = mergeCss('');

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
