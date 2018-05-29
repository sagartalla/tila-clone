import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import RightBar from '../../common/CartAndPaymentRightBar';

import styles from '../cart.styl';

const CartBody = props => {
  const cnt = props.data.items.length;
  const flag = props.data && props.data.items && cnt
  return (
    <div className={styles['cart-container']}>
      <Row>
        <Col md={12} sm={12} xs={12}>
          <h4>{flag > 0 ? <span>{cnt} item{cnt > 1 ? 's' : ''} in cart</span> : <span>0 items in cart</span>}</h4>
        </Col>
      </Row>
      {
        flag > 0 ?
          <Row>
            <Col md={9} sm={12} xs={12}>
              <div>
                {
                  props.data.items.map((item, index) => {
                    const { item_id, img, name, price, cur } = item;
                    return (
                      <div key={index} className={`${styles['cart-box']} ${styles['box']} ${styles['box-space']} ${styles['m-10']} ${styles['p-10']}`}>
                        <Row>
                          <Col md={2}>
                            <img className={styles['img']} src={img} />
                          </Col>
                          <Col md={8}>
                            <h4>{name}</h4>
                          </Col>
                          <Col md={2} className={styles['t-rt']}>
                            {price + ' ' + cur}
                          </Col>
                        </Row>
                        <div>
                          <span id={item_id} onClick={props.removeCartItem}>Remove</span>
                        </div>
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