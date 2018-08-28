import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import SVGComponent from '../../common/SVGComponet';

import { mergeCss } from '../../../utils/cssUtil';
import {languageDefinations} from '../../../utils/lang';
const styles = mergeCss('components/Thankyou/thankyou');
const {THANK_YOU_PAGE} = languageDefinations();
const PaymentStatus = props => {
  const message = (props.status == "SUCCESSFUL") ? `${THANK_YOU_PAGE.SUCCESSFUL_ORDER_MESSAGE}` : (props.status == "FAILED") ? `${THANK_YOU_PAGE.FAILURE_ORDER_MESSAGE}` : null;
  const successMessage = <span>{THANK_YOU_PAGE.ORDER_PLACED_BEING_PROCESSED} {THANK_YOU_PAGE.EMAIL_SHIPPMENT_DETAILS}{THANK_YOU_PAGE.TRACK_YOUR} &nbsp;<a className={styles['fontW600']} href={"/cam/orders/" + props.orderId}>{THANK_YOU_PAGE.ORDER_PAGE}</a>&nbsp;{THANK_YOU_PAGE.YOUR_ACCOUNT}</span>;
  const subMessage = (props.status == "SUCCESSFUL") ? successMessage : (props.status == "FAILED") ? `${THANK_YOU_PAGE.ORDER_FAILURE_MESSAGE} 4 ${THANK_YOU_PAGE.WORKING_DAYS} ${THANK_YOU_PAGE.QUERIES_PLEASE_CONTACT}` : null;

  return (
    <Grid>
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
                <a href="/cam/orders" className={styles['mb-20']}><button className={`${styles['fp-btn']} ${styles['fp-btn-default']}`}>{THANK_YOU_PAGE.TRACK_ORDERS}</button></a>
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
