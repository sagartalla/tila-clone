import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import moment from 'moment';
import Button from '../../../common/Button';
import Input from '../../../common/Input';
import { languageDefinations } from '../../../../utils/lang/';
import { mergeCss } from '../../../../utils/cssUtil';

const { COUPON_OFFERS } = languageDefinations();

const styles = mergeCss('components/Cart/CartPaymentSideBar/coupons/index');


class Coupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTerms: false,
      termsOfUse: '',
      howToUse: '',
      showHowToUse: false,
      errorMsg: '',
    };
  }
 showTerms = data => () => {
   this.setState({
     showTerms: true,
     termsOfUse: data.tc,
   });
 }
 showHowtoUse = data => () => {
   this.setState({
     showHowToUse: true,
     howToUse: data.how_to_use,
   });
 }
 closeTerms = () => {
   this.setState({
     showTerms: false,
     showHowToUse: false,
   });
 }

 enterCouponCode = (e) => {
   this.setState({
     couponCode: e.target.value,
   });
 }
handleApply = data => () => {
  const { getCartResults, closeSlider, showOfferApplied } = this.props;
  const params = {
    coupon_code: data.coupon_code,
    remove_coupon: false,
  };
  getCartResults(params).then((res) => {
    if (res.value.data.coupon_code) {
      showOfferApplied(data.coupon_code);
      closeSlider();
    }
  });
}

handleInputApply = code => () => {
  const { getCartResults, closeSlider } = this.props;
  const { couponCode } = this.state;
  if (couponCode === '' || couponCode === undefined) {
    this.setState({
      errorMsg: 'Please enter coupon code',
    });
    return false;
  }
  const params = {
    coupon_code: code,
    remove_coupon: false,
  };
  getCartResults(params)
    .then((res) => {
      console.log(res);
      if (res.value.data.coupon_code) {
        this.props.showOfferApplied(code);
        closeSlider();
      }
    })
    .catch(err => this.setState({
      errorMsg: 'The coupon you entered is not valid',
    }));
}

render() {
  const { couponData } = this.props;
  const {
    showTerms, termsOfUse, howToUse, showHowToUse, couponCode, errorMsg,
  } = this.state;
  return (
    <div>
      <div className={styles.couponApply}>
        <Input
          placeholder=" Enter Coupon Code"
          style={{
            width: '350px', height: '60px', border: '0',
          }}
          onChange={this.enterCouponCode}
          val={couponCode}
        />
        <Button className={`${styles.buttonStyle} ${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles.width35} ${styles['m-10']}`} btnText="Apply" onClick={this.handleInputApply(couponCode)} />
      </div>
      {errorMsg ? <span className={styles['error-msg']}>{errorMsg}</span> : ''}
      <div>
        {couponData.map(data =>
            (
              (moment(data.ends_on).toDate().getTime() >= moment().toDate().getTime()) &&
              <div className={styles.couponDiv}>
                <div className={`${styles.flex}`}>
                  <div className={data.offer_sub_type === 'LISTING' ? `${styles.couponCodeListing}` : data.offer_sub_type === 'BANK' ? `${styles.couponCodeBank}` : `${styles.couponCodeCategory}`}>
                    <div className={`${styles['align-end']} ${styles.flex}`}>
                      <div className={`${styles['fs-10']} ${styles.textColor} `}>{data.offer_currency}</div>
                       &nbsp;
                      <div className={`${styles.ellipsis}`} title={data.coupon_code}>{data.coupon_code}</div>
                    </div>
                  </div>
                  <div className={data.offer_sub_type === 'LISTING' ? `${styles.listingColor} ${styles.couponOffer} ` : data.offer_sub_type === 'BANK' ? `${styles.bankColor} ${styles.couponOffer}` : `${styles.categoryColor} ${styles.couponOffer}`}>
                    <div className={`${styles.ellipsis}`} title={data.offer_sub_type}>{data.offer_sub_type}</div>
                  </div>
                </div>
                <div className={`${styles.wordBreak} ${styles['p-5']}`}>{data.description}</div>
                <div className={`${styles['p-5']} ${styles['flex-center']} ${styles['justify-between']} ${styles.flex}`}>
                  <div className={`${styles['lgt-blue']} ${styles.pointer} ${styles.flex}`} onClick={this.showTerms(data)}>{COUPON_OFFERS.VIEW_TERMS}
                    <div className={styles.border} />
                  </div>
                  <div className={`${styles['lgt-blue']} ${styles.pointer}`} onClick={this.showHowtoUse(data)}>{COUPON_OFFERS.HOW_TO_USE}</div>
                  {/* {data.applied ?
                    <div className={`${styles.flex}`}>
                      <img src="/static/img/icons/common-icon/green-tick.svg" alt="checked" />
                      <div className={`${styles.applied} ${styles['p-10']}`}>
                      {COUPON_OFFERS.APPLIED}</div>
                    </div>
                  : */}
                  <Button className={`${styles['fp-btn-default']}`} btnText={COUPON_OFFERS.APPLY} onClick={this.handleApply(data)} />
                  {/* } */}
                </div>
              </div>
          ))}
      </div>
      <div>
        <Modal
          show={showTerms}
          onHide={this.closeTerms}
          className={styles.modalClassName}
        >
          <Modal.Body>
            {termsOfUse}
          </Modal.Body>
          <div className={`${styles['justify-end']} ${styles['p-30']} ${styles.flex}`}>
            <button className="btn btn-primary" style={{ backgroundColor: '#45689a', width: '15%' }} onClick={this.closeTerms}>
              {COUPON_OFFERS.OK}
            </button>
          </div>
        </Modal>
        <Modal
          show={showHowToUse}
          onHide={this.closeTerms}
          className={styles.modalClassName}
        >
          <Modal.Body>
            {howToUse}
          </Modal.Body>
          <div className={`${styles['justify-end']}  ${styles['p-30']} ${styles.flex}`}>
            <button className="btn btn-primary" style={{ backgroundColor: '#45689a', width: '15%' }} onClick={this.closeTerms}>
              {COUPON_OFFERS.OK}
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
}

Coupon.propTypes = {
  couponData: PropTypes.instanceOf(Array),
  getCartResults: PropTypes.func,
  closeSlider: PropTypes.func,
  showOfferApplied: PropTypes.func,
};

Coupon.defaultProps = {
  couponData: [],
  getCartResults: f => f,
  closeSlider: f => f,
  showOfferApplied: f => f,
};

export default Coupon;
