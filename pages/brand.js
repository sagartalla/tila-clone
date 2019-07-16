import React from 'react';
import { bindActionCreators } from 'redux';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import Cookies from 'universal-cookie';
import Base, { baseActions } from './base';
import makeStore from '../store';
import lang from '../utils/language';
import { languageDefinations } from '../utils/lang';
import { actionCreators } from '../store/search';
import Layout from '../layout/main';
import Search from '../components/Search';
import SearchContext from '../components/helpers/context/search';
import { actionCreators as LandingactionCreators } from '../store/landing';
import main_en from '../layout/main/main_en.styl';
import main_ar from '../layout/main/main_ar.styl';
import styles_en from '../components/Product/product_en.styl';
import styles_ar from '../components/Product/product_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };


const cookies = new Cookies();

const { SEO_CONTENT } = languageDefinations();


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
          <Head>
            <meta name="description" content={`${SEO_CONTENT.BRAND_META_CONTENT} ${this.props.url.query} ${SEO_CONTENT.BRAND_META_CONTENT2} `} />
            <title>{this.props.url.query} {SEO_CONTENT.LANDING_H2_CONTENT} {this.props.url.query} {SEO_CONTENT.BRAND_H2_TITLE}</title>
          </Head>
          <h1 className={`${styles.display_none}`}>{this.props.url.query}</h1>
          <h2 className={`${styles.display_none}`}>{SEO_CONTENT.BRAND_H2} {this.props.url.query}</h2>
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
