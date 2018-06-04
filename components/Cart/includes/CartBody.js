import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import RightBar from '../../common/CartAndPaymentRightBar';

import styles from '../cart.styl';

const CartBody = props => {
  const flag = props.data && props.data.items && props.data.items.length;
  const cnt = flag > 0 ? props.data.items.length : 0;
  return (
    <div className={styles['cart-container']}>
      <Row>
        <Col md={12} sm={12} xs={12}>
          <h4 className={`${styles['mt-20']} ${styles['mb-20']} ${styles['fontW300']}}`}>
            {flag > 0 ? <span>{cnt} item{cnt > 1 ? 's' : ''} in cart</span> : <span>0 items in cart</span>}
          </h4>
        </Col>
      </Row>
      {
        flag > 0 ?
          <Row>
            <Col md={9} sm={12} xs={12}>
              <div>
                {
                  props.data.items.map((item, index) => {
                    const { item_id, img, name, price, cur, quantity, max_limit, inventory } = item;
                    return (
                      <div key={index}>
                        <div className={`${styles['cart-box']} ${styles['box']} ${styles['box-space']} ${styles['p-10']}`}>
                          <Row>
                            <Col md={12}>
                              <span className={styles['error-msg']}>{props.data.error ? props.data.error : ''}</span>
                            </Col>
                            <Col md={2}>
                              <div><img className={styles['img']} src={img} /></div>
                              {
                                quantity == 1 ?
                                <span> -- </span>
                                : <span data-id={item_id} onClick={props.decreaseItemCnt}> - </span>
                              }
                              <span>{quantity}</span>
                              {
                                max_limit == quantity ? 
                                  <span> X </span>
                                : <span data-id={item_id} onClick={props.increaseItemCnt}>  + </span>
                              }
                            </Col>
                            <Col md={10}>
                              <Row>
                                <Col md={9}>
                                  <h5>Brand Name</h5>
                                  <h5>{name}</h5>
                                </Col>
                                <Col md={3}>
                                  <h5 className={`${styles['fontW600']} ${styles['mt-20']}`}>{price + ' ' + cur}</h5>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </div>
                        <div className={`${styles['cart-box-btm']} ${styles['box']} ${styles['p-10']} ${styles['mb-20']}`}>
                          {
                            inventory <= 5 ?
                              <span>Only {inventory} units left</span>
                              : ''
                          }
                          <span id={item_id} onClick={props.removeCartItem}>Remove</span>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </Col>
            <Col md={3} sm={12} xs={12}>
              <div className={`${styles['box']} ${styles['box-space']} ${styles['p-10']}`}>
                <div className={styles['t-c']}>
                  <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']}`} onClick={props.checkoutBtnHandler}>Secure Checkout</button>
                </div>
                <div>
                  <RightBar
                    data={props.data}
                  />
                </div>
              </div>
            </Col>
          </Row>
          : null
      }
    </div>
  );
};

CartBody.propTypes = {
  checkoutBtnHandler: PropTypes.func.isRequired,
  removeCartItem: PropTypes.func.isRequired,
  // defaultAddress: PropTypes.array
};

CartBody.defaultProps = {

};

export default CartBody;