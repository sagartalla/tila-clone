import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Cookie from 'universal-cookie';

import SVGComponent from '../../common/SVGComponet';
import { languageDefinations } from '../../../utils/lang';

import lang from '../../../utils/language';

import styles_en from '../thankyou_en.styl';
import styles_ar from '../thankyou_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;


const { THANK_YOU_PAGE } = languageDefinations();
const cookies = new Cookie();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

const PaymentStatus = props => {
  const message = (props.status == "SUCCESSFUL") ? `${THANK_YOU_PAGE.SUCCESSFUL_ORDER_MESSAGE}` : (props.status == "FAILED") ? `${THANK_YOU_PAGE.FAILURE_ORDER_MESSAGE}` : null;
  const successMessage = <span>{THANK_YOU_PAGE.ORDER_PLACED_BEING_PROCESSED} {THANK_YOU_PAGE.EMAIL_SHIPPMENT_DETAILS}{THANK_YOU_PAGE.TRACK_YOUR} {THANK_YOU_PAGE.ORDER} <a className={styles['fontW600']} href={`/${country}/${language}/cam/orders/${props.orderId}`}>here</a>.</span>;
  const subMessage = (props.status == "SUCCESSFUL") ? successMessage : (props.status == "FAILED") ? `${THANK_YOU_PAGE.ORDER_FAILURE_MESSAGE} 4 ${THANK_YOU_PAGE.WORKING_DAYS} ${THANK_YOU_PAGE.QUERIES_PLEASE_CONTACT}` : null;

  return (
    <Grid className={styles['pt-75']}>
      <Row className={`${styles['flex-center']} ${styles['m-0']}`}>
        <Col md={2} xs={2} sm={2}>
          <div className={styles['pb-25']}>
            <SVGComponent clsName={`${styles['gift-card']}`} src="icons/gift-icon/gift-icon" />
          </div>
        </Col>
        <Col md={10} xs={9} sm={9}>
          <div className={`${styles['flx-spacebw-alignc']}`}>
            <h3 className={`${styles['mt-0']} ${styles['light-gry-clr']} ${styles['fontW600']}`}>{message}</h3>
            {
              props.status == "SUCCESSFUL" ?
                <a href={`/${country}/${language}/cam/orders`} className={styles['mb-20']}>
                  <button className={`${styles['fp-btn']} ${styles['fp-btn-default']}`}>{THANK_YOU_PAGE.TRACK_ORDERS}</button>
                </a>
                : null
            }
          </div>
          <p className={`${styles['col-header']} ${styles['lgt-black']}`}>
            {subMessage}
          </p>
        </Col>
      </Row>
    </Grid>
  );
}

export default PaymentStatus;
