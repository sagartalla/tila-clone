import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';

import { languageDefinations } from '../../../../utils/lang/';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Cart/cart');

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
    const { data } = this.props;
    let tempData = data.length > 10 ? data.slice(0, 10) : data;

    return (
      <div className={`${styles['view-wishlist-main']} ${styles['box']} ${styles['p-20']} ${styles['flex-center']}`}>
        <Col md={4}>
          <span className={styles['fs-12']}>{tempData.length} out of {tempData.length} {CART_PAGE.ITEMS_WISHLIST_PURCHASE}</span>
        </Col>
        <Col md={6}>
          {
            tempData.length > 0 && tempData.map((item, i) => {
              return (
                <span key={i} className={`${styles['wishlist-img']} ${styles['mr-15']}`}>
                  <img className={styles['img']} src={item.img} />
                </span>
              )
            })
          }
        </Col>
        <Col md={2} className={`${styles['pl-0']} ${styles['pr-0']} ${styles['flex']} ${styles['view-btn-list']}`}>
          <a className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['text-uppercase']} ${styles['default-small']}`} onClick={this.wishlistClickHandler}>View Wishlist</a>
        </Col>
      </div>
    )
  }
}

CartMiniWishList.propTypes = {

}


CartMiniWishList.defaultProps = {

};

export default CartMiniWishList;
