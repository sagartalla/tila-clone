import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Row, Col, Button} from 'react-bootstrap';

import { selectors, actionCreators } from '../../store/cart';
import { Link } from '../../routes';

import styles from './product.styl';

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
    const { price, listingAvailable, listingId } = this.props.offerInfo;
    const { isLoading, error, isAddedToCart } = this.props;
    return (
      listingAvailable
      ? 
      <div>
        <Row>
          <Col md={6}>
              <Button className={styles[`${isAddedToCart ? 'added-to-cart' : ''}`]} onClick={this.addToCart} disabled={isLoading || isAddedToCart}>
                {
                  isAddedToCart
                  ?
                  'Added to Cart'
                  :
                  `BUY FOR ${price}`
                }
              </Button>
              {
              isAddedToCart
              ?
              <Button>
                {/* <a href='/cart'>Go To Cart</a> */}
                  <Link route="/cart">Go To Cart</Link>
              </Button>
              :
              null
            }
          </Col>
          <Col md={6}>
            <Button>Like</Button>
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
        <Row>
          <Col md={6}>
            <ul>
              <li>
                <h3>Offers</h3>
                <ul>
                  <li>No offers </li>
                </ul>
              </li>
              <li>
                <h3>Warrenty</h3>
                <ul>
                  <li>No warranty</li>
                </ul>
              </li>
            </ul>
          </Col>
        <Col md={6}>
            <ul>
              <li>
                <h3>EMI Not Available</h3>
              </li>
            </ul>
          </Col>
        </Row>
      </div>
      :
      <h2>Listing not available</h2>
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
