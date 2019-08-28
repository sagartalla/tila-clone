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

class Category extends Base {
  static async getInitialProps({
    store, isServer, query, req,
  }) {
    const {
      country, language, category, facets, sid,
    } = query;
    const categoryTree = query.categoryTree === 'true';
    const shippingData = req ? req.universalCookies.get('shippingInfo') : cookies.get('shippingInfo');
    const { city: shippingCity, country: shippingCountry } = shippingData || {};
    const categoryFilter = {
      id: sid ? sid.split(',').pop() : null,
    };
    const categoryValue = query.category;
    const searchOptions = {
      categoryFilter,
      country: country || undefined,
      pageSize: 25,
      query: categoryValue,
      language: language || 'en',
      pageNum: 1,
      choosenCategoryName: categoryValue,
      categoryTree
    };
    if (shippingCity) {
      searchOptions.shippingDetails = {
        shippingCity: shippingCity.toUpperCase(),
        shippingCountry: (country || 'SAU').toUpperCase(),
      };
    }
    await Promise.all([
      store.dispatch(actionCreators.getSearchResults(searchOptions)),
      store.dispatch(LandingactionCreators.getPage({ page: 'categoryIndividualPage', id: categoryValue })),
    ]);
    return { isServer };
  }

  pageName = 'categotyIndividualPage';

  render() {
    const { loaderProps, url } = this.props;
    return (
      <div>
        <SearchContext.Provider value="search">
          <Head>
            <meta property="og:title" content={`${url.query.category} ${SEO_CONTENT.LANDING_H2_CONTENT} ${url.query.category} ${SEO_CONTENT.BRAND_H2_TITLE}`} />
            <meta property="og:site_name" content="Tila" />
            <meta property="fb:app_id" content=" " />
            {/* <meta property="og:url" content={window.location.toString()} /> */}
            <meta property="og:description" content={`${SEO_CONTENT.BRAND_META_CONTENT} ${url.query.category} ${SEO_CONTENT.BRAND_META_CONTENT2}`} />
            <meta property="og:locale:locale" content="en_SA" />
            <meta property="og:locale:alternate" content="ar_SA" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content=" logo image url" />
            <meta name="description" content={`${SEO_CONTENT.BRAND_META_CONTENT} ${url.query.category} ${SEO_CONTENT.BRAND_META_CONTENT2}`} />
            <title>{url.query.category} {SEO_CONTENT.LANDING_H2_CONTENT} {url.query.category} {SEO_CONTENT.BRAND_H2_TITLE}</title>
          </Head>
          <h1 className={`${styles.display_none}`}>{url.query.category}</h1>
          <h2 className={`${styles.display_none}`}>{SEO_CONTENT.BRAND_H2} {url.query.category}</h2>
          <Layout>
            <Search query={url.query.category} loaderProps={loaderProps} isBrandPage />
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

export default withRedux(makeStore, null, mapDispatchToProps)(Category);
