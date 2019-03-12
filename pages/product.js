import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import { configureUrlQuery } from 'react-url-query';
import Cookies from 'universal-cookie';

import Base, { baseActions } from './base';
import makeStore from '../store';
import { actionCreators, selectors } from '../store/product';
import { actionCreators as reviewRatingActionCreators } from '../store/ratingReviews';

import Layout from '../layout/main';
import { getProduct } from '../store/product/api';
import getProductComponent from '../components/Product'

const cookies = new Cookies();

class ProductPage extends Base {
  constructor(props){
    super(props);
    this.product = getProductComponent(this.props.url.query.isPreview, this.props.url.query.taskCode);
  }
  static async getInitialProps({ store, query, isServer, req }) {

    const state = store.getState();
    const country = req ? req.universalCookies.get('country') : cookies.get('country');
    let language = req ? req.universalCookies.get('language') : cookies.get('language');
    const shippingData = req ?  req.universalCookies.get('shippingInfo') : cookies.get('shippingInfo');
    const { city: shippingCity, country: shippingCountry } = shippingData || {};
    const { isPreview, taskCode, itemType, productId, variantId, listingId } = query;
    if (taskCode){
      await store.dispatch(actionCreators.getPreview({
        taskCode: taskCode,
        itemType: itemType,
        accessToken: req.universalCookies.get('accessToken'),
      }));
    } else {
      const options = {
        "city": shippingCity,
        "country_code": country || "SAU",
        "flags": {
          "catalog_details": true,
          "category_tree_bread_crumb": true,
          "category_tree_finance": true,
          "include_offers": true,
          "include_policies": true,
          "include_related_products": true,
          "shipping": true
        },
        "language": language,
        "product_ids": [
          productId
        ],
        "listing_ids": [
          listingId
        ],
        "size": "LARGE"
      };

      if(variantId) {
        options.variant_ids = [
          variantId
        ];
      }

      await Promise.all([
        store.dispatch(actionCreators.getProduct(options)),
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
