import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NoSSR from 'react-no-ssr';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import Layout from '../layout/main'
import Policy from '../components/Policy';
import Base, { baseActions } from './base';

class PolicyPage extends Base {
  pageName = 'POLICY';
  static async getInitialProps({ store, query, isServer, req }) {
    // await store.dispatch(actionCreators.getPage());
    return { isServer };
  }

  render() {
    const { url } = this.props;
    return (
      <div>
        <Layout>
          <NoSSR>
            <Policy query={url.query} key={url.query.name}/>
          </NoSSR>
        </Layout>
      </div>
    )
  }
};


const mapStatetoProps = (state) => {
  return {
    allState: state,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...baseActions,
    },
    dispatch,
  )

export default withRedux(makeStore, mapStatetoProps, mapDispatchToProps)(PolicyPage);
