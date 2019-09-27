import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";

import SVGComponent from "../../../common/SVGComponet";
import { languageDefinations } from "../../../../utils/lang/";
import { Router } from "../../../../routes";
import constants from "../../../../constants";
import ViewportTrackerHOC from "../../../common/ViewPortTracker/ViewportTrackerHOC";

import lang from "../../../../utils/language";

import main_en from "../../../../layout/main/main_en.styl";
import main_ar from "../../../../layout/main/main_ar.styl";
import styles_en from "../wishlist_en.styl";
import styles_ar from "../wishlist_ar.styl";

const styles =
	lang === "en" ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const cookies = new Cookies();

const language = cookies.get("language") || "ar";
const country = cookies.get("country") || "SAU";

const percentage = (a, b) => Math.floor(((b - a) / b) * 100);

const WishlistBody = props => {
	const { data, deleteItem, addToCart, notifyMe, pageDetails } = props;
	const { WISH_LIST_PAGE, PDP_PAGE } = languageDefinations();

  const getPriceAlert = (status, wishlisted_price, changed_price, cur) => {
    let str = '';
    if (status === 'SAME') return str;
    if (changed_price === 0) return str;
    if (status === 'INCREASED') {
      str = (
        <span className={`${styles['thick-red-clr']} ${styles.flex}`}>
          <SVGComponent clsName={`${styles['alert-icon']}`} src="icons/increase/increase" />
          {`${WISH_LIST_PAGE.PRICE_INCREASED_BY} ${cur} ${changed_price.toFixed(2)}`}
        </span>
      );
    } else {
      str = (
        <span className={`${styles['success-green']} ${styles.flex}`}>
          <SVGComponent clsName={`${styles['alert-icon']}`}src="icons/decrease/decrease" />
          {`${WISH_LIST_PAGE.PRICE_DECRECED_BY} ${cur} ${changed_price.toFixed(2)}`}
        </span>
      );
    }
    return str;
  };
  const routeChange = (variant_id = '', product_id, catalog_id, listing_id = '', name, tuin_id) => {
    Router.push(`/${language}/pdp/${name.replace(/\//g, '').split(' ').join('-').toLowerCase()}/${tuin_id ? `${tuin_id}/` : ''}${listing_id}?pid=${product_id}&vid=${variant_id}&cid=${catalog_id}`);
  };
  return (data.length === 0 ?
    <div className={styles['no-wishlist-icon']}>
      <div className={`${styles.flex} ${styles['no-wishlist-icon-inn']}`}>
        <SVGComponent clsName={`${styles['deleno-wish-list-icon']}`} src="icons/wish-list/no-wishlist" />
        <h4 className={`${styles['fs-24']} ${styles['t-c']} ${styles['pt-40']}`}>{WISH_LIST_PAGE.NO_WISHLIST_LABEL}</h4>
        <div className={`${styles['fs-14']} ${styles['thick-gry-clr']} ${styles['pt-10']}`}>{WISH_LIST_PAGE.DONT_WAIT_NO_MORE}</div>
        <a href={`/${language}`} className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-x-large']} ${styles['right-radius']} ${styles['text-uppercase']} ${styles.fontW600} ${styles['mt-40']}`}>{WISH_LIST_PAGE.START_SHOPPING}</a>
      </div>
    </div>
    :
    <div className={`${styles['pl-5']}`}>
      <div className={`${styles.flex}`}>
        <Col md={12} sm={12} xs={12} className={`${styles['pl-0']}`}>
          <h4 className={`${styles['mt-0']} ${styles['mb-20']} ${styles.fontW300}}`}>
            <span>{`Showing ${(pageDetails.number * pageDetails.size) + 1}-${(pageDetails.number + 1) * pageDetails.size > pageDetails.total_elements ? pageDetails.total_elements : (pageDetails.number + 1) * pageDetails.size} of ${pageDetails.total_elements} ${pageDetails.total_elements === 1 ? WISH_LIST_PAGE.WISHLIST_HEADER_ONE : WISH_LIST_PAGE.WISHLIST_HEADER}`}</span>
          </h4>
        </Col>
      </div>
      <div className={`${styles.box}`}>
        {
          data.length > 0 && data.map((item, index) => {
            const {
              wishlist_id, listing_id, brand_name, name, img, price, cur, inventory_count, changed_percentage, changed_price,
              changed_status, wishlisted_price, mrp, variant_id, product_id, catalog_id, itemType, buttonValue, tuin_id,
            } = item;
            return (
              <div key={index} className={`${styles['thick-border-btm']} ${styles['p-30-20']} ${styles['mb-wishlist-part']}`}>
                <Row className={styles['m-m-0']}>
                  <Col md={2} xs={2} className={styles['m-p-0']}>
                    <div
                      className={`${styles['flex-center']} ${styles['justify-center']} ${styles.pointer} ${styles['mb-wishlist-part-img']}`}
                      onClick={() => routeChange(variant_id, product_id, catalog_id, listing_id, name, tuin_id)}
                    >
                      <img className={styles.img} src={`${constants.mediaDomain}/${img}`} />
                    </div>
                  </Col>
                  <Col md={10} xs={10}>
                    <Col md={8} xs={8} className={styles['pl-0']}>
                      <h5 className={`${styles['mt-0']} ${styles['mb-0']} ${styles['thick-blue']}`}>{brand_name}</h5>
                      <h5 className={`${styles['lgt-gry-clr']} ${styles.pointer} ${styles['light-gry-clr']}`} onClick={() => routeChange(variant_id, product_id, catalog_id, itemType, name, tuin_id)}>{name}</h5>
                      <div className={`${styles['mt-30']} ${styles['m-t-0']} ${styles['m-fs-12']}`}>
                        {inventory_count > 0 ?
													<ViewportTrackerHOC
                          clickEvent={`WL-MOVE-TO-CART-CLICK`}
                          disableViewportTracking={true}
                        >
                          <div
                            data-listing-id={listing_id}
                            data-wishlist-id={wishlist_id}
                            data-button-value={buttonValue}
                          >
                            <button
                              id={listing_id}
                              data-cart-res
                              data-wish-id={wishlist_id}
                              className={`${styles["fp-btn"]} ${
                                styles["fp-btn-primary"]
                              } ${styles["left-radius"]} ${
                                styles["add-to-btn"]
                              }`}
                              onClick={buttonValue ? addToCart : () => {}}
                            >
                              {buttonValue
                                ? WISH_LIST_PAGE.ADD_TO_CART_BTN
                                : PDP_PAGE.IN_CART}
                            </button>
                          </div>
                        </ViewportTrackerHOC>
                        :
                          <button
                            data-wish-id={wishlist_id}
                            className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['left-radius']} ${styles['add-to-btn']}`}
                            onClick={notifyMe}
                          >
                            {WISH_LIST_PAGE.NOTIFY_ME_BTN}
                          </button>
                        }
                      </div>
                    </Col>
                    <Col md={4} xs={4} className={styles['m-p-0']}>
                      <div className={`${styles.relative} ${styles.flex} ${styles['flex-colum']} ${styles['price-details']}`}>
                        <span id={wishlist_id} className={`${styles.absolute} ${styles['delete-icon-part']}`} onClick={deleteItem}>
                          <SVGComponent clsName={`${styles['delete-icon']}`} src="icons/delete-icon/delete-icon" />
                        </span>
                        <h4 className={`${styles.fontW600} ${styles['light-gry-clr']} ${styles['mt-25']} ${styles['ff-b']}`}><span className={`${styles['fs-20']} ${styles['m-fs-18']}`}>
                        <span className={`${styles['fs-14']}`}>{cur}</span>&nbsp;
                        <span>{price}</span>
                        </span></h4>
                        {variant_id && percentage(price, mrp) > 5 ?
                          <span className={`${styles.flex} ${styles['flex-center']}`}>
                            <span className={`${styles['success-green']} ${styles.flex}`}>{lang === 'ar' ? '%'+percentage(price, mrp) : percentage(price, mrp)+'%'}</span>&nbsp;&nbsp;&nbsp;
                            <strike className={`${styles['label-gry-clr']} ${styles['fs-12']}`}>{cur} {mrp}</strike>
                          </span> : ''
                        }
                        {getPriceAlert(changed_status, wishlisted_price, changed_price, cur)}
                        {price && cur && wishlisted_price && wishlisted_price > 0 && wishlisted_price.toString() !== price ?
                        <span className={`${styles['thick-gry-clr']}`}>
                          {WISH_LIST_PAGE.ITEM_WAS} {cur} {wishlisted_price} {WISH_LIST_PAGE.WHEN_ADDED_TO_WISHLIST}
                        </span> : ''}
                      </div>
                    </Col>
                  </Col>
                </Row>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

WishlistBody.propTypes = {
	data: PropTypes.array,
	deleteItem: PropTypes.func.isRequired,
	addToCart: PropTypes.func.isRequired,
	notifyMe: PropTypes.func.isRequired
};

WishlistBody.defaultProps = {
	cartData: []
};

export default WishlistBody;
