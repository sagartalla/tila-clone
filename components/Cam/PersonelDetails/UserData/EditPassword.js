import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Btn from '../../../common/Button';
import Input from '../../../common/Input';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../../store/cam/personalDetails';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Cam/PersonelDetails/profile');

class EditPassword extends React.Component {

  state = {
    oldPassword: "",
    newPassword: "",
    rePassword: "",
    error: "",
    show: false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      this.setState({
        show: nextProps.show
      })
    }
    if (this.state.show == true && nextProps.errorMessege != this.state.error) {
      this.setState({
        error: nextProps.errorMessege
      });
    }
    if (nextProps.passwordResetStatus != {} && nextProps.passwordResetStatus.hasOwnProperty('Response') && this.state.show == true) {
      if (nextProps.passwordResetStatus.Response == "SUCCESS") {
        this.setState({ error: "" });
        this.handleClose();
        alert("Your password is changed successfully!!");
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
          error: "Passwords must match",
          newPassword: e.target.value
        });
      }
      else if (this.state.rePassword.length > 0 && e.target.value.length == 0) {
        this.setState({
          error: "Passwords must match",
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
      this.setState({ error: "Passwords must match" });
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
    this.props.resetPasswordInfoStore();
    if (this.state.newPassword == this.state.rePassword && this.state.newPassword.length > 0 && this.state.oldPassword.length > 0) {
      this.props.changePassword({
        "current_password": this.state.oldPassword,
        "new_password": this.state.newPassword
      });
    } else {
      if (this.state.newPassword.length == 0 || this.state.oldPassword.length == 0 || this.state.rePassword.length == 0)
        this.setState({ error: "Password cannot be empty" });
      else
        this.setState({ error: "Passwords must match" });
    }
  }

  render() {
    let { oldPassword, rePassword, newPassword, error } = this.state;
    let errorComponent = null;
    if (error) {
      errorComponent = (
        <div className={`${styles['text-center']} ${styles['error-msg']}`}>
          <span>{error}</span>
        </div>);
    }
    return (
      <div className={styles['editProfileModal']}>
        <Row>
          <Col xs={11} md={11}>
            <h3>Change Password</h3>
          </Col>
          <Col xs={1} md={1} onClick={this.handleClose}><a>
            X</a>
          </Col>
        </Row>
        <div>
          <Row>
            <Col xs={4} md={4} />
            <Col xs={4} md={4}>
              <div />
            </Col>
            <Col xs={4} md={4} />
          </Row>
          <Row>
            {errorComponent}
          </Row>
          <Row className={`${styles['m-5']} ${styles['mt-20']}`}>
            <Col xs={12} md={12} className={styles['box']}>
              <div>Enter Old Password</div>
              <Input placeholder="Enter Old Password" type="password" val={oldPassword} onChange={this.handleOldPasswordChange} />
            </Col>
            <Col xs={12} md={12} className={styles['box']}>
              <Col xs={6} md={6} className={styles['pl-0']}>
                <div>Enter New Password</div>
                <Input placeholder="Enter New Password" type="password" val={newPassword} onChange={this.handleNewPasswordChange} />
              </Col>
              <Col xs={6} md={6} className={styles['pl-0']}>
                <div>Re-enter New Password</div>
                <Input placeholder="Re enter Password" type="password" val={rePassword} onChange={this.handleRePasswordChange} onBlur={this.handleRePasswordBlur} />
              </Col>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} className={`${styles['t-c']}`}>
              <Btn btnWidth="95%" backGround="#034e94" color="#fff" btnText="Change Password" BtnClickHandler={this.handleSubmit} />
            </Col>
          </Row>
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
