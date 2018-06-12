import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { languageDefinations } from '../../../../utils/lang/';

import styles from '../wishlist.styl';

const WishlistBody = props => {
  const { data, deleteItem, addToCart } = props;
  const { WISH_LIST_PAGE } = languageDefinations();

  return (
    <div>
      <Row>
        <Col md={12} sm={12} xs={12}>
          <h4 className={`${styles['mt-20']} ${styles['mb-20']} ${styles['fontW300']}}`}>
            <span>{data.length + ' ' + WISH_LIST_PAGE.WISHLIST_HEADER}</span>
          </h4>
        </Col>
      </Row>
      <div className={`${styles['box']}`}>
        {
          data.length > 0 && data.map((item, index) => {
            const { wishlist_id, listing_id, brand_name, name, img, price, cur } = item;
            return (
              <div key={index} className={`${styles['thick-border-btm']} ${styles['p-20']}`}>
                <Row>
                  <Col md={2}>
                    <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['pb-15']}`}><img className={styles['img']} src={img} /></div>
                  </Col>
                  <Col md={10}>
                    <Row>
                      <Col md={10}>
                        <h5 className={`${styles['mt-0']} ${styles['mb-0']}`}>{brand_name}</h5>
                      </Col>
                      <Col md={2}>
                        <div id={wishlist_id} className={styles['t-c']} onClick={deleteItem}>{WISH_LIST_PAGE.DELETE}</div>
                      </Col>

                      <Col md={10}>
                        <h4 className={`${styles['fontW600']} ${styles['light-gry-clr']}`}>{name}</h4>
                        <div className={styles['mt-20']}>
                          <button id={listing_id}  className={`${styles['fp-btn']} ${styles['fp-btn-primary']}`} onClick={addToCart}>{WISH_LIST_PAGE.ADD_TO_CART_BTN}</button>
                        </div>
                      </Col>
                      <Col md={2}>
                        <h4 className={`${styles['fontW600']} ${styles['light-gry-clr']} ${styles['mt-15']} ${styles['t-c']}`}>{price + ' ' + cur}</h4>
                      </Col>
                    </Row>
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
