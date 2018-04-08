import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import { actionCreaters }  from '../store/search';

class Page extends Component {
  static async getInitialProps({ store }) {
    await store.dispatch(actionCreaters.getSearchResults());
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
      getSearchResults: actionCreaters.getSearchResults,
    },
    dispatch,
  );

export default withRedux(makeStore, mapStateToProps, mapDispatchToProps)(Page);
