import React from 'react';

import lang from '../../utils/language';
import { languageDefinations } from '../../utils/lang';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './login_en.styl';
import styles_ar from './login_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };
const { LOGIN_PAGE } = languageDefinations();

const pageFlows = {
  existing_user_login: {
    password: {
      activePage: 'password',
      nextPage: '',
    },
    verify_email: {
      activePage: 'verify_email',
      nextPage: 'thank_you',
    },
    thank_you: {
      activePage: 'thank_you',
      text: (
        <div>
          <h2 className={`${styles.fontW600} ${styles['fs-22']} ${styles['mb-0']}`}>Thank you</h2>
          <div>for Signing up with us!</div>
        </div>
      ),
      nextPage: null,
    },
  },
  new_user_register: {
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
          <h2 className={`${styles.fontW600} ${styles['fs-22']} ${styles['mb-0']}`}>Thank you</h2>
          <div>for Signing up with us!</div>
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
        <div className={`${styles['fs-18']} ${styles.fontW600}`}>Your password was Reset successfully</div>
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
};

export default pageFlows;
