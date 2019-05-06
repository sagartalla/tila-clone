import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookie from 'universal-cookie';
import CopyText from 'react-copy-text';
import { languageDefinations } from '../../../utils/lang/';
import { actionCreators } from '../../../store/cart';
import Pagination from '../../common/Pagination';
import { actionCreators as couponActionCreators, selectors as couponSelectors } from '../../../store/coupons';
import lang from '../../../utils/language';
import Coupons from '../../Cart/CartPaymentSideBar/coupons/commonCoupon';

import styles_en from '../../Cart/CartPaymentSideBar/coupons/index_en.styl';
import styles_ar from '../../Cart/CartPaymentSideBar/coupons/index_ar.styl';


const { COUPON_OFFERS } = languageDefinations();
const cookies = new Cookie();

const styles = lang === 'en' ? styles_en : styles_ar;

class ActiveCoupons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      currentPage: 0,
      documentTerms: '',
      documentHowToUse: '',
      couponCode: '',
      couponDescription: '',
      copiedCode: '',
    };
    this.onPageChanged = this.onPageChanged.bind(this);
  }

  onPageChanged(currentPage) {
    this.setState({
      currentPage,
    }, () => this.props.getCoupons(cookies.get('country'), currentPage, false));
  }
  showPopup = (e) => {
    const docTerms = e.target.getAttribute('data-terms');
    const docUse = e.target.getAttribute('data-use');
    const coupon = e.target.getAttribute('data-coupon');
    const description = e.target.getAttribute('data-desc');
    const title = e.target.getAttribute('data-title');
    this.setState({
      documentTerms: docTerms,
      documentHowToUse: docUse,
      couponCode: coupon,
      couponDescription: description,
      title,
      showPopup: true,
    });
  }

  closeTerms = () => {
    this.setState({
      showPopup: false,
    });
  }
  copyCouponCode = (e) => {
    const couponCode = e.target.getAttribute('data-code');
    this.setState({
      copiedCode: couponCode,
    });
  }
  render() {
    const { couponDataList, loadingState } = this.props;
    const {
      showPopup, documentTerms, currentPage, documentHowToUse, couponCode, couponDescription, title, copiedCode,
    } = this.state;
    return (
      <div>
        <div className={`${styles.applyCoupon} ${styles.flex} ${styles['flex-wrp']}`}>
          <Coupons
            showActiveCoupons
            couponData={couponDataList.coupon_dto_list}
            showPopup={this.showPopup}
            handleCopy={this.copyCouponCode}
            copiedCode={copiedCode}
            loading={loadingState}
          />
        </div>
        <CopyText text={copiedCode} />
        <div>
          <Modal
            show={showPopup}
            onHide={this.closeTerms}
            className={styles.modalClassName}
          >
            <Modal.Body>
              <div className={`${styles['flex-center']}`}>
                <div className={`${styles.couponCodeTerms} ${styles.fontW600} ${styles['m-5']}`}>{couponCode}</div>
                <div className={`${styles['label-gry-clr']}`}>{couponDescription}</div>
              </div>
              <Tabs defaultActiveKey={1}>
                <Tab eventKey={title === 'terms' ? 1 : 2} title={COUPON_OFFERS.TERMS_AND_CONDITIONS}>
                  <iframe
                    title="TERMS"
                    src={documentTerms}
                    frameBorder="0"
                    width="560px"
                    height="400px"
                  />
                </Tab>
                <Tab eventKey={title === 'terms' ? 2 : 1} title={COUPON_OFFERS.HOW_TO_USE}>
                  <iframe
                    title="TERMS"
                    src={documentHowToUse}
                    frameBorder="0"
                    width="560px"
                    height="400px"
                  />
                </Tab>
              </Tabs>
            </Modal.Body>
            <div className={`${styles['justify-end']} ${styles['p-30']} ${styles.flex}`}>
              <button className="btn btn-primary" style={{ backgroundColor: '#45689a', width: '15%' }} onClick={this.closeTerms}>
                {COUPON_OFFERS.OK}
              </button>
            </div>
          </Modal>
        </div>
        <Pagination
          totalSize={couponDataList && (couponDataList.total_pages > 1 ? couponDataList.total_pages - 1 : 0)}
          pageNeighbours={0}
          onPageChanged={this.onPageChanged}
          currentPage={currentPage}
        />
      </div>
    );
  }
}


const mapStateToProps = store => ({
  couponDataList: couponSelectors.getAllOffers(store),
  loadingState: couponSelectors.showLoader(store),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getCoupons: couponActionCreators.getCoupons,
    getCartResults: actionCreators.getCartResults,
  },
  dispatch,
);
ActiveCoupons.propTypes = {
  couponDataList: PropTypes.object,
  getCoupons: PropTypes.func,
};

ActiveCoupons.defaultProps = {
  couponDataList: {},
  getCoupons: f => f,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveCoupons);
