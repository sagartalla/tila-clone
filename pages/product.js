import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import { configureUrlQuery } from 'react-url-query';

import Base, { baseActions } from './base';
import makeStore from '../store';
import { actionCreators, selectors } from '../store/product';
import { actionCreators as reviewRatingActionCreators } from '../store/ratingReviews';

import Layout from '../layout/main';
import { getProduct } from '../store/product/api';
import getProductComponent from '../components/Product'

class ProductPage extends Base {
  constructor(props){
    super(props);
    this.product = getProductComponent(this.props.url.query.isPreview);
  }
  static async getInitialProps({ store, query, isServer }) {
    //TODO SF-37 better handling of country
    const state = store.getState();
    const country = state.authReducer.data.country;

    if (query.isPreview){
      await store.dispatch(actionCreators.getPreview({
        taskCode: query.taskCode,
        itemType: query.itemType,
      }));
    } else {
      await Promise.all([
        store.dispatch(actionCreators.getProduct({
          "city": "string",
          "country_code": country || "ksa",
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
        })),
        //TODO  SF-96
        // await store.dispatch(reviewRatingActionCreators.getRatingsAndReviews({
        //   itemType: query.itemType,
        //   catalogId: query.catalogId
        // }))
      ]);
    }
    return { isServer };
  }

  pageName = 'PRODUCT';

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
      ...baseActions,
      getProduct: actionCreators.getProduct,
      getPreview: actionCreators.getPreview,
    },
    dispatch,
  )

export default withRedux(makeStore, mapStatetoProps, mapDispatchToProps)(ProductPage)
