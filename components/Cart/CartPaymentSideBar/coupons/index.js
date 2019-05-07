import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookie from 'universal-cookie';
import Button from '../../../common/Button';
import Input from '../../../common/Input';
import { languageDefinations } from '../../../../utils/lang/';
import { actionCreators, selectors } from '../../../../store/cart';
import { actionCreators as couponActionCreators, selectors as couponSelectors } from '../../../../store/coupons';
import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from './index_en.styl';
import styles_ar from './index_ar.styl';

const { COUPON_OFFERS } = languageDefinations();
const cookies = new Cookie();

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

class Coupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '',
      couponApplied: true,
      applyCouponRequestCount: 0,
      copuonAttempted: false,
      appliedCoupon: '',
      couponCode: '',
      showPopup: false,
      document: '',
    };
  }

  componentDidMount() {
    this.props.getCouponOffers(cookies.get('country'));
  }

  componentWillReceiveProps(nextProps) {
    const {
      closeSlider, openSlider,
    } = this.props;
    const {
      isCartLoading, cartData,
    } = nextProps;
    this.setState({
      couponApplied: this.state.copuonAttempted && cartData.coupon_applied,
    });
    if (isCartLoading) {
      return;
    }
    if (this.state.copuonAttempted && cartData.coupon_applied) {
      closeSlider();
    } else {
      openSlider();
      this.scrollToTop();
    }
  }

  scrollToTop() {
    // eslint-disable-next-line
    var scroll = ReactDOM.findDOMNode(this);
    scroll.scrollIntoView({
      behavior: 'instant',
      block: 'end',
    });
  }

  showPopup = (e) => {
    const docId = e.target.getAttribute('data-obj');
    this.setState({
      document: docId,
    });
    this.setState({
      showPopup: true,
    });
  }

  closeTerms = () => {
    this.setState({
      showPopup: false,
    });
  }

  enterCouponCode = (e) => {
    this.setState({
      couponCode: e.target.value,
      appliedCoupon: '',
      copuonAttempted: false,
    });
  }

  handleApply = (e) => {
    const {
      getCartResults,
    } = this.props;
    const couponCode = e.target.getAttribute('data-code');
    this.setState({
      applyCouponRequestCount: this.state.applyCouponRequestCount + 1,
      copuonAttempted: true,
      appliedCoupon: couponCode,
      couponCode: '',
    }, () => {
      getCartResults({
        coupon_code: couponCode,
        applyCouponRequestCount: this.state.applyCouponRequestCount,
      });
    });
  }

  handleInputApply = code => () => {
    const {
      getCartResults,
    } = this.props;
    const { couponCode, appliedCoupon } = this.state;
    if (couponCode === '' && appliedCoupon === '') {
      this.setState({
        errorMsg: 'Please enter coupon code',
      });
      return false;
    }
    this.setState({
      errorMsg: '',
      couponApplied: false,
    });
    this.setState({
      applyCouponRequestCount: this.state.applyCouponRequestCount + 1,
      copuonAttempted: true,
      appliedCoupon: code,
    }, () => {
      getCartResults({
        coupon_code: code,
        applyCouponRequestCount: this.state.applyCouponRequestCount,
      });
    });
  }

  render() {
    const { couponData } = this.props;
    const {
      couponCode, errorMsg, couponApplied, copuonAttempted, appliedCoupon, showPopup, document, background, showBackground,
    } = this.state;
    return (
      <div className={`${styles.flex} ${styles['flex-colum']}`}>
        <div className={`${styles.couponApply} ${styles.flex}`}>
          <Input
            placeholder={' ' + COUPON_OFFERS.ENTER_COUPON_CODE}
            style={{
            width: '350px', height: '60px', border: '0', paddingLeft: '10px',
          }}
            onChange={this.enterCouponCode}
            val={couponCode || appliedCoupon}
          />
          <Button className={`${styles.buttonStyle} ${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles.width35} ${styles['m-10']}`} btnText="Apply" onClick={this.handleInputApply(couponCode || appliedCoupon)} />
        </div>
        <div className={styles.errorStyle}>
          {(copuonAttempted ? (couponApplied ? '' : <span className={styles['error-msg']}>This {appliedCoupon} {COUPON_OFFERS.IS_INVALID}</span>) : errorMsg ? <span className={styles['error-msg']}>{errorMsg}</span> : '')}
        </div>
        <div className={`${styles.applyCoupon} ${styles['flex-colum']} ${styles.flex}`}>
          {/* TODO: move to a seperate file */}
          {couponData && couponData.length > 0 && couponData.map(data =>
          (
            <div className={styles.couponDiv}>
              <div className={`${styles.couponCodeListing}`}>
                <div className={`${styles['justify-center']} ${styles.flex}`}>
                  <div className={`${styles.ellipsis}`} title={data.coupon_code}>{data.coupon_code}</div>
                </div>
              </div>
              <div className={`${styles.wordBreak} ${styles['p-5']}`}>{data.description}</div>
              <div className={`${styles['p-5']} ${styles['flex-center']} ${styles['justify-between']} ${styles.flex}`}>
                <div className={`${styles['lgt-blue']} ${styles.pointer} ${styles.flex}`} data-obj={data.tc} onClick={this.showPopup}>{COUPON_OFFERS.VIEW_TERMS}
                  <div className={styles.border} />
                </div>
                <div className={`${styles['lgt-blue']} ${styles.pointer}`} data-obj={data.how_to_use} onClick={this.showPopup}>{COUPON_OFFERS.HOW_TO_USE}</div>
                {/* {data.coupon_applied ?
                    <div className={`${styles.flex}`}>
                      <img  src="/static/img/icons/common-icon/green-tick.svg" alt="checked" />
                      <div className={`${styles.applied} ${styles['p-10']}`}>
                      {COUPON_OFFERS.APPLIED}</div>
                    </div>
                  : */}
                <div><button data-code={data.coupon_code} className={`${styles['fp-btn']} ${styles['apply-btn']} ${styles['small-btn']}`} onClick={this.handleApply}>{COUPON_OFFERS.APPLY}</button></div>
                {/* } */}
              </div>
            </div>
          ))
        }
        </div>
        <div>
          <Modal
            show={showPopup}
            onHide={this.closeTerms}
            className={styles.modalClassName}
          >
            <Modal.Body>
              <iframe
                title="TERMS"
                src={document}
                frameBorder="0"
                width="560px"
                height="450px"
              />
            </Modal.Body>
            <div className={`${styles['justify-end']} ${styles['p-30']} ${styles.flex}`}>
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


const mapStateToProps = store => ({
  couponData: couponSelectors.getCouponOffers(store),
  cartData: selectors.getCartResults(store),
  isCartLoading: selectors.getLoadingStatus(store),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getCouponOffers: couponActionCreators.getCouponOffers,
    getCartResults: actionCreators.getCartResults,
    showTermsAndConditions: couponActionCreators.showTermsAndConditions,
  },
  dispatch,
);
Coupon.propTypes = {
  couponData: PropTypes.instanceOf(Array),
  getCartResults: PropTypes.func,
  closeSlider: PropTypes.func,
  getCouponOffers: PropTypes.func,
  openSlider: PropTypes.func,
  cartData: PropTypes.object,
  isCartLoading: PropTypes.bool,
};

Coupon.defaultProps = {
  couponData: [],
  getCartResults: f => f,
  closeSlider: f => f,
  getCouponOffers: f => f,
  openSlider: f => f,
  cartData: {},
  isCartLoading: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(Coupon);
