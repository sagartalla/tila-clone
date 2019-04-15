import React, {Component} from 'react';
import NoSSR from 'react-no-ssr';
import withRedux from 'next-redux-wrapper';
import { Modal } from "react-router-modal";
import { bindActionCreators } from 'redux';

import makeStore from '../store';
import Base, { baseActions } from './base';
import Layout from '../layout/main';
import Terms from '../components/common/terms';

class ThankyouPage extends Base {
  pageName = 'TERMS';
  render () {
    const {orderId, status} = this.props.url.query;
    const urlParams= { orderId, status };
    return (
      <NoSSR>
        <Layout>
          <Modal className={`react-router-modal__modal`}>
            <Terms />
          </Modal>
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
