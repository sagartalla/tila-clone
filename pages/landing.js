import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import Head from 'next/head';
import makeStore from '../store';
import lang from '../utils/language';
import { languageDefinations } from '../utils/lang';
import Layout from '../layout/main';
import Landing from '../components/Landing';
import main_en from '../layout/main/main_en.styl';
import main_ar from '../layout/main/main_ar.styl';
import styles_en from '../components/Product/product_en.styl';
import styles_ar from '../components/Product/product_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const { SEO_CONTENT } = languageDefinations();
const cookies = new Cookie();

class LandingPage extends Base {
  pageName = 'HOME';
  static async getInitialProps({
    store, query, isServer, req,
  }) {
    return { isServer };
  }

  render() {
    const { url, loaderProps } = this.props;
    return (
      <div>
        <Head>
          <meta property="og:title" content={`${url.query.category} ${SEO_CONTENT.LANDING_H2_CONTENT} ${url.query.category} ${SEO_CONTENT.LANDING_H2}`} />
          <meta property="og:site_name" content="Tila" />
          <meta property="fb:app_id" content=" " />
          <meta property="og:url" content={window.location.toString()} />
          <meta property="og:description" content={`${SEO_CONTENT.LANDING_META_CONTENT1}`} />
          <meta property="og:locale:locale" content="en_SA" />
          <meta property="og:locale:alternate" content="ar_SA" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content=" logo image url" />
          <meta
            name="description"
            content={`${SEO_CONTENT.LANDING_META_CONTENT1}`}
          />
          <title>{url.query.category} {SEO_CONTENT.LANDING_H2_CONTENT} {url.query.category} {SEO_CONTENT.LANDING_H2}</title>
        </Head>
        <h1 className={`${styles.display_none}`}>{url.query.category}</h1>
        <h2 className={`${styles.display_none}`}>{SEO_CONTENT.LANDING_H2_CONTENT} {url.query.category} {SEO_CONTENT.LANDING_H2}</h2>
        <LoaderBarContext.Provider value={loaderProps}>
          <Layout>
            <Landing query={url.query} />
          </Layout>
        </LoaderBarContext.Provider>
      </div>
    );
  }
}

export default React.memo(withRedux(makeStore, null, null)(LandingPage));
