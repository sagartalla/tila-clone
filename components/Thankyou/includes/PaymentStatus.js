import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import SVGCompoent from '../../common/SVGComponet';
import styles from '../thankyou.styl';

/** TODO : order page link is required **/
const PaymentStatus = props => {
  const message = (props.status == "SUCCESSFUL") ? "YOUR ORDER HAS BEEN PLACED SUCCESSFULLY" : "ORDER FAILURE";
  // TODO: Need to have a util for static messeges
  const successMessage = (<span>Your order has been placed and is being processed. You will receive an email with details once the item(s) are shipped. You can track your
    &nbsp;<a>Orders page</a>&nbsp;in your account</span>);
  const subMessage = (props.status == "SUCCESSFUL") ? successMessage : "Please try again";
  return (
    <div>
      <Row className={styles['flex-center']}>
        {/* TODO SF-44: Common layout needed for non header pages */}
        <Col md={2} xs={2} sm={2}>
          <div className={styles['pb-24']}>
            <SVGCompoent clsName={`${styles['gift-card']}`} src="icons/gift-icon/gift-icon" />
          </div>
        </Col>
          <Col md={8} xs={9} sm={9}>
            <h3 className={`${styles['mt-0']} ${styles['light-gry-clr']} ${styles['fontW600']}`}>{message}</h3>
            <p className={`${styles['col-header']} ${styles['lgt-black']}`}>
              {subMessage}
            </p>
          </Col>
      </Row>
    </div>
      );
    }
    
export default PaymentStatus;