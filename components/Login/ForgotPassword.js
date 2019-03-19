import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import Btn from '../common/Button';
import { mergeCss } from '../../utils/cssUtil';
import { selectors, actionCreators } from '../../store/cam/personalDetails';
import { actionCreators as authActionCreators } from '../../store/auth';
import VerifyStatus from './VerifyStatus';

const styles = mergeCss('components/Login/login');

// eslint-disable-next-line
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.enteredEmail || '',
      showInput: '',
      userNameError: false,
      errorMsg: '',
    };
    this.sendLink = this.sendLink.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.switchState = this.switchState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.forgotPasswordStatus === 'SUCCESS') {
      this.setState({ showInput: true });
    } else {
      this.setState({ showInput: false });
    }
  }

  sendLink() {
    const { email } = this.state;
    let { userNameError, errorMsg } = this.state;
    const body = {
      email,
    };
    if (email === '') {
      userNameError = true;
      errorMsg = 'Please enter email id';
    } else if (!emailPattern.test(email)) {
      userNameError = true;
      errorMsg = 'Entered email is invalid';
    } else {
      this.props.forgotPassword(body).then((res) => {
        if (res.value.Response === 'SUCCESS') {
          this.setState({ showInput: true });
        } else {
          this.setState({ showInput: false });
        }
      });
    }
    this.setState({
      userNameError,
      errorMsg,
    });
  }

  handleChange(e) {
    let { userNameError, errorMsg } = this.state;
    if (!emailPattern.test(e.target.value)) {
      userNameError = true;
      errorMsg = 'Entered email is invalid';
    } else {
      userNameError = false;
      errorMsg = '';
    }
    this.setState({
      email: e.target.value,
      userNameError,
      errorMsg,
    });
  }

  switchState() {
    this.setState({
      showInput: '',
    });
  }
  render() {
    const {
      errorMsg, userNameError, email, showInput,
    } = this.state;
    return (
      <div className={styles['forgot-password']}>
        <h2><b>Forgot Password?</b></h2>
        {showInput === '' ?
          <div>
            <div className={`${styles['fp-input']} ${styles['pb-10']}`}>
              <input name="email" type="email" onChange={this.handleChange} placeholder="Registered Email ID" value={email} required />
              {userNameError && <span className={`${styles['thick-red-clr']}`}>{errorMsg}</span>}
            </div>
            <Col xs={12} md={12} className={`${styles['pt-30']}`}>
              <Btn className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-large']} ${styles['update-profile-btn']} ${styles['text-uppercase']}`} btnText="SEND VERIFICATION LINK" onClick={this.sendLink} />
            </Col>
          </div>
                :
          <div>
            <VerifyStatus
              resetLogin={this.props.resetShowLogin}
              switchState={this.switchState}
              showInput={showInput}
              forgotPasswordStatus={this.props.forgotPasswordStatus}
              sendLink={this.sendLink}
            />
          </div>
                }
      </div>
    );
  }
}

const mapStateToProps = store => ({
  forgotPasswordStatus: selectors.forgotPasswordStatus(store),
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    forgotPassword: actionCreators.forgotPassword,
    resetShowLogin: authActionCreators.resetShowLogin,
  },
  dispatch,
);

ForgotPassword.propTypes = {
  enteredEmail: PropTypes.string,
  forgotPassword: PropTypes.func,
  forgotPasswordStatus: PropTypes.string,
};

ForgotPassword.defaultProps = {
  enteredEmail: '',
  forgotPassword: f => f,
  forgotPasswordStatus: '',
};
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
