import { Grid, Row, Col } from 'react-bootstrap';
import SVGCompoent from '../../common/SVGComponet';
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Payments/payment');

const PaymentHeader = props => (
  <div className={`${styles['payment-header']} ${styles['p-20']} ${styles['bg-white']} ${styles['default-shadow']}`}>
    <Grid>
      <Row>
        <Col md={12} className={`${styles['pl-0']}`}>
          <div className={`${styles['flex-center']} ${styles['logos-part']}`}>
            <SVGCompoent clsName={`${styles['default-logo']}`} src="icons/logos/logo" />
          </div>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default PaymentHeader;
