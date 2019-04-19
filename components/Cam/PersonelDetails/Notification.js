import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SVGComponent from '../../common/SVGComponet';
import Btn from '../../common/Button';

import { languageDefinations } from '../../../utils/lang/';

import lang from '../../../utils/language';

import styles_en from './profile_en.styl';
import styles_ar from './profile_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;

const { NOTITICATION_INFO } = languageDefinations();
const Notification = () => (
  <div className={`${styles['box']} ${styles['notification-main']} ${styles['flex']} ${styles['flex-colum']}`}>
    <div className={`${styles['flex']} ${styles['notification-main-inn']}`}>
      <span className={styles['flex']}>
        <SVGComponent clsName={`${styles['notification-icon']}`} src="icons/profile-icons/bell-notification" />
      </span>
      <span className={`${styles['pl-5']} ${styles['lne-ht1']}`}>
        <h2 className={`${styles['fontW300']} ${styles['mt-0']} ${styles['mb-0']}`}>02</h2>
        <span className={`${styles['fs-12']}`}>{NOTITICATION_INFO.HEADING}</span>
      </span>
    </div>
    <div className={`${styles['notfy-footer']} ${styles['bg-light-gray']} ${styles['flex-center']}`}>
      <Col md={7} sm={7} className={`${styles['pl-0']} ${styles['notification-label']}`}><span className={`${styles['fs-12']} ${styles['label-gry-clr']}`}>{NOTITICATION_INFO.DECRYPTION}</span></Col>
      <Col md={5} sm={5} className={`${styles['pl-5']} ${styles['pr-0']} ${styles['flex']}`}><a className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['fs-12']} ${styles['default-small']}`}>{NOTITICATION_INFO.BUTTON_LABEL}</a></Col>
    </div>
  </div>
);

export default Notification;
