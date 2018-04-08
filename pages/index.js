import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import { getSearchResults } from '../store/search/actions';

class Page extends Component {
  static async getInitialProps({ store }) {
    await store.dispatch(getSearchResults());
  }
  
  render() {
    return (
      <div>
        <div>Prop from Redux</div>
        <div>Prop from getInitialProps {this.props.custom}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allState: state
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSearchResults: getSearchResults,
    },
    dispatch,
  );

export default withRedux(makeStore, mapStateToProps, mapDispatchToProps)(Page);
