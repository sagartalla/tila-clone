import React from 'react';
import Router from 'next/router';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import Layout from '../layout/main'
import Landing from '../components/Landing';
import Base, { baseActions } from './base';
import { actionCreators } from '../store/landing';
import { actionCreators as PersonalActionCreator } from '../store/cam/personalDetails'
class LandingPage extends Base {
  pageName = 'HOME';
  static async getInitialProps({ store, query, isServer, req, res }) {
    const { country, language } = query;
    const setCountry = country || 'SAU'
    const setLanguage = language || 'en'
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
  }
  render() {
    const { url } = this.props;
    return (
      <div>
        <Layout>
          <Landing query={url.query} />
        </Layout>
      </div>
    )
  }
};
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getUserProfileInfo: PersonalActionCreator.getUserProfileInfo
  },dispatch)
export default withRedux(makeStore, null, mapDispatchToProps)(LandingPage);
