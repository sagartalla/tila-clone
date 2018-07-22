import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NoSSR from 'react-no-ssr';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';

import makeStore from '../store';
import Base, { baseActions } from './base';
import Layout from '../layout/main';
import Compare from '../components/Compare';

class ThankyouPage extends Base {
  pageName = 'COMPARE';
  render () {
    return (
      <NoSSR>
        <Layout>
          <Compare />
        </Layout>
      </NoSSR>
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

export default withRedux(makeStore, null, mapDispatchToProps)(ThankyouPage);
