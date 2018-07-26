import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {Grid, Row, Col } from 'react-bootstrap';

import SVGComponent from '../../common/SVGComponet';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Thankyou/thankyou');

const PaymentStatus = props => {
  const message = (props.status == "SUCCESSFUL") ? "YOUR ORDER HAS BEEN PLACED SUCCESSFULLY" : (props.status == "FAILURE") ? "ORDER FAILURE" : null;
  const successMessage = <span>Your order has been placed and is being processed. You will receive an email with details once the item(s) are shipped. You can track your &nbsp;<a className={styles['fontW600']} href={"/cam/orders/"+props.orderId}>Orders page</a>&nbsp;in your account</span>;
  const subMessage = (props.status == "SUCCESSFUL") ? successMessage : (props.status == "FAILURE") ? "Please try again" : null;

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
            <a href="/cam/orders"   className={styles['mb-20']}><button className={`${styles['fp-btn']} ${styles['fp-btn-default']}`}> TRACK ORDERS </button></a>
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
