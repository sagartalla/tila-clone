import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators, selectors } from '../../store/payments';

class Redirect extends Component {
  componentWillReceiveProps(nextProps) {
    if(nextProps.redirect3dSecureUrl) {
      window.location = nextProps.redirect3dSecureUrl;
    }
  }
  componentDidMount() {
    this.props.getRedirect({encryptedString: this.props.encryptedString});
  }
  render() {
    return 'loading...';
  }
}

const mapStateToprops = (store) => ({
  redirect3dSecureUrl: selectors.get3dSecureRedirectionUrl(store),
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getRedirect: actionCreators.getRedirect,
    },
    dispatch,
  );
};

export default connect(mapStateToprops, mapDispatchToProps)(Redirect);
