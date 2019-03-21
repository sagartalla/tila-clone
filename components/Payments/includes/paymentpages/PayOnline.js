import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import Voucher from './Voucher';

import { languageDefinations } from '../../../../utils/lang/';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Payments/payment');
const { PAYMENT_PAGE } = languageDefinations();



class PayOnline extends Component {

  constructor(props) {
    super(props);
    this.state = {
      disableSaveCard: false
    }
    this.saveCardHandler = this.saveCardHandler.bind(this);
  }

  saveCardHandler(e) {
    this.props.saveCard(e);
    this.setState({ disableSaveCard: true })
  }

  render() {
    const { voucherData, data } = this.props;
    const { disableSaveCard } = this.state

    return (
      <div className={`${styles['pay-online']} ${styles['p-10']} `}>
        <Grid>
          <Voucher voucherData={voucherData} />
          <Row>
            <Col md={12} sm={12} xs={12} className={styles['payment-frame']}>
              {/* <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']}`} onClick={props.makePayment}>Pay {props.orderRes.data.amount} {props.orderRes.data.currency}</button> */}
              {/*<iframe src={orderRes.payData.iframe_url} style={{ height: '406px', width: '500px', border: '0' }}></iframe>*/}
              <div>
                  <div>Once you click on Add New Card. There is no going back. You can't access any other modes of payment.</div>
                  <button>Pay {data.amount_to_pay} {data.currency_code} Using New Card</button>
              </div>
            </Col>
            <Col md={12} xs={12}>
              <div className={styles['checkbox-material']}>
                <input id="save-card" type="checkbox" onClick={this.saveCardHandler} disabled={disableSaveCard} />
                <label for="save-card"> Save this card </label>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}



PayOnline.propTypes = {
  makePayment: PropTypes.func.isRequired,
  data: PropTypes.object
}

PayOnline.defaultProps = {

}

export default PayOnline;
