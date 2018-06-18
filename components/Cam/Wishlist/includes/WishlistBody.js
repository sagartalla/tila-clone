import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SVGCompoent from '../../../common/SVGComponet';
import { languageDefinations } from '../../../../utils/lang/';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Cam/Wishlist/wishlist');

const WishlistBody = props => {
  const { data, deleteItem, addToCart } = props;
  const { WISH_LIST_PAGE } = languageDefinations();

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
            const { wishlist_id, listing_id, brand_name, name, img, price, cur } = item;
            return (
              <div key={index} className={`${styles['thick-border-btm']} ${styles['p-30-20']}`}>
                <Row>
                  <Col md={2}>
                    <div className={`${styles['flex-center']} ${styles['justify-center']}`}><img className={styles['img']} src={img} /></div>
                  </Col>
                  <Col md={10}>
                    <Col md={8} className={styles['pl-0']}>
                      <h5 className={`${styles['mt-0']} ${styles['mb-0']} ${styles['thick-blue']}`}>{brand_name}</h5>
                      <h5 className={`${styles['lgt-gry-clr']} ${styles['light-gry-clr']}`}>{name}</h5>
                      <div className={styles['mt-32']}>
                        <button id={listing_id}  className={`${styles['fp-btn']} ${styles['fp-btn-primary']}`} onClick={addToCart}>{WISH_LIST_PAGE.ADD_TO_CART_BTN}</button>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className={`${styles['relative']} ${styles['flex']}`}>
                        <span id={wishlist_id} className={`${styles['absolute']} ${styles['delete-icon-part']}`} onClick={deleteItem}>
                          <SVGCompoent clsName={`${styles['delete-icon']}`} src="icons/delete-icon/delete-icon" />
                        </span>
                        <h4 className={`${styles['fontW600']} ${styles['light-gry-clr']} ${styles['mt-24']} ${styles['t-c']}`}><span className={styles['fs-30']}>{price}</span> <span clsName={styles['fs-18']}> {cur}</span></h4>
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
