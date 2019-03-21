import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import Voucher from './Voucher';

import { languageDefinations } from '../../../../utils/lang/';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Payments/payment');
const { PAYMENT_PAGE } = languageDefinations();

// const SavedCards = props => (
//   <div className={`${styles['voucher']} ${styles['p-10']}`}>
//     <Grid>
//       <Row>
//         <Col md={12}>
//           {PAYMENT_PAGE.VOUCHER}
//         </Col>
//       </Row>
//       <Row>
//         <Col md={12} sm={12} xs={12}>
//           <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']}`} onClick={props.makePayment}>Pay {props.orderRes.data.amount} {props.orderRes.data.currency}</button>
//         </Col>
//       </Row>
//     </Grid>
//   </div>
// );

class SavedCards extends Component {

  constructor(props) {
    super(props);
    this.selectCard = this.selectCard.bind(this);
  }

  selectCard(card_token) {
    return () => {
      console.log('card_token', card_token);
    }
  }

  render() {
    const { data, voucherData } = this.props;
    return (
      <div className={`${styles['saved-cards']} ${styles['p-10']} `}>
        <Grid>
          <Voucher voucherData={voucherData} />
          <Row>
            <ul>
            {
              data.cards_list.map((card, index) => {
                return (
                  <li>
                    <input
                      id={`card-${index}`}
                      name="credit-card"
                      type='radio'
                      onClick={this.selectCard(card.card_token)}
                      checked={card.default}
                    />
                    <label for={`card-${index}`}>
                      <div>{card.masked_number}</div>
                      <div>{card.holder_name}</div>
                      <div>{`${card.expiry_month}/${card.expiry_year}`}</div>
                    </label>
                  </li>
                );
              })
            }
            </ul>
            <button className={`${styles['fp-btn-primary']} ${styles['fp-btn']}`}>Pay {data.amount_to_pay} {data.currency_code}</button>
          </Row>
        </Grid>
      </div>
    );
  }
}

SavedCards.propTypes = {
  makePayment: PropTypes.func.isRequired,
}

SavedCards.defaultProps = {

}

export default SavedCards;
