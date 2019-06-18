import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Dropdown, MenuItem } from 'react-bootstrap';
import Cookie from 'universal-cookie';
import PropTypes from 'prop-types';
import { languageDefinations } from '../../utils/lang';
import { actionCreators, selectors } from '../../store/product';
import { actionCreators as authActionCreators, selectors as authSelectors } from '../../store/auth';
import SVGComponent from '../common/SVGComponet';
import Button from '../common/CommonButton';
import lang from '../../utils/language';
import Country from '../../components/HeaderBar/includes/Country';
import countriesData from '../../constants/countries';
import FormValidator from '../common/FormValidator';
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
        message: 'Entered mobile number is invalid',
      },
    ]);
    this.state = {
      gender: '',
      city: '',
      city_code: '',
      dob: {
        day: '',
        month: '',
        year: '',
      },
      mobile_no: '',
      mobile_country_code: '966',
      validation: this.validations.valid(),
    };
    this.onChangeCity = this.onChangeCity.bind(this);
    this.selectCityFromSuggesstions = this.selectCityFromSuggesstions.bind(this);
  }
  componentDidMount() {
    const { getCitiesByCountryCode } = this.props;
    getCitiesByCountryCode(cookies.get('country'));
  }

  onChangeCity(e) {
    const { autoCompleteCity } = this.props;
    const city = e.target.value;
    this.setState({
      city,
    }, () => {
      autoCompleteCity(displayCity);
    });
  }
  handleGenderChange = val => () => {
    this.setState({ gender: val });
  }


  mobileValidation = (fieldValue) => {
    if (fieldValue === '') {
      return false;
    } else if (fieldValue && fieldValue.length > 7 && fieldValue && fieldValue.length < 12) {
      return false;
    }
    return true;
  }

  selectCityFromSuggesstions(e) {
    const city = e.currentTarget.getAttribute('data-id');
    const city_code = e.currentTarget.getAttribute('data-id');
    this.setState({
      city,
      city_code,
    });
  }

  handleMobileNumber = (e) => {
    this.setState({
      mobile_no: e.target.value,
    });
  }

  handleInputChange = val => (e) => {
    const { dob } = this.state;
    if (val === 'day') dob.day = e.target.value;
    if (val === 'month') dob.month = e.target.value;
    if (val === 'year') dob.year = e.target.value;
    this.setState({
      dob,
    });
  }

  dobSelect = (e) => {
    const { dob } = this.state;
    const id = e.currentTarget.getAttribute('data-id');
    const val = e.currentTarget.getAttribute('data-val');
    if (id === 'day') dob.day = val;
    if (id === 'month') dob.month = val;
    if (id === 'year') dob.year = val;
    this.setState({
      dob,
    });
  }

  skipAndContinue = () => {
    const { v2NextPage } = this.props;
    v2NextPage();
  }

  submit = () => {
    const { v2NextPage, shippingAccount } = this.props;
    const {
      gender,
      city,
      city_code,
      dob,
      mobile_no,
      mobile_country_code,
    } = this.state;
    const validation = this.validations.validate(this.state);
    if (validation.isValid) {
      shippingAccount().then((res) => {
        v2NextPage();
      });
    }
    this.setState({
      validation,
    });
  }

  render() {
    const {
      gender, city, dob, mobile_no, mobile_country_code, validation,
    } = this.state;
    const { getAllCities } = this.props;
    console.log('dob', dob);
    return (
      <div className={`${styles['complete-login']} ${styles.flex} ${styles['justify-between']} ${styles['flex-colum']}`}>
        <div>
          <h3 className={`${styles['fs-18']} ${styles['ff-b']}`}>{LOGIN_PAGE.ALMOST_DONE}</h3>
          <div className={`${styles['thick-gry-clr']} ${styles['fs-12']}`}>{LOGIN_PAGE.CUSTOMIZE_TILA_EXPERIANCE}</div>
        </div>
        <Row className={`${styles.flex} ${styles['justify-between']}`}>
          <Col md={6}>
            <div className={`${styles['thick-gry-clr']} ${styles['fs-14']}`}>{LOGIN_PAGE.MOBILE_NUMBER}</div>
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
                value={mobile_no}
                onChange={this.handleMobileNumber}
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
            <div className={`${styles['thick-gry-clr']} ${styles['fs-14']}`}>{LOGIN_PAGE.SHIPPING_CITY}</div>
            <Dropdown id="login-toggle" className={`${styles['city-toggle']} ${styles.width100}`}>
              <Dropdown.Toggle id="dropdown-custom-components">
                <input
                  type="text"
                  value={city}
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
        <Row>
          <Col md={6}>
            <div>{LOGIN_PAGE.DATE_OF_BIRTH}</div>
            <div className={`${styles.flex} ${styles['mt-20']}`}>
              <Col md={3} className={`${styles['pl-0']}`}>
                <div className={`${styles['thick-gry-clr']} ${styles['fs-14']}`}>{LOGIN_PAGE.DATE}</div>
                <Dropdown id="login-toggle">
                  <Dropdown.Toggle id="dropdown-custom-components">
                    <input
                      type="text"
                      value={dob.day}
                      onChange={this.handleInputChange('day')}
                      placeholder="DD"
                      className={`${styles['mobile-input']}${styles['fs-14']}`}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu id="country_toggle" className={`${styles['p-0']} ${styles['m-0']} ${styles['auto-suggestions-list']}`}>
                    {[0, 30].map((value, index) => (
                      <MenuItem data-id="day" data-val={value} onClick={this.dobSelect} onFocus={this.mouseOver} eventKey={index + 1} key={value.city_name}>
                        <a className={`${styles['black-color']}`}>
                          <span>{value}</span>
                        </a>
                      </MenuItem>))
                    }
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col md={4} className={`${styles['pl-0']}`}>
                <div className={`${styles['thick-gry-clr']} ${styles['fs-14']}`}>{LOGIN_PAGE.MONTH}</div>
                <Dropdown id="login-toggle">
                  <Dropdown.Toggle id="dropdown-custom-components">
                    <input
                      type="text"
                      value={dob.month}
                      placeholder="MM"
                      onChange={this.handleInputChange('month')}
                      className={`${styles['mobile-input']}${styles['fs-14']}`}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu id="country_toggle" className={`${styles['p-0']} ${styles['m-0']} ${styles['auto-suggestions-list']}`}>
                    {[0, 12].map((value, index) => (
                      <MenuItem data-id="month" data-val={value} onClick={this.dobSelect} onFocus={this.mouseOver} eventKey={index + 1} key={value.city_name}>
                        <a className={`${styles['black-color']}`}>
                          <span>{value}</span>
                        </a>
                      </MenuItem>))
                    }
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col md={5} className={`${styles['pl-0']} ${styles['pr-0']}`}>
                <div className={`${styles['thick-gry-clr']} ${styles['fs-14']}`}>{LOGIN_PAGE.YEAR}</div>
                <Dropdown id="login-toggle">
                  <Dropdown.Toggle id="dropdown-custom-components">
                    <input
                      type="text"
                      value={dob.year}
                      placeholder="YYYY"
                      onChange={this.handleInputChange('year')}
                      className={`${styles['mobile-input']}${styles['fs-14']}`}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu id="country_toggle" className={`${styles['p-0']} ${styles['m-0']} ${styles['auto-suggestions-list']}`}>
                    {[2018, 2019].map((value, index) => (
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
          </Col>
          <Col md={6}>
            <div className={`${styles['thick-gry-clr']} ${styles['fs-14']}`}>{PERSONAL_INFO_MODAL.GENDER}</div>
            <div className={`${styles['mt-5']} ${styles['gender-select-main']} ${styles['flex-center']}`}>
              <div className={styles['t-c']}>
                <a onClick={this.handleGenderChange('M')}>
                  <SVGComponent clsName={`${styles['gender-select-inn']} ${gender === 'M' ? 'select-icon' : 'not-select-icon'}`} src="icons/common-icon/male" />
                  <span className={`${styles['fs-12']} ${gender === 'M' ? `${styles['black-color']} ${styles.fontW600}` : styles['label-gry-clr']}`}>{PERSONAL_INFO_MODAL.MALE}</span>
                </a>
              </div>
              <div className={`${styles['ml-20']} ${styles['t-c']}`} onClick={this.handleGenderChange('F')}>
                <a onClick={this.handleGenderChange('M')}>
                  <SVGComponent clsName={`${styles['gender-select-inn']} ${gender === 'F' ? 'select-icon' : 'not-select-icon'}`} src="icons/common-icon/female" />
                  <span className={`${styles['fs-12']} ${gender === 'F' ? `${styles['black-color']} ${styles.fontW600}` : styles['label-gry-clr']}`}>{PERSONAL_INFO_MODAL.FEMALE}</span>
                </a>
              </div>
            </div>
          </Col>
        </Row>
        <Button
          className={`${styles['flex-center']}  ${styles.width100} ${styles['fs-14']} ${styles['text-uppercase']} ${styles['button-radius']}`}
          btnText={LOGIN_PAGE.COMPLETE_SIGN_UP}
          onClick={this.submit}
        />
        <a className={`${styles['t-c']} ${styles['mb-20']}`} onClick={this.skipAndContinue}>{LOGIN_PAGE.SKIP_AND_CONTINUE}</a>
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
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(ContinueLogin);

