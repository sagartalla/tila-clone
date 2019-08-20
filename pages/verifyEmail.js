import React from 'react';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store/auth';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import Base, { baseActions } from './base';
import HeaderBar from '../components/HeaderBar/index';
import FooterBar from '../components/Footer';
import Layout from '../layout/main';

class VerifyEmail extends Base {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
    };
  }
  pageName = 'VERIFYEMAIL';
  componentDidMount() {
    debugger;
    Base.prototype.componentDidMount();
    let token = this.props.url.query.token;
    this.props.verifyEmailByLink(token);
  }

  render() {
    const { token } = this.state;
    return (
      <Layout>
        <HeaderBar />
        <FooterBar />
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...baseActions,
      verifyEmailByLink: actionCreators.verifyEmailByLink,
    },
    dispatch,
  );

export default withRedux(makeStore, null, mapDispatchToProps)(VerifyEmail);
