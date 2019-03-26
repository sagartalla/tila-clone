import React from 'react';
import { Row, Col, Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Btn from '../../../common/Button';
import Input from '../../../common/Input';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../../store/cam/personalDetails';
import Cookies from 'universal-cookie';
import { mergeCss } from '../../../../utils/cssUtil';
import {languageDefinations} from '../../../../utils/lang';
import CountryDialCode from '../../../common/CountryDialCode';
import FormValidator from '../../../common/FormValidator'
const styles = mergeCss('components/Cam/PersonelDetails/profile');
const {CONTACT_INFO_MODAL} = languageDefinations();
const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

class EditPhone  extends React.Component {
  constructor(props) {
    super(props);
    this.validations = new FormValidator([
      {
        field:'phoneNumber',
        method:this.isEmptyString,
        message:'phone number cannot be empty',
        validWhen:false
      }
    ])

    this.state = {
      phoneNumber: "",
      otp: "",
      error: "",
      show: false,
      countryCode:country,
      validation:this.validations.valid()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userInfo.contactInfo && Object.keys(nextProps.userInfo.contactInfo).length > 0 && nextProps.element && this.state.element == "" && this.state.phoneNumber == "") {
      this.setState({
        phoneNumber: nextProps.userInfo.contactInfo.mobile_no,
        otp: "",
        show: nextProps.show
      })
    }
    if (this.state.show == true && nextProps.errorMessege != this.state.error) {
      this.setState({
        error: nextProps.errorMessege
      });
    }
  }
  optionChange = (e) => {
    this.setState({countryCode:e.target.value})
  }
  isEmptyString = (fieldValue) => {
    if(fieldValue === '') {
      return true
    }
    return false
  }
  fetchOtp = () => {
    const { countryCode,phoneNumber} = this.state
    let validation = this.validations.validate(this.state)
    this.setState({ validation })
    if(validation.isValid) {
      const params = {
        mobile_country_code:countryCode,
        mobile_no:phoneNumber
      }

      this.props.otpUserUpdate(params)
    }

  }
  handleClose = () => {
    this.setState({
      show: false,
      phoneNumber: "",
      otp: "",
      error: ""
    });
    this.props.handleShow(false, '')();
  }

  handlePhoneNumberChange = (e) => {
    if(/^[0-9]*$/gm.test(e.target.value)) {
        this.setState({ phoneNumber: e.target.value });
    }
  }
  handleOTPChange = (e) => {
      this.setState({ otp: e.target.value });
  }

  handleResendOtp = () => {
    // TODO: handle action for OTP
    console.log('handleResendOtp');
  }

  handleSubmit = () => {
    // TODO : handle action for phone number edit
    console.log('submit');
  }

  render(){
  const {phoneNumber, error, otp,countryCode,validation} = this.state;
  return (
    <div className={styles['editProfileModal']}>
    <Row>
      <Col xs={11} md={11}>
        <h3>{CONTACT_INFO_MODAL.EDIT_PHONE_NUMBER}</h3>
      </Col>
      <Col xs={1} md={1} onClick={this.handleClose}><a>
        X</a>
      </Col>
    </Row>
    <div>
    <Row>
      <Col xs={4} md={4} />
      <Col xs={4} md={4}>
        <div className={styles['image-block-style']} />
      </Col>
      <Col xs={4} md={4} />
    </Row>
    <Row className={`${styles['m-5']} ${styles['mt-20']}`}>
      <Col xs={12} md={12} className={`${styles['relative']} ${styles['box']}`}>
          <Col xs={5} md={5} >
            <div>
              <label>Mobile number</label>
              <select onChange={this.optionChange}>
                {
                  Object.keys(CountryDialCode).map(
                    (value, index) => ( <option
                                  key={CountryDialCode[value].code}
                                  value={CountryDialCode[value].code}>
                                  {CountryDialCode[value].code}
                                </option>
                    ))
                }
              </select>
            </div>
          </Col>
          <Col xs={7} md={7}>
            <div className={`${styles['phoneInpt']}`}>
              {
                validation.phoneNumber.isInValid ?
                <div className={`${styles['fs-12']}`}>
                  <span>{validation.phoneNumber.message}</span>
                </div>: null
              }
              <Input
                placeholder={`${CONTACT_INFO_MODAL.ENTER} ${CONTACT_INFO_MODAL.PHONE_NUMBER}`}
                type="text"
                val={phoneNumber}
                onChange={this.handlePhoneNumberChange}
              />
            <div className={`${styles['show-otp']}`} onClick={this.fetchOtp}>send otp</div>
            </div>
          </Col>
      </Col>
      <Col xs={12} md={12} className={styles['box']}>
        <div>{CONTACT_INFO_MODAL.ENTER} {CONTACT_INFO_MODAL.OTP}</div>
        <Row>
          <Col xs={8} md={8}>
            <Input placeholder={`${CONTACT_INFO_MODAL.ENTER} ${CONTACT_INFO_MODAL.OTP}`}  val={otp} onChange={this.handleOTPChange} />
          </Col>
          <Col xs={4} md={4}>
            <span><a onClick={this.handleResendOtp}>{CONTACT_INFO_MODAL.RESEND} {CONTACT_INFO_MODAL.OTP}</a></span>
          </Col>
        </Row>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={12} className={`${styles['t-c']}`}>
        <Btn btnWidth="95%" backGround="#034e94" color="#fff" btnText="Verify Mobile Number" onClick={this.handleSubmit} />
      </Col>
    </Row>
  </div>
  </div>
  );
}
}

const mapStateToProps = (store) => ({
  errorMessege: selectors.getErrorMessege(store),
  userInfo: selectors.getUserInfo(store)
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    otpUserUpdate:actionCreators.otpUserUpdate
  },dispatch)
}

EditPhone.propTypes = {
  show: PropTypes.bool,
  handleShow: PropTypes.func.isRequired,
  errorMessege: PropTypes.string,
  userInfo: PropTypes.object
};

export default connect(mapStateToProps,mapDispatchToProps)(EditPhone);
