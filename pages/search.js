import React from 'react';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import Cookies from 'universal-cookie';
import Base, { baseActions } from './base';
import makeStore from '../store';
import { languageDefinations } from '../utils/lang';
import { actionCreators, selectors } from '../store/search';
import { actionCreators as megamenuActionsCreators } from '../store/megamenu';
import Layout from '../layout/main';
import Search from '../components/Search';

import SearchContext from '../components/helpers/context/search';

const cookies = new Cookies();

const { SEO_CONTENT } = languageDefinations();

class SearchPage extends Base {
  static async getInitialProps({
    store, isServer, query, req,
  }) {
    const {
      country, language, q, facets, category, subCategory, isListed, disableSpellCheck, sid,
    } = query;
    const categoryTree = query.categoryTree === 'true'; // TODO need better way to identify category tree
    const categoryFacet = query.categoryFacet === 'true';
    // TODO SF-37 better handling of country
    // const state = store.getState();
    // const country = authSelectors.getCountry(state);
    // const country = req ? req.universalCookies.get('country') : cookies.get('country');
    // let [categoryId, ...categoryName] = category ? category.split('-').reverse() : [null, null];
    // let [subCategoryId, ...subCategoryName] = subCategory ? subCategory.split('-').reverse() : [null, null];
    // categoryName = categoryName ? categoryName.join(' ') : null;
    // subCategoryName = subCategoryName ? subCategoryName.join(' ') : null;
    const categoryFilter = {
      id: sid ? sid.split(',').pop() : null,
    };
    const { facetFilters, facetFiltersCopyWithNames } = selectors.getFacetfilters(store.getState())(JSON.parse(facets || '{}'));
    const shippingData = req ? req.universalCookies.get('shippingInfo') : cookies.get('shippingInfo');
    const { city: shippingCity, country: shippingCountry } = shippingData || {};
    const searchOptions = {
      categoryFilter,
      categoryFacet,
      country: country || undefined,
      pageSize: 25,
      query: q,
      language: language || global.APP_LANGUAGE,
      facetFilters,
      facetFiltersCopyWithNames,
      pageNum: 1,
      isListed: !(isListed === 'false'),
      categoryTree,
      disableSpellCheck,
      choosenCategoryName: category || subCategory,
    };

    if (shippingCity) {
      searchOptions.shippingDetails = {
        shippingCity: shippingCity.toUpperCase(),
        shippingCountry: (shippingCountry || global.APP_COUNTRY) && (shippingCountry || global.APP_COUNTRY).toUpperCase(),
      };
    } else {
      searchOptions.shippingDetails = undefined;
    }
    await Promise.all([
      store.dispatch(actionCreators.getSearchResults(searchOptions)),
      store.dispatch(megamenuActionsCreators.getMegamenu()),
    ]);
    return { isServer };
  }
  pageName = 'SEARCH';

  render() {
    const { url, loaderProps } = this.props;
    return (
      <div>
        <SearchContext.Provider value="search">
          <Layout>
            <Search query={url.query} loaderProps={loaderProps} />
          </Layout>
        </SearchContext.Provider>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   allState: state,
// });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...baseActions,
      getSearchResults: actionCreators.getSearchResults,
      // setSessionID: authActionsCreators.setSessionID,
    },
    dispatch,
  );

export default withRedux(makeStore, null, mapDispatchToProps)(SearchPage);
