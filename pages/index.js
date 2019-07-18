import React from 'react';
import Router from 'next/router';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import Layout from '../layout/main'
import Landing from '../components/Landing';
import LoaderBarContext from '../components/helpers/context/loaderBarContext';
import Base, { baseActions } from './base';
import { actionCreators } from '../store/landing';
import { actionCreators as PersonalActionCreator } from '../store/cam/personalDetails'
import { actionCreators as MegamenuActionsCreators } from '../store/megamenu'
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
        res.end();
      } else {
        Router.push(`/${setCountry}/${setLanguage}`)
      }
    }
    return { isServer };
  }
  componentDidMount() {
    this.props.getUserProfileInfo()
    //this.props.getMegamenu()
  }
  render() {
    const { url, loaderProps } = this.props;
    return (
      <div>
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
