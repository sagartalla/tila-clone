import React, {Component} from 'react';
import NoSSR from 'react-no-ssr';
import withRedux from 'next-redux-wrapper';
import { Modal } from "react-router-modal";
import { bindActionCreators } from 'redux';
import FourNotFour from '../components/common/Error/includes/404';
import makeStore from '../store';
import Base, { baseActions } from './base';
import Layout from '../layout/main';
import Terms from '../components/common/terms';

class Temp extends Base {
  pageName = 'TERMS';
  render () {
    const {orderId, status} = this.props.url.query;
    const urlParams= { orderId, status };
    return (
      <NoSSR>
        <Layout>
            <FourNotFour />;
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

export default withRedux(makeStore, null, mapDispatchToProps)(Temp);
