import React from 'react';
import Head from 'next/head';
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
import main_en from '../layout/main/main_en.styl';
import main_ar from '../layout/main/main_ar.styl';
import styles_en from '../components/Product/product_en.styl';
import styles_ar from '../components/Product/product_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};


const { SEO_CONTENT } = languageDefinations();
import { actionCreators as PersonalActionCreator } from '../store/cam/personalDetails';
import { actionCreators as MegamenuActionsCreators } from '../store/megamenu';
class LandingPage extends Base {
  pageName = 'HOME';
  static async getInitialProps({ store, query, isServer, req, res }) {
    const { country, language } = query;
    const setCountry = country || 'SAU'
    const setLanguage = language || 'en'
    store.dispatch(MegamenuActionsCreators.getMegamenu())
    if(!country || !language) {
      if(res) {
        res.writeHead(302, {
          Location: `/${setCountry}/${setLanguage}`
        })
        res.end();{}
      } else {
        Router.push(`/${setCountry}/${setLanguage}`)
      }
    }
    return { isServer };
  }
  componentDidMount() {
    this.props.getUserProfileInfo();
  }
  render() {
    const { url, loaderProps } = this.props;
    return (
      <div>
        <Head>
          <meta property="og:title" content={SEO_CONTENT.HOME_TITLE} />
          <meta property="og:site_name" content="Tila" />
          <meta property="fb:app_id" content=" " />
          <meta property="og:url" content={window.location.toString()} />
          <meta property="og:description" content={SEO_CONTENT.HOME_META_CONTENT} />
          <meta property="og:locale:locale" content="en_SA" />
          <meta property="og:locale:alternate" content="ar_SA" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content=" logo image url" />
          <meta name="description" content={SEO_CONTENT.HOME_META_CONTENT} />
          <title>{SEO_CONTENT.HOME_TITLE}</title>
        </Head>
        <h1 className={`${styles.display_none}`}>{SEO_CONTENT.HOME_H1_CONTENT}</h1>
        <h2 className={`${styles.display_none}`}>{SEO_CONTENT.HOME_H2_CONTENT}</h2>
        <Layout>
          <Landing query={url.query} />
        </Layout>
        <LoaderBarContext.Provider value={loaderProps}>
          <Layout>
            <Landing query={url.query} />
          </Layout>
        </LoaderBarContext.Provider>
      </div>
    )
  }
};
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getUserProfileInfo: PersonalActionCreator.getUserProfileInfo,
    getMegamenu: MegamenuActionsCreators.getMegamenu,
  },dispatch)
export default withRedux(makeStore, null, mapDispatchToProps)(LandingPage);
