import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import { configureUrlQuery } from 'react-url-query';
import createHistory from 'history/createBrowserHistory';
import Base from './base';
import makeStore from '../store';
import { actionCreators, selectors } from '../store/search';
import Layout from '../layout/main';
import Search from '../components/Search';

class SearchPage extends Base {
  static async getInitialProps({ store, isServer, query }) {
    const categoryFilter = {
      id: query.subCategory ? query.subCategory.match(/(\d*)$/)[0] : query.category ? query.category.match(/(\d*)$/)[0] : null,
    };
    const facetFilters = selectors.getFacetfilters(store.getState())(JSON.parse(query.facets || '{}'));
    await store.dispatch(actionCreators.getSearchResults({
      categoryFilter,
      country: 'SAE',
      pageSize: 100,
      query: query.search,
      language: query.language || 'en',
      facetFilters,
      pageNum: 1,
      fl: '*',
      isListed: true
    }));
    return { isServer };
  }

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
