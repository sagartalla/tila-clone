import React from 'react';
import PropTypes from 'prop-types';
import { setCookie } from './CookieMethods';

export default class Login extends React.Component{

  static propTypes = {
    hideOverlayScreen: PropTypes.func.isRequired
  }

  constructor(props){
    super(props);
    this.state = {
      "auth_version": "V1",
      "password": "",
      "type": "CUSTOMER",
      "username": "",
      "loading": false,
      "errorMsg": ''
    }
  }

  setCookieWithRes = (res) => {
    for(let token in res){
      setCookie(token, res[token], 7)
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin = () => {
    this.setState({
      loading: true,
      errorMsg: ''
    })

    const serverData = {...this.state};
    delete serverData.loading;
    delete serverData.errorMsg;

    fetch('http://authapis-dev.fptechscience.com/api/v1/login/basic', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(serverData)
    }).then(res => {
      if(res.ok) return res.text()
      else throw new Error(res.statusText)
    }).then(res => {
      this.setState({
        loading: false
      })
      this.handlePostLogin(JSON.parse(res));
      
    }).catch(err => {
      this.setState({
        loading: false,
        errorMsg: err.toString()
      })
    });
  }

  handlePostLogin = (res) => {
    this.setCookieWithRes(res);
    this.props.hideOverlayScreen();
  }
  
  

  render(){
    return(
      <div style={loginContainer}>
        <div style={headingContainer}>
          <h1 style={{margin: '10px 0px'}}>lite.com</h1>
          <h3 style={{margin: '10px 0px'}}>Where Saudi Shops Online</h3>
          <h4 style={{margin: '10px 0px'}}>Sign In for great offers and deals</h4>
        </div>
        <div style={inputContainer}>
          <label style={labelStyle}>Enter your email id</label>
          <input type='text' name="username" onChange={this.handleChange} value={this.state.username} style={inputStyle} />
        </div>
        <div style={inputContainer}>
          <label style={labelStyle}>Enter your password</label>
          <input type='password' name="password" onChange={this.handleChange} value={this.state.password} style={inputStyle} />
        </div>
        <div style={inputContainer}>
          <button style={{...loginButton, opacity: this.state.loading ? '0.75' : '1'}} disabled={this.state.loading} onClick={this.handleLogin}>Sign In</button>
        </div>
        <div style={errorStyle}>
          {this.state.errorMsg}
        </div>
      </div>
    )
  }
}

const loginContainer = {
  display: 'flex',
  minHeight: '500px',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
}

const headingContainer = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center'
}

const inputContainer = {
  display: 'flex',
  width: '300px',
  justifyContent: 'center',
  flexDirection: 'column',
  margin: '20px 10px'
}

const labelStyle = {
  textAlign: 'center',
  fontSize: '12px',
  color: '#ccc'
}

const inputStyle = {
  width: '100%',
  height: '30px',
  fontSize: '16px',
  fontWeight: '600',
  textAlign: 'center',
  border: 'none',
  outline: 'none',
  borderBottom: '1px solid #ccc'
}

const loginButton = {
  backgroundColor: '#1057B7',
  border: 'none',
  outline: 'none',
  color: '#fff',
  margin: '5px 5px',
  borderRadius: '50px',
  padding: '5px 15px',
  fontSize: '14px',
  height: '30px',
}

const errorStyle = {
  fontSize: '12px',
  color: 'red',
  height: '10px'
}