import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SVGComponent from '../common/SVGComponet';
import { selectors, actionCreators } from '../../store/auth';
import constants from '../../constants';
import { Row, FormGroup, Col, Button, ControlLabel, Checkbox } from 'react-bootstrap';

import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/Login/login');
import {languageDefinations} from '../../utils/lang';
const {LOGIN_PAGE} = languageDefinations()

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      email: '',
      password: '',
      mode: props.mode || 'login',
      country: '',
      phone: '',
    };
    this.login = this.login.bind(this);
    this.onChangeField = this.onChangeField.bind(this);
    this.toggleLoginSignUp = this.toggleLoginSignUp.bind(this);
  }

  login() {
    const { email, password, phone, country } = this.state;
    if(this.state.mode === 'register') {
      this.props.userRegister({
        email,
        password: password,
        mobile_no: phone,
        mobile_country_code: country,
        rememberMe: true,
      });
    } else {
      this.props.userLogin({
        username: email,
        password: password,
        rememberMe: true,
      });
    }
    this.props.resetLoginError();
  }

  componentDidMount() {
    this.props.getLoginInfo();
  }

  componentWillReceiveProps(nextProps) {
    let { userCreds, error } = nextProps;
    userCreds = userCreds || this.props.userCreds
    if(error){
      this.setState({
        error
      });
      return;
    }
    this.setState({
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

  toggleLoginSignUp() {
    this.setState({
      ...this.state,
      mode: this.state.mode === 'login' ? 'register' : 'login'
    });
  }

  render() {
    const { userCreds } = this.props;
    return (
      <Row className={`${styles['bg-white']} ${styles['m-0']}`}>
        <Col md={6} xs={6} className={styles['pl-0']}>
          <div className={styles['image-placeholder']}>
            <img className={styles['img-responsive']} src={`${constants.mediaDomain}/pim/15f45930-fecf-4f7b-a3d6-613d41196c20/workbench/image/a1ccb74a-1858-42dd-8c38-cfb103e85bb2/login-screen.jpeg`}/>
          </div>
        </Col>
        <Col md={6} xs={6}>
          <div>
            <h3 className={styles['fs-40']}>
              <div>
                <span className={`${styles['ff-b']} ${styles['pl-15']}`}>{LOGIN_PAGE.TILA_COM}</span>
              </div>
            </h3>
          </div>
          {
            this.state.error
            ?
            <div className={`${styles['text-center']} ${styles['error-msg']}`}>
              <span>{JSON.stringify(this.state.error)}</span>
            </div>
            :
            null
          }
          <form className={`${styles['login-form']}`}>
            <FormGroup controlId="formHorizontalEmail">
              <Col md={12}>
                <div className={styles['group']}>
                  <input onChange={this.onChangeField} name="email" type="email" value={this.state.email} required />
                  <span className={styles['highlight']}></span>
                  <span className={styles['bar']}></span>
                  <label>{LOGIN_PAGE.EMAIL}</label>
                </div>
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalPassword">
              <Col md={12}>
                <div className={styles['group']}>
                  <input onChange={this.onChangeField} name="password" type="password" value={this.state.password} required />
                  <span className={styles['highlight']}></span>
                  <span className={styles['bar']}></span>
                  <label>{LOGIN_PAGE.PASSWORD}</label>
                </div>
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalCountry">
                <Col md={2} xs={2} className={styles['pr-0']}>
            {
              this.state.mode === 'register'
              ?

                  <div className={styles['group']}>
                    <input onChange={this.onChangeField} name="country" type="text" value={this.state.country} required />
                    <span className={styles['highlight']}></span>
                    <span className={styles['bar']}></span>
                    <label>+91</label>
                  </div>

              :
              null
            }
                 </Col>
            {
              this.state.mode === 'register'
              ?

                  <Col md={9} xs={10} mdOffset={1}>
                    <div className={styles['group']}>
                      <input onChange={this.onChangeField} name="phone" type="text" value={this.state.phone} required />
                      <span className={styles['highlight']}></span>
                      <span className={styles['bar']}></span>
                      <label>{LOGIN_PAGE.PHONE}</label>
                    </div>
                  </Col>

              :
              null
            }
             </FormGroup>
            <FormGroup>
              <Col md={12}>
                <Button className={`${styles['sign-in-btn']} ${styles['fontW600']} ${styles['border-radius4']}`} onClick={this.login}>{this.state.mode === 'register' ? `${LOGIN_PAGE.SIGN_UP}` : `${LOGIN_PAGE.SIGN_IN}`}</Button>
              </Col>
            </FormGroup>
            <div className={`${styles['login-social-icon']} ${styles['pl-15']}`}>
              <span className={`${styles['thick-gry-clr']} ${styles['pt-20']} ${styles['pb-10']} ${styles['flex']}`}>{LOGIN_PAGE.SIGN_UP_WITH}</span>
              <div className={styles['flex']}>
                <a className={styles['flex']}><SVGComponent clsName={`${styles['bg-social-icon']} ${styles['mr-10']}`} src="icons/social-icons/bg-facebook"/></a>
                <a className={styles['flex']}><SVGComponent clsName={`${styles['bg-social-icon']} ${styles['mr-10']}`} src="icons/social-icons/bg-google"/></a>
                <a className={styles['flex']}><SVGComponent clsName={`${styles['bg-social-icon']} ${styles['mr-10']}`} src="icons/social-icons/bg-twitter"/></a>
                <a className={styles['flex']}><SVGComponent clsName={`${styles['bg-social-icon']}`} src="icons/social-icons/bg-instagram"/></a>
              </div>
            </div>
          </form>
          <div className={styles['pl-15']}>
          {
            this.state.mode === 'register'
            ?
              <h4 className={styles['ff-b']}>
                <span>{LOGIN_PAGE.HAVE_ACCOUNT}&nbsp;</span>
                <span className={styles['link-text']} onClick={this.toggleLoginSignUp}>{LOGIN_PAGE.SIGN_IN}</span>
              </h4>
            :
            <h4 className={styles['ff-b']}>
              <span>{LOGIN_PAGE.NO_ACCOUNT} &nbsp;</span>
              <span className={styles['link-text']} onClick={this.toggleLoginSignUp}>{LOGIN_PAGE.SIGN_UP}</span>
            </h4>
          }
          </div>

        </Col>
      </Row>
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
      userRegister: actionCreators.userRegister,
      getLoginInfo: actionCreators.getLoginInfo,
      resetLoginError: actionCreators.resetLoginError,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
