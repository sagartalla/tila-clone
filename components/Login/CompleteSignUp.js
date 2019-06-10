import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Dropdown, MenuItem } from 'react-bootstrap';
import Cookie from 'universal-cookie';
import { languageDefinations } from '../../utils/lang';
import { actionCreators, selectors } from '../../store/product';
import SVGComponent from '../common/SVGComponet';
import Button from '../common/CommonButton';
import lang from '../../utils/language';
import Country from '../../components/HeaderBar/includes/Country';

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
    this.state = {
      userGender: '',
    };
  }
  componentDidMount() {
    const { getCitiesByCountryCode } = this.props;
    getCitiesByCountryCode(cookies.get('country'));
  }

  handleGenderChange = val => () => {
    this.setState({ userGender: val });
  }

  render() {
    const { userGender } = this.state;
    const { getAllCities } = this.props;
    return (
      <div className={`${styles['complete-login']} ${styles.flex} ${styles['justify-between']} ${styles['flex-colum']}`}>
        <div>
          <h3 className={`${styles['fs-22']} ${styles['mb-25']} ${styles['ff-b']}`}>{LOGIN_PAGE.ALMOST_DONE}</h3>
          <div className={`${styles['thick-gry-clr']} ${styles['fs-14']}`}>{LOGIN_PAGE.CUSTOMIZE_TILA_EXPERIANCE}</div>
        </div>
        <Row className={`${styles.flex} ${styles['justify-between']}`}>
          <Col md={6}>
            <div className={`${styles['thick-gry-clr']} ${styles['fs-14']}`}>{LOGIN_PAGE.MOBILE_NUMBER}</div>
            <div className={`${styles.flex}`}>
              <Dropdown id="search-toggle">
                <Dropdown.Toggle id="dropdown-custom-components">
                  <input
                    type="text"
                    style={{ width: '65px', marginRight: '10px' }}
                    value={this.state.displayCity}
                    className={`${styles['fs-14']} ${styles['delivery-input']}`}
                    onChange={this.onChangeCity}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu className={`${styles['p-0']} ${styles['m-0']} ${styles['img-responsive']}`}>
                  <Country />
                </Dropdown.Menu>
              </Dropdown>
              <input
                type="text"
                value={this.state.displayCity}
                className={`${styles['fs-14']} ${styles['delivery-input']}`}
                onChange={this.onChangeCity}
              />
            </div>
          </Col>
          <Col md={6} className={`${styles.flex} ${styles['flex-colum']}`}>
            <div className={`${styles['thick-gry-clr']} ${styles['fs-14']}`}>{LOGIN_PAGE.SHIPPING_CITY}</div>
            <Dropdown id="search-toggle">
              <Dropdown.Toggle id="dropdown-custom-components">
                <input
                  type="text"
                  value={this.state.displayCity}
                  className={`${styles['fs-14']} ${styles['delivery-input']}`}
                  onChange={this.onChangeCity}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu className={`${styles['p-0']} ${styles['m-0']} ${styles['auto-suggestions-list']}`}>
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
                <Dropdown id="search-toggle">
                  <Dropdown.Toggle id="dropdown-custom-components">
                    <input
                      type="text"
                      value={this.state.displayCity}
                      className={`${styles['fs-14']} ${styles['delivery-input']}`}
                      onChange={this.onChangeCity}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className={`${styles['p-0']} ${styles['m-0']} ${styles['auto-suggestions-list']}`}>
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
              <Col md={3} className={`${styles['pl-0']}`}>
              <div className={`${styles['thick-gry-clr']} ${styles['fs-14']}`}>{LOGIN_PAGE.MONTH}</div>
                <Dropdown id="search-toggle">
                  <Dropdown.Toggle id="dropdown-custom-components">
                    <input
                      type="text"
                      value={this.state.displayCity}
                      className={`${styles['fs-14']} ${styles['delivery-input']}`}
                      onChange={this.onChangeCity}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className={`${styles['p-0']} ${styles['m-0']} ${styles['auto-suggestions-list']}`}>
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
              <Col md={6} className={`${styles['pl-0']} ${styles['pr-0']}`}>
              <div className={`${styles['thick-gry-clr']} ${styles['fs-14']}`}>{LOGIN_PAGE.YEAR}</div>
                <Dropdown id="search-toggle">
                  <Dropdown.Toggle id="dropdown-custom-components">
                    <input
                      type="text"
                      value={this.state.displayCity}
                      className={`${styles['fs-14']} ${styles['delivery-input']}`}
                      onChange={this.onChangeCity}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className={`${styles['p-0']} ${styles['m-0']} ${styles['auto-suggestions-list']}`}>
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
            </div>
          </Col>
            <Col md={6}>
              <div className={`${styles['thick-gry-clr']} ${styles['fs-14']}`}>Gender</div>
              <div className={`${styles['mt-5']} ${styles['gender-select-main']} ${styles['flex-center']} ${styles['justify-evenly']}`}>
              <div className={styles['t-c']}>
                <a onClick={this.handleGenderChange('M')}>
                  <SVGComponent clsName={`${styles['gender-select-inn']} ${userGender == 'M' ? 'select-icon' : 'not-select-icon'}`} src="icons/common-icon/male" />
                  <span className={`${styles['fs-12']} ${styles['label-gry-clr']}`}>{PERSONAL_INFO_MODAL.MALE}</span>
                </a>
              </div>
              <div className={styles['t-c']} onClick={this.handleGenderChange('F')}>
                <a onClick={this.handleGenderChange('M')}>
                  <SVGComponent clsName={`${styles['gender-select-inn']} ${userGender == 'F' ? 'select-icon' : 'not-select-icon'}`} src="icons/common-icon/female" />
                  <span className={`${styles['fs-12']} ${styles['label-gry-clr']}`}>{PERSONAL_INFO_MODAL.FEMALE}</span>
                </a>
              </div>
            </div>
            </Col>
        </Row>
        <Button
          className={`${styles['flex-center']}  ${styles.width100} ${styles['fs-14']} ${styles['text-uppercase']} ${styles['button-radius']}`}
          btnText={LOGIN_PAGE.COMPLETE_SIGN_UP}
        />
      </div>
    );
  }
}


const mapStateToProps = store => ({
  getAllCities: selectors.getAllCities(store),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getCitiesByCountryCode: actionCreators.getCitiesByCountryCode,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(ContinueLogin);

