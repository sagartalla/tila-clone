import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import Layout from '../layout/main'
import Landing from '../components/Landing';

class LandingPage extends Base {
  pageName = 'HOME';
  static async getInitialProps({ store, query, isServer, req }) {
    return { isServer };
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

export default withRedux(makeStore, null, null)(LandingPage);
