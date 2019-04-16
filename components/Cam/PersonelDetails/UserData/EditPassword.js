import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Btn from '../../../common/Button';
import Input from '../../../common/Input';
import { languageDefinations } from '../../../../utils/lang/';
import { actionCreators, selectors } from '../../../../store/cam/personalDetails';
import SVGComponent from '../../../common/SVGComponet';
import lang from '../../../../utils/language';

import styles_en from '../profile_en.styl';
import styles_ar from '../profile_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;

const { EDIT_PASSWORD_MODAL } = languageDefinations();

class EditPassword extends React.Component {

  state = {
    oldPassword: "",
    newPassword: "",
    rePassword: "",
    error: "",
    show: false
  }

  componentWillReceiveProps(nextProps) {
    const { EDIT_PASSWORD_MODAL } = languageDefinations();
    if (nextProps.show) {
      this.setState({
        show: nextProps.show
      })
    }
    if (this.state.show == true) {
      this.setState({
        error: nextProps.errorMessege
      });
    }
    if (nextProps.passwordResetStatus != {} && nextProps.passwordResetStatus.hasOwnProperty('Response') && this.state.show == true) {
      if (nextProps.passwordResetStatus.Response == "SUCCESS") {
        this.setState({ error: "" });
        this.handleClose();
        toast.success(EDIT_PASSWORD_MODAL.PASSWORD_SUCCESS_MESSAGE);
      }
    }

  }

  handleClose = () => {
    const { resetPasswordInfoStore, handleShow } = this.props;
    this.setState({
      show: false,
      oldPassword: "",
      newPassword: "",
      rePassword: "",
      error: ""
    });
    resetPasswordInfoStore();
    handleShow(false, '')();
  }

  handleOldPasswordChange = (e) => {
    this.setState({ oldPassword: e.target.value, error: "" });
  }

  handleNewPasswordChange = (e) => {
    if (e.target.value != this.state.rePassword && this.state.rePassword.length > 0) {
      this.setState({
        error: EDIT_PASSWORD_MODAL.MATCH_ERROR_MESSAGE,
        newPassword: e.target.value
      });
    }
    else if (this.state.rePassword.length > 0 && e.target.value.length == 0) {
      this.setState({
        error: EDIT_PASSWORD_MODAL.MATCH_ERROR_MESSAGE,
        newPassword: e.target.value
      });
    }
    else {
      this.setState({
        error: "",
        newPassword: e.target.value
      });
    }

  }

  handleRePasswordBlur = (e) => {
    if (e.target.value != this.state.newPassword) {
      this.setState({ error: EDIT_PASSWORD_MODAL.MATCH_ERROR_MESSAGE });
    }
    else if (e.target.value == this.state.newPassword) {
      this.setState({ error: "" });
    }
  }

  handleRePasswordChange = (e) => {
    this.setState({
      rePassword: e.target.value
    });
  }

  handleForgotPassword = () => {
    console.log('handleForgotPassword');
  }

  handleSubmit = () => {
    const { EDIT_PASSWORD_MODAL } = languageDefinations();
    const { newPassword, rePassword, oldPassword } = this.state;
    let { error } = this.state;
    if (newPassword.length > 0 && oldPassword.length > 0 && newPassword === rePassword && newPassword !== oldPassword) {
      const passreg = /^([a-zA-Z0-9_-]){8,30}$/;
      const rechPassword = passreg.test(newPassword);
      if (rechPassword) {
        this.props.changePassword({
          current_password: oldPassword,
          new_password: newPassword,
        });
      } else {
        error = EDIT_PASSWORD_MODAL.PASSWORD_LENGTH;
      }
    } else if (newPassword.length === 0 || oldPassword.length === 0 || rePassword.length === 0) {
      error = EDIT_PASSWORD_MODAL.EMPTY_ERROR_MESSAGE;
    } else if (newPassword === oldPassword){
      error = EDIT_PASSWORD_MODAL.SAME_PASSWORD_MESSAGE;
    } else {
      error = EDIT_PASSWORD_MODAL.MATCH_ERROR_MESSAGE;
    }
    this.setState({ error });
  }

