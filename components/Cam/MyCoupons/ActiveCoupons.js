import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookie from 'universal-cookie';
import { languageDefinations } from '../../../utils/lang/';
import { actionCreators, selectors } from '../../../store/cart';
import { actionCreators as couponActionCreators, selectors as couponSelectors } from '../../../store/coupons';
import lang from '../../../utils/language';
import styles_en from './mycoupon_en.styl';
import styles_ar from './mycoupon_ar.styl';


const { COUPON_OFFERS } = languageDefinations();
const cookies = new Cookie();

const styles = lang === 'en' ? styles_en : styles_ar;

class ActiveCoupons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applyCouponRequestCount: 0,
      showPopup: false,
      document: '',
      couponApplied: true,
      appliedCoupon: '',
      couponAttempted: false,
    };
  }

  componentDidMount() {
    this.props.getCouponOffers(cookies.get('country'));
  }

  componentWillReceiveProps(nextProps) {
    const {
      cartData,
    } = nextProps;
    this.setState({
      couponApplied: this.state.couponAttempted && cartData.coupon_applied,
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

  handleApply = (e) => {
    const {
      getCartResults,
    } = this.props;
    const couponCode = e.target.getAttribute('data-code');
    this.setState({
      applyCouponRequestCount: this.state.applyCouponRequestCount + 1,
      appliedCoupon: couponCode,
      couponAttempted: true,
    }, () => {
      getCartResults({
        coupon_code: couponCode,
        applyCouponRequestCount: this.state.applyCouponRequestCount,
      });
    });
  }

  render() {
    const { couponData } = this.props;
    const {
      showPopup, document, couponApplied, appliedCoupon, couponAttempted,
    } = this.state;
    return (
      <div className={`${styles.flex}`}>
        <div className={styles.errorStyle}>
        {(couponAttempted ? ( couponApplied ? '' : <span className={styles['error-msg']}>This {appliedCoupon} {COUPON_OFFERS.IS_INVALID}</span>) : '')}
        </div>
        <div className={`${styles.applyCoupon} ${styles.flex} ${styles['flex-wrp']}`}>
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
  },
  dispatch,
);
ActiveCoupons.propTypes = {
  couponData: PropTypes.instanceOf(Array),
  getCartResults: PropTypes.func,
  getCouponOffers: PropTypes.func,
};

ActiveCoupons.defaultProps = {
  couponData: [],
  getCartResults: f => f,
  getCouponOffers: f => f,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveCoupons);
