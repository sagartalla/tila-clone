import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col } from 'react-bootstrap';
import Btn from '../common/Button';
import { languageDefinations } from '../../utils/lang';
import { actionCreators } from '../../store/cam/personalDetails';
import SVGComponent from '../common/SVGComponet';

import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './login_en.styl';
import styles_ar from './login_ar.styl';
import HeaderBar from '../HeaderBar';
import ShowHidePassword from './ShowHidePassword';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const { LOGIN_PAGE } = languageDefinations();

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      password: '',
      confirmPassword: '',
      hide: true,
    };
    this.passwordSuccess = this.passwordSuccess.bind(this);
  }

    onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }

    hideToggle = () => {
      this.setState({
        hide: !this.state.hide,
      })
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
      const { password, confirmPassword, hide } = this.state;
      return (
        <div>
          <HeaderBar hideLogin hideMegamenu hideSearch/>
            {!this.state.success ?
              <div className={`${styles.flex} ${styles['justify-center']} ${styles['ht-100vh']} ${styles['flex-center']} ${styles['bg-gray']}`}>
              <div className={styles['reset-password']}>
                <div className={`${styles['fs-30']}`}><b>{LOGIN_PAGE.RESET_PASSWORD}</b></div>
                <div className={`${styles['light-gray']} ${styles['fs-16']}`}>
                {LOGIN_PAGE.PLEASE_SET_YOUR_SECURE_PASSWORD}
                </div>
                <form>
                <div className={`${styles['mt-15']} ${styles.relative}`}>
                    <label className={`${styles['lgt-blue']}`}>{LOGIN_PAGE.ENTER_YOUR_NEW_PASSWORD}</label>
                    <div className={`${styles['reset_show']}`}>
                    <input
                      type={hide ? 'password' : 'text'}
                      name="password"
                      className={`${styles.width100}`}
                      placeholder={LOGIN_PAGE.PASSWORD}
                      value={password}
                      onChange={this.onChange}
                      required
                    />
                    <ShowHidePassword hide={hide} hideToggle={this.hideToggle}/>
                    </div>
                </div>
                <div className={`${styles['mt-15']}`}>
                    <label className={`${styles['lgt-blue']}`}>{LOGIN_PAGE.CONFIRM_YOUR_NEW_PASSWORD}</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder={LOGIN_PAGE.CONFIRM_PASSWORD}
                      value={confirmPassword}
                      onChange={this.onChange}
                      required
                    />
                </div>
                </form>
                <Col xs={12} md={12} className={`${styles['p-0']} ${styles['pt-30']}`}>
                    <Btn className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-large']} ${styles['update-profile-btn']} ${styles['text-uppercase']}`} btnText={LOGIN_PAGE.SAVE_PASSWORD} onClick={this.passwordSuccess} />
                </Col>
              </div>
              </div>
            :
                <div className={`${styles.flex} ${styles['justify-center']} ${styles['ht-100vh']} ${styles['flex-center']} ${styles['flex-col']} ${styles['bg-gray']}`}>
                <div className={`${styles['reset-password']} ${styles.flex} ${styles['justify-center']} ${styles['flex-center']} ${styles['flex-col']} ${styles['ht-240']}`}>
                    <Col xs={12} md={12} className={`${styles['flex-center']} ${styles['tickmark-part']}`}>
                        <SVGComponent clsName={`${styles['tickmark-icon']}`} src="icons/common-icon/bg-tick-mark" />
                    </Col>
                    <h2 className={styles['text-center']}><b>{LOGIN_PAGE.PASSWORD_RESET_SUCCESSFULL}</b></h2>
                    </div>
                </div>
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
