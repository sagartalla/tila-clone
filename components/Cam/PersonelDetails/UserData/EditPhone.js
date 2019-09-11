import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookies from 'universal-cookie';
import { actionCreators, selectors } from '../../../../store/cam/personalDetails';
import { languageDefinations } from '../../../../utils/lang';
import SVGCompoent from '../../../common/SVGComponet';
import countriesData from '../../../../constants/countries';
import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../profile_en.styl';
import styles_ar from '../profile_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const { CONTACT_INFO_MODAL } = languageDefinations();
const cookies = new Cookies();

const language = cookies.get('language') || 'ar';
const country = cookies.get('country') || 'SAU';

class EditPhone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "" || (props.userInfo && props.userInfo.contactInfo && props.userInfo.contactInfo.mobile_verified === 'V' ? props.userInfo.contactInfo.mobile_no : ''),
      otp: '',
      error: "",
      otpResponse: null,
      otpCount: 0,
      mobile_country_code: '966',
    };
    this.otpTimer = () => {}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.fetchOtp = this.fetchOtp.bind(this)
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this)
    this.handleOTPChange = this.handleOTPChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { afterSuccessOtpVerification } = this.props;
    if (nextProps.errorMessege != this.state.error) {
      this.setState({
        error: nextProps.errorMessege,
        otpResponse:'RESET'
      });
    }

    if (nextProps.otpData.error) {
      //show error
      this.setState({
        otpResponse: 'FAILURE'
      })
    } else if (Object.keys(nextProps.otpData).length > 0) {
      this.setState({
        otpResponse: nextProps.otpData.Response
      }, () => {
        ((afterSuccessOtpVerification && nextProps.otpData.Response === 'SUCCESS') && afterSuccessOtpVerification());
      })
    }

  }
  fetchOtp() {
    const { phoneNumber, otpCount, mobile_country_code } = this.state
    
      if (phoneNumber && phoneNumber.length > 0) {
        const params = {
          mobile_country_code,
          mobile_no: phoneNumber,
        };
        this.setState({
          otpCount: otpCount + 1,
        }, () => this.props.otpUserUpdate(params));
      }
  }
  handleClose() {
    this.setState({
      phoneNumber: "",
      otp: "",
      error: "",
      otpResponse: null
    });
    this.props.handleShow(false, '')();
  }

  handlePhoneNumberChange({ target }) {
    if (/^[0-9]*$/gm.test(target.value)) {
      this.setState({ phoneNumber: target.value });
    } else {
      this.setState({ phoneNumber: '' });
    }
  }

  handleOTPChange(e) {
    if (/^[0-9]*$/gm.test(e.target.value)) {
      this.setState({ otp: e.target.value });
    }
  }
  handleSubmit(e) {
    // TODO : handle action for phone number edit
    e.preventDefault()
    const { otp } = this.state;
    let toNumber = Number(otp);
    this.props.verifyOtp({ otp: toNumber })
  }

  render() {
    const { phoneNumber, error, otp, validation, otpResponse, otpCount, mobile_country_code } = this.state;
    const { isLoading, isPopup, mobileVerified, showOtpField } = this.props;
    if (otpResponse === 'SUCCESS') {
      return (
        <div className={styles['edit-mobile-no-succ']}>
          {
            isPopup && (
              <h4 className={`${styles['flx-spacebw-alignc']} ${styles['m-0']} ${styles['p-20']}`}>
                <span className={styles['lgt-blue']}>{CONTACT_INFO_MODAL.EDIT_PHONE_NUMBER}</span>
                <span onClick={this.handleClose} className={styles['fs-24']}>X</span>
              </h4>
            )
          }
          {
            isPopup
              ?
              <MobileImage />
              :
              null
          }
          <div className={`${styles['thank-you-part']} ${styles['p-40']} ${styles['flex-center']} ${styles['flex-colum']}`}>
            <h4 className={`${styles['m-0']} ${styles['pb-20']}`}>{CONTACT_INFO_MODAL.THANK_YOU}</h4>
            <p className={`${styles['fs-12']} ${styles['thick-gry-clr']}`}> {CONTACT_INFO_MODAL.YOUR_PHONE_NUMBER_VERIFIED} </p>
            {
              isPopup && <button className={`${styles['verify-no-btn']} ${styles['mt-20']}`} variant="primary" onClick={this.handleClose}>{CONTACT_INFO_MODAL.DONE}</button>
            }
          </div>
        </div>
      )
    }
    return (
      <div className={styles['edit-mobile-no']}>
        {
          isPopup && (
            <h4 className={`${styles['flx-spacebw-alignc']} ${styles['m-0']} ${styles['p-20']} ${styles['fs-18']}`}>
              <span>{CONTACT_INFO_MODAL.EDIT_PHONE_NUMBER}</span>
              <span onClick={this.handleClose} className={`${styles['fs-22']} ${styles.pointer} ${styles['black-color']} `}>X</span>
            </h4>
          )
        }
        {
          isPopup
            ?
            <span className={`${styles['flex-center']} ${styles['flex-colum']}`}>
              <MobileImage />
              <span className={`${styles['thick-gry-clr']} ${styles['fs-14']} ${styles['pt-20']}`}>{CONTACT_INFO_MODAL.VERIFY_PHONE}</span>
            </span>

            :
            null
        }
        {!mobileVerified ?
        <div className={styles['editProfileModal']}>
          {
            isLoading ?
              <div className={styles['loader-div']}>
                <SVGCompoent
                  clsName={styles['loader-styl']}
                  src="icons/common-icon/circleLoader"
                >
                </SVGCompoent>
              </div> : null
          }
          <div className={styles['mobile-otp-part']}>
            <Row>
              <Col xs={3} md={3} >
                <div>
                  <div className={styles['country-code']}>
                  <div className={`${styles['flex-center']} ${styles['country-dropdown']}`}>
                <img src={countriesData.SAU.img} alt="SAU FLAG" />
                <input
                  type="text"
                  value={`+${mobile_country_code}`}
                  readOnly
                  style={{ width: '40px', border: 'none' }}
                  className={`${styles['fs-14']} ${styles['ml-5']}`}
                />
              </div>
                  </div>
                </div>
              </Col>
              <Col xs={9} md={9}>
                <div className={`${styles['phoneInpt']} ${styles['relative']}`}>
                  <div className={`${styles['fp-input']}`}>
                    <input
                      type="text"
                      name="phoneNumber"
                      required
                      value={phoneNumber}
                      onChange={this.handlePhoneNumberChange}
                    />
                    <span className={styles['highlight']}></span>
                    <span className={styles['bar']}></span>
                    <label>{`${CONTACT_INFO_MODAL.ENTER} ${CONTACT_INFO_MODAL.PHONE_NUMBER}`}</label>
                      {phoneNumber && <a className={`${styles['show-otp']} ${styles['fs-12']} ${styles['thick-blue']}`} onClick={this.fetchOtp}>
                       {otpCount && showOtpField ? `${CONTACT_INFO_MODAL.RESEND} ${CONTACT_INFO_MODAL.OTP}` : CONTACT_INFO_MODAL.SEND_OTP}
                      </a>}
                  </div>
                </div>
              </Col>
              {otpCount && showOtpField ?
                <Col xs={12} md={12} className={styles['pt-20']}>
                <div className={`${styles['request-opt']} ${styles['relative']}`}>
                  <div className={styles['fp-input']}>
                    <input
                      type="text"
                      value={otp}
                      className={styles['width100']}
                      onChange={this.handleOTPChange}
                      required
                    />
                    <span className={styles['highlight']}></span>
                    <span className={styles['bar']}></span>
                    <label>{`${CONTACT_INFO_MODAL.ENTER} ${CONTACT_INFO_MODAL.OTP}`}</label>
                    {
                      validation && validation.otp && validation.otp.isInValid ?
                        <span className={`${styles['error']} ${styles['fs-12']}`}>{validation.otp.message}</span>
                        : null
                    }

                  </div>
                </div>
              </Col>
              : null}
            </Row>
            <Row>
              <Col xs={12} md={12} className={`${styles['t-c']}`}>
                <button disabled={!otp} className={`${!otp ? styles['verify-no-btn-disabled'] : styles['verify-no-btn']} ${styles['mt-20']}`} onClick={this.handleSubmit}>{this.props.buttonText}</button>
              </Col>
            </Row>
          </div>
        </div> :
       <div className={`${styles['success-green']} ${styles['mb-25']}`}>{CONTACT_INFO_MODAL.PLEASE_CONFIRM_YOUR_ORDER}</div>
      }
      </div>

    );
  }
}

const MobileImage = () => (
  <div>
    <div className={`${styles['mobile-tick-icon']} ${styles['flex']} ${styles['justify-center']}`}>
      <SVGCompoent
        clsName={styles['mobiletick-icon-styl']}
        src="icons/common-icon/mobile-tick-icon"
      >
      </SVGCompoent>
    </div>
  </div>
)

const mapStateToProps = (store) => ({
  errorMessege: selectors.getErrorMessege(store),
  userInfo: selectors.getUserInfo(store),
  isLoading: selectors.getLoadingStatus(store),
  otpData: selectors.getOtpData(store),
  showOtpField: selectors.getOtpField(store),
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    otpUserUpdate: actionCreators.otpUserUpdate,
    verifyOtp: actionCreators.verifyOtp
  }, dispatch)
}

EditPhone.propTypes = {
  handleShow: PropTypes.func.isRequired,
  userInfo: PropTypes.object
};
EditPhone.defaultProps = {
  buttonText:CONTACT_INFO_MODAL.VERIFY_MOBILE_NUMBER
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPhone);
