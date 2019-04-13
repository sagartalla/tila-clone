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
    const { language, search, facets, category, subCategory, isListed, disableSpellCheck, sid } = query
    const categoryTree = query.categoryTree === 'true'; //TODO need better way to identify category tree
    const categoryFacet = query.categoryFacet === 'true';
    //TODO SF-37 better handling of country
    const state = store.getState();
    // const country = authSelectors.getCountry(state);
    const country = req ? req.universalCookies.get('country') : cookies.get('country');
    // let [categoryId, ...categoryName] = category ? category.split('-').reverse() : [null, null];
    // let [subCategoryId, ...subCategoryName] = subCategory ? subCategory.split('-').reverse() : [null, null];
    // categoryName = categoryName ? categoryName.join(' ') : null;
    // subCategoryName = subCategoryName ? subCategoryName.join(' ') : null;
    const categoryFilter = {
      id: sid ? sid.split(',').pop() : null,
    };
    const { facetFilters, facetFiltersCopyWithNames } = selectors.getFacetfilters(store.getState())(JSON.parse(facets || '{}'));
    const shippingData = req ? req.universalCookies.get('shippingInfo') : cookies.get('shippingInfo');;
    const { city: shippingCity, country: shippingCountry } = shippingData || {};
    const searchOptions = {
      categoryFilter,
      categoryFacet,
      country: country || undefined,
      pageSize: 25,
      query: search,
      language: language || 'en',
      facetFilters,
      facetFiltersCopyWithNames,
      pageNum: 1,
      isListed: isListed === 'true',
      categoryTree,
      disableSpellCheck,
      choosenCategoryName: category || subCategory,
    };
    if (shippingCity) {
      searchOptions.shippingDetails = {
        shippingCity: shippingCity.toUpperCase(),
        shippingCountry: (country || 'ARE').toUpperCase(),
      }
    }
    await store.dispatch(actionCreators.getSearchResults(searchOptions))
    return { isServer };
  }

  pageName = 'SEARCH';

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
