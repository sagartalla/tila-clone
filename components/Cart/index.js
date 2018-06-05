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

    this.state = {
      showBlocker: false
    }

    this.checkoutBtnHandler = this.checkoutBtnHandler.bind(this);
    this.removeCartItem = this.removeCartItem.bind(this);
    this.increaseItemCnt = this.increaseItemCnt.bind(this);
    this.decreaseItemCnt = this.decreaseItemCnt.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.results.ui.loader && nextProps.results.ui.loader == 'hide') {
      this.setState({ showBlocker: false });
    }
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

  increaseItemCnt(e) {
    this.cartItemCount(e.target.getAttribute('data-id'), 'add');
  }

  decreaseItemCnt(e) {
    this.cartItemCount(e.target.getAttribute('data-id'), 'remove');
  }

  cartItemCount(id, typ) {
    this.setState({ showBlocker: true })
    this.props.cartItemCount(id, typ);
  }

  render() {
    const { showBlocker } = this.state;
    const { results } = this.props;
    return (
      <div>
        <HeaderBar />
        <Grid>
          <CartBody
            data={results}
            showBlocker={showBlocker}
            checkoutBtnHandler={this.checkoutBtnHandler}
            removeCartItem={this.removeCartItem}
            increaseItemCnt={this.increaseItemCnt}
            decreaseItemCnt={this.decreaseItemCnt}
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
      cartItemCount: actionCreators.cartItemCount,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
