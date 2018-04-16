import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import { actionCreaters } from '../store/search';
import Layout from '../layout/main';
import Search from '../components/Search';

class Page extends Component {
  static async getInitialProps({ store, isServer, query }) {
    console.log(query);
    await store.dispatch(actionCreaters.getSearchResults({
      categoryFilter: {},
      country: 'UAE',
      pageSize: 100,
      query: 'mobile',
      language: 'en',
      customFilters: {},
      pageNum: 1,
    }));
    return { isServer };
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
