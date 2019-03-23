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
import { mergeCss } from '../../../../utils/cssUtil';
import { actionCreators, selectors } from '../../../../store/cart';
import { actionCreators as couponActionCreators, selectors as couponSelectors } from '../../../../store/coupons';

const { COUPON_OFFERS } = languageDefinations();
const cookies = new Cookie();

const styles = mergeCss('components/Cart/CartPaymentSideBar/coupons/index');


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
    const key = e.target.getAttribute('keyVal');
    const { showTermsAndConditions } = this.props;
    if (key === 'terms') {
      showTermsAndConditions(docId);
    } else {
      showTermsAndConditions(docId);
    }
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
      const { couponData, termsAndConditions } = this.props;
      const {
        couponCode, errorMsg, couponApplied, copuonAttempted, appliedCoupon, showPopup,
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
              val={couponCode || appliedCoupon}
            />
            <Button className={`${styles.buttonStyle} ${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles.width35} ${styles['m-10']}`} btnText="Apply" onClick={this.handleInputApply(couponCode || appliedCoupon)} />
          </div>
          <div className={styles.errorStyle}>
            {errorMsg ? <span className={styles['error-msg']}>{errorMsg}</span> : (copuonAttempted ? (couponApplied ? '' : <span className={styles['error-msg']}>{appliedCoupon} applied is invalid</span>) : '')}
          </div>
          <div className={styles.applyCoupon}>
            {/* TODO: move to a seperate file */}
            {couponData && couponData.length > 0 && couponData.map(data =>
              (
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
                      <div className={`${styles.ellipsis}`} title={(data.offer_sub_type === 'LISTING' || data.offer_sub_type === 'PRODUCT' || data.offer_sub_type === 'ITEM_TYPE') ? 'Category Offer' : data.offer_sub_type === 'BANK' ? 'Bank Offer' : 'Brand Offer'}>
                        {(data.offer_sub_type === 'LISTING' || data.offer_sub_type === 'PRODUCT' || data.offer_sub_type === 'ITEM_TYPE') ? 'Category Offer' : data.offer_sub_type === 'BANK' ? 'Bank Offer' : 'Brand Offer'}
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.wordBreak} ${styles['p-5']}`}>{data.description}</div>
                  <div className={`${styles['p-5']} ${styles['flex-center']} ${styles['justify-between']} ${styles.flex}`}>
                    <div className={`${styles['lgt-blue']} ${styles.pointer} ${styles.flex}`} data-obj={data.terms_and_condition_doc_id} keyVal="terms" onClick={this.showPopup}>{COUPON_OFFERS.VIEW_TERMS}
                      <div className={styles.border} />
                    </div>
                    <div className={`${styles['lgt-blue']} ${styles.pointer}`} data-obj={data.how_to_use_doc_id} keyVal="use" onClick={this.showPopup}>{COUPON_OFFERS.HOW_TO_USE}</div>
                    {/* {data.coupon_applied ?
                        <div className={`${styles.flex}`}>
                          <img src="/static/img/icons/common-icon/green-tick.svg" alt="checked" />
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
                  // src={termsAndConditions.document_url}
                  src="https://fptsdocumentservice.s3.ap-south-1.amazonaws.com/default/HowToUse.html?X-Amz-Security-Token=FQoGZXIvYXdzEAoaDG74ae2PNhqA3NLeqSK5A7NQktZ7j6LAPavSDgke22Vy2dQB16%2FODYMgWeXtes1Rnge8CViqBvH4KKW%2B4z%2B2q8M%2BlK55wZXJIG157ObRprh%2Bsry5Z1c1YatPtt%2FU45TDVhN7T3MM%2BAIG8aQqL2Rif9SXbTu%2FZrZmyjpbLRns8JKP%2F%2FLSoZPIAOdt9ggraq9bDaddfeU5wdYL3zfghQvN%2B39vvc8f2gf5ePS32%2BNcEpwXeydNpV%2FDx7kPcAMaJhFwdCnshbk9tobKT0cpykGrx4fJpP6mi9XdaFbPzW%2BB7fRD9mAUplPhOYyxFzggmKqJdNcII7S3EEL9vEgI3amocW5k9jr49tOGO4uyRMEacUJ%2B74FnP9uBlTyWsMwGo5aD%2B7Jot8hFTgu0xS26L2xK3jDuEqt2DDMP%2F1uYFXj954QBpYtZ6YyU9CU7ZaibAcs4KK0MMcAIgUsvLpyajJoeSIq%2BCJk3PUID8KloxGVHWjwgIYrcTaLBlYGd8fIhrXC5itITlbB7K60WVncRttsZNA04jXtkBGJu73bwS9FpX2PFnmMWD9Uqtbh7i7op717zEogPzWQaRXFpN%2BlX7jR%2B06BZJsTktpJWSiii3NfkBQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190323T092057Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQ7IOH7NSKG4RMB5C%2F20190323%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=0c6703bda9a0c6875e3299046ddfc1341a2362c2845ba8b0ca84b5c91eaf3f9f"
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
  termsAndConditions: couponSelectors.getTermsAndConditions(store),
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
  showTermsAndConditions: PropTypes.func,
  termsAndConditions: PropTypes.string,
  isCartLoading: PropTypes.bool,
};

Coupon.defaultProps = {
  couponData: [],
  getCartResults: f => f,
  closeSlider: f => f,
  getCouponOffers: f => f,
  openSlider: f => f,
  cartData: {},
  showTermsAndConditions: f => f,
  termsAndConditions: '',
  isCartLoading: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(Coupon);
