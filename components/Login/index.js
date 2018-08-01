import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SVGComponent from '../common/SVGComponet';
import { selectors, actionCreators } from '../../store/auth';

import { Row, FormGroup, Col, Button, ControlLabel, Checkbox } from 'react-bootstrap';

import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/Login/login');

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
            <img className={styles['img-responsive']} src="https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/catalog/t_shirt/PTSHC8EXEUJADVLVCX/GALLERY/MEDIAX4Q4MVJ5DCLIHWGUGDW14Z/1-web-desktop-product.jpg"/>
          </div>
        </Col>
        <Col md={6} xs={6}>
          <div>
            <h3 className={styles['fs-40']}>
              <div>
                <span className={`${styles['ff-b']} ${styles['pl-15']}`}>TiLa.com</span>
              </div>
            </h3>
          </div>
          <form className={`${styles['login-form']}  ${styles['pt-30']}`}>
            <FormGroup controlId="formHorizontalEmail">
              <Col md={12}>
                <div className={styles['group']}>
                  <input onChange={this.onChangeField} name="email" type="email" value={this.state.email} required />
                  <span className={styles['highlight']}></span>
                  <span className={styles['bar']}></span>
                  <label>Email</label>
                </div>
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalPassword">
              <Col md={12}>
                <div className={styles['group']}>
                  <input onChange={this.onChangeField} name="password" type="password" value={this.state.password} required />
                  <span className={styles['highlight']}></span>
                  <span className={styles['bar']}></span>
                  <label>Password</label>
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
                      <label>Phone</label>
                    </div>
                  </Col>

              :
              null
            }
             </FormGroup>
            <FormGroup>
              <Col md={12}>
                <Button className={`${styles['sign-in-btn']} ${styles['fontW600']} ${styles['border-radius4']}`} onClick={this.login}>{this.state.mode === 'register' ? 'Sign Up' : 'Sign In'}</Button>
              </Col>
            </FormGroup>
            {
              this.state.error
              ?
              <div className={`${styles['text-center']} ${styles['error-msg']}`}>
                <span>{JSON.stringify(this.state.error)}</span>
              </div>
              :
              null
            }
            <div className={`${styles['login-social-icon']} ${styles['pl-15']}`}>
              <span className={`${styles['thick-gry-clr']} ${styles['pt-20']} ${styles['pb-10']} ${styles['flex']}`}>Or Sign up with</span>
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
                <span>Already have an Accout &nbsp;</span>
                <span className={styles['link-text']} onClick={this.toggleLoginSignUp}>Sign in</span>
              </h4>
            :
            <h4 className={styles['ff-b']}>
              <span>Don't have an Accout &nbsp;</span>
              <span className={styles['link-text']} onClick={this.toggleLoginSignUp}>Sign up</span>
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
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
