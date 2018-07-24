import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Modal } from "react-router-modal";
import { Row, Col } from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../store/order';


import MyGMap from '../../../Cam/ShippingAddress/includes/MyGMap';

import SVGComponent from '../../../common/SVGComponet';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Order/order');

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
    let { lat, lng, address } = json;
    this.setState({ lat, lng });
  }

  submitLatLng() {
    const { lat, lng } = this.state;
    if (lat != 0 && lng != 0) {
      this.props.sendMapData(this.props.orderDetails.orderId, {
        "latitude": lat,
        "longitude": lng
      });
      this.closeModal();
    }
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { showToolTip, showModal } = this.state;
    const { name, address, phone, orderId, orderDate, price, shippingTotal, payments, currency_code } = this.props.orderDetails;
    return (
      <div className={styles['box']}>
        <Row>
          <Col md={12} xs={12} sm={12}>
            <Col md={12} xs={12} sm={12} className={`${styles['border-btm-dottes']}`}>
              <div className={`${styles['pb-25']} ${styles['pt-25']} ${styles['flex']}`}>
                <Col md={3} xs={6} sm={6}>
                  <div className={styles['flx-space-bw']}>
                    <h5 className={`${styles['mt-0']} ${styles['fs-16']} ${styles['light-gry-clr']} ${styles['fontW600']} ${styles['mb-20']}`}>ADDRESS DETAILS</h5>
                    <h5 className={`${styles['mt-0']} ${styles['flex']}`}>
                      <a className={`${styles['pr-10']} ${styles['thick-blue']}`} onClick={this.pinAddress}>Pin Address</a>
                      <SVGComponent clsName={`${styles['pin-map-icon']}`} src="icons/small-map-icon/small-map" />
                    </h5>
                  </div>
                  <div>{address}</div>
                </Col>
                <Col md={2} xs={6} sm={6}>
                  <h5 className={`${styles['mt-0']} ${styles['fs-16']} ${styles['light-gry-clr']} ${styles['fontW600']} ${styles['mb-20']}`}>ORDER SUMMARY</h5>
                  <div>
                    <p>Order Date </p>
                    <p>Item(s) Subtotal </p>
                    <p>Shipping</p>
                  </div>
                </Col>
                <Col md={3} xs={6} sm={6}>
                  <h5 className={`${styles['mt-0']} ${styles['fs-16']} ${styles['light-gry-clr']} ${styles['fontW600']} ${styles['mb-20']}`}>ORDER # {orderId}</h5>
                  <div>
                    <p>{moment(orderDate).format('MMMM DD, YYYY')}</p>
                    <p><span>{price.total_offer_price}</span> <span>{currency_code}</span></p>
                    <p><span>{price.total_shipping}</span> <span>{currency_code}</span></p>
                  </div>

                </Col>
                <Col md={4} xs={6} sm={6}>
                  <Col md={6} xs={6} sm={6}>
                    <h5 className={`${styles['mt-0']} ${styles['fs-16']} ${styles['light-gry-clr']} ${styles['fontW600']} ${styles['mb-20']}`}>PAYMENT METHOD</h5>
                  </Col>
                  <Col md={6} xs={6} sm={6}>
                    <h5 className={`${styles['mt-0']} ${styles['fs-16']} ${styles['mb-20']}`}><a>Request Invoice</a></h5>
                  </Col>
                  <Col md={12}>
                    {
                      payments.map((p) => {
                        return (
                          <Fragment>
                            <Col md={6}>{p.payment_mode.replace('_', ' ')}</Col><Col md={6}> {p.amount + ' ' + p.currency_code}</Col>
                          </Fragment>
                        )
                      })
                    }
                  </Col>
                </Col>

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
            <Col md={12} xs={12} sm={12} className={styles['p-15']}>
              <Col md={3} xs={6} sm={6}>
                <a>CHANGE ADDRESS</a>
              </Col>
              <Col md={2} xs={6} sm={6}>
                <span className={`${styles['light-gry-clr']}`}>Grand Total</span>
              </Col>
              <Col md={3} xs={6} sm={6}>
                <span className={`${styles['fontW600']} ${styles['light-gry-clr']}`}>{price.total_offer_price}&nbsp;{currency_code} <a onMouseOver={this.showToolTip} onMouseLeave={this.hideToolTip}>?</a></span>
                {
                  showToolTip ?
                    <div className={styles['tool-tip']}>
                      <ul>
                        <li>items {price.total_offer_price} {currency_code}</li>
                        <li>Shipping {price.total_shipping} {currency_code}</li>
                        <li>Discount {price.total_discount} {currency_code}</li>
                        <li>Gift Charges {price.total_gift_charges} {currency_code}</li>
                        <li>Total {price.total_offer_price} {currency_code}</li>
                      </ul>
                    </div>
                    : null
                }

              </Col>
              <Col md={4} xs={6} sm={6}>
                <span className={`${styles['flex-center']}`}>
                  <SVGComponent clsName={`${styles['share-icon']}`} src="icons/share-icon/share-icon" />
                  <span className={`${styles['pl-10']}`}><a>Share with friends</a></span>
                </span>
              </Col>
            </Col>
          </Col >
        </Row >
        {
          showModal ?
            <Modal className={`react-router-modal__modal ${styles['p-20']}`
            } onBackdropClick={this.closeModal} >
              <MyGMap
                getDataFromMap={this.getDataFromMap}
                clsName='order-map'
              />
              <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']}`} onClick={this.submitLatLng}> Submit </button>
              <button className={`${styles['fp-btn']} ${styles['fp-btn-default']}`} onClick={this.closeModal}> Cancel </button>
            </Modal>
            : null
        }

      </div >
    )
  }
}

OrderHeader.propTypes = {
  orderDetails: PropTypes.object.isRequired
}

// const mapStateToProps = (store) => {

// };

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    sendMapData: actionCreators.sendMapData,
  },
    dispatch,
  );
}

export default connect('', mapDispatchToProps)(OrderHeader);
