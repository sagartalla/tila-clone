import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import Button  from '../common/CommonButton';
import { languageDefinations } from '../../utils/lang';
import { selectors, actionCreators } from '../../store/auth';

import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './login_en.styl';
import styles_ar from './login_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { LOGIN_PAGE } = languageDefinations();

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: 'email',
    };
    this.sendLink = this.sendLink.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  sendLink() {
    const { radioValue } = this.state;
    const { activeEmailId, userData, v2NextPage } = this.props;
    const body = {
      email: activeEmailId,
    };
    if (radioValue === 'email') {
      this.props.forgotPassword(body).then(res => {
        if (res && res.value && res.value.Response && res.value.Response === 'SUCCESS') {
          v2NextPage();
        }
    });
  } else {
    this.props.getMobileOtp(activeEmailId).then(res => {
      if (res && res.value && res.value.data && res.value.data.Response === 'SUCCESS') {
        v2NextPage();
      }
  });
  }
}


  handleChange = (e) => {
    const key = e.target.getAttribute('data-id');
    this.setState({
      radioValue: key,
    });
  }

  render() {
    const {
      radioValue,
    } = this.state;
    const { loadingStatus, activeEmailId, userData } = this.props;
    return (
      <div className={`${styles['forgot-password']} ${styles.flex} ${styles['flex-colum']} ${styles['justify-around']}`}>
        <div>
          <h3 className={`${styles['fs-22']} ${styles['m-0']} ${styles['ff-b']}`}>{LOGIN_PAGE.FORGOT_PASSWORD}</h3>
        </div>
        <React.Fragment>
          <span className={`${styles['radio-buttons']} ${styles.flex} ${styles['flex-colum']} ${styles['justify-around']}`}>
            <div className={`${styles.flex}`}>
              <input name="addr_checkbox" type="radio" className={`${styles['radio-btn']} ${styles['radio-margin']}`} data-id="email" checked={radioValue === 'email'} onChange={this.handleChange} />
              <span className={`${styles['ml-10']}`}>
                <div className={radioValue === 'email' ? `${styles['fs-12']} ${styles.fontW600}` : `${styles['fs-12']}`}>{LOGIN_PAGE.RESET_PASSWORD_BY_EMAIL}</div>
                <div className={radioValue === 'email' ? `${styles['fs-14']} ${styles.fontW600}` : `${styles['fs-14']}`}>{userData && userData.email}</div>
              </span>
            </div>
            {userData.mobile_country_code && userData.mobile_no &&
            <React.Fragment>
              <div className={`${styles.border}`} />
              <span>
                <div className={`${styles.flex}`}>
                  <input name="addr_checkbox" type="radio" className={`${styles['radio-btn']}`} data-id="otp" checked={radioValue === 'otp'} onChange={this.handleChange} />
                  <span className={`${styles['ml-10']}`}>
                    <div className={radioValue === 'otp' ? `${styles['fs-12']} ${styles.fontW600}` : `${styles['fs-12']}`}>{LOGIN_PAGE.RESET_PASSWORD_BY_MOBILE}</div>
                    <div className={radioValue === 'otp' ? `${styles.fontW600} ${styles.width50} ${styles.flex} ${styles['justify-between']}` : `${styles.flex} ${styles.width50} ${styles['justify-between']}`}>
                      <div className={`${styles['fashion-color']} ${styles['fs-14']}`}>{userData && ('+' + '' + userData.mobile_country_code)}</div>
                      <div className={`${styles['fs-14']}`}>{userData && userData.mobile_no}</div>
                    </div>
                  </span>
                </div>
              </span>
            </React.Fragment>
            }
          </span>
          <Button
            className={`${styles['flex-center']}  ${styles.width100} ${styles['fs-14']} ${styles['text-uppercase']} ${styles['button-radius']} ${styles['disabled-button']}`}
            disabled={radioValue === ''}
            onClick={this.sendLink}
            btnLoading={loadingStatus}
            btnText={LOGIN_PAGE.NEXT}
          />
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  forgotPasswordStatus: selectors.forgotPasswordStatus(store),
  activeObj: selectors.getActive(store),
  activeEmailId: selectors.getActiveEmailId(store),
  loadingStatus: selectors.getLoadingStatus(store),
  userData: selectors.userData(store),
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    forgotPassword: actionCreators.forgotPassword,
    v2NextPage: actionCreators.v2NextPage,
    getMobileOtp: actionCreators.getMobileOtp,
  },
  dispatch,
);

ForgotPassword.propTypes = {
  activeEmailId: PropTypes.string,
  forgotPassword: PropTypes.func,
  forgotPasswordStatus: PropTypes.string,
};

ForgotPassword.defaultProps = {
  activeEmailId: '',
  forgotPassword: f => f,
  forgotPasswordStatus: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
