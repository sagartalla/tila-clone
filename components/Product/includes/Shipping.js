import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookie from 'universal-cookie';
import moment from 'moment';
// import ProductPrice from '../includes/ProductPrice';
import GeoWidget from '../../common/GeoWidget';
import { languageDefinations } from '../../../utils/lang';
import SVGCompoent from '../../common/SVGComponet';
import Warranty from './Warranty';
//import TilaCarePolicy from './TilaCarePolciy'
import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../product_en.styl';
import styles_ar from '../product_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const cookies = new Cookie();
const { PDP_PAGE } = languageDefinations();

const Shipping = (props) => {
  const shippingData = cookies.get('shippingInfo') || {};

  const { shippingInfo, offerInfo, returnInfo} = props;
  // const {
  //   shipping_days, shippable, isPreview,
  // } = shippingInfo;

  const {
    acceptsReturns, maxDaysToReturn,
  } = returnInfo;

  const { availabilityError } = offerInfo;

  return (
    <div id="shipping-cont" className={`${styles.box} ${styles['border-radius4']} ${styles['mt-5']} ${styles['mb-10']} ${styles['ipad-delivery-address-part']} ${styles['free-delivery-part']}`}>
      <div className={`${styles['free-delivery-list']} ${styles.flex}`}>
        <div className={styles['pdp-deliver-list']}>
          <GeoWidget isPdp />
        </div>
        {
          shippingInfo && shippingInfo.shipping_days
            ?
              <span className={`${styles['fs-12']} ${styles['pl-20']}`}>{PDP_PAGE.FREE_DELIVERY_BY} <span className={styles.fontW600}>{moment().add(shippingInfo.shipping_days, 'days').format('ddd, hA')}</span> </span>
            :
            null
        }
      </div>
      <div>
        {shippingInfo && shippingInfo.shippable ?
          <div>
            <div className={`${styles['flx-spacebw-alignc']} ${styles.fontW600} ${styles['pt-15']} ${styles['pb-15']} ${styles['fs-12']} ${styles['warrenty-part']}`}>
              <div className={`${styles['flex-center']}`}>
                <SVGCompoent clsName={`${styles['return-icon']} ${styles['mr-10']}`} src="icons/common-icon/guarantee" />
                <span>{PDP_PAGE.HUNDRED_PER_ORIGINAL}</span>
              </div>
              <div className={`${styles['flex-center']} ${styles['warenty-part-inn']}`}>
                <SVGCompoent clsName={`${styles['return-icon']} ${styles['mr-10']}`} src="icons/common-icon/non-return" />
                {
                acceptsReturns
                  ?
                    <span>{maxDaysToReturn} {PDP_PAGE.DAYS} {PDP_PAGE.EASY_RETURN}</span>
                  :
                  `${PDP_PAGE.NON_RETURNABLE}`
              }
              </div>
              {Object.keys(props.warranty).length > 0 ?
                <div className={`${styles['flex-center']} ${styles['warenty-part-inn']} ${styles['warenty-part-single']}`}>
                  <SVGCompoent clsName={`${styles['trust-icon']} ${styles['mr-10']}`} src="icons/common-icon/non-warnty" />
                  <Warranty warranty={props.warranty} break />
                </div>
              :
                <div className={`${styles['flex-center']} ${styles['warenty-part-inn']}`}>
                  <span className={styles['fs-10']}>{PDP_PAGE.NO_WARRANTY}</span>
                </div>
            }
            </div>
          </div>
          :
          <p className={`${styles.flex} ${styles['pt-15']} ${styles['justify-center']}`}>
            {availabilityError
              ?
              null
              :
              shippingInfo && shippingInfo.shippable === false ?  PDP_PAGE.NO_SHIPPING_CITY : PDP_PAGE.SELECT_YOUR_CITY
            }
          </p>
        }
      </div>
    </div>
  );
};

// const mapStateToProps = store => ({});

const mapDispatchToProps = dispatch => bindActionCreators(
  {},
  dispatch,
);

export default connect(null, mapDispatchToProps)(Shipping);
