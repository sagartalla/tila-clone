import React, { Fragment, useState } from 'react';
// import { OverlayTrigger } from 'react-bootstrap';

import SVGComponent from '../../common/SVGComponet';
import Button from '../../common/CommonButton';
import { ShowPriceFormat, StrickedPriceFormat } from '../../common/PriceFormat';
import { languageDefinations } from '../../../utils/lang';

import lang from '../../../utils/language';
import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../product_en.styl';
import styles_ar from '../product_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const {
  PDP_PAGE, CART_PAGE, ORDER_PAGE, COUPON_OFFERS
} = languageDefinations();

const ProductPrice = ({
  offerInfo,
  isPreview,
  emailErr,
  notify,
  shippingInfo,
  notifyEmail,
  showLoading,
  userDetails,
  onChangeField,
}) => {
  const {
    listingAvailable, stockError, availabilityError, offerPricing,
  } = offerInfo;
  const {
    strickedPrice: mrp, sellingPrice: sp, offerDiscounts, showPrise: total, totalDiscountMRP: discountMrp, currency,
  } = offerPricing;
  const [showToolTip, toggleTooltip] = useState(false);
  return(
  <div className={`${styles['product-price-bg']} ${styles['border-radius4']}`}>
    {
      listingAvailable
      ?
        <Fragment>
          <div className={`${styles['flex']} ${styles['align-baseline']}`}>
            <div className={`${styles['flex']} ${styles['align-baseline']}`}>
            <span className={`${styles['fs-12']} ${styles['pr-5']}`}>{(offerPricing && offerPricing.showPrise && offerPricing.showPrise.currency_code) || (offerPricing && offerPricing.currency)}</span>
              {offerPricing && offerPricing.showPrise && <span className={`${styles['fs-24']} ${styles['fontW600']} ${styles['pr-5']}`}><ShowPriceFormat showPrice={offerPricing.showPrise.display_value} strickedPrice={offerPricing.strickedPrice.display_value}/></span>}
            </div>
            <Fragment>
              {offerPricing && offerPricing.showPrise && offerPricing.showPrise.display_value !== offerPricing && offerPricing.strickedPrice && offerPricing.strickedPrice.display_value && Math.floor(offerPricing && offerPricing.discount && offerPricing.discount) > 5 &&
              <div className={`${styles.flex} ${styles['align-baseline']} ${styles['cross-strike-red']} ${styles.relative} ${styles['ml-10']}`}>
                {offerPricing && offerPricing.strickedPrice && <span className={`${styles['fs-24']} ${styles['pr-5']}`}><StrickedPriceFormat showPrice={offerPricing.showPrise.display_value} strickedPrice={offerPricing.strickedPrice.display_value}/></span>}
              </div>}
              <div className={`${styles['flex']} ${styles['align-baseline']} ${styles['relative']} ${styles['ml-10']}`}>
                {offerPricing && offerPricing.showPrise && offerPricing.showPrise.display_value !== offerPricing && offerPricing.strickedPrice && offerPricing.strickedPrice.display_value && Math.floor(offerPricing && offerPricing.discount) > 5 &&
                <span className={`${styles['fs-12']} ${styles['pr-5']} ${styles['offers-applied']} `}>{`${Math.floor(offerPricing && offerPricing.discount && offerPricing.discount)}% ${PDP_PAGE.OFF}`}</span>}
                <span onMouseOver={() => toggleTooltip(true)} onMouseLeave={() => toggleTooltip(false)}  className={`${styles.relative} ${styles['checkout-quat']} ${styles['bottom-pos']} ${styles['fs-12']} ${styles['flex-center']} ${styles['justify-around']}`}>
                  <span
                    className={`${styles['fs-12']} ${styles['flex-center']} ${styles['justify-center']}`}>
                    {/* <SVGCompoent clsName={`${styles['secure-icon']} ${styles['mr-10']} ${styles['pointer']}`} src="icons/common-icon/trust-secure" /> */}
                    <span className={`${lang === 'en' ? '' : styles['flip-questionmark']}`}>{'?'}</span>
                    {
                      showToolTip ?
                      <div className={`${styles['p-10']} ${styles['tool-tip']}`}>
                      <div className={`${styles['table']} ${styles['width100']}`}>
                        <div className={styles['t-row']}>
                          <div className={styles['t-cell']}>
                            <div className={styles['fs-12']}>{CART_PAGE.MAXIMUM_RETAIL_PRICE}</div>
                            <div className={styles['fs-12']}>({CART_PAGE.INCL_OF_ALL_TAXES})</div>
                          </div>
                          <div className={styles['t-cell']}>
                            <span className={styles['fs-12']}>{`${mrp.display_value} ${mrp.currency_code || currency}`}</span>
                          </div>
                        </div>
                        <div className={styles['t-row']}>
                          <div className={styles['t-cell']}>
                            <div className={styles['fs-12']}>{CART_PAGE.SELLING_PRICE}</div>
                          </div>
                          <div className={styles['t-cell']}>
                            <span className={styles['fs-12']}>{`${sp.display_value} ${sp.currency_code || currency}`}</span>
                          </div>
                        </div>
                        {
                          offerDiscounts.map((od) => {
                            return (
                              <div className={styles['t-row']}>
                                <div className={styles['t-cell']}>
                                  <div className={styles['fs-12']}>{od.description}</div>
                                </div>
                                <div className={styles['t-cell']}>
                                  <span className={styles['fs-12']}>{`${od.discount.display_value} ${od.discount.currency_code || currency}`}</span>
                                </div>
                              </div>
                            );
                          })
                        }
                        <div className={styles['t-row']}>
                          <div className={styles['t-cell']}>
                            <div className={styles['fs-12']}>{CART_PAGE.DELIVERY_CHARGES}</div>
                          </div>
                          <div className={`${styles['t-cell']} ${styles['fs-12']}`}>
                            <SVGComponent clsName={`${styles['ship-icon']}`} src={lang === 'en' ? "icons/free-shipping" : "icons/Arabic-Freeshipping" } />
                          </div>
                        </div>
                        <div className={`${styles['t-row']} ${styles['total-amount']}`}>
                          <div className={`${styles['t-cell']} ${styles['fs-12']}`}>{ORDER_PAGE.TOTAL}</div>
                          <div className={`${styles['t-cell']} ${styles['fs-12']}`}>{`${total.display_value} ${total.currency_code || currency}`}</div>
                        </div>
                      </div>
                      <div>
                        <div className={`${styles['p-5']} ${styles['mt-5']} ${styles['fs-12']} ${styles['overall-amount']}`}>{CART_PAGE.OVERALL_YOU_SAVE} {discountMrp && discountMrp.display_value && `${discountMrp.display_value} ${currency}`} {CART_PAGE.ON_THIS_PRODUCT}</div>
                      </div>
                    </div>
                        : null
                      }
                  </span>
                </span>
              </div>
            </Fragment>
          </div>
          {
          offerPricing.offerMesseges.length
          ?
            <div className={`${styles['flex']} ${styles['offers-applied']}`}>
              <span className={styles['fontW600']}>{COUPON_OFFERS.OFFER_APPLIED}: </span>
              <ul className={styles['p-0']}>
                {
                  offerPricing.offerMesseges.map((m) => {
                    return (
                      <li>
                        <span className={`${styles['fs-12']} ${styles['pl-10']}`}>{m}</span>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          :
          null
          }
        </Fragment>
      :
        <h2 className={`${styles['fs-16']} ${styles['mt-5']}`}>
          {
            availabilityError
            ?
              `${PDP_PAGE.PRODUCT_NOT_AVAILABLE}`
            :
              stockError
              ?
                `${PDP_PAGE.PRODUCT_OUT_OF_STOCK}`
              :
                null
          }
        </h2>
    }
    {isPreview ? null :
      (stockError || availabilityError) && ((shippingInfo && Object.keys(shippingInfo).length === 0) || (shippingInfo === null || shippingInfo.shippable)) &&
      <div className={`${styles['flx-space-bw']} ${styles['align-baseline']}`}>
        {!userDetails.isLoggedIn &&
        <div className={`${styles['mb-0']} ${styles['fp-input']} ${styles['notifyme-input']} ${styles['pb-10']}`}>
          <input onChange={onChangeField} name="notify" type="text" value={notifyEmail || ''} required />
          <label>{PDP_PAGE.GET_NOTIFIED}</label>
          {emailErr &&
            <span className={styles['error-msg']}>{emailErr}</span>
          }
        </div>}
        <Button
          className={`${styles['flex-center']} ${styles.notify_me_btn} ${styles['fs-14']} ${styles['text-uppercase']}`}
          btnText={PDP_PAGE.NOTIFY_ME}
          onClick={notify}
          hoverClassName="hoverBlueBackground"
          btnLoading={showLoading}
        />
      </div>
    }
  </div>
  );
}

export default ProductPrice;
