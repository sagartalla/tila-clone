import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import SVGComponent from '../../../common/SVGComponet';
import { actionCreators, selectors } from '../../../../store/payments';
import Voucher from './Voucher';
import { languageDefinations } from '../../../../utils/lang/';

import Button from '../../../common/CommonButton';

import lang from '../../../../utils/language';

import styles_en from '../../payment_en.styl';
import styles_ar from '../../payment_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;


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
    this.state = {
      card_token: _.find(props.data.cards_list, { default: true }).card_token
    };
    this.selectCard = this.selectCard.bind(this);
    this.proceedToPayment = this.proceedToPayment.bind(this);
  }

  selectCard(card_token) {
    return () => {
      this.setState({
        card_token: card_token
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.processData && nextProps.processData.redirect_url) {
      window.location = nextProps.processData.redirect_url;
    }
  }

  proceedToPayment() {
    const { data, makeProcessRequest } = this.props;
    makeProcessRequest({
      payment_details: [{
        payment_mode: data.type,
        card_token: this.state.card_token
      }]
    });
  }

  paymentIcons(provider_type) {
    switch (provider_type) {
      case 'Visa':
        return "icons/cards-icons-list/bg-visa-icon";
      case 'Mastercard':
        return "icons/cards-icons-list/bg-master-icon";
      case 'Maestro':
        return "icons/cards-icons-list/bg-mastro-icon";
    }
  }

  render() {
    const { data, voucherData, showLoading } = this.props;
    return (
      <div className={`${styles['saved-cards']}`}>
        <Voucher voucherData={voucherData} />
        <h4 className={`${styles['lgt-blue']} ${styles['fontW300']} ${styles['fs-20']} ${styles['pt-25']}`}>{PAYMENT_PAGE.YOUR_SAVED_CREDIT_AND_DEBIT_CARDS}</h4>
        <ul className={`${styles['saved-cards-part']} ${styles['pl-0']}`}>
          {
            data.cards_list.map((card, index) => {
              return (
                <li className={`${this.state.card_token === card.card_token ? styles['card-active'] : ''} ${styles['saved-card-item']} ${styles['mt-20']} ${styles['mb-20']}`}>
                  <input
                    id={`card-${index}`}
                    className={styles['radio-btn']}
                    name="credit-card"
                    type='radio'
                    onClick={this.selectCard(card.card_token)}
                    checked={this.state.card_token ? (this.state.card_token === card.card_token) : card.default}
                  />
                  <label for={`card-${index}`} className={`${styles['card-label']} ${styles['flex']} ${styles['justify-between']}`}>
                    <span className={`${styles['flex']} ${styles['fontW300']}`}>
                      {
                        this.paymentIcons(card.provider_type) ?
                          <SVGComponent clsName={`${styles['vault-card']}`} src={this.paymentIcons(card.provider_type)} />
                          : ''
                      }
                      <span className={`${styles['card-no']}`}>{card.masked_number}</span>
                    </span>
                    <span className={`${styles['flex']} ${styles['fontW300']} ${styles['thick-gry-clr']}`}>{card.holder_name}</span>
                    <span className={`${styles['flex']} ${styles['fontW300']} ${styles['thick-gry-clr']}`}>{`${card.expiry_month}/${card.expiry_year}`}</span>
                  </label>
                </li>
              );
            })
          }
        </ul>
        <Button
          className={`${styles['fs-16']} ${styles['text-uppercase']} ${styles['pay-btn']} ${styles['border-radius']} ${styles.width33} ${styles['ht-40']} ${styles['new-card-btn']}`}
          onClick={this.proceedToPayment}
          btnText={PAYMENT_PAGE.PAY + ' ' + data.amount_to_pay.display_value + ' ' + data.amount_to_pay.currency_code}
          hoverClassName="hoverBlueBackground"
          btnLoading={showLoading}
        />
      </div>
    );
  }
}

const mapStateToprops = (store) => {
  return ({
    processData: selectors.getProcessData(store),
    showLoading: selectors.getLoader(store),
  });
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      makeProcessRequest: actionCreators.makeProcessRequest
    },
    dispatch,
  );

SavedCards.propTypes = {
  showLoading: PropTypes.bool,
};
SavedCards.defaultProps = {
  showLoading: false,
};
export default connect(mapStateToprops, mapDispatchToProps)(SavedCards);
