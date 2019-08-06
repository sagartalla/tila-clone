import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookie from 'universal-cookie';
import Blocker from '../../../common/Blocker';
import Button from '../../../common/CommonButton';
import Input from '../../../common/Input';
import { languageDefinations } from '../../../../utils/lang/';
import { actionCreators, selectors } from '../../../../store/cart';
import { actionCreators as couponActionCreators, selectors as couponSelectors } from '../../../../store/coupons';
import lang from '../../../../utils/language';
import Slider from '../../../common/slider';
import Coupons from './commonCoupon';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from './index_en.styl';
import styles_ar from './index_ar.styl';

const { COUPON_OFFERS } = languageDefinations();
const cookies = new Cookie();

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

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
      showLoader: false,
      showSlider: false,
      coupons: '',
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
      cartData, LoadingState,
    } = nextProps;
    this.setState({
      couponApplied: this.state.copuonAttempted && cartData.coupon_applied,
    });
    // if (isCartLoading) {
    //   return;
    // }
    if (LoadingState) {
      this.setState({
        showLoader: true,
      });
    } else {
      this.setState({
        showLoader: false,
      });
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
    const data = JSON.parse(e.target.getAttribute('data-coupon'));
    const title = e.target.getAttribute('data-title');
    this.setState({
      coupons: data,
      title,
      showSlider: true,
    });
  }

  closeSlider = () => {
    this.setState({
      showSlider: false,
    });
  }

  enterCouponCode = (e) => {
    this.setState({
      couponCode: e.target.value,
      appliedCoupon: '',
      copuonAttempted: false,
      errorMsg: '',
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
    const { couponData, isCartLoading, couponLoading } = this.props;
    const {
      couponCode, errorMsg, couponApplied, copuonAttempted, appliedCoupon, showSlider,
      showLoader,
      title,
      coupons,
    } = this.state;
    return (
      showLoader || couponLoading ? <Blocker /> :
      <div className={`${styles.flex} ${styles['flex-colum']} ${styles['align-center']} ${styles.relative}`}>
        <div className={`${styles.couponApply} ${styles.flex}`}>
          <Input
            placeholder={` ${COUPON_OFFERS.ENTER_COUPON_CODE}`}
            className={`${styles.input}`}
            onChange={this.enterCouponCode}
            val={couponCode || appliedCoupon}
          />
          <Button
            className={`${styles.buttonStyle} ${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles.width35} ${styles['m-10']}`}
            btnText={COUPON_OFFERS.APPLY}
            btnLoading={isCartLoading}
            onClick={this.handleInputApply(couponCode || appliedCoupon)}
          />
        </div>
        <div className={styles.errorStyle}>
          {!isCartLoading &&
          (copuonAttempted ? (couponApplied ? '' : <span className={styles['error-msg']}>{COUPON_OFFERS.THIS} {appliedCoupon} {COUPON_OFFERS.IS_INVALID}</span>) : errorMsg ? <span className={styles['error-msg']}>{errorMsg}</span> : '')
        }
        </div>
        <div className={`${styles.applyCoupon} ${styles.applyCouponMargin} ${styles.flex} ${styles['flex-colum']}`}>
          <Coupons
            couponData={couponData}
            showPopup={this.showPopup}
            handleApply={this.handleApply}
            showCartCoupon
          />
        </div>
        <div>
          {showSlider &&
          <Slider
            closeSlider={this.closeSlider}
            isOpen={showSlider}
            style={{ background: 'none' }}
          >
            <div className={`${styles['flex-center']}`}>
              <div className={`${styles.couponCodeCartTerms} ${styles.width35} ${styles.fontW600} ${styles['m-5']}`}>{coupons.coupon_code}</div>
              <div className={`${styles['label-gry-clr']}`}>{coupons.description}</div>
            </div>
            <Tabs defaultActiveKey={1} id="coupons-tabs">
              <Tab eventKey={title === 'terms' ? 1 : 2} title={COUPON_OFFERS.VIEW_TERMS}>
                <iframe
                  title="TERMS"
                  src={coupons.tc}
                  frameBorder="0"
                  style={{ height: 'calc(100vh - 250px)', width: '440px' }}
                />
              </Tab>
              <Tab eventKey={title === 'terms' ? 2 : 1} title={COUPON_OFFERS.HOW_TO_USE}>
                <iframe
                  title="TERMS"
                  src={coupons.how_to_use}
                  frameBorder="0"
                  style={{ height: 'calc(100vh - 250px)', width: '440px' }}
                />
              </Tab>
            </Tabs>
            <div className={`${styles.flex} ${styles['justify-end']} ${styles['mr-20']}`}>
              <Button className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['m-10']} ${styles.width21}`} btnText={COUPON_OFFERS.OK} onClick={this.closeSlider} />
            </div>
          </Slider>
        }
        </div>
      </div>
    );
  }
}


const mapStateToProps = store => ({
  couponData: couponSelectors.getCouponOffers(store),
  cartData: selectors.getCartResults(store),
  isCartLoading: selectors.getLoadingStatus(store),
  couponLoading: couponSelectors.showLoader(store),
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
