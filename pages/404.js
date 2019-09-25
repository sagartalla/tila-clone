import React from 'react';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';

import makeStore from '../store';
import Base, { baseActions } from './base';

import Layout from '../layout/main';
import HeaderBar from '../components/HeaderBar/index';
import FourNotFour from '../components/common/Error/includes/404';


class PageNotFound extends Base {
  render() {
    return (
      <Layout>
        <HeaderBar hideMegamenu={true}/>
        <FourNotFour />
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  allState: state,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...baseActions,
    },
    dispatch,
  );

export default withRedux(makeStore, mapStateToProps, mapDispatchToProps)(PageNotFound);
