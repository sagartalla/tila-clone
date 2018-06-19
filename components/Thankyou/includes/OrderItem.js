import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import styles from '../thankyou.styl';

import constants from '../../../constants';

const OrderItem = ({ orderItem }) => {
  const cancelOrder = () => {
    //TODO: Cancel Order
  };
  const { price, currency_code, variant_info } = orderItem;

  return (
    <div className={`${styles['m-10']}`}>
      <Row className={`${styles['m-10']} ${styles['br-r15']} ${styles['border-lg']}`}>
        <Col md={1} xs={1} sm={1} className={`${styles['pt-10']}`}>
          <img className={`${styles['order-item-img']}`} src={`${constants.mediaDomain}/${variant_info.image_url}`} alt={variant_info.imgage_url} />
        </Col>
        <Col md={7} xs={7} sm={7} className={`${styles['pt-10']}`}>
          <Col md={9} xs={9} sm={9} className={styles['']}>
            <div>{variant_info.title}</div>
            <div>Quantity: 1</div>
            {/* TODO: Add variant information and Quantity*/}
          </Col>
          <Col md={3} xs={3} sm={3}>
            <div>
              <span>
                {price.selling_price} {currency_code}
              </span>
              &nbsp;
              <span>
                {/* TODO: Add price information */}
                <a>+</a>
              </span>
            </div>
            {/* TODO: Add Share icon */}
            <div>Share</div>
          </Col>
        </Col>
        <Col md={4} xs={4} sm={4} className={`${styles['mt-10']}`}>
          <div className={`${styles['pt-15']} ${styles['pr-15']} ${styles['pb-15']}`}>
            <div>
              {/* TODO: Add Delivery information */}
              <div className={styles['fs-12']}>Delivery by</div>
              <div className={`${styles['ff-t']} ${styles['fs-30']}`}>Wednesday, Mar 21</div>
            </div>
            <div>
              <span className={`${styles['link-text']} ${styles['fs-12']}`} onClick={cancelOrder}>Cancel</span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
};

OrderItem.propTypes = {
  orderItem: PropTypes.object
};

export default OrderItem;