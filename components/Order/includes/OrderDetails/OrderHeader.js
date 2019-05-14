import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Modal } from 'react-router-modal';
import { Row, Col } from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../store/order';


import MyGMap from '../../../Cam/ShippingAddress/includes/MyGMap';

import SVGComponent from '../../../common/SVGComponet';

import { languageDefinations } from '../../../../utils/lang';
const {ORDER_PAGE,CART_PAGE} = languageDefinations();

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../../order_en.styl';
import styles_ar from '../../order_en.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};


class OrderHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showToolTip: false,
      showModal: false,
      lat: 0,
      lng: 0,
    }

    this.pinAddress = this.pinAddress.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showToolTip = this.showToolTip.bind(this);
    this.hideToolTip = this.hideToolTip.bind(this);
    this.submitLatLng = this.submitLatLng.bind(this);
    this.getDataFromMap = this.getDataFromMap.bind(this);
  }

  showToolTip() {
    this.setState({ showToolTip: true });
  }

  hideToolTip() {
    this.setState({ showToolTip: false });
  }

  pinAddress() {
    this.setState({ showModal: true });
  }

  getDataFromMap(json) {
    const { lat, lng } = json;
    this.setState({ lat, lng });
  }

  submitLatLng() {
    const { lat, lng } = this.state;
    if (lat != 0 && lng != 0) {
      this.props.sendMapData(this.props.orderDetails.orderId, {
        'latitude': lat,
        'longitude': lng
      });
      this.closeModal();
    }
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { showToolTip, showModal } = this.state;
    const {
      name, address, phone, orderId, orderDate, price,
      shippingTotal, payments, currency_code, order_type,
    } = this.props.orderDetails;
    const {
      total_mrp = {}, total_shipping = {}, total_offer_price = {}, total_price = {}, total_gift_charges = {}, total_discount = {},
    } = price;
    return (
      <div className={`${styles.box} ${styles['addres-dtls']}`}>
        <Row className={styles['m-0']}>
          {/* <Col md={12} xs={12} sm={12}> */}
          <Col md={12} xs={12} sm={12} className={`${styles['border-btm-dottes']}`}>
            <div className={`${styles.flex}`}>
              <Col md={3} xs={6} sm={3} className={`${styles['pb-20']} ${styles['pt-20']}`}>
                <div className={styles['flx-space-bw']}>
                  <h5 className={`${styles['mt-0']} ${styles['fs-16']} ${styles['light-gry-clr']} ${styles['mb-15']} ${styles['text-uppercase']}`}>{ORDER_PAGE.ADDRESS_DETAILS}</h5>
                  {/* <h5 className={`${styles['mt-0']} ${styles['flex']}`}>
                    <a className={`${styles['pr-10']} ${styles['thick-blue']}`} onClick={this.pinAddress}>{ORDER_PAGE.PIN_ADDRESS}</a>
                    <SVGComponent clsName={`${styles['pin-map-icon']}`} src="icons/small-map-icon/small-map" />
                  </h5> */}
                </div>
                <div className={`${styles['ff-sb']} ${styles['mb-5']} ${styles['text-capitalize']}`}>{name}</div>
                <div className={`${styles['thick-gry-clr']} ${styles['fs-14']}`}>{address}</div>
              </Col>
              {order_type !== 'EXCHANGE' ?
                <Col md={5} xs={6} sm={5} className={`${styles['ipad-p-0']} ${styles['thick-border-left']} ${styles['pb-20']} ${styles['pt-20']} ${styles['thin-border-right']}`}>
                  <div>
                    <div className={`${styles['mt-0']} ${styles['flex-center']} ${styles['light-gry-clr']}  ${styles['mb-15']}`}>
                      <Col md={6} sm={6} className={`${styles['text-uppercase']} ${styles['fs-16']}`}>{ORDER_PAGE.ORDER_DETAILS_SUMMERY}</Col>
                      <Col md={6} sm={6} className={`${styles['fs-14']}`}>{ORDER_PAGE.ORDER} # {orderId}</Col>
                    </div>
                  </div>
                  <div className={styles['lne-ht2']}>
                    <div className={`${styles['flex-center']} ${styles['fs-14']}`}>
                      <Col md={6} sm={6} className={styles['thick-gry-clr']}>{ORDER_PAGE.ORDER_DATE}</Col>
                      <Col md={6} sm={6}>{moment(orderDate).format('MMMM DD, YYYY')}</Col>
                    </div>
                    <div className={`${styles['flex-center']} ${styles['fs-14']}`}>
                      <Col md={6} sm={6} className={styles['thick-gry-clr']}>{ORDER_PAGE.ITEM_TOTAL}</Col>
                      {price && <Col md={6} sm={6}><span>{total_offer_price.display_value}</span> <span>{total_offer_price.currency_code}</span></Col>}
                    </div>
                    {/* <p className={`${styles['flex-center']}`}>
                      <Col md={6} sm={6}>{ORDER_PAGE.SHIPPING}</Col>
                      <Col md={6} ms={6}><span>{price.total_shipping}</span> <span>{currency_code}</span></Col>
                    </p> */}
                  </div>
                </Col>
                :
                <Col md={4} xs={6} sm={4} className={`${styles['ipad-p-0']} ${styles['pb-20']} ${styles['pt-20']} ${styles['thick-border-left']} ${styles['thin-border-right']}`}>
                  <div className={`${styles['pl-15']} ${styles['pr-15']}`}>
                    <div className={styles.flex}>
                      <span className={styles['green-label']}>Exchange</span>
                    </div>
                    <p className={`${styles['thick-gry-clr']} ${styles['mt-15']} ${styles['mr-50']}`}>
                      This is an exchange order on the item you have requested for exchange. To view parent order please
                      <a> Click here</a>
                    </p>
                  </div>
                </Col>}
              {order_type !== 'EXCHANGE' &&
              <Col md={4} xs={6} sm={4} className={`${styles['pb-20']} ${styles['pt-20']}`}>
                {/* <Col md={12} xs={6} sm={12}> */}
                  <div className={`${styles['mt-0']} ${styles['light-gry-clr']} ${styles['flex-center']}  ${styles['mb-20']}`}>
                    <Col md={6} sm={6} className={`${styles['ipad-pl-0']} ${styles['fs-16']}`}><span>{ORDER_PAGE.PAY_METHOD}</span></Col>
                    <Col md={6} sm={6} className={`${styles['ipad-pr-0']} ${styles['fs-14']} ${styles['fontW600']}`}>
                      <span>{ORDER_PAGE.REQ_INVOICE}</span>
                    </Col>
                  </div>
                {/* </Col> */}
                {/* <Col md={12} sm={12}> */}
                  {payments && payments.length > 0 &&
                    payments.map(p => (
                      <Fragment>
                        <div className={`${styles['lne-ht2']} ${styles['fs-14']}`}>
                          <Col className={`${styles['thick-gry-clr']} ${styles['text-capitalize']}`} md={6}>{p.payment_mode.replace('_', ' ')}</Col>
                          <Col md={6}> {`${p.amount.display_value} ${p.currency_code}`}</Col>
                        </div>
                        {p.card_type &&
                          <div className={`${styles['lne-ht2']} ${styles['fs-14']}`}>
                            <Col className={`${styles['thick-gry-clr']}`} md={6}>{p.card_type}</Col>
                            {/* { p.amount && p.amount.display_value && */}
                              <Col md={6}>
                                {`${p.masked_card_first6}******${p.masked_card_last4}`}
                                {/* {p.amount.display_value} {p.amount.currency_code} */}
                              </Col>
                            {/* } */}
                          
                          </div>}
                      </Fragment>
                    ))}
                {/* </Col> */}
              </Col>}

              {/*

                Dont Remove until Ravi validates it

              <Col md={2} xs={6} sm={6}>
                <h5 className={`${styles['mt-0']} ${styles['fs-16']} ${styles['light-gry-clr']} ${styles['fontW600']} ${styles['mb-20']}`}>PAYMENT METHOD</h5>
                <div>
                  <p className={`${styles['flex']} ${styles['fs-12']}`}>
                    <SVGComponent clsName={`${styles['gift-card-icon']}`} src="icons/small-giftcard/small-gift" />
                    <span className={styles['ml-10']}>Gift Card</span>
                  </p>
                  <p className={`${styles['flex-center']} ${styles['fs-12']}`}>
                    <SVGComponent clsName={`${styles['visa-card-icon']}`} src="icons/visa-icon/visa-icon" />
                    <span className={`${styles['ml-10']} ${styles['border-radius2']} ${styles['p-5']} ${styles['card']}`}>4357</span></p>
                </div>
              </Col>
              <Col md={2} xs={6} sm={6}>
                <h5 className={`${styles['mt-0']} ${styles['fs-16']} ${styles['mb-20']}`}><a>Request Invoice</a></h5>
                <div>
                  {/* <span>value</span>
                  <p>Emi</p>
            </div>
        </Col> */}
            </div>
          </Col>
          {order_type !== 'EXCHANGE' &&
            <Col md={12} xs={12} sm={12} className={styles['p-15']}>
              <Col md={3} xs={6} sm={3}>
                {/* <a>{ORDER_PAGE.CHANGE_ADDRESS}</a> */}
              </Col>
              <Col md={5} xs={6} sm={5}>
                <Col md={6} sm={6}><span className={`${styles['thick-gry-clr']} ${styles['fs-14']}`}>{ORDER_PAGE.GRAND_TOTAL}</span></Col>
                {price &&
                <Col md={6} sm={6}>
                  <span className={`${styles.fontW600} ${styles['light-gry-clr']} ${styles['flex-center']} ${styles['fs-14']}`}>
                    {total_price.display_value}&nbsp;{total_price.currency_code}
                    {/* (<a onMouseOver={this.showToolTip} onMouseLeave={this.hideToolTip}>i</a>) */}
                    <span onMouseOver={this.showToolTip} onMouseLeave={this.hideToolTip} className={`${styles.relative} ${styles['checkout-quat']} ${styles['fs-12']} ${styles['flex-center']} ${styles['justify-around']}`}>
                      {'?'}
                      {
                      showToolTip ?
                        <div className={styles['tool-tip']}>
                          <ul>
                            {total_mrp &&
                            <li className={styles['flx-space-bw']}><span className={styles['thick-gry-clr']}>{ORDER_PAGE.T_MRP} : </span><span> {total_mrp.display_value} {total_mrp.currency_code}</span></li>}
                            {total_discount &&
                            <li className={styles['flx-space-bw']}><span className={styles['thick-gry-clr']}>{ORDER_PAGE.T_DISCOUNT} : </span><span>{'(-)'} {total_discount.display_value} {total_discount.currency_code}</span></li>}
                            {total_offer_price &&
                            <li className={`${styles['flx-space-bw']} ${styles['b-t']}`}><span className={styles['thick-gry-clr']}>{ORDER_PAGE.T_PRICE} : </span><span> {total_offer_price.display_value} {total_offer_price.currency_code}</span></li>}
                            {total_shipping &&
                            <li className={styles['flx-space-bw']}><span className={styles['thick-gry-clr']}>{ORDER_PAGE.T_SHIPPING} : </span><span className={styles.flex}>{total_shipping.display_value ? `(+) ${total_shipping.display_value} ${total_shipping.currency_code}` : <SVGComponent clsName={`${styles['ship-icon']}`} src="icons/free-shipping" />}</span></li>}
                            {total_gift_charges && total_gift_charges.money_value > 0 &&
                              <li className={styles['flx-space-bw']}><span className={styles['thick-gry-clr']}>{ORDER_PAGE.T_GIFT_CHARGES} : </span><span>{total_gift_charges.display_value ? `(+) ${total_gift_charges.display_value} ${total_gift_charges.currency_code}` : 'FREE'}</span></li>}
                            {total_price &&
                            <li className={styles['flx-space-bw']}><span className={styles['thick-gry-clr']}>{ORDER_PAGE.TOTAL} : </span><span className={styles.fontW600}>{total_price.display_value} {total_price.currency_code}</span></li>}
                          </ul>
                        </div>
                        : null
                      }
                    </span>
                  </span>
                </Col>}
              </Col>
              <Col md={4} xs={6} sm={4}>
                {/* <span className={`${styles['flex-center']} ${styles['share-cont']}`}>
                  <SVGComponent clsName={`${styles['share-icon']}`} src="icons/share-icon/share-icon" />
                  <span className={`${styles['pl-10']}`}><a>{ payments[0].transaction_status == "FAILED" ? ORDER_PAGE.PAYMENT_FAILED:  ORDER_PAGE.SOCIALIZE }</a></span>
                </span> */}
              </Col>
            </Col>}
          {/* </Col > */}
        </Row >
        {
          showModal ?
            <Modal className={`react-router-modal__modal ${styles['p-20']}`} onBackdropClick={this.closeModal}>
              <MyGMap
                getDataFromMap={this.getDataFromMap}
                clsName='order-map'
              />
              <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']}`} onClick={this.submitLatLng}>{ORDER_PAGE.SUBMIT}</button>
              <button className={`${styles['fp-btn']} ${styles['fp-btn-default']}`} onClick={this.closeModal}>{ORDER_PAGE.CANCEL}</button>
            </Modal>
            : null
        }
      </div >
    );
  }
}

OrderHeader.propTypes = {
  orderDetails: PropTypes.object.isRequired,
};

// const mapStateToProps = (store) => {

// };

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    sendMapData: actionCreators.sendMapData,
  }, dispatch);

export default connect(null, mapDispatchToProps)(OrderHeader);
