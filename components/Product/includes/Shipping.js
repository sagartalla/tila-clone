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

  const { shippingInfo, offerInfo, returnInfo, itemLocation = {}, tila_care_policy } = props;
  // const {
  //   shipping_days, shippable, isPreview,
  // } = shippingInfo;
  const {
    acceptsReturns, maxDaysToReturn,
  } = returnInfo;

  const { availabilityError } = offerInfo;

  return (
    <div id="shipping-cont" className={`${styles['ipad-delivery-address-part']}`}>
      <div className={`${styles['free-delivery-list']} ${styles['flex-colum']} ${styles.flex} ${styles.box} ${styles['mt-5']} ${styles['mb-10']} ${styles['free-delivery-part']} ${styles['border-radius4']}`}>
        <div className={`${styles['pdp-deliver-list']} ${styles['flex']} ${styles['flex-wrp']}`}>
          <GeoWidget isPdp />
          {tila_care_policy.display_item_location ? <span className={`${styles['pdp-del-prt']} ${styles['pl-10']} ${styles['ml-5']} ${styles['thick-border-left']}`}><span className={styles['thick-gry-clr']}>{PDP_PAGE.ITEM_LOCATION}: </span><span className={styles['fontW600']}>{tila_care_policy.display_item_location}</span></span> : null}
        </div>
        {
          shippingInfo && shippingInfo.shipping_days
            ?
              <span className={`${styles['t-c']} ${styles['pt-10']}`}>
                <span className={`${styles['fs-12']} ${styles['pt-5']} ${styles['pr-5']}`}>{shippingInfo.shipping_fees && shippingInfo.shipping_fees.money_value ? PDP_PAGE.DELIVERY_BY : PDP_PAGE.FREE_DELIVERY_BY} <span className={styles.fontW600}>{moment().add(shippingInfo.shipping_days, 'days').format('DD MMM, dddd')}</span> </span>
                {shippingInfo.shipping_fees && <span className={`${styles['pl-10']} ${styles['thick-border-left']}`}><span>{shippingInfo.shipping_fees.currency_code}</span><span className={styles['pl-10']}>{parseFloat(shippingInfo.shipping_fees.display_value).toFixed(shippingInfo.shipping_fees.display_value.split('.')[1] === '00' ? 0 : 2)}</span></span>}
              </span>
            :
            null
        }
      </div>
      <div className={`${styles.box} ${styles['mt-5']} ${styles['mb-10']} ${styles['free-delivery-part']} ${styles['border-radius4']}`}>
        <div>
          <div className={`${styles['flex-center']} ${styles.fontW600} ${styles['pt-5']} ${styles['pb-5']} ${styles['fs-12']} ${styles['warrenty-part']}`}>
            <div className={`${styles['flex-center']} ${styles['warnty-and-garanty']}`}>
              <SVGCompoent clsName={`${styles['return-icon']} ${styles['mr-10']}`} src="icons/common-icon/guarantee" />
              <span>{PDP_PAGE.HUNDRED_PER_ORIGINAL}</span>
            </div>
            <div className={`${styles['flex-center']} ${styles['warenty-part-inn']} ${styles['warnty-and-garanty']}`}>
              <SVGCompoent clsName={`${styles['return-icon']} ${styles['mr-10']}`} src="icons/common-icon/non-return" />
              {
              acceptsReturns
                ?
                  <span>{maxDaysToReturn} {PDP_PAGE.DAYS} {PDP_PAGE.EASY_RETURN}</span>
                :
                `${PDP_PAGE.NON_RETURNABLE}`
            }
            </div>
            {/* {Object.keys(props.warranty).length > 0 ?
              <div className={`${styles['flex-center']} ${styles['warenty-part-inn']} ${styles['warenty-part-single']}`}>
                <SVGCompoent clsName={`${styles['trust-icon']} ${styles['mr-10']}`} src="icons/common-icon/non-warnty" />
                <Warranty warranty={props.warranty} break />
              </div>
            :
              <div className={`${styles['flex-center']} ${styles['warenty-part-inn']}`}>
                <span className={styles['fs-10']}>{PDP_PAGE.NO_WARRANTY}</span>
              </div>
          } */}
          </div>
        </div>
        {/* {!(shippingInfo && shippingInfo.shippable) &&
          <p className={`${styles.flex} ${styles['pt-15']} ${styles['justify-center']}`}>
            {availabilityError
              ?
              null
              :
              shippingInfo && shippingInfo.shippable === false ? PDP_PAGE.NO_SHIPPING_CITY : PDP_PAGE.SELECT_YOUR_CITY
            }
          </p>
        } */}
      </div>
    </div>
  );
};

export default Shipping;
