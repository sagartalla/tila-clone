import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectors, actionCreators } from '../../store/auth';

import { FormGroup, Col, Button, FormControl, ControlLabel, Checkbox } from 'react-bootstrap';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
    this.login = this.login.bind(this);
    this.onChangeField = this.onChangeField.bind(this);
  }

  login() {
    const { email, password } = this.state;
    this.props.userLogin({
      username: email,
      password: password,
    });
  }
  
  componentDidMount() {
    this.props.getLoginInfo();
  }

  componentWillReceiveProps(nextProps) {
    let { userCreds } = nextProps;
    userCreds = userCreds || this.props.userCreds 
    this.setState({
      error: nextProps.error,
      email: userCreds.username,
      password: userCreds.password,
    });
  }

  onChangeField(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { userCreds } = this.props;
    return (
      <form>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl onChange={this.onChangeField} name="email" type="email" placeholder="Email" value={this.state.email} />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl onChange={this.onChangeField} name="password" type="password" placeholder="Password" value={this.state.password} />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button onClick={this.login}>Sign in</Button>
          </Col>
        </FormGroup>
        {
          this.state.error
          ?
          <div>
            <span>{JSON.stringify(this.state.error)}</span>
          </div>
          :
          null 
        }
      </form>
    );
  }
}

const mapStateToProps = (store) => {
  return ({
    error: selectors.getErrorMessege(store),
    userCreds: selectors.getUserCreds(store)
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { 
      userLogin: actionCreators.userLogin,
      getLoginInfo: actionCreators.getLoginInfo,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
