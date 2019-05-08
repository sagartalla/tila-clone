
import moment from 'moment';
import lang from '../../../../utils/language';
import SVGCompoent from '../../../common/SVGComponet';

import styles_en from './index_en.styl';
import styles_ar from './index_ar.styl';

import { languageDefinations } from '../../../../utils/lang/';

const styles = lang === 'en' ? styles_en : styles_ar;

const { COUPON_OFFERS } = languageDefinations();

/* eslint-disable */

const coupons = props => (
    props.couponData && props.couponData.length > 0 ?
    <>
        {props.couponData && props.couponData.length > 0 && props.couponData.map(data =>
        (
          <div className={props.showCartCoupon ? `${styles.couponDiv}` : `${styles.couponDiv} ${styles.couponMargin} `}>
            <div className={props.showExpiredCoupons ? '' : `${styles.couponCodeListing} ${styles['left10']} ${styles.width50} `}>
              <div className={props.showExpiredCoupons ? `${styles['p-10']}` : `${styles['justify-center']} ${styles.flex}`}>
                <div className={`${styles.ellipsis} ${styles.fontW600}`} title={data.coupon_code}>{data.coupon_code}</div>
              </div>
            </div>
            <div className={`${styles.wordBreak} ${styles['p-10']}`}>{data.description}</div>
            {props.showExpiredCoupons ?
            <div className={`${styles['thick-red-clr']} ${styles['p-10']}`}>{COUPON_OFFERS.EXPIRED_ON} &nbsp;{moment(data.ends_on).format('MM/DD/YYYY')}</div>
            :
            <div className={`${styles['p-10']} ${styles['flex-center']} ${styles['justify-between']} ${styles.flex}`}>
              <div className={`${styles['lgt-blue']} ${styles.pointer} ${styles.flex}`} data-terms={data.tc} data-use={data.how_to_use} data-coupon={data.coupon_code} data-desc={data.description} data-title="terms" onClick={props.showPopup}>{COUPON_OFFERS.VIEW_TERMS}
                <div className={styles.border} />
              </div>
              <div className={`${styles['lgt-blue']} ${styles.pointer}`} data-terms={data.tc} data-use={data.how_to_use} data-coupon={data.coupon_code} data-desc={data.description} data-title="use" onClick={props.showPopup}>{COUPON_OFFERS.HOW_TO_USE}</div>
              <div>
              {props.showActiveCoupons ?
                <button data-code={data.coupon_code} className={`${styles['fp-btn']} ${styles['copy-btn']} ${styles['small-btn']}`} onClick={props.handleCopy}>{data.coupon_code === props.copiedCode ? 'COPIED' : COUPON_OFFERS.COPY}</button>
                : <button data-code={data.coupon_code} className={`${styles['fp-btn']} ${styles['apply-btn']} ${styles['small-btn']} ${styles.fontW600}`} onClick={props.handleApply}>{COUPON_OFFERS.APPLY}</button>}
                </div>
            </div>}
          </div>
        ))
      }
      </> :
        props.loading ?
          <div className={styles['loader-div']}>
            <SVGCompoent
              clsName={styles['loader-styl']}
              src="icons/common-icon/circleLoader"
            >
            </SVGCompoent>
          </div> :
      <div className={`${styles['thick-red-clr']} ${styles['m-80']} ${styles['fs-18']} ${styles['t-c']}`}>{COUPON_OFFERS.NO_COUPONS}</div>
    );

export default coupons;

