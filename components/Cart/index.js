import React, { Component } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import { Router } from '../../routes';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../store/cart';

import HeaderBar from '../HeaderBar/index';
import CartBody from './includes/CartBody';

import styles from './cart.styl';

class Cart extends Component {

  constructor(props) {
    super(props);
    this.checkoutBtnHandler = this.checkoutBtnHandler.bind(this);
    this.removeCartItem = this.removeCartItem.bind(this);
  }

  componentDidMount() {
    this.props.getCartResults();
  }

  checkoutBtnHandler() {
    Router.pushRoute('/payment');
  }

  removeCartItem(e) {
    this.props.removeCartItem(e.target.id);
  }

  render() {
    const { results } = this.props;
    return (
      <div>
        <HeaderBar />
        <Grid>
          <CartBody
            data={results}
            checkoutBtnHandler={this.checkoutBtnHandler}
            removeCartItem={this.removeCartItem}
          />
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  results: selectors.getCartResults(store),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCartResults: actionCreators.getCartResults,
      removeCartItem: actionCreators.removeCartItem,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
