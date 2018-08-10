// File not in use but the logic here is usefull

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Row, Col, Button} from 'react-bootstrap';

import { selectors, actionCreators } from '../../../store/cart';
import { Link } from '../../../routes';

import { mergeCss } from '../../../utils/cssUtil';
import {languageDefinations} from '../../../utils/lang'
const {PDP_PAGE} = languageDefinations()
const styles = mergeCss('components/Product/product');

class Offers extends Component {
  constructor(props){
    super(props);
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart() {
    const { listingId } = this.props.offerInfo
    this.props.addToCart({
      listing_id: listingId
    });
  }

  render() {
    const { price, listingAvailable, listingId, stockError, availabilityError } = this.props.offerInfo;
    const { isLoading, error, isAddedToCart } = this.props;
    return (
      listingAvailable
      ?
      <div>
        <div className={`${styles['pb-20']} ${styles['pt-20']}`}>
          <Row>
            <Col md={6}>
              <Button className={`${styles[`${isAddedToCart ? 'added-to-cart' : ''}`]} ${styles['blue-btn']}`} onClick={this.addToCart} disabled={isLoading || isAddedToCart}>
                {
                  isAddedToCart
                  ?
                  `${PDP_PAGE.ADDED_TO_CART}`
                  :
                  `${PDP_PAGE.BUY_FOR} ${price}`
                }
              </Button>
              {
                isAddedToCart
                ?
                <Button>
                  <Link route="/cart">{PDP_PAGE.GO_TO_CART}</Link>
                </Button>
                :
                null
              }
            </Col>
            <Col md={6}>
              <Button>{PDP_PAGE.LIKE}</Button>
            </Col>
          </Row>
          {
            error
            ?
            <Row>
              <Col md={12}>
                <span className={styles['error-msg']}>{error}</span>
              </Col>
            </Row>
            :
            null
          }
        </div>
        <Row>
          <Col md={6} className={styles['border-rt']}>
            <ul className={`${styles['pl-0']} ${styles['no-list-blt']}`}>
              <li>
                <h5 className={`${styles['ff-b']} ${styles['black-color']}`}>{PDP_PAGE.OFFERS}</h5>
                <ul className={`${styles['pl-15']} ${styles['no-list-blt']}`}>
                  <li>No offers </li>
                </ul>
              </li>
              <li>
                <h5 className={`${styles['ff-b']} ${styles['black-color']}`}>{PDP_PAGE.WARRANTY}</h5>
                <ul className={`${styles['pl-15']} ${styles['no-list-blt']}`}>
                  <li>{PDP_PAGE.NO_WARRANTY}</li>
                </ul>
              </li>
            </ul>
          </Col>
          <Col md={6}>
            <ul className={`${styles['pl-0']} ${styles['no-list-blt']}`}>
              <li>
                <h5 className={`${styles['ff-b']} ${styles['black-color']}`}>EMI {PDP_PAGE.NOT_AVAIALBLE}</h5>
              </li>
            </ul>
          </Col>
        </Row>
      </div>
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
    );
  }
}

const mapStateToProps = (store) => {
  return ({
    isLoading: selectors.getLoadingStatus(store),
    error: selectors.getErrorMessege(store),
    isAddedToCart: selectors.isAddedToCart(store)
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { addToCart: actionCreators.addToCart },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Offers);
