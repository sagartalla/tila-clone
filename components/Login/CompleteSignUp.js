import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Dropdown, MenuItem } from 'react-bootstrap';
import Cookie from 'universal-cookie';
import moment from 'moment';
import PropTypes from 'prop-types';
import { languageDefinations } from '../../utils/lang';
import { actionCreators, selectors } from '../../store/product';
import { actionCreators as authActionCreators, selectors as authSelectors } from '../../store/auth';
import { actionCreators as personalActionCreators } from '../../store/cam/personalDetails';
import SVGComponent from '../common/SVGComponet';
import Button from '../common/CommonButton';
import lang from '../../utils/language';
import Country from '../../components/HeaderBar/includes/Country';
import countriesData from '../../constants/countries';
import FormValidator from '../common/FormValidator';
import months from './constants';
import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './login_en.styl';
import styles_ar from './login_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };
const cookies = new Cookie();
const { PERSONAL_INFO_MODAL, LOGIN_PAGE } = languageDefinations();

class ContinueLogin extends Component {
  constructor(props) {
    super(props);
    this.validations = new FormValidator([
      {
        field: 'mobile_no',
        method: this.mobileValidation,
        validWhen: false,
        message: 'Enter valid mobile number',
      },
      {
        field: 'mobile_no',
        method: this.mobileWithZeroValidation,
        validWhen: false,
        message: 'Enter valid mobile number',
      },
    ]);
    this.state = {
      data: {
        gender: '',
        shipping_city: '',
        shipping_city_code: '',
      },
      day: '',
      month: '',
      year: '',
      mobile_no: '',
      mobile_country_code: '966',
      validation: this.validations.valid(),
      errorMsg: '',
      showDobError: false,
      monthVal: '',
    };
    this.onChangeCity = this.onChangeCity.bind(this);
    this.selectCityFromSuggesstions = this.selectCityFromSuggesstions.bind(this);
    this.handleMobileNumber = this.handleMobileNumber.bind(this);
  }
  componentDidMount() {
    const { getCitiesByCountryCode } = this.props;
    getCitiesByCountryCode(cookies.get('country'));
    // this.daysInMonth(moment().month());
    const minYear = 1900;
    const maxYear = new Date().getFullYear() - 18;
    const newYear = [];
    for (let i = minYear; i <= maxYear; i += 1) {
      newYear.push(i);
      this.setState({
        newYear,
      });
    }
    const defaultMonth = 'Jan';
    const numberOfdays = [];
    const count = moment().month(defaultMonth).daysInMonth();
    for (let i = 1; i < count + 1; i += 1) {
      numberOfdays.push(moment().month(defaultMonth).date(i).format('DD'));
    }
    this.setState({
      numberOfdays,
    });
  }

  onChangeCity(e) {
    const { data } = this.state;
    const { autoCompleteCity } = this.props;
    data.shipping_city = e.target.value;
    this.setState({
      data,
    }, () => {
      autoCompleteCity(displayCity);
    });
  }
  handleGenderChange = val => () => {
    const { data } = this.state;
    data.gender = val;
    this.setState({ data });
  }

  handleValidation = ({ target }) => {
    const validation = this.validations.validateOnBlur({ [target.name]: target.value });
    this.setState({ validation });
  }

  mobileWithZeroValidation = (fieldValue) => {
    if (fieldValue === '' || fieldValue === undefined) {
      return false;
    } else if (Number(fieldValue[0]) === 0 && Number(fieldValue[1]) === 5 && fieldValue.length === 10) {
      return false;
    } else if (Number(fieldValue[0]) !== 0) {
      return false;
    } return true;
  }
  mobileValidation = (fieldValue) => {
    if (fieldValue === '' || fieldValue === undefined) {
      return false;
    } else if (Number(fieldValue[0]) === 5 && fieldValue.length === 9) {
      return false;
    } else if (Number(fieldValue[0]) === 0) {
      return false;
    } return true;
  }

  selectCityFromSuggesstions(e) {
    const { data } = this.state;
    const city = e.currentTarget.getAttribute('data-id');
    const city_code = e.currentTarget.getAttribute('data-code');
    data.shipping_city = city;
    data.shipping_city_code = city_code;
    this.setState({
      data,
    });
  }

