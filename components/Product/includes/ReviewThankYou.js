import React, { Component } from 'react';
import { Col, Button } from 'react-bootstrap';
import SVGComponent from '../../common/SVGComponet';
import { languageDefinations } from '../../../utils/lang';

import lang from '../../../utils/language';
import constants from '../../../constants';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../product_en.styl';
import styles_ar from '../product_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };
const { PDP_PAGE } = languageDefinations();

const ReviewThankYou = props => (
  <div className={styles['review-thak-you']}>
    <div className={`${styles.flex} ${styles['justify-center']}`}>
      <SVGComponent clsName={`${styles['review-thankyou-icon']}`} src="icons/common-icon/review-thankyou" />
    </div>
    <h4 className={`${styles.fontW600} ${styles['t-c']} ${styles['mt-20']} ${styles['mb-20']}`}>{PDP_PAGE.THANKS_FOR_RATING}</h4>
    <p className={`${styles['fs-14']} ${styles['thick-gry-clr']} ${styles['pb-20']}`}>{PDP_PAGE.THANKS_DESCRIPTION}</p>
    <Button
      variant="primary"
      onClick={props.toggleReviewModal}
      className={`${styles['btn-style']} ${styles['btn-style-override']} ${styles['fs-14']} ${styles['text-uppercase']}`}
    >
      {PDP_PAGE.PDP_DONE}
    </Button>
  </div>
);

export default ReviewThankYou;
