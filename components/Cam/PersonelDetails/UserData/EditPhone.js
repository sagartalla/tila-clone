import React from 'react';
import { Row, Col, Dropdown, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import Btn from '../../../common/Button';
import Input from '../../../common/Input';
import { actionCreators, selectors } from '../../../../store/cam/personalDetails';
import { languageDefinations } from '../../../../utils/lang';
import CountryDialCode from '../../../../constants/CountryDialCode';
import FormValidator from '../../../common/FormValidator';
import SVGCompoent from '../../../common/SVGComponet';
import ToastContent from '../../../common/ToastContent';
import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../profile_en.styl';
import styles_ar from '../profile_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const { CONTACT_INFO_MODAL } = languageDefinations();
const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

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
class EditPhone extends React.Component {
  constructor(props) {
    super(props);
    this.validations = new FormValidator([
      {
        field: 'phoneNumber',
        method: this.isEmptyString,
        message: 'phone number cannot be empty',
        validWhen: false
      },
      {
        field: 'otp',
        method: this.isEmptyString,
        message: 'otp cannot be empty',
        validWhen: false
      }
    ])
    this.state = {
      phoneNumber: "" || props.userData && props.userData.mobile_no,
      otp: '',
      error: "",
      show: false,
      countryCode: CountryDialCode[country].data,
      otpResponse: null,
      validation: this.validations.valid(),
      otpCount: 0
    }
    this.otpTimer = () => {}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.optionChange = this.optionChange.bind(this)
    this.fetchOtp = this.fetchOtp.bind(this)
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this)
    this.handleOTPChange = this.handleOTPChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { afterSuccessOtpVerification } = this.props;

    if (this.state.show == true && nextProps.errorMessege != this.state.error) {
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
  optionChange(e) {
    this.setState({ countryCode: e.target.value })
  }
  isEmptyString = (fieldValue) => {
    if (fieldValue === '') {
      return true
    }
    return false
  }
  fetchOtp() {
    const { countryCode, phoneNumber, otpCount } = this.state
    // let validation = this.validations.validate(this.state)
    // this.setState({ validation })
    if (phoneNumber && phoneNumber.length > 0) {
      const params = {
        mobile_country_code: countryCode,
        mobile_no: phoneNumber,
      };
      this.setState({
        otpCount: otpCount + 1,
      }, () => this.props.otpUserUpdate(params));
    }else{
      toast(
        <ToastContent
          msg='Phone number is required for OTP'
          msgType='error'
        />
      )
    }
  }
  handleClose() {
    this.setState({
      show: false,
      phoneNumber: "",
      otp: "",
      error: "",
      otpResponse: null
    });
    this.props.handleShow(false, '')();
  }

  handlePhoneNumberChange(e) {
    if (/^[0-9]*$/gm.test(e.target.value)) {
      this.setState({ phoneNumber: e.target.value });
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
    let validation = this.validations.validate(this.state)
    this.setState({ validation })
    const { otp } = this.state;
    let toNumber = Number(otp)
    if (validation.isValid) {
      this.props.verifyOtp({ otp: toNumber })
    }
  }

  render() {
    const { phoneNumber, error, otp, countryCode, validation, otpResponse, otpCount } = this.state;
    const { isLoading, isPopup, mobileVerified } = this.props;
    if (otpResponse === 'SUCCESS') {
      return (
        <div className={styles['edit-mobile-no-succ']}>
          {
            isPopup && (
              // <Row>
              //   <Col xs={1} md={1} onClick={this.handleClose}><a>
              //     X</a>
              //   </Col>
              // </Row>
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
            // <Row>
            //   <Col xs={1} md={1} onClick={this.handleClose}><a>
            //     X</a>
            //   </Col>
            // </Row>
            <h4 className={`${styles['flx-spacebw-alignc']} ${styles['m-0']} ${styles['p-20']} ${styles['fs-18']}`}>
              <span>{CONTACT_INFO_MODAL.EDIT_PHONE_NUMBER}</span>
              <span onClick={this.handleClose} className={`${styles['fs-22']} ${styles['black-color']}`}>X</span>
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
              {/* <label>Mobile number</label> */}
              <Col xs={3} md={3} >
                <div>
                  <div className={styles['select']}>
                    <select className={styles['select-text']} onChange={this.optionChange}>
                      {
                        Object.keys(CountryDialCode).map(
                          (value, index) => (<option
                            key={CountryDialCode[value].code}
                            value={CountryDialCode[value].code}>
                              {CountryDialCode[value].code}
                          </option>
                          ))
                      }
                    </select>
                    <span className={styles['select-highlight']}></span>
                    <span className={styles['select-bar']}></span>
                  </div>
                  {/* <select onChange={this.optionChange}>
                    {
                      Object.keys(CountryDialCode).map(
                        (value, index) => (<option
                          key={CountryDialCode[value].code}
                          value={CountryDialCode[value].code}>
                          <img src={CountryDialCode[value].img} />{CountryDialCode[value].code}
                        </option>
                        ))
                    }
                  </select> */}
                </div>
              </Col>
              <Col xs={9} md={9}>
                <div className={`${styles['phoneInpt']} ${styles['relative']}`}>
                  <div className={styles['fp-input']}>
                    <input
                      type="text"
                      required
                      value={phoneNumber}
                      onChange={this.handlePhoneNumberChange}
                    />
                    <span className={styles['highlight']}></span>
                    <span className={styles['bar']}></span>
                    <label>{`${CONTACT_INFO_MODAL.ENTER} ${CONTACT_INFO_MODAL.PHONE_NUMBER}`}</label>
                    {
                      validation.phoneNumber.isInValid ?
                        <span className={`${styles['error']} ${styles['fs-12']}`}>{validation.phoneNumber.message}</span>
                        : null
                    }
                    {/* <span className={styles['error']}>error message</span> */}
                    {/^([0-9]){6,12}$/.test(phoneNumber) ?
                      <a className={`${styles['show-otp']} ${styles['fs-12']} ${styles['thick-blue']}`} onClick={this.fetchOtp}>
                       {otpCount ? `${CONTACT_INFO_MODAL.RESEND} ${CONTACT_INFO_MODAL.OTP}` : CONTACT_INFO_MODAL.SEND_OTP}
                      </a> : null}
                  </div>
                  {/* <Input
                    placeholder={`${CONTACT_INFO_MODAL.ENTER} ${CONTACT_INFO_MODAL.PHONE_NUMBER}`}
                    type="text"
                    val={phoneNumber}
                    onChange={this.handlePhoneNumberChange}
                  /> */}

                  {/* {
                    validation.phoneNumber.isInValid ?
                      <div className={`${styles['fs-12']}`}>
                        <span>{validation.phoneNumber.message}</span>
                      </div> : null
                  } */}
                </div>
              </Col>
              {otpCount ?
                <Col xs={12} md={12} className={styles['pt-20']}>
                <div className={`${styles['request-opt']} ${styles['relative']}`}>
                  {/* <Input type='number' placeholder={`${CONTACT_INFO_MODAL.ENTER} ${CONTACT_INFO_MODAL.OTP}`} val={otp} onChange={this.handleOTPChange} /> */}
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
                      validation.otp.isInValid ?
                        <span className={`${styles['error']} ${styles['fs-12']}`}>{validation.otp.message}</span>
                        : null
                    }
                    {/* <span className={styles['error']}>error message</span> */}

                  </div>
                </div>
                {/* {
                      validation.otp.isInValid ?
                        <div className={`${styles['fs-12']}`}>
                          <span>{validation.otp.message}</span>
                        </div> : null
                    } */}
              </Col>
              : null}
            </Row>
            <Row>
              <Col xs={12} md={12} className={`${styles['t-c']}`}>
                <button disabled={!otp} className={`${!otp ? styles['verify-no-btn-disabled'] : styles['verify-no-btn']} ${styles['mt-20']}`} onClick={this.handleSubmit}>{this.props.buttonText}</button>
              </Col>
            </Row>
            <div>
              {{
                FAILURE: <div className={`${styles['thick-red']} ${styles['fs-12']}`}>{CONTACT_INFO_MODAL.ENTER_VALID_OTP}</div>,
                SUCCESS: '',
                RESET:''
              }[otpResponse]}
            </div>
          </div>
        </div> :
       <div className={`${styles['success-green']} ${styles['mb-25']}`}>{CONTACT_INFO_MODAL.PLEASE_CONFIRM_YOUR_ORDER}</div>
      }
      </div>

    );
  }
}

const mapStateToProps = (store) => ({
  errorMessege: selectors.getErrorMessege(store),
  userInfo: selectors.getUserInfo(store),
  isLoading: selectors.getLoadingStatus(store),
  otpData: selectors.getOtpData(store)
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    otpUserUpdate: actionCreators.otpUserUpdate,
    verifyOtp: actionCreators.verifyOtp
  }, dispatch)
}

EditPhone.propTypes = {
  show: PropTypes.bool,
  handleShow: PropTypes.func.isRequired,
  errorMessege: PropTypes.string,
  userInfo: PropTypes.object
};
EditPhone.defaultProps = {
  buttonText:CONTACT_INFO_MODAL.VERIFY_MOBILE_NUMBER
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPhone);
