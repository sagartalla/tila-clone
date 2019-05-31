import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';

import { languageDefinations } from '../../../../utils/lang/';
import constants from '../../../../constants';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../../../Cart/cart_en.styl';
import styles_ar from '../../../Cart/cart_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const { CART_PAGE } = languageDefinations();

class CartMiniWishList extends Component {
  constructor(props) {
    super(props);
    this.wishlistClickHandler = this.wishlistClickHandler.bind(this);
  }

  wishlistClickHandler() {
    this.props.showCartPageBtmPopup();
  }

  render() {
    const { data, wishListCount } = this.props;
    // let tempData = data.length > 10 ? data.slice(0, 10) : data;

    return (
      <div className={`${styles['view-wishlist-main']} ${styles['box']} ${styles['p-20']} ${styles['flex-center']}`}>
        <Col md={4}>
          <span className={styles['fs-12']}>
            {data.length === 1 ? `${CART_PAGE.THERE_IS} ${data.length} ${CART_PAGE.ITEM_IN_YOUR_WISHLIST}` : `${CART_PAGE.THERE_ARE} ${wishListCount} ${CART_PAGE.ITEMS_IN_YOUR_WISHLIST}`}
          </span>
        </Col>
        <Col md={6}>
          {
            data.length > 0 && data.slice(0, 6).map((item, i) => (
              <span key={i} className={`${styles['wishlist-img']} ${styles['mr-15']}`}>
                <img className={styles['img']} src={`${constants.mediaDomain}/${item.img}`} />
              </span>
            ))
          }
        </Col>
        {data.length > 0 &&
        <Col md={2} className={`${styles['pl-0']} ${styles['pr-0']} ${styles['flex']} ${styles['view-btn-list']}`}>
          <a className={`${styles['fp-btn']} ${styles['fs-10']} ${styles['fp-btn-default']} ${styles['text-uppercase']} ${styles['default-small']} ${styles['left-radius']}`} onClick={this.wishlistClickHandler}>{CART_PAGE.VIEW_WISHLIST}</a>
        </Col>
        }
      </div>
    )
  }
}

CartMiniWishList.propTypes = {

}


CartMiniWishList.defaultProps = {

};

export default CartMiniWishList;
