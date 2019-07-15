import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import ShowHidePassword from '../../../../components/Login/ShowHidePassword';
import Button from '../../../common/CommonButton';

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

const { EDIT_PASSWORD_MODAL, LOGIN_PAGE, CONTACT_INFO_MODAL } = languageDefinations();


const MobileImage = () => (
  <div>
    <div className={`${styles['mobile-tick-icon']} ${styles.flex} ${styles['justify-center']}`}>
      <SVGComponent
        clsName={styles['setpasword-mobiletick-icon-styl']}
        src="icons/common-icon/mobile-tick-icon"
      />
    </div>
  </div>
);
class EditPassword extends React.Component {
  state = {
    newPassword: '',
    oldPassword: '',
    error: '',
    show: false,
    hide: true,
    showSuccess: false,
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
        this.setState({ error: '', showSuccess: true });
        // this.handleClose();
        toast(<ToastContent
          msg={EDIT_PASSWORD_MODAL.PASSWORD_SUCCESS_MESSAGE}
          msgType="success"
        />);
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
    } else {
      this.props.changePassword({
        current_password: oldPassword,
        new_password: newPassword,
      });
    }
    this.setState({ error });
  }

  render() {
    const {
      newPassword, error, hide, showSuccess,
    } = this.state;
    const { isLoading } = this.props;
    let errorComponent = null;
    if (error) {
      errorComponent = (
        <div className={`${styles['text-center']} ${styles['error-msg']}`}>
          <span>{error}</span>
        </div>);
    }
    return (
      <div className={styles.editProfileModal}>
        <h4 className={`${styles['fs-18']} ${styles.fontW300} ${styles['flx-space-bw']} ${styles['m-0']}`}>
          <span className={`${styles['lgt-blue']}`}>{showSuccess ? '' : 'Set Password'}</span>
          <a className={`${styles['fs-22']} ${styles['black-color']}`} onClick={this.handleClose}>X</a>
        </h4>
        {showSuccess ?
          <React.Fragment>
            <MobileImage />
            <div className={`${styles['p-20']} ${styles['flex-center']} ${styles['flex-colum']}`}>
              <div className={`${styles['m-0']} ${styles['pb-10']} ${styles['fs-20']} ${styles.fontW600}`}>{EDIT_PASSWORD_MODAL.THANK_YOU}</div>
              <div className={`${styles['t-c']}`}>
                <div className={`${styles['pb-10']} ${styles['fs-14']} ${styles['thick-gry-clr']}`}>{EDIT_PASSWORD_MODAL.PASSWORD_UPDATE_SUCCESS}</div>
                <div className={`${styles['fs-14']} ${styles['thick-gry-clr']}`}>{EDIT_PASSWORD_MODAL.YOU_CAN_LOGIN_WITH_PASSWORD}</div>
              </div>
            </div>

            <div className={`${styles['pt-40']}`}>
              <Button
                className={`${styles.flex} ${styles['update-profile-btn']} ${styles.width100} ${styles.fontW600} ${styles['text-uppercase']}`}
                btnText={CONTACT_INFO_MODAL.DONE}
                onClick={this.handleClose}
              />
            </div>
          </React.Fragment>
          :
          <div>
            <div className={`${styles['flex-center']} ${styles['flex-colum']} ${styles['personal-info-main']}`}>
              <div className={`${styles['personal-info-img']} ${styles.flex} ${styles['justify-center']}`}>
                <SVGComponent clsName={`${styles['personal-info-set-img-icon']}`} src="icons/common-icon/setpassword" />
              </div>
            </div>
            <p className={`${styles['thick-gry-clr']} ${styles['fs-12']} ${styles['t-c']}`}>{EDIT_PASSWORD_MODAL.PASSWORD_TILA_ACCOUNT}</p>
            <Row>
              {errorComponent}
            </Row>
            <div className={`${styles['mt-40']} ${styles.relative} ${styles.set_show} ${styles['fp-input']}`}>
              <input
                type={hide ? 'password' : 'text'}
                required
                value={newPassword}
                onChange={this.handleNewPasswordChange}
              />
              <label className={`${styles['label-light-grey']}`}>{LOGIN_PAGE.ENTER_PASSWORD}</label>
              {/* <ShowHidePassword hide={hide} hideToggle={this.hideToggle} /> */}
            </div>
            <div className={`${styles['pt-40']}`}>
              <Button
                className={`${styles.flex} ${styles['update-profile-btn']} ${styles.width100} ${styles.fontW600} ${styles['text-uppercase']}`}
                btnText={EDIT_PASSWORD_MODAL.CONFIRM}
                btnLoading={isLoading}
                onClick={this.handleSubmit}
              />
            </div>
          </div>}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  passwordResetStatus: selectors.getPasswordResetStatus(store),
  errorMessege: selectors.getErrorMessege(store),
  resetPasswordStatus: selectors.resetPasswordStatus(store),
  isLoading: selectors.getLoadingStatus(store),
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
  isLoading: PropTypes.bool,
};
EditPassword.defaultProps = {
  handleShow: f => f,
  isLoading: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPassword);
