import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import SVGCompoent from '../../common/SVGComponet';
import { mergeCss } from '../../../utils/cssUtil';
import { languageDefinations } from '../../../utils/lang';
import { OverlayTrigger, Popover } from 'react-bootstrap';

const styles = mergeCss('components/Product/product');
const {PDP_PAGE} = languageDefinations();

const popover = ({strickedPrice: mrp, sellingPrice:sp, offerDiscounts, showPrise:total, totalDiscountMRP:discountMrp, currency}) => {
  return (
    <Popover id="offer-popover">
      <div>
        <div className={`${styles['table']} ${styles['width100']}`}>
          <div className={styles['t-row']}>
            <div className={styles['t-cell']}>
              <div className={styles['fs-12']}>Maximum Retail Price</div>
              <div className={styles['fs-12']}>(Incl. of all taxes)</div>
            </div>
            <div className={styles['t-cell']}>
              <span className={styles['fs-12']}>{`${mrp} ${currency}`}</span>
            </div>
          </div>
          <div className={styles['t-row']}>
            <div className={styles['t-cell']}>
              <div className={styles['fs-12']}>Selling Price</div>
            </div>
            <div className={styles['t-cell']}>
              <span className={styles['fs-12']}>{`${sp} ${currency}`}</span>
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
                    <span className={styles['fs-12']}>{`${od.discount} ${currency}`}</span>
                  </div>
                </div>
              );
            })
          }
          <div className={styles['t-row']}>
            <div className={styles['t-cell']}>
              <div className={styles['fs-12']}>Dilevery Charges</div>
            </div>
            <div className={`${styles['t-cell']} ${styles['fs-12']}`}>Free</div>
          </div>
          <div className={`${styles['t-row']} ${styles['total-amount']}`}>
            <div className={`${styles['t-cell']} ${styles['fs-12']}`}>Total</div>
            <div className={`${styles['t-cell']} ${styles['fs-12']}`}>{`${total} ${currency}`}</div>
          </div>
        </div>
        <div>
          <div className={`${styles['p-5']} ${styles['mt-5']} ${styles['fs-12']} ${styles['overall-amount']}`}>Overall you save {`${discountMrp} ${currency}`} on this Product</div>
        </div>
      </div>
    </Popover>
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
              <span className={`${styles['fs-24']} ${styles['fontW600']} ${styles['pr-5']}`}>{offerPricing.showPrise}</span>
              <span className={`${styles['fs-12']} ${styles['pr-5']}`}>{offerPricing.currency}</span>
            </div>
            <Fragment>
              {offerPricing.showPrise !== offerPricing.strickedPrice && Math.floor(offerPricing.discount) > 5 &&
              <div className={`${styles.flex} ${styles['align-baseline']} ${styles['cross-strike-red']} ${styles.relative} ${styles['ml-10']}`}>
                <span className={`${styles['fs-24']} ${styles['pr-5']}`}>{offerPricing.strickedPrice}</span>
                <span className={`${styles['fs-12']} ${styles['pr-5']}`}>{offerPricing.currency}</span>
              </div>}
              <div className={`${styles['flex']} ${styles['align-baseline']} ${styles['relative']} ${styles['ml-10']}`}>
                {offerPricing.showPrise !== offerPricing.strickedPrice && Math.floor(offerPricing.discount) > 5 &&
                <span className={`${styles['fs-12']} ${styles['pr-5']} ${styles['offers-applied']} `}>{`${Math.floor(offerPricing.discount)}% OFF`}</span>}
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
              <span className={styles['fontW600']}>Offer Applied: </span>
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
        <h2>
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
