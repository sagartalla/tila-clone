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
import { mergeCss } from '../../../../utils/cssUtil';
import { languageDefinations } from '../../../../utils/lang';
import CountryDialCode from '../../../../constants/CountryDialCode';
import FormValidator from '../../../common/FormValidator';
import SVGCompoent from '../../../common/SVGComponet';

const styles = mergeCss('components/Cam/PersonelDetails/profile');
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
      phoneNumber: "",
      otp: '',
      error: "",
      show: false,
      countryCode: CountryDialCode[country].data,
      otpResponse: null,
      showOtp: true,
      validation: this.validations.valid()
    }
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
        error: nextProps.errorMessege
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
        afterSuccessOtpVerification && afterSuccessOtpVerification();
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
    const { countryCode, phoneNumber, showOtp } = this.state
    // let validation = this.validations.validate(this.state)
    // this.setState({ validation })
    if (phoneNumber.length > 0) {
      const params = {
        mobile_country_code: countryCode,
        mobile_no: phoneNumber,
      };
      this.setState({
        showOtp: false,
      }, () => this.props.otpUserUpdate(params));
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
    const { phoneNumber, error, otp, countryCode, validation, otpResponse, showOtp } = this.state;
    const { isLoading, isPopup } = this.props
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
              <h4 className={`${styles['fs-20']} ${styles['fontW300']} ${styles['p-20']}`}><span onClick={this.handleClose}>X</span> <span className={`${styles['pl-20']} ${styles['lgt-blue']}`}>{CONTACT_INFO_MODAL.EDIT_PHONE_NUMBER}</span></h4>
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
            <h4 className={`${styles['fs-20']} ${styles['fontW300']} ${styles['p-20']}`}><span onClick={this.handleClose}>X</span> <span className={`${styles['pl-20']} ${styles['lgt-blue']}`}>{CONTACT_INFO_MODAL.EDIT_PHONE_NUMBER}</span></h4>
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
                            <img src={CountryDialCode[value].img} />{CountryDialCode[value].code}
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
                      val={phoneNumber}
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
                    {showOtp ? <a className={`${styles['show-otp']} ${styles['fs-12']} ${styles['thick-blue']}`} onClick={this.fetchOtp}>{CONTACT_INFO_MODAL.SEND_OTP}</a> : null}
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
              <Col xs={12} md={12} className={styles['pt-20']}>
                <div className={`${styles['request-opt']} ${styles['relative']}`}>
                  {/* <Input type='number' placeholder={`${CONTACT_INFO_MODAL.ENTER} ${CONTACT_INFO_MODAL.OTP}`} val={otp} onChange={this.handleOTPChange} /> */}
                  <div className={styles['fp-input']}>
                    <input
                      type="number"
                      val={otp}
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
                  <span className={styles['request-opt-inn']}><a onClick={this.fetchOtp}>{CONTACT_INFO_MODAL.RESEND} {CONTACT_INFO_MODAL.OTP}</a></span>
                </div>
                {/* {
                      validation.otp.isInValid ?
                        <div className={`${styles['fs-12']}`}>
                          <span>{validation.otp.message}</span>
                        </div> : null
                    } */}
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12} className={`${styles['t-c']}`}>
                <button className={`${styles['verify-no-btn']} ${styles['mt-20']}`} onClick={this.handleSubmit}>{CONTACT_INFO_MODAL.VERIFY_MOBILE_NUMBER}</button>
              </Col>
            </Row>
            <div>
              {{
                null: null,
                FAILURE: <div className={`${styles['thick-red']} ${styles['fs-12']}`}>{CONTACT_INFO_MODAL.ENTER_VALID_OTP}</div>,
                SUCCESS: ''
              }[otpResponse]}
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditPhone);
