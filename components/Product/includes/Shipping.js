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
import Warranty from './Warranty';

import lang from '../../../utils/language';

import styles_en from '../product_en.styl';
import styles_ar from '../product_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;


const { PDP_PAGE } = languageDefinations();

class Shipping extends Component {
  render() {
    const { shippingInfo, offerInfo } = this.props;
    const { shipping_fees, shipping_days, shippable, acceptsReturns, maxDaysToReturn, isPreview } = shippingInfo;
    const { availabilityError } = offerInfo;

    return (
      <div className={`${styles['box']} ${styles['border-radius4']} ${styles['mt-5']} ${styles['mb-10']} ${styles['ipad-delivery-address-part']} ${styles['free-delivery-part']}`}>
        <div className={`${styles['free-delivery-list']} ${styles['flex']}`}>
          <div className={styles['pdp-deliver-list']}>
            <GeoWidget />
          </div>
          {
            shipping_days
              ?
              <span className={`${styles['fs-12']} ${styles['pl-20']}`}>{PDP_PAGE.FREE_DELIVERY_BY} <span className={styles['fontW600']}>{moment().add(shipping_days, 'days').format("ddd, hA")}</span> </span>
              :
              null
          }
        </div>
        {/* <div className={`${styles['shipping-details-part']} ${styles['p-5']} ${styles['flex']} ${styles['justify-center']}`}> */}

        {/* {
              shippable
                ?
                <span className={`${styles['fs-12']} ${styles['lgt-blue']}`}>{PDP_PAGE.FREE_DELIVERY_IN}<span className={styles['fontW600']}>{shipping_days}</span>{PDP_PAGE.DAYS}</span> : ''
            } */}
        {/* </div> */}
        <div>
          {/* <div className={styles['flx-spacebw-alignc']}> */}
          {/* <div className={styles['pdp-deliver-list']}>
              <GeoWidget  hideLabel={true} />
            </div> */}
          {/*<div className={`${styles['radio-btn-group']}`}>
              <input type="radio" id="free-no-cost" name="selector" />
              <label for="free-no-cost">
                <span className={styles['fs-12']}>FREE</span>
                <span className={styles['fs-10']}>No extra cost</span>
              </label>
              <input type="radio" id="cost-option-two" name="selector" />
              <label for="cost-option-two">
                <span className={styles['fs-12']}>EXPRESS</span>
                <span className={styles['fs-10']}>+12.76 AED</span>
              </label>
              <input type="radio" id="cost-option-three" name="selector" />
              <label for="cost-option-three">
                <span className={styles['fs-12']}>SAME DAY</span>
                <span className={styles['fs-10']}>+15 AED</span>
              </label>
            </div>*/}
          {/* </div> */}
          {
            shippable
              ?
              <div>
                <div className={`${styles['flx-spacebw-alignc']} ${styles['fontW600']} ${styles['pt-15']} ${styles['pb-15']} ${styles['fs-12']} ${styles['warrenty-part']}`}>
                  <div className={`${styles['flex-center']}`}>
                    <SVGCompoent clsName={`${styles['return-icon']} ${styles['mr-10']}`} src="icons/common-icon/guarantee" />
                    <span>{PDP_PAGE.HUNDRED_PER_ORIGINAL}</span>
                  </div>
                  <div className={`${styles['flex-center']} ${styles['warenty-part-inn']}`}>
                    <SVGCompoent clsName={`${styles['return-icon']} ${styles['mr-10']}`} src="icons/common-icon/non-return" />
                    {
                      acceptsReturns
                        ?
                        <span>{maxDaysToReturn} {PDP_PAGE.DAY} {PDP_PAGE.EASY_RETURN}</span>
                        :
                        `${PDP_PAGE.NON_RETURNABLE}`
                    }
                  </div>
                  {Object.keys(this.props.warranty).length > 0 ?
                    <div className={`${styles['flex-center']} ${styles['warenty-part-inn']} ${styles['warenty-part-single']}`}>
                      <SVGCompoent clsName={`${styles['trust-icon']}`} src="icons/common-icon/non-warnty" />
                      <Warranty warranty={this.props.warranty} break={true} />
                    </div>
                    :
                    <div className={`${styles['flex-center']} ${styles['warenty-part-inn']}`}>
                      <span className={styles['fs-10']}>{PDP_PAGE.NO_WARRANTY}</span>
                    </div>
                  }
                </div>
              </div>
              :
                availabilityError ?
                null
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
