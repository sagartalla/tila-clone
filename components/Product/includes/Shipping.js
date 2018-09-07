import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import ProductPrice from '../includes/ProductPrice';
import GeoWidget from '../../common/GeoWidget';
import { languageDefinations } from '../../../utils/lang';
import { actionCreators, selectors } from '../../../store/product';
import SVGCompoent from '../../common/SVGComponet';
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Product/product');

const { PDP_PAGE } = languageDefinations();

class Shipping extends Component {
  render() {
    const { shippingInfo, offerInfo } = this.props;
    const { shipping_fees, shipping_days, shippable, acceptsReturns, maxDaysToReturn, isPreview } = shippingInfo;
    return (
      <div className={`${styles['box']} ${styles['border-radius4']} ${styles['mt-5']} ${styles['mb-10']} ${styles['ipad-delivery-address-part']}`}>
        <div className={`${styles['p-15']}`}>
          <div className={styles['flx-spacebw-alignc']}>
            <div className={styles['pdp-deliver-list']}>
              <GeoWidget />
            </div>
            {
              shippable
                ?
                <span className={`${styles['fs-12']} ${styles['lgt-blue']}`}>{PDP_PAGE.FREE_DELIVERY_IN}<span className={styles['fontW600']}>{shipping_days}</span>{PDP_PAGE.DAYS}</span> : ''
            }

          </div>
          {
            shippable
              ?
              <div>
                <div className={`${styles['flex']} ${styles['justify-center']} ${styles['pt-15']} ${styles['pb-15']}`}>
                  <span className={styles['fs-12']}>{PDP_PAGE.FREE_DELIVERY_BY}{moment().add(shipping_days, 'days').format("ddd, hA")}</span>
                </div>
                <div className={`${styles['flex-center']} ${styles['fontW600']} ${styles['p-5']} ${styles['fs-12']} ${styles['warrenty-part']}`}>
                  <div className={styles['flex-center']}>
                    <SVGCompoent clsName={`${styles['return-icon']} ${styles['mr-10']}`} src="icons/common-icon/return" />
                    {
                      acceptsReturns
                        ?
                        <span>{maxDaysToReturn} {PDP_PAGE.DAY} {PDP_PAGE.EASY_RETURN}</span>
                        :
                        `${PDP_PAGE.NON_RETURNABLE}`
                    }
                  </div>
                  <span>|</span>
                  <div className={styles['flex-center']}>
                    <SVGCompoent clsName={`${styles['secure-icon']} ${styles['mr-10']}`} src="icons/common-icon/trust-secure" />
                    <span>1 {PDP_PAGE.YEAR} {PDP_PAGE.WARRANTY}</span>
                  </div>
                </div>
              </div>
              :
              <p className={`${styles['flex']} ${styles['pt-15']} ${styles['justify-center']}`}>{PDP_PAGE.NO_SHIPPING_CITY}</p>

          }
        </div>
        {
          !isPreview && <ProductPrice offerInfo={offerInfo} />
        }
      </div>
    )
  }
}

Shipping.PropTypes = {

}

const mapStateToProps = (store) => {
  return ({});
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {},
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Shipping);
