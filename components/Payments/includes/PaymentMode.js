import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import Voucher from './paymentpages/Voucher';
import SVGComponent from '../../common/SVGComponet';
import PayOnline from './paymentpages/PayOnline';
import CashOnDelivery from './paymentpages/CashOnDelivery';
import SavedCards from './paymentpages/SavedCards';

import { selectors } from '../../../store/payments';

import {languageDefinations} from '../../../utils/lang'

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../payment_en.styl';
import styles_ar from '../payment_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const {PAYMENT_PAGE} = languageDefinations();

const paymentPageIcons = {
  "VOUCHER": 'credit-card',
  "REWARD_POINTS": 'credit-card',
  "PAY_ONLINE": 'credit-card',
  "GIFT_CARD": 'gift-card',
  "NET_BANKING": 'netbanking',
  "CASH_ON_DELIVERY": 'cash-on-drt',
  'SAVED_CARD': 'credit-card',
};

  const paymentPageConfig = {
    "PAY_ONLINE": PayOnline,
    "CASH_ON_DELIVERY": CashOnDelivery,
    'SAVED_CARD': SavedCards,
  }

class PaymentMode extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.showPaymentType = this.showPaymentType.bind(this);
    this.disableAllOthers = this.disableAllOthers.bind(this);
  }

  showPaymentType(e) {
    this.setState({
      showTab: e.currentTarget.id
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.configJson.basic) {
      this.state = {}
    }
    if(!this.state.showTab) {
      this.setState({
        showTab: Object.keys(nextProps.paymentModesData.paymentModes)[0]
      });
    }
  }

  disableAllOthers({except}) {
    this.setState({
      except,
    })
  }

  render() {
    const props = this.props;
    const { showTab } = this.state;
    return (
      <div className={`${styles['payment-mode-prt']} ${styles['box']} ${styles['mb-20']} ${styles['relative']}`}>
        <SVGComponent clsName={`${styles['payment-icon']} ${props.configJson.progress ? 'payment-active' : ''}`} src="icons/payment-icon/payment-icon" />
        <Row className={`${props.configJson.basic ? '' : 'hide'} ${styles['pt-15']} ${styles['pb-15']}`}>
          <Col md={12} sm={12} xs={12}>
            <h4 className={`${styles['m-0']}`}>{PAYMENT_PAGE.MAKE_PAYMENT}</h4>
            <p className={styles['mb-0']}>
              <small>{PAYMENT_PAGE.PAYMENT_MODE}</small>
            </p>
          </Col>
        </Row>
        <div className={`${props.configJson.progress ? '' : 'hide'}`}>
          {
            props.data && props.data.orderRes ?
              <div>
                {
                  Object.keys(props.paymentModesData.paymentModes).length
                    ?
                      <Row>
                        <Col md={3} sm={12} xs={12} className={`${styles['payment-mode-inn']} ${styles['pt-15']} ${styles['pb-20']}`}>
                          <h4 className={`${styles['m-0']} ${styles['mb-10']} ${styles['pb-20']} ${styles['pt-5']} ${styles['fontW600']}`}>{PAYMENT_PAGE.MAKE_PAYMENT}</h4>
                          <ul className={` ${styles['pay-menu']} ${styles['m-0']} ${styles['pl-5']} ${styles['pb-5']} ${styles['pt-5']}`}>
                            {
                              _.map(props.paymentModesData.paymentModes, (val, key) => {
                                return (
                                  <li id={key} key={key} onClick={this.showPaymentType} className={`${key == showTab ? styles['active'] : ''} ${styles['flex-center']} ${styles['payment-lists']} ${(this.state.except && this.state.except !== key) ? styles['disabled'] : ''}`}>
                                    <SVGComponent clsName={`${styles['make-paymrnt-icon']}`} src={"icons/cards-icons-list/" + paymentPageIcons[val.type]} />
                                    {/* <img src={"/static/img/icons/cards-icons-list/" + paymentPageIcons[val.type]} /> */}
                                    <span className={styles['pl-10']}>{val.display_name}</span>
                                  </li>
                                )
                              })
                            }
                          </ul>
                        </Col>
                        <Col md={9} sm={12} xs={12} className={`${styles['m-pd-0']} ${styles['pr-0']}`}>
                          {
                            _.map(props.paymentModesData.paymentModes, (val, key) => {
                              const Page = paymentPageConfig[val.type];
                              return showTab == key
                              ?
                                <Page
                                  key={key}
                                  saveCard={props.saveCard}
                                  voucherData={props.paymentModesData.voucherData}
                                  data={props.paymentModesData.paymentModes[key]}
                                  disableAllOthers={this.disableAllOthers}
                                  transactionId={props.paymentModesData.transaction_id}
                                />
                              :
                                null
                            })
                          }
                        </Col>
                      </Row>
                    :
                      <Row>
                        <Voucher voucherData={props.paymentModesData.voucherData} isOnlyVocuher={true}/>
                      </Row>
                }

              </div>
              : <div className={styles['p-15']}>{PAYMENT_PAGE.LOADING}</div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToprops = (store) => ({
  paymentModesData: selectors.getPaymentModesData(store)
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

    },
    dispatch,
  );


export default connect(mapStateToprops, mapDispatchToProps)(PaymentMode);
