import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import { configureUrlQuery } from 'react-url-query';
import createHistory from 'history/createBrowserHistory';
import makeStore from '../store';
import { actionCreaters, selectors } from '../store/product';
import Layout from '../layout/main';
import { getProduct } from '../store/product/api';
import getProductComponent from '../components/Product'

class ProductPage extends Component {
  static async getInitialProps({ store, query, isServer }) {
    if (query.isPreview){
      await store.dispatch(actionCreaters.getPreview({
        taskCode: query.taskCode,
        itemType: query.itemType,
      }));      
    } else {
      await store.dispatch(actionCreaters.getProduct({
        "city": "string",
        "country_code": "SAE",
        "flags": {
          "catalog_details": true,
          "include_all_pref_listings": true,
          "include_related_products": true,
          "shipping": true
        },
        "language": "en",
        "product_ids": [
          "PMOBH2OXUVSUSTKUCP"
        ],
        "size": "LARGE"
      }));
    }
    return { isServer };
  }

  render() {
    const Product = getProductComponent(this.props.url.query.isPreview);
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
      getProduct: actionCreaters.getProduct,
      getPreview: actionCreaters.getPreview,
    },
    dispatch,
  )

export default withRedux(makeStore, mapStatetoProps, mapDispatchToProps)(ProductPage)