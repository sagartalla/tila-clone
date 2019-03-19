    import React, { Component } from 'react';
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
          showTerms: false,
          termsOfUse: '',
          howToUse: '',
          showHowToUse: false,
          errorMsg: '',
          couponApplied: true,
          applyCouponRequestCount: 0,
          copuonAttempted: false,
        };
      }

     componentDidMount() {
        this.props.getCouponOffers(cookies.get('country'));

     }

     componentWillReceiveProps (nextProps) {
       const {
         closeSlider, openSlider,
       } = this.props;
       this.setState({
         couponApplied: this.state.copuonAttempted && nextProps.cartData.coupon_applied,
       });
       if (this.state.copuonAttempted && nextProps.cartData.coupon_applied) {
         closeSlider();
       } else {
         openSlider();
       }
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
      const {
        getCartResults
      } = this.props;
      this.setState({
        applyCouponRequestCount: this.state.applyCouponRequestCount + 1,
        copuonAttempted: true
      }, () => {
        getCartResults({
          coupon_code: data.coupon_code,
          applyCouponRequestCount: this.state.applyCouponRequestCount
        })
      });
    }

    handleInputApply = code => () => {
      const {
        getCartResults
      } = this.props;
      const { couponCode } = this.state;
      if (couponCode === '' || couponCode === undefined) {
        this.setState({
          errorMsg: 'Please enter coupon code',
        });
        return false;
      }
      this.setState({
        errorMsg: '',
      });
      const params = {
        coupon_code: code,
      };
      this.setState({
        applyCouponRequestCount: this.state.applyCouponRequestCount + 1,
        copuonAttempted: true
      }, () => {
        getCartResults({
          coupon_code: data.coupon_code,
          applyCouponRequestCount: this.state.applyCouponRequestCount
        })
      });
    }

    render() {
      const { couponData } = this.props;
      const {
        showTerms, termsOfUse, howToUse, showHowToUse, couponCode, errorMsg, couponApplied,
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
          <div className={styles.errorStyle}>
            {errorMsg ? <span className={styles['error-msg']}>{errorMsg}</span> : couponApplied ? '' : <span className={styles['error-msg']}>The Coupon applied is invalid</span>}
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
                    <div className={`${styles['lgt-blue']} ${styles.pointer} ${styles.flex}`} onClick={this.showTerms(data)}>{COUPON_OFFERS.VIEW_TERMS}
                      <div className={styles.border} />
                    </div>
                    <div className={`${styles['lgt-blue']} ${styles.pointer}`} onClick={this.showHowtoUse(data)}>{COUPON_OFFERS.HOW_TO_USE}</div>
                    {/* {data.coupon_applied ?
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
              ))
            }
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


    const mapStateToProps = store => {
      return {
        couponData: couponSelectors.getCouponOffers(store),
        cartData: selectors.getCartResults(store),
      }
    };

    const mapDispatchToProps = dispatch => {
      return bindActionCreators(
        {
          getCouponOffers: couponActionCreators.getCouponOffers,
          getCartResults: actionCreators.getCartResults,
        },
        dispatch,
      );
    }
    Coupon.propTypes = {
      couponData: PropTypes.instanceOf(Array),
      getCartResults: PropTypes.func,
      closeSlider: PropTypes.func,
      getCouponOffers: PropTypes.func,
      openSlider: PropTypes.func,
    };

    Coupon.defaultProps = {
      couponData: [],
      getCartResults: f => f,
      closeSlider: f => f,
      getCouponOffers: f => f,
      openSlider: f => f,
    };

    export default connect(mapStateToProps, mapDispatchToProps)(Coupon);
