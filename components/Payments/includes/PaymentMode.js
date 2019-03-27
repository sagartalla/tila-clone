import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import Voucher from './paymentpages/Voucher';
import GiftCard from './paymentpages/GiftCard';
import SVGComponent from '../../common/SVGComponet';
import PayOnline from './paymentpages/PayOnline';
import NetBanking from './paymentpages/NetBanking';
import RewardPoints from './paymentpages/RewardPoints';
import CashOnDelivery from './paymentpages/CashOnDelivery';
import SavedCards from './paymentpages/SavedCards';

import { actionCreators, selectors } from '../../../store/payments';

import {languageDefinations} from '../../../utils/lang'
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Payments/payment');
const {PAYMENT_PAGE} = languageDefinations();
// const PaymentMode = props => {
//
//   //NOTE: For every new payment type,
//   //      we need to create one page under "paymentpages" folder and add one key vale pair here.
//   const paymentPageConfig = {
//     "VOUCHER": Voucher,
//     "REWARD_POINTS": RewardPoints,
//     "PAY_ONLINE": PayOnline,
//     "GIFT_CARD": GiftCard,
//     "NET_BANKING": NetBanking,
//     "CASH_ON_DELIVERY": CashOnDelivery,
//     'SAVED_CARD': Voucher,
//   }
//
//   const paymentPageIcons = {
//     "VOUCHER": 'credit-card',
//     "REWARD_POINTS": 'credit-card',
//     "PAY_ONLINE": 'credit-card',
//     "GIFT_CARD": 'gift-card',
//     "NET_BANKING": 'netbanking',
//     "CASH_ON_DELIVERY": 'cash-on-drt',
//     'SAVED_CARD': 'credit-card',
//   }
//
//   // const paymentTypeNames = {
//   //   "VOUCHER": "Voucher",
//   //   "REWARD_POINTS": "Reward Points",
//   //   "PAY_ONLINE": "Pay Online",
//   //   "GIFT_CARD": GiftCard,
//   //   "NET_BANKING": NetBanking,
//   //   "CASH_ON_DELIVERY":Cod
//   // }
//
//   const showPaymentType = (e) => {
//     props.showPaymentType(e.currentTarget.id);
//   }
//
//   const makePayment = (e) => {
//     props.makePayment();
//   }
//
//   return (
//     <div className={`${styles['payment-mode-prt']} ${styles['box']} ${styles['mb-20']} ${styles['relative']}`}>
//       <SVGComponent clsName={`${styles['payment-icon']} ${props.configJson.progress ? 'payment-active' : ''}`} src="icons/payment-icon/payment-icon" />
//       <Row className={`${props.configJson.basic ? '' : 'hide'}`}>
//         <Col md={12} sm={12} xs={12}>
//           <h4 className={styles['m-0']}>{PAYMENT_PAGE.MAKE_PAYMENT}</h4>
//           <p className={styles['mb-0']}>
//             <small>Net banking, credit card, vouchers and etc....</small>
//           </p>
//         </Col>
//       </Row>
//       <div className={`${props.configJson.progress ? '' : 'hide'}`}>
//         {
//           props.data && props.data.orderRes ?
//             <div>
//               <h4 className={`${styles['m-0']} ${styles['mb-10']}`}>{PAYMENT_PAGE.MAKE_PAYMENT}</h4>
//               <Row>
//                 <Col md={3} sm={12} xs={12} className={styles['payment-mode-inn']}>
//                   <ul className={` ${styles['pay-menu']} ${styles['m-0']} ${styles['pl-5']} ${styles['pt-5']}`}>
//                     {
//                       props.data.data.payment_options_available.map((val, key) => {
//                         return (
//                           <li id={index} key={index} onClick={showPaymentType} className={`${index == props.showTab ? styles['active'] : ''} ${styles['flex-center']} ${styles['payment-lists']}`}>
//                             <SVGComponent clsName={`${styles['make-paymrnt-icon']}`} src={"icons/cards-icons-list/" + paymentPageIcons[val.type]} />
//                             {/* <img src={"/static/img/icons/cards-icons-list/" + paymentPageIcons[val.type]} /> */}
//                             <span className={styles['pl-10']}>{val.display_name}</span>
//                           </li>
//                         )
//                       })
//                     }
//                   </ul>
//                 </Col>
//                 <Col md={9} sm={12} xs={12} className={styles['m-pd-0']}>
//                   {
//                     props.data.data.payment_options_available.map((val, index) => {
//                       const Page = paymentPageConfig[val.type];
//                       return (
//                         <div key={index} className={`${props.showTab == index ? '' : 'hide'}`}>
//                           <Page
//                             makePayment={makePayment}
//                             orderRes={props.data}
//                             saveCard={props.saveCard}
//                           />
//                         </div>
//                       )
//                     })
//                   }
//                 </Col>
//               </Row>
//             </div>
//             : <div>{PAYMENT_PAGE.LOADING}</div>
//         }
//       </div>
//     </div>
//   );
// };
//
// PaymentMode.propTypes = {
//   data: PropTypes.object.isRequired,
//   showPaymentType: PropTypes.func.isRequired,
//   // showTab: PropTypes.string
// }
//
// PaymentMode.defaultProps = {
//   data: {}
// }


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
        <Row className={`${props.configJson.basic ? '' : 'hide'}`}>
          <Col md={12} sm={12} xs={12}>
            <h4 className={styles['m-0']}>{PAYMENT_PAGE.MAKE_PAYMENT}</h4>
            <p className={styles['mb-0']}>
              <small>Net banking, credit card, vouchers and etc....</small>
            </p>
          </Col>
        </Row>
        <div className={`${props.configJson.progress ? '' : 'hide'}`}>
          {
            props.data && props.data.orderRes ?
              <div>
                <h4 className={`${styles['m-0']} ${styles['mb-10']}`}>{PAYMENT_PAGE.MAKE_PAYMENT}</h4>
                {
                  Object.keys(props.paymentModesData.paymentModes).length
                    ?
                      <Row>
                        <Col md={3} sm={12} xs={12} className={styles['payment-mode-inn']}>
                          <ul className={` ${styles['pay-menu']} ${styles['m-0']} ${styles['pl-5']} ${styles['pt-5']}`}>
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
                        <Col md={9} sm={12} xs={12} className={styles['m-pd-0']}>
                          {
                            _.map(props.paymentModesData.paymentModes, (val, key) => {
                              const Page = paymentPageConfig[val.type];
                              return showTab == key
                              ?
                                <Page
                                  saveCard={props.saveCard}
                                  voucherData={props.paymentModesData.voucherData}
                                  data={props.paymentModesData.paymentModes[key]}
                                  disableAllOthers={this.disableAllOthers}
                                />
                              :
                                null
                              // return (
                              //   <div key={key} className={`${showTab == key ? '' : 'hide'}`}>
                              //     <Page
                              //       saveCard={props.saveCard}
                              //       voucherData={props.paymentModesData.voucherData}
                              //       data={props.paymentModesData.paymentModes[key]}
                              //     />
                              //   </div>
                              // )
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
              : <div>{PAYMENT_PAGE.LOADING}</div>
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
