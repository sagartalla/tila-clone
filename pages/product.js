import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import { configureUrlQuery } from 'react-url-query';
import createHistory from 'history/createBrowserHistory';

import Base from './base';
import makeStore from '../store';
import { actionCreators, selectors } from '../store/product';
import Layout from '../layout/main';
import { getProduct } from '../store/product/api';
import getProductComponent from '../components/Product'

class ProductPage extends Base {
  constructor(props){
    super(props);
    this.product = getProductComponent(this.props.url.query.isPreview);
  }
  static async getInitialProps({ store, query, isServer }) {
    if (query.isPreview){
      await store.dispatch(actionCreators.getPreview({
        taskCode: query.taskCode,
        itemType: query.itemType,
      }));      
    } else {
      await store.dispatch(actionCreators.getProduct({
        "city": "string",
        "country_code": "ksa",
        "flags": {
          "catalog_details": true,
          "include_all_pref_listings": true,
          "include_related_products": true,
          "shipping": true
        },
        "language": query.language || "en",
        "product_ids": [
          query.productId
        ],
        "size": "LARGE"
      }));
    }
    return { isServer };
  }

  render() {
    const Product = this.product;
    return (
      <div>
        <Layout>
          <Product /> 
        </Layout>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    allState: state,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getProduct: actionCreators.getProduct,
      getPreview: actionCreators.getPreview,
    },
    dispatch,
  )

export default withRedux(makeStore, mapStatetoProps, mapDispatchToProps)(ProductPage)