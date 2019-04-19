import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Btn from '../common/Button';
import { Col } from 'react-bootstrap';
import { languageDefinations } from '../../utils/lang';
import { actionCreators } from '../../store/cam/personalDetails';
import SVGComponent from '../common/SVGComponet';

import lang from '../../utils/language';

import styles_en from './login_en.styl';
import styles_ar from './login_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;

const { LOGIN_PAGE } = languageDefinations();

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      password: '',
      confirmPassword: '',
    };
    this.passwordSuccess = this.passwordSuccess.bind(this);
  }

    onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }

    passwordSuccess() {
      const { password, confirmPassword } = this.state;
      if (password === confirmPassword) {
        const body = {
          'password': password,
          'token': this.props.token
        };
        this.props.resetPassword(body).then((res) => {
          if (res && res.value && res.value.data && res.value.data.Response === 'SUCCESS') {
            this.setState({ success: true });
          } else {
            this.setState({ success: false });
          }
        });
      } else {
        alert('Passwords do not match');
        this.setState({
          password: '',
          confirmPassword: '',
        });
      }
    }

    render() {
      const { password, confirmPassword } = this.state;
      return (
            <div>
            {!this.state.success ?
              <div className={styles['forgot-password']}>
                <h2><b>{LOGIN_PAGE.RESET_PASSWORD}</b></h2>
                <h3 className={styles['bg-light-gray']}>
                {LOGIN_PAGE.PLEASE_SET_YOUR_SECURE_PASSWORD}
                </h3>
                <form>
                <div>
                    <label>{LOGIN_PAGE.ENTER_YOUR_NEW_PASSWORD}</label>
                    <input
                      type="password"
                      name="password"
                      placeholder={LOGIN_PAGE.PASSWORD}
                      value={password}
                      onChange={this.onChange}
                      required
                    />
                </div>
                <div>
                    <label>{LOGIN_PAGE.CONFIRM_YOUR_NEW_PASSWORD}</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder={LOGIN_PAGE.CONFIRM_PASSWORD}
                      value={confirmPassword}
                      onChange={this.onChange}
                      required
                    />
                </div>
                <Col xs={12} md={12} className={`${styles['pt-30']}`}>
                    <Btn className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-large']} ${styles['update-profile-btn']} ${styles['text-uppercase']}`} btnText={LOGIN_PAGE.SAVE_PASSWORD} onClick={this.passwordSuccess} />
                </Col>
                </form>
              </div>
            :
                <>
                    <Col xs={12} md={12} className={`${styles['flex-center']} ${styles['tickmark-part']}`}>
                        <SVGComponent clsName={`${styles['tickmark-icon']}`} src="icons/common-icon/bg-tick-mark" />
                    </Col>
                    <h2 className={styles['text-center']}><b>{LOGIN_PAGE.PASSWORD_RESET_SUCCESSFULL}</b></h2>
                </>
            }
            </div>
      );
    }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      resetPassword: actionCreators.resetPassword,
    },
    dispatch,
  );
}

export default connect(null, mapDispatchToProps)(ResetPassword);
