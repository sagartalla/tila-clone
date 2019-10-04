import React from 'react';
import { NextSeo } from 'next-seo';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';

import makeStore from '../store';
import Layout from '../layout/main';
import FTB from '../components/Ftb';
import Base, { baseActions } from './base';
import { languageDefinations } from '../utils/lang';
import { actionCreators as LandingactionCreators } from '../store/landing';
import LoaderBarContext from '../components/helpers/context/loaderBarContext';

const { SEO_CONTENT } = languageDefinations();

class OfferZone extends Base {
  pageName = 'FIRST_TIME_BUYER'
  static async getInitialProps({
    store, isServer, query
  }) {
    await Promise.all([
      store.dispatch(LandingactionCreators.getPage({ page: 'offer-zone', id: query.offerName })),
    ]);
    return { isServer };
  }
  render() {
    const { loaderProps } = this.props;
    return (
      <React.Fragment>
        <NextSeo
          title={SEO_CONTENT.HOME_TITLE}
          description={SEO_CONTENT.HOME_META_CONTENT}
          openGraph={{
            title: SEO_CONTENT.HOME_TITLE,
            site_name: 'Tila',
            description: SEO_CONTENT.HOME_META_CONTENT,
            fb_app_id: '',
            locale: 'en_SA',
            locale_ar: 'ar_SA',
            type: 'website',
            image: 'logo image url',
          }}
        />
        <LoaderBarContext.Provider value={loaderProps}>
          <Layout>
            <FTB />
          </Layout>
        </LoaderBarContext.Provider>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...baseActions,
    },
    dispatch,
  );

export default withRedux(makeStore, null, mapDispatchToProps)(OfferZone);
