import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SVGComponent from '../../../common/SVGComponet';
import { languageDefinations } from '../../../../utils/lang/';
import { mergeCss } from '../../../../utils/cssUtil';

const styles = mergeCss('components/Cam/Wishlist/wishlist');



const WishlistBody = (props) => {
  const { data, deleteItem, addToCart } = props;
  const { WISH_LIST_PAGE } = languageDefinations();

  const getPriceAlert = (a, b, cur) => {
    if (a === b) return null;
    const percentage = Math.floor(((a - b) / b) * 100);
    let str = '';
    if (percentage > 0) {
      str = (
        <span className={`${styles['thick-red-clr']} ${styles.flex}`}>
          <SVGComponent clsName={`${styles['alert-icon']}`} src="icons/increase/increase" />
          {`Price Increased by ${a - b} ${cur} (${percentage}%)`}
        </span>
      );
    } else {
      str = (
        <span className={`${styles['success-green']} ${styles.flex}`}>
          <SVGComponent clsName={`${styles['alert-icon']}`}src="icons/decrease/decrease" />
          {`Price Decreased by ${a - b} ${cur} (${percentage}%)`}
        </span>
      );
    }
    return str;
  };

  return (
    <div>
      <div className={`${styles['flex']}`}>
        <Col md={12} sm={12} xs={12} className={`${styles['pl-0']}`}>
          <h4 className={`${styles['mt-0']} ${styles['mb-20']} ${styles['fontW300']}}`}>
            <span>{data.length + ' ' + WISH_LIST_PAGE.WISHLIST_HEADER}</span>
          </h4>
        </Col>
      </div>
      <div className={`${styles['box']}`}>
        {
          data.length > 0 && data.map((item, index) => {
            const { wishlist_id, listing_id, brand_name, name, img, price, cur, wishlisted_price } = item;
            return (
              <div key={index} className={`${styles['thick-border-btm']} ${styles['p-30-20']} ${styles['mb-wishlist-part']}`}>
                <Row className={styles['m-m-0']}>
                  <Col md={2} xs={2} className={styles['m-p-0']}>
                    <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['mb-wishlist-part-img']}`}><img className={styles['img']} src={img} /></div>
                  </Col>
                  <Col md={10} xs={10}>
                    <Col md={8} xs={8} className={styles['pl-0']}>
                      <h5 className={`${styles['mt-0']} ${styles['mb-0']} ${styles['thick-blue']}`}>{brand_name}</h5>
                      <h5 className={`${styles['lgt-gry-clr']} ${styles['light-gry-clr']}`}>{name}</h5>
                      <div className={`${styles['mt-30']} ${styles['m-t-0']} ${styles['m-fs-12']}`}>
                        <button id={listing_id} data-wish-id={wishlist_id}  className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['add-to-btn']}`} onClick={addToCart}>{WISH_LIST_PAGE.ADD_TO_CART_BTN}</button>
                      </div>
                    </Col>
                    <Col md={4} xs={4} className={styles['m-p-0']}>
                      <div className={`${styles['relative']} ${styles['flex']} ${styles['flex-colum']} ${styles['price-details']}`}>
                        <span id={wishlist_id} className={`${styles['absolute']} ${styles['delete-icon-part']}`} onClick={deleteItem}>
                          <SVGComponent clsName={`${styles['delete-icon']}`} src="icons/delete-icon/delete-icon" />
                        </span>
                        <h4 className={`${styles['fontW600']} ${styles['light-gry-clr']} ${styles['mt-25']}`}><span className={`${styles['fs-30']} ${styles['m-fs-18']}`}>{price}</span> <span className={`styles['fs-18']} ${styles['m-fs-14']}`}> {cur}</span></h4>
                        {getPriceAlert(price, wishlisted_price, cur)}
                        <span className={`${styles['thick-gry-clr']}`}>
                          Item was {wishlisted_price} {cur} when added to Wish List
                        </span>
                      </div>
                    </Col>
                  </Col>
                </Row>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

WishlistBody.propTypes = {
  data: PropTypes.array,
  deleteItem: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

WishlistBody.defaultProps = {

};

export default WishlistBody;
