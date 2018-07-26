import { Grid, Row, Col } from 'react-bootstrap';
import SVGComponent from '../../common/SVGComponet';
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Payments/payment');

const PaymentHeader = props => (
  <div className={`${styles['payment-header']} ${styles['pt-20']} ${styles['pb-20']} ${styles['bg-white']} ${styles['default-shadow']}`}>
    <Grid>
      <Row>
        <Col md={12}>
          <div className={`${styles['flex-center']} ${styles['logos-part']}`}>
            <a href="/" className={styles['flex']}><SVGComponent clsName={`${styles['default-logo']}`} src="icons/logos/logo" /></a>
          </div>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default PaymentHeader;
