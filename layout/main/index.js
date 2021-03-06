// import styles from './main.styl';
import React from 'react';
import { ModalContainer } from 'react-router-modal';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';

import Betalogo from '../../components/common/Beta'
import ErrorComp from '../../components/common/Error';

// const cookies = new Cookie();

import lang from '../../utils/language';
import NoSSR from 'react-no-ssr';

import styles_en from './main_en.styl';
import styles_ar from './main_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;

const Layout = ({ children, isApiResponseInvalid }) => (
  <div>
    <NoSSR>
      <Betalogo />
    </NoSSR>
    <div className={styles['main-layout']}>
      {
        isApiResponseInvalid
          ?
            <ErrorComp statusCode={500} messege="INVALID API RESPONSE" />
          :
            children
      }
    </div>
    <ModalContainer />
    <ToastContainer hideProgressBar autoClose={2000} closeButton={false} position={toast.POSITION.BOTTOM_CENTER} />
  </div>
);

const mapStateToProps = store => ({
  isApiResponseInvalid: store.isApiResponseInvalid,
});

export default connect(mapStateToProps)(Layout);
