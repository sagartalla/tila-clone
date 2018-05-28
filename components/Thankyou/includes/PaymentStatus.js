import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import styles from '../thankyou.styl';

/** TODO : order page link is required **/
const PaymentStatus = props => {
  const message = (props.status == "SUCCESSFUL") ? "YOUR ORDER HAS BEEN PLACED SUCCESSFULLY" : "ORDER FAILURE";
  const successMessage = (<span>Your order has been placed and is being processed. You will receive an email with details once the item(s) are shipped. You can track your
    &nbsp;<a>Orders page</a>&nbsp;in your account</span>);
  const subMessage = (props.status == "SUCCESSFUL") ? successMessage : "Please try again";
  return (
    <div>
      <Row>
        <Col md={2} xs={2} sm={2}>
          <span className={styles['ml-32']}>
            <div className={styles['m-10']}>
            LOGO
            </div>
          </span>
        </Col>
          <Col md={8} xs={9} sm={9} className={styles['header']}>
            <h3>{message}</h3>
            <p className={styles['col-header']}>
              {subMessage}
            </p>
          </Col>
      </Row>
    </div>
      );
    }
    
export default PaymentStatus;