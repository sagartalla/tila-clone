import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import { configureUrlQuery } from 'react-url-query';
import createHistory from 'history/createBrowserHistory';
import makeStore from '../store';
import { actionCreaters } from '../store/search';
import Layout from '../layout/main';
import Search from '../components/Search';
import { selectors } from '../store/search/index';

class Page extends Component {
  static async getInitialProps({ store, isServer, query }) {
    const categoryFilter = {};
    let facetFilters = {};
    if (query.category || query.facets) {
      /* redundant call to facets */
      await store.dispatch(actionCreaters.getSearchResults({
        categoryFilter,
        country: 'UAE',
        pageSize: 100,
        query: query.search,
        language: 'en',
        facetFilters: {},
        pageNum: 1,
      }));
      categoryFilter.id = selectors.getCategoryId(store.getState(), query);
      facetFilters = selectors.getFacetfilters(store.getState())(JSON.parse(query.facets||'{}'));
      console.log(facetFilters);
    }
    await store.dispatch(actionCreaters.getSearchResults({
      categoryFilter,
      country: 'UAE',
      pageSize: 100,
      query: query.search,
      language: 'en',
      facetFilters,
      pageNum: 1,
    }));
    return { isServer };
  }

  componentDidMount() {
    const history = createHistory();
    configureUrlQuery({ history });
  }

  render() {
    return (
      <div>
        <Layout>
          <Search query={this.props.url.query}/>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allState: state,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSearchResults: actionCreaters.getSearchResults,
    },
    dispatch,
  );

export default withRedux(makeStore, mapStateToProps, mapDispatchToProps)(Page);
