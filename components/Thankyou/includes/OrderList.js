import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import styles from '../thankyou.styl';
import OrderItem from './OrderItem';

const OrderList = ({ orderDetails }) => {
  const { order_items } = orderDetails;
  return (
    <div className={`${styles['box']} ${styles['p-20']} ${styles['mt-20']}`}>
      {order_items && order_items.length > 0 ? (
        order_items.map((orderItem) =>
          <Row key={orderItem.id}>
            <Col md={12} xs={12} sm={12}>
              <OrderItem orderItem={orderItem} />
            </Col>
          </Row>
        )) :
        <div>No Items</div>
      }
    </div>
  )
}

OrderList.propTypes = {
  orderDetails: PropTypes.object
};

export default OrderList;