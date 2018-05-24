import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

// TODO order page link is required.
const PaymentStatus = props => (
  <div>
    <Row>
      <Col md={12} xs={12} sm={12}>
        <h1>Your ORDER HAS BEEN PLACED SUCCESSFULLY</h1>
        <p>
          Your order has been placed and is being processed.You will receive an email with details once the <br />
          item(s) are shipped.You can track your <a>Orders page</a> in your account 
        </p>

      </Col>
    </Row>
  </div>
)

export default PaymentStatus;