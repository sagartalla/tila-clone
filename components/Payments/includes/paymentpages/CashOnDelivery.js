import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import { languageDefinations } from '../../../../utils/lang/';
import SVGComponent from '../../../common/SVGComponet';
import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Payments/payment');
const { PAYMENT_PAGE } = languageDefinations();

const CashOnDelivery = props => {
  const { PAYMENT_PAGE } = languageDefinations();
  return (
    <div className={`${styles['cash-on-dly-points']}`}>
      <Row className={`${styles['pl-40']} ${styles['m-pd-l-10']}`}>
        <Col md={12}>
          <h4 className={`${styles['fontW300']} ${styles['fs-20']} ${styles['lgt-blue']} ${styles['mt-0']} ${styles['pb-10']}`}>Pay on Delivery</h4>
          <div className={styles['checkbox-material']}>
            <input id="pay-delivery" type="checkbox" />
            <label for="pay-delivery"> I agree to pay cash on delivery </label>
          </div>
          <div className={`${styles['flx-spacebw-alignc']} ${styles['capcha-pay']} ${styles['pt-30']} ${styles['pb-30']}`}>
            <div>
              <ul className={`${styles['pl-0']} ${styles['m-0']} ${styles['cash-tab']}`}>
                <li>Visual</li>
              </ul>
              <div className={`${styles['captch-inn']} ${styles['p-20']}`}>
                <span className={`${styles['flx-spacebw-alignc']} ${styles['refresh-part']} ${styles['pb-20']}`}>
                  <span className={styles['fs-12']}>Drag and drop the Car into the box</span>
                  <span className={`${styles['flex']} ${styles['refresh-part-inn']} ${styles['p-5']}`}><SVGComponent clsName={`${styles['refresh-icon']}`} src="icons/captcha-icons-list/refresh-icon" /></span>
                </span>
                <div>
                  <div className={`${styles['flex-center']} ${styles['captcha-icon-part']}`}>
                    <span className={styles['flex']}><SVGComponent clsName={`${styles['captcha-icon']}`} src="icons/captcha-icons-list/cat-icon" /></span>
                    <span className={styles['flex']}><SVGComponent clsName={`${styles['captcha-icon']}`} src="icons/captcha-icons-list/ball-icon" /></span>
                    <span className={styles['flex']}><SVGComponent clsName={`${styles['captcha-icon']}`} src="icons/captcha-icons-list/flower-icon" /></span>
                    <span className={styles['flex']}><SVGComponent clsName={`${styles['car-icon']}`} src="icons/captcha-icons-list/car-icon" /></span>
                    <span className={styles['flex']}><SVGComponent clsName={`${styles['captcha-icon']}`} src="icons/captcha-icons-list/chair-icon" /></span>
                  </div>

                </div>
              </div>
            </div>
            <div>
              <div className={`${styles['flex']} ${styles['justify-center']}`}>
              <SVGComponent clsName={`${styles['drop-box-icon']}`} src="icons/captcha-icons-list/box-icon" />
              </div>
              <span className={`${styles['fs-12']} ${styles['pt-20']}`}>Drop the Car icon into the box Above</span>
            </div>
          </div>
        </Col>
        <Col md={6} sm={12} xs={12}>
          <button className={`${styles['fp-btn']} ${styles['fs-16']} ${styles['fontW600']} ${styles['fp-btn-primary']} ${styles['fp-btn-large']}`} onClick={props.makePayment}>Pay {props.orderRes.data.amount} {props.orderRes.data.currency}</button>
        </Col>
      </Row>
    </div>
  );
}

CashOnDelivery.propTypes = {
  makePayment: PropTypes.func.isRequired,
}

CashOnDelivery.defaultProps = {

}

export default CashOnDelivery;