  render() {
    let { oldPassword, rePassword, newPassword, error } = this.state;
    let errorComponent = null;
    const { EDIT_PASSWORD_MODAL } = languageDefinations();
    if (error) {
      errorComponent = (
        <div className={`${styles['text-center']} ${styles['error-msg']}`}>
          <span>{error}</span>
        </div>);
    }
    return (
      <div className={styles['editProfileModal']}>
        <h4 className={`${styles['flx-spacebw-alignc']} ${styles['m-0']}`}>
          <span className={styles['lgt-blue']}> {EDIT_PASSWORD_MODAL.HEADING}</span>
          <a onClick={this.handleClose} className={styles['fs-24']}>X</a>
        </h4>
        <div>
          <div className={`${styles['flex-center']} ${styles['flex-colum']} ${styles['personal-info-main']}`}>
            <div className={`${styles['personal-info-img']} ${styles['flex']} ${styles['justify-center']}`}>
              <SVGComponent clsName={`${styles['personal-info-img-icon']}`} src="icons/common-icon/password-lock-icon" />
            </div>
            <p className={`${styles['thick-gry-clr']} ${styles['fs-12']} ${styles['t-c']}`}>{EDIT_PASSWORD_MODAL.PASSWORD_LENGTH_MESSAGE}</p>
          </div>
          <Row>
            {errorComponent}
          </Row>
          <div className={`${styles['m-5']} ${styles['mt-20']} ${styles['flex']} ${styles['flex']} ${styles['flex-colum']}`}>
            <Col xs={12} md={12} className={styles['pb-20']}>
              <div className={styles['fp-input']}>
                <div>{EDIT_PASSWORD_MODAL.ENTER_PASSWORD_MESSAGE}</div>
                <input type="password" value={oldPassword} onChange={this.handleOldPasswordChange} required />
                {/* <input type="text" required /> */}
                {/* <span className={styles['highlight']}></span>
                <span className={styles['bar']}></span>
                <label>{EDIT_PASSWORD_MODAL.ENTER_PASSWORD_MESSAGE}</label> */}
                {/* <span className={styles['error']}>error message</span> */}
              </div>

              {/* <div></div> */}
              {/* <Input placeholder={EDIT_PASSWORD_MODAL.ENTER_PASSWORD_MESSAGE} type="password" val={oldPassword} onChange={this.handleOldPasswordChange} /> */}
            </Col>
            <Col xs={12} md={12} className={styles['pb-20']}>
              <div>{EDIT_PASSWORD_MODAL.ENTER_NEW_PASSWORD_MESSAGE}</div>
              <input type="password" val={newPassword} onChange={this.handleNewPasswordChange} />
            </Col>
            <Col xs={12} md={12} className={styles['pb-20']}>
              <div>{EDIT_PASSWORD_MODAL.RE_ENTER_PASSWORD_MESSAGE}</div>
              <input type="password" val={rePassword} onChange={this.handleRePasswordChange} onBlur={this.handleRePasswordBlur} />
            </Col>
          </div>
          <div>
            <Col xs={12} md={12} className={`${styles['pt-30']}`}>
              <Btn className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-large']} ${styles['update-profile-btn']} ${styles['text-uppercase']}`} btnText={EDIT_PASSWORD_MODAL.SUBMIT_BUTTON} onClick={this.handleSubmit} />
            </Col>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  passwordResetStatus: selectors.getPasswordResetStatus(store),
  errorMessege: selectors.getErrorMessege(store),
  resetPasswordStatus: selectors.resetPasswordStatus(store)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      changePassword: actionCreators.changePassword,
      resetPasswordInfoStore: actionCreators.resetPasswordInfoStore
    },
    dispatch,
  );

EditPassword.propTypes = {
  show: PropTypes.bool,
  handleShow: PropTypes.func.isRequired,
  passwordResetStatus: PropTypes.object,
  errorMessege: PropTypes.string,
  changePassword: PropTypes.func,
  resetPasswordInfoStore: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPassword);
