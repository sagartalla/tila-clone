import React from 'react';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import Base, { baseActions } from './base';
import ResetPassword from '../components/Login/ResetPassword';
import Layout from '../layout/main';

class ResetPasswordPage extends Base {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
    };
  }
  pageName = 'RESETPASSWORD';
  componentDidMount() {
    let token = this.props.url.query.token;
    this.setState({
      token,
    });
  }

  render() {
    const { token } = this.state;
    return (
      <Layout>
        <ResetPassword token={token} />
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...baseActions,
    },
    dispatch,
  );

export default withRedux(makeStore, null, mapDispatchToProps)(ResetPasswordPage);
