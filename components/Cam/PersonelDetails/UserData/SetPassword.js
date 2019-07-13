import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ShowHidePassword from '../../../../components/Login/ShowHidePassword';

import Btn from '../../../common/Button';
import ToastContent from '../../../common/ToastContent';
import { languageDefinations } from '../../../../utils/lang/';
import { actionCreators, selectors } from '../../../../store/cam/personalDetails';
import SVGComponent from '../../../common/SVGComponet';
import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../profile_en.styl';
import styles_ar from '../profile_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { EDIT_PASSWORD_MODAL } = languageDefinations();

class EditPassword extends React.Component {
  state = {
    newPassword: '',
    error: '',
    show: false,
    hide: true,
  }

  componentWillReceiveProps(nextProps) {
    const { EDIT_PASSWORD_MODAL } = languageDefinations();
    if (nextProps.show) {
      this.setState({
        show: nextProps.show,
      });
    }
    if (this.state.show == true) {
      this.setState({
        error: nextProps.errorMessege,
      });
    }
    if (nextProps.passwordResetStatus != {} && nextProps.passwordResetStatus.hasOwnProperty('Response') && this.state.show == true) {
      if (nextProps.passwordResetStatus.Response == 'SUCCESS') {
        this.setState({ error: '' });
        this.handleClose();
        toast(
          <ToastContent
            msg={EDIT_PASSWORD_MODAL.PASSWORD_SUCCESS_MESSAGE}
            msgType='success'
          />
        )
      }
    }
  }

  handleClose = () => {
    const { resetPasswordInfoStore, handleShow } = this.props;
    this.setState({
      show: false,
      newPassword: '',
      error: '',
    });
    resetPasswordInfoStore();
    handleShow(false, '')();
  }

  handleNewPasswordChange = (e) => {
    this.setState({ newPassword: e.target.value, error: '' });
  }
  hideToggle = () => {
    this.setState({
      hide: !this.state.hide,
    });
  }

  handleSubmit = () => {
    const { EDIT_PASSWORD_MODAL } = languageDefinations();
    const { newPassword, rePassword, oldPassword } = this.state;
    let { error } = this.state;
    if (newPassword.length === 0) {
      error = EDIT_PASSWORD_MODAL.EMPTY_ERROR_MESSAGE;
    } else if (newPassword.length < 8) {
      error = 'Password should have alteast 8 characters';
    }
    this.setState({ error });
  }

  render() {
    const {
      newPassword, error, hide,
    } = this.state;
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
        <h4 className={`${styles['fs-18']} ${styles['fontW300']} ${styles['flx-space-bw']} ${styles['m-0']}`}>
          <span className={`${styles['lgt-blue']}`}>Set Password</span>
          <a className={`${styles['fs-22']} ${styles['black-color']}`} onClick={this.handleClose}>X</a>
        </h4>
        <div>
          <div className={`${styles['flex-center']} ${styles['flex-colum']} ${styles['personal-info-main']}`}>
            <div className={`${styles['personal-info-img']} ${styles.flex} ${styles['justify-center']}`}>
              <SVGComponent clsName={`${styles['personal-info-set-img-icon']}`} src="icons/common-icon/setpassword" />
            </div>
          </div>
          <p className={`${styles['thick-gry-clr']} ${styles['fs-12']} ${styles['t-c']}`}>Please set password for your Tila Account</p>
          <Row>
            {errorComponent}
          </Row>
          <div className={`${styles['m-5']} ${styles['mt-20']} ${styles.flex} ${styles.flex} ${styles['flex-colum']}`}>
            <Col xs={12} md={12} className={styles['pb-20']}>
              <div className={`${styles['fp-input']} ${styles.set_show}`}>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={this.handleNewPasswordChange}
                />
                <label>Enter Password</label>
                <ShowHidePassword hide={hide} hideToggle={this.hideToggle} />
              </div>
            </Col>
          </div>
          <div>
            <Col xs={12} md={12} className={`${styles['pt-30']}`}>
              <Btn className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-large']} ${styles['update-profile-btn']} ${styles['text-uppercase']}`} btnText="CONFIRM" onClick={this.handleSubmit} />
            </Col>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  passwordResetStatus: selectors.getPasswordResetStatus(store),
  errorMessege: selectors.getErrorMessege(store),
  resetPasswordStatus: selectors.resetPasswordStatus(store),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePassword: actionCreators.changePassword,
      resetPasswordInfoStore: actionCreators.resetPasswordInfoStore,
    },
    dispatch,
  );

EditPassword.propTypes = {
  handleShow: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPassword);
