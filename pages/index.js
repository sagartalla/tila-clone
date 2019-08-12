import React from 'react';
import { NextSeo } from 'next-seo';
import Router from 'next/router';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import lang from '../utils/language';
import { languageDefinations } from '../utils/lang';
import Layout from '../layout/main';
import Landing from '../components/Landing';
import LoaderBarContext from '../components/helpers/context/loaderBarContext';
import Base, { baseActions } from './base';
import { actionCreators } from '../store/landing';
import { actionCreators as PersonalActionCreator } from '../store/cam/personalDetails';
import { actionCreators as MegamenuActionsCreators } from '../store/megamenu';
import main_en from '../layout/main/main_en.styl';
import main_ar from '../layout/main/main_ar.styl';
import styles_en from '../components/Product/product_en.styl';
import styles_ar from '../components/Product/product_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { SEO_CONTENT } = languageDefinations();
class LandingPage extends Base {
  pageName = 'HOME';
  static async getInitialProps({
    store, query, isServer, req, res,
  }) {
    const { country, language } = query;
    const setCountry = country || 'SAU';
    const setLanguage = language || 'en';
    await store.dispatch(MegamenuActionsCreators.getMegamenu());
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
    return { isServer };
  }
  componentDidMount() {
    Base.prototype.componentDidMount();
    this.props.getUserProfileInfo();
    // this.props.getMegamenu()
  }
  render() {
    const { url, loaderProps } = this.props;
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
        <h1 className={`${styles.display_none}`}>{SEO_CONTENT.HOME_H1_CONTENT}</h1>
        <h2 className={`${styles.display_none}`}>{SEO_CONTENT.HOME_H2_CONTENT}</h2>
        <LoaderBarContext.Provider value={loaderProps}>
          <Layout>
            <Landing query={url.query} key={url.query.category} />
          </Layout>
        </LoaderBarContext.Provider>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getUserProfileInfo: PersonalActionCreator.getUserProfileInfo,
    getMegamenu: MegamenuActionsCreators.getMegamenu,
  }, dispatch);
export default withRedux(makeStore, null, mapDispatchToProps)(LandingPage);
