import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import Layout from '../layout/main'
import Policy from '../components/Policy';
import Base, { baseActions } from './base';
import { actionCreators, selectors } from '../store/landing';

class PolicyPage extends Base {
  pageName = 'POLICY';
  static async getInitialProps({ store, query, isServer, req }) {
    // await store.dispatch(actionCreators.getPages());
    return { isServer };
  }

  render() {
    console.log('PolicyPage')
    const { url } = this.props;
    return (
      <div>
        <Layout>
          <Policy query={url.query} />
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
      getPages: actionCreators.getPages,
    },
    dispatch,
  )

export default withRedux(makeStore, mapStatetoProps, mapDispatchToProps)(PolicyPage);
