import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookie from 'universal-cookie';
import { languageDefinations } from '../../../utils/lang/';
import { actionCreators } from '../../../store/cart';
import Pagination from '../../common/Pagination';
import { actionCreators as couponActionCreators, selectors as couponSelectors } from '../../../store/coupons';
import lang from '../../../utils/language';
import Coupons from '../../Cart/CartPaymentSideBar/coupons/commonCoupon';


import main_en from  '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../../Cart/CartPaymentSideBar/coupons/index_en.styl';
import styles_ar from '../../Cart/CartPaymentSideBar/coupons/index_ar.styl';


const { COUPON_OFFERS } = languageDefinations();
const cookies = new Cookie();

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

class ActiveCoupons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      coupons: '',
      copiedCode: '',
      currentPage: 0,
    };
    this.onPageChanged = this.onPageChanged.bind(this);
  }

  onPageChanged(currentPage) {
    this.setState({
      currentPage,
    }, () => this.props.getCoupons(cookies.get('country'), currentPage, false));
  }
  showPopup = (e) => {
    const data = JSON.parse(e.target.getAttribute('data-coupon'));
    const title = e.target.getAttribute('data-title');
    this.setState({
      coupons: data,
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
    const code = document.createElement('textarea');
    code.innerText = couponCode;
    document.body.appendChild(code);
    code.select();
    document.execCommand('copy');
    code.remove();
    this.setState({
      copiedCode: couponCode,
    });
  }
  render() {
    const { couponDataList, loadingState } = this.props;
    const {
      showPopup, currentPage, title, copiedCode, coupons,
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
        {coupons &&
        <div>
          <Modal
            show={showPopup}
            onHide={this.closeTerms}
            className={styles.modalClassName}
          >
            <Modal.Body>
              <div className={`${styles['flex-center']}`}>
                <div className={`${styles.couponCodeTerms} ${styles.width35} ${styles.fontW600} ${styles['m-5']}`}>{coupons.coupon_code}</div>
                <div className={`${styles['label-gry-clr']}`}>{coupons.description}</div>
              </div>
              <Tabs defaultActiveKey={1} key="active-coupons">
                <Tab eventKey={title === 'terms' ? 1 : 2} title={COUPON_OFFERS.VIEW_TERMS}>
                  <iframe
                    title="TERMS"
                    src={coupons.tc}
                    frameBorder="0"
                    width="560px"
                    height="400px"
                  />
                </Tab>
                <Tab eventKey={title === 'terms' ? 2 : 1} title={COUPON_OFFERS.HOW_TO_USE}>
                  <iframe
                    title="TERMS"
                    src={coupons.how_to_use}
                    frameBorder="0"
                    width="560px"
                    height="400px"
                  />
                </Tab>
              </Tabs>
            </Modal.Body>
            <div className={`${styles['justify-end']} ${styles['p-30']} ${styles.flex}`}>
              <button className="btn btn-primary" style={{ backgroundColor: '#101820', width: '15%' }} onClick={this.closeTerms}>
                {COUPON_OFFERS.OK}
              </button>
            </div>
          </Modal>
        </div>}
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
