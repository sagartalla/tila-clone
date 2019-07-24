import React, { Component } from 'react';
import { actionCreators } from '../store/payments';
import withRedux from 'next-redux-wrapper';

import makeStore from '../store';
import ThreeDsecure from '../components/Payments/ThreeDsecure'

class Redirect extends Component {
  render() {
    return <ThreeDsecure encryptedString={this.props.url.query.encryptedString} />
  }
}

export default withRedux(makeStore, null, null)(Redirect);
