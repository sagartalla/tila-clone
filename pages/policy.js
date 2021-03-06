import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NoSSR from 'react-no-ssr';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import Layout from '../layout/main';
import Policy from '../components/Policy';
import Base, { baseActions } from './base';
import { actionCreators as landingactionCreators } from '../store/landing';

class PolicyPage extends Base {
  pageName = 'POLICY';
  static async getInitialProps({ store, query, isServer, req }) {
    let params = {};
    if (query.name) {
      params.page = 'policyPage';
      params.id = query.name;
    }
    await store.dispatch(landingactionCreators.getPage(params));
    return { isServer };
  }

  componentDidMount() {
    document.querySelectorAll('script[id*=eval-script]').forEach((ele) => {
      window.eval(ele.innerHTML);
    });
  }

  render() {
    const { url } = this.props;
    return (
      <div>
        <Layout>
          <Policy query={url.query} key={url.query.name}/>
        </Layout>
      </div>
    );
  }
};


const mapStatetoProps = (state) => {
  return {
    allState: state,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...baseActions,
    },
    dispatch,
  );

export default withRedux(makeStore, mapStatetoProps, mapDispatchToProps)(PolicyPage);
