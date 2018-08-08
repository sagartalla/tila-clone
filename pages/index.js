import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import Layout from '../layout/main'
import Landing from '../components/Landing';
import Base, { baseActions } from './base';

class LandingPage extends Base {
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
  bindActionCreators(
    {
      ...baseActions,
    },
    dispatch,
  );


export default withRedux(makeStore, null, mapDispatchToProps)(LandingPage);
