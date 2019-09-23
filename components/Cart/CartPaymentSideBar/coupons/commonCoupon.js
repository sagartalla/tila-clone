
import moment from 'moment-timezone';
import lang from '../../../../utils/language';
import SVGComponent from '../../../common/SVGComponet';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from './index_en.styl';
import styles_ar from './index_ar.styl';

import { languageDefinations } from '../../../../utils/lang/';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const { COUPON_OFFERS } = languageDefinations();

/* eslint-disable */

const coupons = props => (
    props.couponData && props.couponData.length > 0 ?
    <>
        {props.couponData && props.couponData.length > 0 && props.couponData.map((data, index) =>
        (
          <div className={props.showCartCoupon ? `${styles.couponDiv}` : `${styles.couponDiv} ${styles.couponMargin} `} key={index}>
            <div className={props.showExpiredCoupons ? '' : `${styles.couponCodeListing} ${styles.width50} `}>
              <div className={props.showExpiredCoupons ? `${styles['p-10']}` : `${styles['justify-center']} ${styles.flex}`}>
                <div className={`${styles.ellipsis} ${styles.fontW600}`} title={data.coupon_code}>{data.coupon_code}</div>
              </div>
            </div>
            <div className={`${styles.wordBreak} ${styles['p-10']}`}>{data.description}</div>
            {props.showExpiredCoupons ?
            <div className={`${styles['thick-red-clr']} ${styles['p-10']}`}>{COUPON_OFFERS.EXPIRED_ON} &nbsp;{moment(data.ends_on).tz('Asia/Riyadh').format('MM/DD/YYYY')}</div>
            :
            <div className={`${styles['p-10']} ${styles['flex-center']} ${styles['justify-between']} ${styles.flex}`}>
              <div className={`${styles['lgt-blue']} ${styles.pointer} ${styles.flex}`} data-coupon={JSON.stringify(data)} data-title="terms" onClick={props.showPopup}>{COUPON_OFFERS.VIEW_TERMS}
                <div className={styles.border} />
              </div>
              <div className={`${styles['lgt-blue']} ${styles.pointer}`} data-coupon={JSON.stringify(data)} data-title="use" onClick={props.showPopup}>{COUPON_OFFERS.HOW_TO_USE}</div>
              <div>
              {props.showActiveCoupons ?
                <button data-code={data.coupon_code} className={`${styles['copy-btn']}`} onClick={props.handleCopy}>{data.coupon_code === props.copiedCode ? 'COPIED' : COUPON_OFFERS.COPY}</button>
                : <button data-code={data.coupon_code} className={`${styles['apply-btn']} ${styles.fontW600}`} onClick={props.handleApply}>{COUPON_OFFERS.APPLY}</button>}
                </div>
            </div>}
          </div>
        ))
      }
      </> :
        props.loading ?
        <div className={`${styles['coupon-result']} ${styles['flex-center']} ${styles['justify-center']} ${styles.width100}`}>
          <div className={`${styles['loader-div']} ${styles['align-center']}`}>
            <SVGComponent
              clsName={styles['loader-styl']}
              src="icons/common-icon/circleLoader"
            >
            </SVGComponent>
          </div>
          </div> :
            <div className={`${styles['coupon-result']} ${styles['flex-center']} ${styles['justify-center']} ${styles.width100} ${styles['flex-col']} ${styles['black-color']}`}>
            {/* <SVGComponent clsName={`${styles['coupon-img']}`} src="icons/common-icon/NoCoupons" /> */}
            <img className={styles['coupon-img']} src={"/static/img/icons/coupon-img.png"} />
            <div className={`${styles['black-color']} ${styles['t-c']}  ${styles['fs-24']} ${styles['p-10']}`}>
              {props.showExpiredCoupons ? COUPON_OFFERS.EXPIRED_CONTENT : COUPON_OFFERS.EMPTY_COUPON_BOX}
            </div>
            <div className={`${styles['thick-gry-clr']} ${styles['t-c']} ${styles['fs-14']}`}>
              {props.showExpiredCoupons ? COUPON_OFFERS.START_SHOPPING : COUPON_OFFERS.NO_COUPONS_AVAILABLE}<br />
              {!props.showExpiredCoupons && COUPON_OFFERS.CHECK_BACK_LATER}
            </div>
            </div>
     );

export default coupons;
