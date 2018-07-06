import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import { configureUrlQuery } from 'react-url-query';
import Cookies from 'universal-cookie';
import createHistory from 'history/createBrowserHistory';
import Base, { baseActions } from './base';
import makeStore from '../store';
import { actionCreators, selectors } from '../store/search';
import { actionCreators as authActionsCreators, selectors as authSelectors } from '../store/auth';
import Layout from '../layout/main';
import Search from '../components/Search';

const cookies = new Cookies();

class SearchPage extends Base {
  static async getInitialProps({ store, isServer, query, req }) {
    const { language, search, facets, category, subCategory, isListed } = query
    const categoryTree = category === 'category'; //TODO need better way to identify category tree
    //TODO SF-37 better handling of country
    const state = store.getState();
    // const country = authSelectors.getCountry(state);
    const country = req ? req.universalCookies.get('country') : cookies.get('country');
    const categoryFilter = {
      id: subCategory ? subCategory.match(/(\d*)$/)[0] : category ? category.match(/(\d*)$/)[0] : null,
    };
    const facetFilters = selectors.getFacetfilters(store.getState())(JSON.parse(facets || '{}'));
    const shippingData = authSelectors.getDeliveryCity(state);
    const { city: shippingCity, country: shippingCountry } = shippingData;
    await store.dispatch(actionCreators.getSearchResults({
      categoryFilter,
      country: country || undefined,
      pageSize: 100,
      query: search,
      language: language || 'en',
      facetFilters,
      pageNum: 1,
      fl: '*',
      isListed: isListed === 'true',
      categoryTree,
      shippingDetails: {
        shippingCity,
        shippingCountry: country || 'uae'
      }
    }))
    return { isServer };
  }

  pageName = 'SEAERCH';

  render() {
    return (
      <div>
        <Layout>
          <Search query={this.props.url.query} />
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allState: state,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...baseActions,
      getSearchResults: actionCreators.getSearchResults,
      // setSessionID: authActionsCreators.setSessionID,
    },
    dispatch,
  );

export default withRedux(makeStore, mapStateToProps, mapDispatchToProps)(SearchPage);
