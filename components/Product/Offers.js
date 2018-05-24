import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Row, Col, Button} from 'react-bootstrap';

import { selectors, actionCreators } from '../../store/cart';

class Offers extends Component {
  constructor(props){
    super(props);
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart() {
    const { listingId } = this.props.offerInfo
    this.props.addToCart({
      listingId: listingId
    });
  }

  render() {
    const { price, listingAvailable, listingId } = this.props.offerInfo;
    const { isLoading } = this.props;
    return (
      listingAvailable
      ? 
      <div>
        <Row>
          <Col md={6}>
            <Button onClick={this.addToCart} disabled={isLoading}>BUY FOR {price}</Button>
          </Col>
          <Col md={6}>
            <Button>Like</Button>
          </Col>
        </Row>
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
    isLoading: selectors.getLoadingStatus(store)
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { addToCart: actionCreators.addToCart },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Offers);
