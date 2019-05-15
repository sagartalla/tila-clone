import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookie from 'universal-cookie';
import Pagination from '../../common/Pagination';
import { languageDefinations } from '../../../utils/lang/';
import { actionCreators, selectors } from '../../../store/cart';
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

class ExpiredCoupons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
    };
    this.onPageChanged = this.onPageChanged.bind(this);
  }
  onPageChanged(currentPage) {
    this.setState({
      currentPage,
    }, () => this.props.getCoupons(cookies.get('country'), currentPage, true));
  }
  render() {
    const { couponDataList, loadingState } = this.props;
    const { currentPage } = this.state;
    return (
      <div>
        <div className={`${styles.applyCoupon} ${styles.flex} ${styles['flex-wrp']}`}>
          <Coupons
            showExpiredCoupons
            couponData={couponDataList.coupon_dto_list}
            loading={loadingState}
          />
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
ExpiredCoupons.propTypes = {
  couponDataList: PropTypes.object,
  getCoupons: PropTypes.func,
};

ExpiredCoupons.defaultProps = {
  couponDataList: {},
  getCoupons: f => f,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpiredCoupons);
