import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import RightBar from '../../common/CartAndPaymentRightBar';

import styles from '../cart.styl';

const CartBody = props => {
  const flag = props.data && props.data.items && props.data.items.length
  return (
    <div className={styles['cart-container']}>
      <Row>
        <Col md={12} sm={12} xs={12}>
          <h4>{flag > 0 ? <span>{props.data.items.length} items in cart</span> : <span>0 items in Cart</span>}</h4>
        </Col>
      </Row>
      {
        flag > 0 ?
          <Row>
            <Col md={9} sm={12} xs={12}>
              <div>
                {
                  props.data.items.map((item, index) => {
                    return (
                      <div key={index} className={`${styles['cart-box']} ${styles['box']} ${styles['box-space']} ${styles['m-10']} ${styles['p-10']}`}>
                        <Row>
                          <Col md={2}>
                            <img className={styles['img']} src={item.img} />
                          </Col>
                          <Col md={8}>
                            <h4>{item.name}</h4>
                          </Col>
                          <Col md={2} className={styles['t-rt']}>
                            {item.price + ' ' + item.cur}
                          </Col>
                        </Row>
                      </div>
                    )
                  })
                }
              </div>
            </Col>
            <Col md={3} sm={12} xs={12}>
              <div className={`${styles['box']} ${styles['box-space']} ${styles['m-10']} ${styles['p-10']}`}>
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
  // defaultAddress: PropTypes.array
};

CartBody.defaultProps = {

};

export default CartBody;