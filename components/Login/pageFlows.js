import React from 'react';

import lang from '../../utils/language';
import { languageDefinations } from '../../utils/lang';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './login_en.styl';
import styles_ar from './login_ar.styl';

// import { actionCreators } from './actions';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };
const { CONTACT_INFO_MODAL, LOGIN_PAGE } = languageDefinations();

const pageFlows = {
  existing_user_login: {
    signin_page: {
      activePage: 'signin_page',
      backpage: '',
      nextPage: 'password',
    },
    password: {
      activePage: 'password',
      backpage: 'signin_page',
      nextPage: 'verify_email',
    },
    verify_email: {
      activePage: 'verify_email',
      nextPage: 'thank_you',
    },
    thank_you: {
      activePage: '',
      text: (
        <div>
          <h2 className={`${styles.fontW600} ${styles['fs-22']} ${styles['mb-0']}`}>{CONTACT_INFO_MODAL.THANK_YOU}</h2>
          <div>{LOGIN_PAGE.FOR_SIGNING_UP_WITH_US}</div>
        </div>
      ),
      nextPage: null,
    },
  },
  new_user_register: {
    signin_page: {
      activePage: 'signin_page',
      backpage: '',
      nextPage: 'password_new',
    },
    password_new: {
      activePage: 'password_new',
      nextPage: 'verify_email',
    },
    verify_email: {
      activePage: 'verify_email',
      nextPage: 'thank_you',
    },
    // personal_details: {
    //   activePage: 'personal_details',
    //   nextPage: 'thank_you',
    // },
    thank_you: {
      activePage: 'thank_you',
      text: (
        <div>
          <h2 className={`${styles.fontW600} ${styles['fs-22']} ${styles['mb-0']}`}>{CONTACT_INFO_MODAL.THANK_YOU}</h2>
          <div>{LOGIN_PAGE.FOR_SIGNING_UP_WITH_US}</div>
        </div>
      ),
      nextPage: null,
    },
  },
  forgot_password: {
    security_page: {
      activePage: 'security_page',
      nextPage: 'reset_type',
    },
    reset_type: {
      activePage: 'reset_type',
      nextPage: 'success_screen',
    },
    success_screen: {
      activePage: 'success_screen',
      nextPage: '',
    },
  },
  forgot_password_reset: {
    reset_screen: {
      activePage: 'reset_screen',
      nextPage: 'thank_you',
    },
    thank_you: {
      activePage: 'thank_you',
      text: (
        <div className={`${styles['fs-18']} ${styles.fontW600}`}>{LOGIN_PAGE.PASSWORD_RESET_SUCCESSFULL}</div>
      ),
      nextPage: null,
    },
  },
  existing_social_user: {
    existing_social_login: {
      activePage: 'existing_social_login',
      nextPage: '',
    },
  },
  not_accessable_social_user: {
    social_login: {
      activePage: 'social_login',
      nextPage: 'verify_email',
    },
    verify_email: {
      activePage: 'verify_email',
      nextPage: 'shipping_to_page',
    },
    shipping_to_page: {
      activePage: 'shipping_to_page',
      nextPage: 'thank_you',
    },
    thank_you: {
      activePage: 'thank_you',
      text: (
        <div>
          <h2 className={`${styles.fontW600} ${styles['fs-22']} ${styles['mb-0']}`}>{CONTACT_INFO_MODAL.THANK_YOU}</h2>
          <div>{LOGIN_PAGE.FOR_SIGNING_UP_WITH_US}</div>
        </div>
      ),
      nextPage: null,
    },
  },
};

export default pageFlows;
