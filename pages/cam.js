import React, { Component } from 'react';
import NoSSR from 'react-no-ssr';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import { configureUrlQuery } from 'react-url-query';
import createHistory from 'history/createBrowserHistory';

import makeStore from '../store';

import Base, { baseActions } from './base';
import Layout from '../layout/main';
import Cam from '../components/Cam';

class CamPage extends Base {
  pageName = 'CAM';
  render(){
   return (
    <Layout>
      <NoSSR>
        <Cam tabDetails={this.props.url.query.tabDetails}/>
      </NoSSR>
    </Layout>
   );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...baseActions,
    },
    dispatch,
  )

export default withRedux(makeStore, null, mapDispatchToProps)(CamPage);
