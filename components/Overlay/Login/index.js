import React from 'react';
import PropTypes from 'prop-types';
import { setCookie } from './CookieMethods';
import style from './login.styl';

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      auth_version: 'V1',
      password: '',
      type: 'CUSTOMER',
      username: '',
      loading: false,
      errorMsg: '',
    }
  }

  setCookieWithRes = (res) => {
    for(let token in res){
      setCookie(token, res[token], 7)
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleLogin = () => {
    this.setState({
      loading: true,
      errorMsg: '',
    });

    const serverData = { ...this.state };
    delete serverData.loading;
    delete serverData.errorMsg;

    fetch('http://authapis-dev.fptechscience.com/api/v1/login/basic', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(serverData),
    }).then((res) => {
      if (res.ok) return res.text();
      throw new Error(res.statusText);
    }).then((res) => {
      this.setState({
        loading: false,
      });
      this.handlePostLogin(JSON.parse(res));
    }).catch((err) => {
      this.setState({
        loading: false,
        errorMsg: err.toString(),
      });
    });
  }

  handlePostLogin = (res) => {
    this.setCookieWithRes(res);
    this.props.hideOverlayScreen();
  }

  render() {
    return (
      <form className={style['loginContainer']} onSubmit={this.handleLogin}>
        <div className={style['headingContainer']}>
          <h1 style={{margin: '10px 0px'}}>lite.com</h1>
          <h3 style={{margin: '10px 0px'}}>Where Saudi Shops Online</h3>
          <h4 style={{margin: '10px 0px'}}>Sign In for great offers and deals</h4>
        </div>
        <div className={style['inputContainer']}>
          <label className={style['labelStyle']}>Enter your email id</label>
          <input type='text' name="username" onChange={this.handleChange} value={this.state.username} className={style['inputStyle']} />
        </div>
        <div className={style['inputContainer']}>
          <label className={style['labelStyle']}>Enter your password</label>
          <input type='password' name="password" onChange={this.handleChange} value={this.state.password} className={style['inputStyle']} />
        </div>
        <div className={style['inputContainer']}>
          <input type='submit' className={style['loginButton']}style={{opacity: this.state.loading ? '0.75' : '1'}} disabled={this.state.loading} onClick={this.handleLogin} value='Sign In' />
        </div>
        <div className={style['errorStyle']}>
          {this.state.errorMsg}
        </div>
      </form>
    )
  }
}

Login.propTypes = {
  hideOverlayScreen: PropTypes.func.isRequired,
};