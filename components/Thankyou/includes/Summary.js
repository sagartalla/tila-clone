import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import SVGComponent from '../../common/SVGComponet';
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Thankyou/thankyou');


/** TODO : Change Address, Request Invoice, Pin Address, Share with friends link is required **/
/** TODO : Address, Shipping cost & Payment details to be added **/

const PaymentStatus = props => {
  const { orderDate, orderId, totalPrice, orderAddress, order_id, currency_code} = props.orderDetails;
  return (
    <div className={styles['box']}>
      <Row>
        <Col md={12} xs={12} sm={12}>
          <Col md={12} xs={12} sm={12} className={`${styles['border-btm-dottes']}`}>
            <div className={`${styles['pb-25']} ${styles['pt-25']} ${styles['flex']}`}>
              <Col md={4} xs={6} sm={6}>
                <div className={styles['flx-space-bw']}>
                  <h5 className={`${styles['mt-0']} ${styles['fs-16']} ${styles['light-gry-clr']} ${styles['fontW600']} ${styles['mb-20']}`}>ADDRESS DETAILS</h5>
                  <h5 className={`${styles['mt-0']} ${styles['flex']}`}>
                    <a className={`${styles['pr-10']} ${styles['thick-blue']}`}>Pin Address</a>
                    <SVGComponent clsName={`${styles['pin-map-icon']}`} src="icons/small-map-icon/small-map" />
                  </h5>
                </div>
                <div>{orderAddress}</div>
              </Col>
              <Col md={2} xs={6} sm={6}>
                <h5 className={`${styles['mt-0']} ${styles['fs-16']} ${styles['light-gry-clr']} ${styles['fontW600']} ${styles['mb-20']}`}>ORDER SUMMARY</h5>
                <address>
                  Order Date <br />
                  Item(s) Subtotal <br />
                  Shipping
                </address>
                
              </Col>
              <Col md={2} xs={6} sm={6}>
                <h5 className={`${styles['mt-0']} ${styles['fs-16']} ${styles['light-gry-clr']} ${styles['fontW600']} ${styles['mb-20']}`}>ORDER{orderId}</h5>
                <div>
                  <p>{orderDate}</p>
                  <p><span>{totalPrice}</span> <span>{currency_code}</span></p>
                  <p><span>Shipping Cost</span> <span>{currency_code}</span></p>
                </div>

              </Col>
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
                  <span>value</span>
                  <p>Emi</p>
                </div>
              </Col>
            </div>
          </Col>
          <Col md={12} xs={12} sm={12} className={styles['p-15']}>
            <Col md={4} xs={6} sm={6}>
              <a>Change Address</a>
            </Col>
            <Col md={2} xs={6} sm={6}>
              <span className={`${styles['fontW600']} ${styles['light-gry-clr']}`}>Grand Total</span>
            </Col>
            <Col md={2} xs={6} sm={6}>
              <span className={`${styles['fontW600']} ${styles['light-gry-clr']}`}>{totalPrice}&nbsp;{currency_code}</span>
            </Col>
            <Col md={4} xs={6} sm={6}>
              <span className={`${styles['flex-center']}`}>
                <SVGComponent clsName={`${styles['share-icon']}`} src="icons/share-icon/share-icon" />
                <span className={`${styles['fontW600']} ${styles['pl-10']}`}>Share with friends</span>
              </span>
            </Col>
          </Col>



          {/*<div className={`${styles['box']} ${styles['p-5']}`}>
            <Row className={`${styles['ml-0']} ${styles['mr-0']}`}>
              <Col md={4} xs={12} sm={12} className={styles['pt-15']}>
                <Row className={`${styles['col-header']} ${styles['fs-14']}`}>
                  <Col md={6} xs={6} sm={6}>
                    <h5>ADDRESS DETAILS</h5>
                  </Col>
                  <Col md={6} xs={6} sm={6}>
                    <h5>
                      <a>Pin Address</a>
                    </h5>
                  </Col>
                </Row>
                <Row className={`${styles['ht-100']} ${styles['mt-10']} ${styles['value']} ${styles['fs-12']}`}>
                  <Col md={12} xs={12} sm={12}>
                    <div>
                      {orderAddress}
                    </div>
                  </Col>
                </Row>
                <Row className={`${styles['mt-5']} ${styles['bt-dashed']}`}>
                  <Col md={12} xs={12} sm={12} className={`${styles['pt-10']} ${styles['fs-12']}`}>
                    <a>Change Address</a>
                  </Col>
                </Row>
              </Col>
              <Col md={4} xs={12} sm={12} className={styles['pt-15']}>
                <Row className={`${styles['col-header']} ${styles['fs-14']}`}>
                  <Col md={6} xs={6} sm={6}>
                    <h5>ORDER SUMMARY</h5>
                  </Col>
                  <Col md={6} xs={6} sm={6}>
                    <h5>ORDER#{orderId}</h5>
                    <span hidden>{order_id}</span>
                  </Col>
                </Row>
                <Row className={`${styles['ht-100']} ${styles['mt-10']}`}>
                  <Col md={6} xs={6} sm={6} className={`${styles['sub-label']} ${styles['fs-12']}`}>
                    <p>Order Date</p>
                    <p>Item(s) Subtotal</p>
                    <p>Shipping</p>
                  </Col>
                  <Col md={6} xs={6} sm={6} className={`${styles['value']} ${styles['fs-12']}`}>
                    <p>{orderDate}</p>
                    <p>{totalPrice}&nbsp;{currency_code}</p>
                    <p>DUMMY_SHIPPING_COST&nbsp;{currency_code}</p>
                  </Col>
                </Row>
                <Row className={`${styles['mt-5']} ${styles['bt-dashed']}`}>
                  <Col md={6} xs={6} sm={6} className={`${styles['pt-10']} ${styles['label']}`}>
                    <p>Grand Total</p>
                  </Col>
                  <Col md={6} xs={6} sm={6} className={`${styles['pt-10']} ${styles['label-size']}`}>
                    <p>{totalPrice}&nbsp;{currency_code}</p>
                  </Col>
                </Row>
              </Col>
              <Col md={4} xs={12} sm={12} className={styles['pt-15']}>
                <Row className={`${styles['col-header']} ${styles['fs-14']}`}>
                  <Col md={6} xs={6} sm={6}>
                    <h5>PAYMENT METHOD</h5>
                  </Col>
                  <Col md={6} xs={6} sm={6}>
                    <h5><a>Request Invoice</a></h5>
                  </Col>
                </Row>
                <Row className={`${styles['ht-100']} ${styles['mt-10']}`}>
                  <Col md={6} xs={6} sm={6} className={`${styles['sub-label']} ${styles['fs-12']}`}>
                    <p>
                      <div className={styles['img-placehlder-25x15']}></div>
                      <span className={styles['ml-10']}>Gift Card</span>
                    </p>
                    <p>Visa<span className={`${styles['ml-10']} ${styles['card']}`}>**** **** ****</span></p>
                  </Col>
                  <Col md={6} xs={6} sm={6} className={`${styles['value']} ${styles['fs-12']}`}>
                    <p>DUMMY_VALUE</p>
                    <p>DUMMY_EMI</p>
                  </Col>
                </Row>
                <Row className={`${styles['mt-5']} ${styles['bt-dashed']}`}>
                  <Col md={12} xs={12} sm={12} className={`${styles['pt-10']} ${styles['label']} ${styles['fs-12']}`}>
                    Share with friends
                </Col>
                </Row>
              </Col>
            </Row>
  </div>*/}
        </Col>
      </Row>
    </div>
  )
}

export default PaymentStatus;