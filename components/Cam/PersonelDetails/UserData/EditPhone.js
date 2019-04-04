import React from 'react';
import { Row, Col, Dropdown,Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Btn from '../../../common/Button';
import Input from '../../../common/Input';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../../store/cam/personalDetails';
import Cookies from 'universal-cookie';
import { mergeCss } from '../../../../utils/cssUtil';
import {languageDefinations} from '../../../../utils/lang';
import CountryDialCode from '../../../../constants/CountryDialCode';
import FormValidator from '../../../common/FormValidator';
import SVGCompoent from '../../../common/SVGComponet';
const styles = mergeCss('components/Cam/PersonelDetails/profile');
import { toast } from 'react-toastify';
const {CONTACT_INFO_MODAL} = languageDefinations();
const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

const MobileImage = () => (
  <div>
    <div className={styles['mobile-tick-icon']}>
      <SVGCompoent
        clsName={styles['mobiletick-icon-styl']}
        src="icons/common-icon/mobile-tick-icon"
      >
      </SVGCompoent>
    </div>
  </div>
)
class EditPhone  extends React.Component {
  constructor(props) {
    super(props);
    this.validations = new FormValidator([
      {
        field:'phoneNumber',
        method:this.isEmptyString,
        message:'phone number cannot be empty',
        validWhen:false
      },
      {
        field:'otp',
        method:this.isEmptyString,
        message:'otp cannot be empty',
        validWhen:false
      }
    ])
    debugger;
    console.log(CountryDialCode, country, CountryDialCode[country].code);
    this.state = {
      phoneNumber: "",
      otp: '',
      error: "",
      show: false,
      countryCode: CountryDialCode[country].data,
      otpResponse:null,
      showOtp:true,
      validation:this.validations.valid()
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
        otpResponse:'FAILURE'
      })
    } else if(Object.keys(nextProps.otpData).length > 0){
      this.setState({
        otpResponse:nextProps.otpData.Response
      }, () => {
        afterSuccessOtpVerification && afterSuccessOtpVerification();
      })
    }

  }
  optionChange(e) {
    this.setState({countryCode:e.target.value})
  }
  isEmptyString = (fieldValue) => {
    if(fieldValue === '') {
      return true
    }
    return false
  }
  fetchOtp(){
    const { countryCode, phoneNumber, showOtp} = this.state
    let validation = this.validations.validate(this.state)
    this.setState({ validation })

    if(validation.isValid) {
      const params = {
        mobile_country_code: countryCode,
        mobile_no:phoneNumber
      }
      this.setState({
        showOtp:false
      },() => this.props.otpUserUpdate(params))
    }
  }
  handleClose() {
    this.setState({
      show: false,
      phoneNumber: "",
      otp: "",
      error: "",
      otpResponse:null
    });
    this.props.handleShow(false, '')();
  }

  handlePhoneNumberChange(e){
    if(/^[0-9]*$/gm.test(e.target.value)) {
        this.setState({ phoneNumber: e.target.value });
    }
  }
  handleOTPChange(e){
    if(/^[0-9]*$/gm.test(e.target.value)) {
        this.setState({ otp: e.target.value });
    }
  }
  handleSubmit(e){
    // TODO : handle action for phone number edit
    e.preventDefault()
    let validation = this.validations.validate(this.state)
    this.setState({ validation })
    const { otp } = this.state;
    let toNumber = Number(otp)
    if(validation.isValid) {
      this.props.verifyOtp({otp:toNumber})
    }
  }

  render(){
  const {phoneNumber, error, otp, countryCode, validation, otpResponse, showOtp} = this.state;
  const { isLoading, isPopup } = this.props
  if(otpResponse === 'SUCCESS') {
    return (
      <div>
        {
          isPopup && (
            <Row>
              <Col xs={1} md={1} onClick={this.handleClose}><a>
                X</a>
              </Col>
            </Row>
          )
        }
        {
          isPopup
            ?
            <MobileImage />
            :
            null
        }

        <div>Thank you</div>
        <p> Your phone number has been successfully verified </p>
        {
            isPopup && <Button variant="primary" onClick={this.handleClose}>done</Button>
        }
      </div>
    )
  }
  return (
    <div>
      {
        isPopup && (
          <Row>
            <Col xs={1} md={1} onClick={this.handleClose}><a>
              X</a>
            </Col>
          </Row>
        )
      }
      {
        isPopup
          ?
          <MobileImage />
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
      {
        isPopup && (<Row>
          <Col xs={11} md={11}>
            <h3>{CONTACT_INFO_MODAL.EDIT_PHONE_NUMBER}</h3>
          </Col>
        </Row>)
      }
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
                                    <img src={CountryDialCode[value].img} />{CountryDialCode[value].code}
                                  </option>
                      ))
                  }
                </select>
              </div>
            </Col>
            <Col xs={7} md={7}>
              <div className={`${styles['phoneInpt']}`}>
                <Input
                  placeholder={`${CONTACT_INFO_MODAL.ENTER} ${CONTACT_INFO_MODAL.PHONE_NUMBER}`}
                  type="text"
                  val={phoneNumber}
                  onChange={this.handlePhoneNumberChange}
                />
              {showOtp ? <div className={`${styles['show-otp']}`} onClick={this.fetchOtp}>send otp</div>: null }
              {
                validation.phoneNumber.isInValid ?
                <div className={`${styles['fs-12']}`}>
                  <span>{validation.phoneNumber.message}</span>
                </div>: null
              }
              </div>
            </Col>
        </Col>
        <Col xs={12} md={12} className={styles['box']}>
          <div>{CONTACT_INFO_MODAL.ENTER} {CONTACT_INFO_MODAL.OTP}</div>
          <Row>
            <Col xs={8} md={8}>
              <Input type='number' placeholder={`${CONTACT_INFO_MODAL.ENTER} ${CONTACT_INFO_MODAL.OTP}`}  val={otp} onChange={this.handleOTPChange} />
                {
                  validation.otp.isInValid ?
                  <div className={`${styles['fs-12']}`}>
                    <span>{validation.otp.message}</span>
                  </div>: null
                }
            </Col>
            <Col xs={4} md={4}>
              <span><a onClick={this.fetchOtp}>{CONTACT_INFO_MODAL.RESEND} {CONTACT_INFO_MODAL.OTP}</a></span>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12} className={`${styles['t-c']}`}>
          <Btn btnWidth="95%" backGround="#034e94" color="#fff" btnText="Verify Mobile Number" onClick={this.handleSubmit} />
        </Col>
      </Row>
      <div>
        {{
          null:null,
          FAILURE:<div className={`${styles['thick-red']} ${styles['fs-12']}`}>please enter valid otp</div>,
          SUCCESS:''
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
  isLoading:selectors.getLoadingStatus(store),
  otpData: selectors.getOtpData(store)
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    otpUserUpdate:actionCreators.otpUserUpdate,
    verifyOtp:actionCreators.verifyOtp
  },dispatch)
}

EditPhone.propTypes = {
  show: PropTypes.bool,
  handleShow: PropTypes.func.isRequired,
  errorMessege: PropTypes.string,
  userInfo: PropTypes.object
};

export default connect(mapStateToProps,mapDispatchToProps)(EditPhone);
