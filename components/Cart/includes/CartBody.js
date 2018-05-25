import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import styles from '../cart.styl';

const CartBody = props => (
  <div>
    <Row>
      <Col md={12} sm={12} xs={12}>
        <h3>1 time in Cart</h3>
      </Col>
      <Col md={9} sm={12} xs={12}>
        {
          props.data && props.data.length > 0 ?
            <div>
              {
                props.data.map((item, index) => {
                  return(
                    <div key={index} className={`${styles['box']} ${styles['box-space']} ${styles['m-10']} ${styles['p-10']}`}>
                      <Row>
                        <Col md={10}>
                          {item.name}
                        </Col>
                        <Col md={2}>
                          {item.cur+' '+item.price}
                        </Col>
                      </Row>
                    </div>
                  )
                })
              }
            </div>
            : null
        }
      </Col>
      <Col md={3} sm={12} xs={12}>
        <div className={`${styles['box']} ${styles['box-space']} ${styles['m-10']} ${styles['p-10']}`}>
          <button>Secure Checkout</button>
        </div>
      </Col>
    </Row>
  </div>
);

export default CartBody;