  handleMobileNumber({ target }) {
    if (/^[0-9]*$/gm.test(target.value)) {    
      this.setState({
        mobile_no: target.value,
      });
    } else {
      this.setState({
        mobile_no: '',
      });
    }
  }

  handleValidation({ target }) {
    const validation = this.validations.validateOnBlur({ [target.name]: target.value });
    this.setState({ validation });
  }

  handleInputChange = val => (e) => {
    let { day, month, year } = this.state;
    if (val === 'day') day = e.target.value;
    if (val === 'month') month = e.target.value;
    if (val === 'year') year = e.target.value;
    this.setState({
      day,
      month,
      year,
    });
  }

  dobSelect = (e) => {
    let { day, month, year } = this.state;
    const id = e.currentTarget.getAttribute('data-id');
    const mon = e.currentTarget.getAttribute('data-month') || 'Jan';
    const val = e.currentTarget.getAttribute('data-val');
    if (id === 'month') {
      const numberOfdays = [];
      month = mon;
      const count = moment().month(mon).daysInMonth();
      for (let i = 1; i < count + 1; i += 1) {
        numberOfdays.push(moment().month(mon).date(i).format('DD'));
      }
      this.setState({
        numberOfdays,
        monthVal: val,
      }, () => {
        if (numberOfdays.includes(day)) {
          this.setState({
            day,
          });
        } else {
          this.setState({
            day: '',
          });
        }
      });
    }
    if (id === 'day') day = val;
    if (id === 'year') year = val;
    this.setState({
      day,
      month,
      year,
    });
  }


  skipAndContinue = () => {
    const { v2NextPage } = this.props;
    this.props.skipAndContinue();
    v2NextPage();
  }

  submit = (e) => {
    e.preventDefault();
    const { v2NextPage, shippingAccount } = this.props;
    const {
      data,
      day,
      month,
      year,
      monthVal,
      mobile_no,
      mobile_country_code,
    } = this.state;
    if (day === '' && month !== '') {
      this.setState({
        showDobError: true,
        errorMsg: 'Please select day',
      });
      return;
    } else if (day !== '' && month === '') {
      this.setState({
        showDobError: true,
        errorMsg: 'Please select month',
      });
      return;
    }
    this.setState({
      showDobError: false,
      errorMsg: '',
    });

    const validation = this.validations.validate(this.state);
    if (validation.isValid) {
      const body = Object.assign({}, data, { mobile_no }, { mobile_country_code }, { dob: `${year === '' ? '1900' : year}-${monthVal}-${day}` });
      shippingAccount(body).then(() => {
        v2NextPage();
      });
    }
    this.setState({
      validation,
    });
  }

