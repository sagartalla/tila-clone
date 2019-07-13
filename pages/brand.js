import React from 'react';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import Cookies from 'universal-cookie';
import Base, { baseActions } from './base';
import makeStore from '../store';
import { actionCreators } from '../store/search';
import Layout from '../layout/main';
import Search from '../components/Search';
import { actionCreators as LandingactionCreators } from '../store/landing';

import SearchContext from '../components/helpers/context/search';

const cookies = new Cookies();

class SearchPage extends Base {
  static async getInitialProps({
    store, isServer, query, req,
  }) {
    const {
      country, language, brandName, facets,
    } = query;
    const shippingData = req ? req.universalCookies.get('shippingInfo') : cookies.get('shippingInfo');
    const { city: shippingCity, country: shippingCountry } = shippingData || {};
    const searchOptions = {
      country: country || undefined,
      pageSize: 25,
      query: brandName,
      language: language || 'en',
      pageNum: 1,
    };
    if (shippingCity) {
      searchOptions.shippingDetails = {
        shippingCity: shippingCity.toUpperCase(),
        shippingCountry: (country || 'ARE').toUpperCase(),
      };
    }

    // console.log("brand Name :", brandName);

    await Promise.all([
      store.dispatch(actionCreators.getSearchResults(searchOptions)),
      store.dispatch(LandingactionCreators.getPage({ page: 'brandLandingPage', id: brandName })),
    ]);
    return { isServer };
  }

  pageName = 'SEARCH';

  render() {
    return (
      <div>
        <SearchContext.Provider value="search">
          <Layout>
            <Search query={this.props.url.query} isBrandPage />
          </Layout>
        </SearchContext.Provider>
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
