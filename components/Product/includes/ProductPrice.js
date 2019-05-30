import React, { Fragment } from 'react';
import SVGComponent from '../../common/SVGComponet';

import { languageDefinations } from '../../../utils/lang';
import { OverlayTrigger } from 'react-bootstrap';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../product_en.styl';
import styles_ar from '../product_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const { PDP_PAGE, CART_PAGE, ORDER_PAGE, COUPON_OFFERS } = languageDefinations();

const popover = ({strickedPrice: mrp, sellingPrice:sp, offerDiscounts, showPrise:total, totalDiscountMRP:discountMrp, currency}) => {
  return (
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
              <SVGComponent clsName={`${styles['ship-icon']}`} src="icons/free-shipping" />
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
  );
}

const ProductPrice = ({offerInfo}) => {
  const { price, listingAvailable, listingId, stockError, availabilityError, offerPricing } = offerInfo;
 return(
  <div className={`${styles['p-10']} ${styles['product-price-bg']} ${styles['border-radius4']}`}>
    {
      listingAvailable
      ?
        <Fragment>
          <div className={`${styles['flex']} ${styles['align-baseline']}`}>
            <div className={`${styles['flex']} ${styles['align-baseline']}`}>
              <span className={`${styles['fs-24']} ${styles['fontW600']} ${styles['pr-5']}`}>{offerPricing && offerPricing.showPrise && offerPricing.showPrise.display_value}</span>
              <span className={`${styles['fs-12']} ${styles['pr-5']}`}>{(offerPricing && offerPricing.showPrise && offerPricing.showPrise.currency_code) || (offerPricing && offerPricing.currency)}</span>
            </div>
            <Fragment>
              {offerPricing && offerPricing.showPrise && offerPricing.showPrise.display_value !== offerPricing && offerPricing.strickedPrice && offerPricing.strickedPrice.display_value && Math.floor(offerPricing && offerPricing.discount && offerPricing.discount.display_value) > 5 &&
              <div className={`${styles.flex} ${styles['align-baseline']} ${styles['cross-strike-red']} ${styles.relative} ${styles['ml-10']}`}>
                <span className={`${styles['fs-16']} ${styles['pr-5']}`}>{offerPricing && offerPricing.strickedPrice && offerPricing.strickedPrice.display_value}</span>
                <span className={`${styles['fs-12']} ${styles['pr-5']}`}>{offerPricing && (offerPricing.strickedPrice.currency_code || offerPricing.currency)}</span>
              </div>}
              <div className={`${styles['flex']} ${styles['align-baseline']} ${styles['relative']} ${styles['ml-10']}`}>
                {offerPricing && offerPricing.showPrise && offerPricing.showPrise.display_value !== offerPricing && offerPricing.strickedPrice && offerPricing.strickedPrice.display_value && Math.floor(offerPricing && offerPricing.discount && offerPricing.discount.display_value) > 5 &&
                <span className={`${styles['fs-12']} ${styles['pr-5']} ${styles['offers-applied']} `}>{`${Math.floor(offerPricing && offerPricing.discount && offerPricing.discount.display_value)}% OFF`}</span>}
                <OverlayTrigger placement="bottom" overlay={popover(offerPricing)}>
                  <span className={`${styles['fs-12']} ${styles['pr-5']} ${styles['checkout-quat']} ${styles['flex-center']} ${styles['justify-center']}`}>
                    {/* <SVGCompoent clsName={`${styles['secure-icon']} ${styles['mr-10']} ${styles['pointer']}`} src="icons/common-icon/trust-secure" /> */}
                    ?
                  </span>
                </OverlayTrigger>
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
        <h2 className={styles['fs-16']}>
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

  </div>
 );
}

export default ProductPrice;
