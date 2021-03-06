import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';
import { Modal } from 'react-router-modal';
import { languageDefinations } from '../../utils/lang';
import { actionCreators, selectors } from '../../store/auth';
import SVGComponent from '../common/SVGComponet';
import Button from '../common/CommonButton';
import lang from '../../utils/language';
import ShowHidePassword from './ShowHidePassword';
import FormValidator from '../common/FormValidator';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './login_en.styl';
import styles_ar from './login_ar.styl';
import HeaderBar from '../HeaderBar';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { LOGIN_PAGE } = languageDefinations();
class ResetPasswordMain extends Component {
  constructor(props) {
    super(props);
    this.validations = new FormValidator([
      {
        field: 'password',
        method: this.emptyValue,
        message: LOGIN_PAGE.PASSWORD_SHOULD_NOT_BE_EMPTY,
        validWhen: false,
      },
      {
        field: 'password',
        method: this.passwordValidation,
        validWhen: false,
        message: LOGIN_PAGE.PASSWORD_MUST_BE_ATLEASE_EIGHT_CHARACTERS,
      },
    ]);
    this.state = {
      password: '',
      hide: true,
      errorMsg: false,
      validation: this.validations.valid(),
    };
    this.passwordSuccess = this.passwordSuccess.bind(this);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }


  handleValidation = ({ target }) => {
    const validation = this.validations.validateOnBlur({ [target.name]: target.value });
    this.setState({ validation });
  }

  emptyValue = fieldValue => fieldValue === '';

  passwordValidation = (fieldValue) => {
    if (fieldValue && fieldValue.length >= 8) return false;
    return true;
  }

  hideToggle = () => {
    this.setState({
      hide: !this.state.hide,
    });
  }


  passwordSuccess() {
    const { password } = this.state;
    const validation = this.validations.validate(this.state);
    const { resetToken } = this.props;
    if (validation.isValid) {
      const body = {
        password,
        token: resetToken || this.props.token,
      };
      this.props.resetPassword(body).then((res) => {
        if (res && res.value && res.value.status && res.value.status === 200) {
          const data = { currentFlow: 'forgot_password_reset', nextPage: 'thank_you' };
          const { v2CurrentFlow } = this.props;
          v2CurrentFlow(data);
        }
      });
    }
    this.setState({
      validation,
    });
  }
  render() {
    const {
      password, hide, validation,
    } = this.state;
    const { showCrossButton, loadingStatus } = this.props;
    return (
      <React.Fragment>
        {showCrossButton &&
        <div className={`${styles.flex} ${styles['align-center']} ${styles['justify-between']} ${styles['flex-row']}`}>
          <div className={`${styles.flex} ${styles['mt-10']} ${styles.pointer}`} onClick={this.props.onBackdropClick}>
                <SVGComponent clsName={`${styles['cross-icon']}`} src="icons/common-icon/cross-button" />
              </div>
        </div>}
        <div className={`${styles.flex}`}>
          <Col md={8} xs={12} sm={8} className={`${styles['bg-white']} ${styles.width100} ${styles['border-radius4']}`}>
            <div className={`${styles['reset-password']} ${styles.flex} ${styles['justify-between']} ${styles['flex-colum']}`}>
                <div className={`${styles['reset-main']} ${styles['m-0']} ${styles['flex-center']} ${styles['justify-around']} ${styles['p-10']} ${styles.width100}`}>
                  <div className={`${styles['fs-20']} ${styles.width35}`}>{LOGIN_PAGE.RESET_PASSWORD}</div>
                  <div className={`${styles.flex}`}><SVGComponent clsName={`${styles['reset-password-icon']}`} src="icons/common-icon/reset-password" /></div>
                </div>
                <h4 className={`${styles['fs-16']} ${styles.fontW600}`}>
                  {LOGIN_PAGE.PLEASE_SET_YOUR_SECURE_PASSWORD}
                </h4>
                <div className={`${styles['mt-15']} ${styles.relative} ${styles.reset_show} ${styles['fp-input']}`}>
                  <input
                    type={hide ? 'password' : 'text'}
                    autoComplete="off"
                    name="password"
                    value={password}
                    className={`${styles.width100}`}
                    onChange={this.onChange}
                    onBlur={this.handleValidation}
                    required
                  />
                  <label className={`${styles['label-light-grey']}`}>{LOGIN_PAGE.ENTER_NEW_PASSWORD}</label>
                  <ShowHidePassword hide={hide} hideToggle={this.hideToggle} />
                  {
                    validation.password && validation.password.isInValid ?
                      <div>
                        <span className={`${styles['error-msg']}`}>{validation.password.message}</span>
                      </div> : null
                   }
                </div>
                <Button
                  className={`${styles['flex-center']} ${styles.width100} ${styles['fs-14']} ${styles['text-uppercase']} ${styles['button-radius']}`}
                  onClick={this.passwordSuccess}
                  btnLoading={loadingStatus}
                  btnText={LOGIN_PAGE.NEXT}
                />
              </div>
          </Col>
        </div>
      </React.Fragment>

    );
  }
}

const mapStateToProps = store => ({
  resetToken: selectors.resetToken(store),
  loadingStatus: selectors.getLoadingStatus(store),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    resetPassword: actionCreators.resetPassword,
    resetShowLogin: actionCreators.resetShowLogin,
    v2CurrentFlow: actionCreators.v2CurrentFlow,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordMain);
