import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import { configureUrlQuery } from 'react-url-query';
import createHistory from 'history/createBrowserHistory';
import Base from './base';
import makeStore from '../store';
import { actionCreators, selectors } from '../store/search';
import { actionCreators as megamenuActionCreators } from '../store/megamenu';
import Layout from '../layout/main';
import Search from '../components/Search';

class SearchPage extends Base {
  static async getInitialProps({ store, isServer, query }) {
    const { language, search, facets, category, subCategory, isListed } = query
    const categoryTree = category === 'category'; //TODO need better way to identify category tree 
    //TODO SF-37 better handling of country
    const state = store.getState();
    const country = state.authReducer.data.country;
    const categoryFilter = {
      id: subCategory ? subCategory.match(/(\d*)$/)[0] : category ? category.match(/(\d*)$/)[0] : null,
    };
    const facetFilters = selectors.getFacetfilters(store.getState())(JSON.parse(facets || '{}'));
    await store.dispatch(actionCreators.getSearchResults({
      categoryFilter,
      country: country || 'ksa',
      pageSize: 100,
      query: search,
      language: language || 'en',
      facetFilters,
      pageNum: 1,
      fl: '*',
      isListed: isListed === 'true',
      categoryTree,
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
      getSearchResults: actionCreators.getSearchResults,
    },
    dispatch,
  );

export default withRedux(makeStore, mapStateToProps, mapDispatchToProps)(SearchPage);
