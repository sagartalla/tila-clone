import React, { Component } from 'react';
import NoSSR from 'react-no-ssr';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import LoaderBarContext from '../components/helpers/context/loaderBarContext';
import makeStore from '../store';
import Layout from '../layout/main';
import Cart from '../components/Cart';
import Base, { baseActions } from './base';

class CartPage extends Base {
  pageName = 'CART'
  render() {
    const {loaderProps} = this.props;
    return (
      <LoaderBarContext.Provider value={loaderProps}>
        <Layout>
          <Cart />
        </Layout>
      </LoaderBarContext.Provider>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...baseActions,
    },
    dispatch,
  );

export default withRedux(makeStore, null, mapDispatchToProps)(CartPage);
