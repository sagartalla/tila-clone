import React from 'react';
import NoSSR from 'react-no-ssr';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';

import makeStore from '../store';
import { selectors } from '../store/compare';
import Base, { baseActions } from './base';
import Layout from '../layout/main';
import Compare from '../components/Compare';

class ComparePage extends Base {
  pageName = 'COMPARE';

  componentDidMount() {
    const { compareInfo } = this.props;
    if (!compareInfo.compareCount) {
      window.location = '/';
    }
  }

  render() {
    return (
      <NoSSR>
        <Layout>
          <Compare />
        </Layout>
      </NoSSR>
    );
  }
}

const mapStateToProps = store => ({
  compareInfo: selectors.getCompareInfo(store),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...baseActions,
    },
    dispatch,
  );

export default withRedux(makeStore, mapStateToProps, mapDispatchToProps)(ComparePage);
