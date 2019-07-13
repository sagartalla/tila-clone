import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { Head } from 'next/document';
import makeStore from '../store';
import { languageDefinations } from '../utils/lang';
import Layout from '../layout/main';
import Landing from '../components/Landing';

const { SEO_CONTENT } = languageDefinations();
const cookies = new Cookie();

class LandingPage extends Base {
  pageName = 'HOME';
  static async getInitialProps({ store, query, isServer, req }) {
    return { isServer };
  }

  render() {
    const { url } = this.props;
    return (
      <div>
        <Head>
          <meta
            name="description" content={`${url.query.category} ${SEO_CONTENT.LANDING_META_CONTENT1} ${url.query.category} ${SEO_CONTENT.LANDING_META_CONTENT2} ${cookies.get('country')} ${SEO_CONTENT.LANDING_META_CONTENT3}`}
          />
          <meta
            name="keywords" content={`${url.query.category} ${SEO_CONTENT.LANDING_META_KEYWORD1} ${url.query.category} ${url.query.category} ${SEO_CONTENT.LANDING_META_KEYWORD2}`}
          />
          <title>{url.query.category} {SEO_CONTENT.LANDING_H2_CONTENT} {url.query.category} {SEO_CONTENT.LANDING_H2} {cookies.get('country')} {SEO_CONTENT.LANDING_TILA}</title>
        </Head>
        <h1>{url.query.category}</h1>
        <h2>{SEO_CONTENT.LANDING_H2_CONTENT} {url.query.category} {SEO_CONTENT.LANDING_H2} {cookies.get('country')} {SEO_CONTENT.LANDING_TILA}</h2>
        <Layout>
          <Landing query={url.query} />
        </Layout>
      </div>
    )
  }
};

export default React.memo(withRedux(makeStore, null, null)(LandingPage));
