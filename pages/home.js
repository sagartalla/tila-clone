import React from 'react';

import Router from 'next/router';
import { NextSeo } from 'next-seo';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';

import makeStore from '../store';
import Layout from '../layout/main';
import FTB from '../components/Ftb';
import Base, { baseActions } from './base';
import { languageDefinations } from '../utils/lang';
import { actionCreators as landingactionCreators } from '../store/landing';
import LoaderBarContext from '../components/helpers/context/loaderBarContext';
import { actionCreators as MegamenuActionsCreators } from '../store/megamenu';
import { actionCreators as PersonalActionCreator } from '../store/cam/personalDetails';

const { SEO_CONTENT } = languageDefinations();


class Home extends Base {
  pageName = 'HOME_PAGE'
  static async getInitialProps({
    store, isServer, query, res,
  }) {
    const { country, language } = query;
    // const setCountry = country || 'SAU';
    const setLanguage = language || 'en';
    if (!language) {
      if (res) {
        res.writeHead(302, {
          Location: `/${setLanguage}`,
        });
        res.end();
      } else {
        Router.push(`/${setLanguage}`);
      }
    }

    const params = {
      page: 'homePage',
      id: 'home_page',
    };
    if (query.category) {
      params.page = 'mainCategoryPage';
      params.id = query.category;
    }
    await Promise.all([
      store.dispatch(landingactionCreators.getPage(params)),
      store.dispatch(MegamenuActionsCreators.getMegamenu()),
    ]);
    return { isServer };
  }

  componentDidMount() {
    Base.prototype.componentDidMount();
    this.props.getUserProfileInfo();
  }

  render() {
    const { loaderProps } = this.props;
    return (
      <div>
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
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...baseActions,
      getUserProfileInfo: PersonalActionCreator.getUserProfileInfo,
      getMegamenu: MegamenuActionsCreators.getMegamenu,
    },
    dispatch,
  );

export default withRedux(makeStore, null, mapDispatchToProps)(Home);