  render() {
    const {
      gender, city, mobile_no, mobile_country_code, validation, data, day,
      month, year, showDobError, errorMsg, numberOfdays, newYear,
    } = this.state;
    const { getAllCities } = this.props;
    console.log('newYear', newYear);
    return (
      <div className={`${styles['complete-login']} ${styles.flex} ${styles['justify-between']} ${styles['flex-colum']}`}>
        <div>
          <h3 className={`${styles['fs-18']} ${styles['ff-b']}`}>{LOGIN_PAGE.ALMOST_DONE}</h3>
          <div className={`${styles['thick-gry-clr']} ${styles['fs-12']}`}>{LOGIN_PAGE.CUSTOMIZE_TILA_EXPERIANCE}</div>
        </div>
        <form onSubmit={this.submit}>
        <Row className={`${styles.flex} ${styles['justify-between']}`}>
          <Col md={6}>
            <div className={` ${styles['text-lgt-gray']} ${styles['fs-12']}`}>{LOGIN_PAGE.MOBILE_NUMBER}</div>
            <div className={`${styles.flex} ${styles['country-code']}`}>
              {/* <Dropdown id="login-toggle"> */}
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
              {/* <Dropdown.Menu id="country_toggle" className={`${styles['p-0']} ${styles['m-0']}`} onClick={this.changeCountry}>
                  <Country />
                </Dropdown.Menu> */}
              {/* </Dropdown> */}
              <input
                type="text"
                name="mobile_no"
                autoComplete="off"
                value={mobile_no}
                onChange={this.handleMobileNumber}
                onBlur={this.handleValidation}
                className={`${styles['mobile-input']} ${styles['fs-14']} ${styles['ml-10']}`}
              />
            </div>
            {
                    validation.mobile_no && validation.mobile_no.isInValid ?
                      <div>
                        <span className={`${styles['error-msg']}`}>{validation.mobile_no.message}</span>
                      </div> : null
                   }
          </Col>
          <Col md={6} className={`${styles.flex} ${styles['flex-colum']}`}>
            <div className={` ${styles['text-lgt-gray']} ${styles['fs-12']}`}>{LOGIN_PAGE.SHIPPING_CITY}</div>
            <Dropdown id="login-toggle" className={`${styles['city-toggle']} ${styles.width100}`}>
              <Dropdown.Toggle id="dropdown-custom-components">
                <input
                  type="text"
                  autoComplete="off"
                  value={data.shipping_city}
                  className={`${styles['fs-14']}`}
                  onChange={this.onChangeCity}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu id="country_toggle" className={`${styles['p-0']} ${styles['m-0']} ${styles['auto-suggestions-list']}`}>
                {getAllCities && getAllCities.map((value, index) => (
                  <MenuItem data-id={value.city_name} data-code={value.city_code} onClick={this.selectCityFromSuggesstions} onFocus={this.mouseOver} eventKey={index + 1} key={value.city_name}>
                    <a className={`${styles['black-color']}`}>
                      <span>{value.city_name}</span>
                    </a>
                  </MenuItem>))
                    }
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row className={`${styles['mt-30']}`}>
          <Col md={6}>
            <div className={`${styles['fs-12']}`}>{LOGIN_PAGE.DATE_OF_BIRTH}</div>
            <div className={`${styles.flex} ${styles['mt-10']}`}>
              <Col md={3} className={`${styles['pl-0']} ${styles['pr-10']}`}>
                <div className={` ${styles['text-lgt-gray']} ${styles['fs-12']}`}>{LOGIN_PAGE.DATE}</div>
                <Dropdown id="login-toggle">
                  <Dropdown.Toggle id="dropdown-custom-components">
                    <input
                      type="text"
                      name="day"
                      readOnly
                      autoComplete="off"
                      value={day}
                      onChange={this.handleInputChange('day')}
                      placeholder="DD"
                      className={`${styles['mobile-input']}${styles['fs-14']}`}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu id="country_toggle" className={`${styles['p-0']} ${styles['m-0']} ${styles['auto-suggestions-list']}`}>
                    {numberOfdays && numberOfdays.length > 0 && numberOfdays.map((value, index) => (
                      <MenuItem data-id="day" data-val={value} onClick={this.dobSelect} onFocus={this.mouseOver} eventKey={index + 1} key={value.city_name}>
                        <a className={`${styles['black-color']}`}>
                          <span>{value}</span>
                        </a>
                      </MenuItem>))
                    }
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
                <div className={` ${styles['text-lgt-gray']} ${styles['fs-12']}`}>{LOGIN_PAGE.MONTH}</div>
                <Dropdown id="login-toggle">
                  <Dropdown.Toggle id="dropdown-custom-components">
                    <input
                      type="text"
                      name="month"
                      readOnly
                      autoComplete="off"
                      value={month}
                      placeholder="MM"
                      onChange={this.handleInputChange('month')}
                      className={`${styles['mobile-input']}${styles['fs-14']}`}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu id="country_toggle" className={`${styles['p-0']} ${styles['m-0']} ${styles['auto-suggestions-list']}`}>
                    {months.map((value, index) => (
                      <MenuItem data-id="month" data-month={value.month} data-val={value.value} onClick={this.dobSelect} onFocus={this.mouseOver} eventKey={index + 1} key={value.city_name}>
                        <a className={`${styles['black-color']}`}>
                          <span>{value.month}</span>
                        </a>
                      </MenuItem>))
                    }
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col md={5} className={`${styles['pl-0']} ${styles['pr-0']} ${styles['pr-10']}`}>
                <div className={` ${styles['text-lgt-gray']} ${styles['fs-12']}`}>{LOGIN_PAGE.YEAR}</div>
                <Dropdown id="login-toggle">
                  <Dropdown.Toggle id="dropdown-custom-components">
                    <input
                      type="text"
                      autoComplete="off"
                      readOnly
                      value={year}
                      placeholder="YYYY"
                      onChange={this.handleInputChange('year')}
                      className={`${styles['mobile-input']}${styles['fs-14']}`}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu id="country_toggle" className={`${styles['p-0']} ${styles['m-0']} ${styles['auto-suggestions-list']}`}>
                    {newYear && newYear.length > 0 && newYear.map((value, index) => (
                      <MenuItem data-id="year" data-val={value} onClick={this.dobSelect} onFocus={this.mouseOver} eventKey={index + 1} key={value.city_name}>
                        <a className={`${styles['black-color']}`}>
                          <span>{value}</span>
                        </a>
                      </MenuItem>))
                    }
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </div>
            {showDobError && <div className={`${styles['error-msg']}`}>{errorMsg}</div>}
          </Col>
          <Col md={6}>
            <div className={`${styles['text-lgt-gray']} ${styles['fs-12']}`}>{PERSONAL_INFO_MODAL.GENDER}</div>
            <div className={`${styles['mt-5']} ${styles['gender-select-main']} ${styles['flex-center']}`}>
              <div className={styles['t-c']}>
                <a onClick={this.handleGenderChange('M')}>
                  <SVGComponent clsName={`${styles['gender-select-signin']} ${data.gender === 'M' ? 'select-icon' : 'not-select-icon'}`} src="icons/common-icon/male" />
                  <span className={`${styles['fs-10']} ${data.gender === 'M' ? `${styles['black-color']} ${styles.fontW600}` : styles['label-gry-clr']}`}>{PERSONAL_INFO_MODAL.MALE}</span>
                </a>
              </div>
              <div className={`${styles['ml-20']} ${styles['t-c']}`} onClick={this.handleGenderChange('F')}>
                <a onClick={this.handleGenderChange('M')}>
                  <SVGComponent clsName={`${styles['gender-select-signin']} ${data.gender === 'F' ? 'select-icon' : 'not-select-icon'}`} src="icons/common-icon/female" />
                  <span className={`${styles['fs-10']} ${data.gender === 'F' ? `${styles['black-color']} ${styles.fontW600}` : styles['label-gry-clr']}`}>{PERSONAL_INFO_MODAL.FEMALE}</span>
                </a>
              </div>
            </div>
          </Col>
        </Row>
        </form>
        <Button
          className={`${styles['flex-center']}  ${styles.width100} ${styles['fs-14']} ${styles['text-uppercase']} ${styles['button-radius']}`}
          btnText={LOGIN_PAGE.COMPLETE_SIGN_UP}
          onClick={this.submit}
        />
        <a className={`${styles['t-c']} ${styles['fs-14']}`} onClick={this.skipAndContinue}>{LOGIN_PAGE.SKIP_AND_CONTINUE}</a>
        <span className={`${styles['m-20']} ${styles['t-c']} ${styles['fs-12']} ${styles['register-policy-gray']}`}>{LOGIN_PAGE.BY_SIGNUP_I_AGREE_TO_TERMS } <span className={`${styles['text-blue']} ${styles.fontW600}`}><a href="/en/policy/user-terms" target="_blank">{LOGIN_PAGE.T_AND_C}</a></span>, <span className={`${styles['text-blue']} ${styles.fontW600}`}><a href="/en/policy/privacy-policy" target="_blank">{LOGIN_PAGE.PRIVACY}</a></span> {LOGIN_PAGE.AND} <span className={`${styles['text-blue']} ${styles.fontW600}`}><a href="/en/policy/cookie-policy" target="_blank">{LOGIN_PAGE.COOKIE_POLICY}</a></span> {LOGIN_PAGE.NAME_TILA}</span>
      </div>
    );
  }
}


ContinueLogin.propTypes = {
  getAllCities: PropTypes.instanceOf(Array),
  autoCompleteCity: PropTypes.func,
};

ContinueLogin.defaultProps = {
  getAllCities: [],
  autoCompleteCity: f => f,
};

const mapStateToProps = store => ({
  getAllCities: selectors.getAllCities(store),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getCitiesByCountryCode: actionCreators.getCitiesByCountryCode,
    autoCompleteCity: actionCreators.autoCompleteCity,
    v2NextPage: authActionCreators.v2NextPage,
    shippingAccount: authActionCreators.shippingAccount,
    skipAndContinue: authActionCreators.skipAndContinue,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(ContinueLogin);

