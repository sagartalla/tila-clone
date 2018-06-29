import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SVGCompoent from '../../common/SVGComponet';
import Btn from '../../common/Button';
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Cam/PersonelDetails/profile');

const Notification = () => (
  <div className={`${styles['box']} ${styles['notification-main']} ${styles['flex']} ${styles['flex-colum']}`}>
    <div className={`${styles['flex']} ${styles['pt-30']} ${styles['pl-30']} ${styles['pr-30']} ${styles['pb-20']}`}>
      <span className={styles['flex']}>
        <SVGCompoent clsName={`${styles['notification-icon']}`} src="icons/profile-icons/bell-notification" />
      </span>
      <span className={`${styles['pl-5']} ${styles['lne-ht1']}`}>
        <h2 className={`${styles['fontW300']} ${styles['mt-0']} ${styles['mb-0']}`}>02</h2>
        <span className={`${styles['fs-12']}`}>New Notifications</span>
      </span>
    </div>
    <div className={`${styles['pt-15']} ${styles['pb-15']} ${styles['pr-30']} ${styles['pl-30']} ${styles['bg-light-gray']} ${styles['flex-center']}`}>
      <Col md={7} className={`${styles['pl-0']} ${styles['notification-label']}`}><span className={`${styles['fs-12']} ${styles['label-gry-clr']}`}>Are you overloaded with notifications? Manage messages, emails and notifications the way you want</span></Col>
      <Col md={5} className={`${styles['pl-5']} ${styles['pr-0']} ${styles['flex']}`}><a className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['fs-12']} ${styles['default-small']}`}>EDIT NOTIFICATIONS</a></Col>
    </div>
  </div>
);

export default Notification;
