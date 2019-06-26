import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Dropdown, MenuItem } from 'react-bootstrap';
import { languageDefinations } from '../../../../utils/lang/';
import SVGComponent from '../../../common/SVGComponet';
import MyGMap from './MyGMap';
import lang from '../../../../utils/language';
import countriesImage from '../../../../constants/countries';
import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../address_en.styl';
import styles_ar from '../address_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

// TODO validations is pending. SF-28
// TODO country dropdown. SF-25
const AddressNew = (props) => {
  const {
    data, inputOnChange, addrTypeHandler, setAsDefaultLocation, selectCountry,
    saveBtnClickHandler, resetAddAdrressForm, countriesData, showCountriesData, hideTitle,
    getDataFromMap, getAllCities, selectCityFromSuggesstions, showCitiesData, validation, isEditAddr,
  } = props;
  const { DELIVERY_ADDR_PAGE } = languageDefinations();
  return (
    <div className={`${styles['addr-new-container']} ${styles['pb-30']} ${styles['pr-30']} ${styles['pl-30']}`}>
      <div className={styles['new-addr-inn']}>
        <Row>
          <Col md={10} sm={9} xs={12}>
            {!hideTitle &&
            <h1 className={`${styles['thick-blue']} ${styles['mb-20']} ${styles['fs-20']} ${styles.fontW300} ${styles['m-fs-16']}`}>
            {isEditAddr ?
                `${DELIVERY_ADDR_PAGE.EDIT} ${DELIVERY_ADDR_PAGE.DELIVERY_ADDR}`
                :
                DELIVERY_ADDR_PAGE.ADD_NEW_ADDR_HEAD
              }
            </h1>}
          </Col>

          <Col md={12} sm={12} xs={12}>
            <div>
              <MyGMap
                getDataFromMap={getDataFromMap}
                clsName="addr-map"
              />
            </div>
          </Col>

          <Col md={6} sm={12} xs={12}>
            <div className={`${styles['fp-input']} ${styles['common-input-mb']}`}>
              <input type="text" name="first_name" onChange={inputOnChange} value={data.first_name} className={styles.input} required />
              <span className={styles.highlight} />
              <span className={styles.bar} />
              <label>{DELIVERY_ADDR_PAGE.FIRST_NAME}</label>
              {
                validation.first_name && validation.first_name.message
                  ?
                    <span className={`${styles['error-msg']}`}>{validation.first_name.message}</span>
                  :
                  null
              }
            </div>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <div className={`${styles['fp-input']} ${styles['common-input-mb']}`}>
              <input type="text" name="last_name" onChange={inputOnChange} value={data.last_name} className={styles.input} required />
              <span className={styles.highlight} />
              <span className={styles.bar} />
              <label>{DELIVERY_ADDR_PAGE.LAST_NAME}</label>
              {
                validation.last_name && validation.last_name.message
                  ?
                    <span className={`${styles['error-msg']}`}>{validation.last_name.message}</span>
                  :
                  null
              }
            </div>
          </Col>
          <Col md={12} sm={12} xs={12}>
            <div className={`${styles['fp-input']} ${styles['common-input-mb']}`}>
              <input type="text"name="address_line_1" onChange={inputOnChange} value={data.address_line_1} className={styles.input} required />
              <span className={styles.highlight} />
              <span className={styles.bar} />
              <label>{DELIVERY_ADDR_PAGE.FLAT_HOUSE_NO}</label>
              {
                validation.address_line_1 && validation.address_line_1.message
                  ?
                    <span className={`${styles['error-msg']}`}>{validation.address_line_1.message}</span>
                  :
                  null
              }
            </div>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <Dropdown id="search-toggle" className={`${styles.width100}`}>
              <Dropdown.Toggle id="dropdown-custom-components">
                <div className={`${styles['mb-0']} ${styles['fp-input']}`}>
                  <input type="text" name="country_name" onChange={inputOnChange} value={data.country_name} autoComplete="off" className={styles.input} required autoComplete='off' />
                  <label>{DELIVERY_ADDR_PAGE.COUNTRY}</label>
                </div>
              </Dropdown.Toggle>
              {countriesData.length > 0 &&
                <Dropdown.Menu className={`${styles.width100} ${styles['search-container']} ${styles['p-0']} ${styles['m-0']}`}>
                  {showCountriesData && countriesData.map((result, index) => (
                    <MenuItem
                      className={styles['search-suggestion']}
                      eventKey={index + 1}
                    >
                      <a
                        className={`${styles['black-color']} ${styles['fs-12']} ${styles['pl-5']} ${styles['ht-25']} ${styles.pointer}`}
                        data-id={result.code3}
                        data-code={result.country_phone_code}
                        name="shipping_country_code"
                        onClick={selectCountry}
                      >
                        {result.country_name}
                      </a>
                    </MenuItem>
                  ))}
                </Dropdown.Menu>}
            </Dropdown>
            {(validation.shipping_country_code && validation.shipping_country_code.message) || (validation.country_name && validation.country_name.message)
              ?
                <span className={`${styles['error-msg']}`}>{validation.shipping_country_code.message || validation.country_name.message}</span>
              :
              null
            }
          </Col>
          <Col md={6} sm={12} xs={12}>
            <Dropdown disabled={!data.shipping_country_code} id="search-toggle" className={`${styles.width100}`}>
              <Dropdown.Toggle id="dropdown-custom-components">
                <div className={`${styles['mb-0']} ${styles['fp-input']}`}>
                  <input type="text" name="city" onChange={inputOnChange} value={data.city} className={styles.input} disabled={!data.shipping_country_code} required autoComplete='off'/>
                  <label>{DELIVERY_ADDR_PAGE.CITY}</label>
                </div>
              </Dropdown.Toggle>
              {getAllCities.length > 0 &&
                <Dropdown.Menu className={`${styles.width100} ${styles['search-container']} ${styles['p-0']} ${styles['m-0']}`}>
                  {showCitiesData && getAllCities.map((result, index) => (
                    <MenuItem
                      className={styles['search-suggestion']}
                      eventKey={index + 1}
                    >
                      <a
                        data-id={result.city_code}
                        name="city_code"
                        onClick={selectCityFromSuggesstions}
                        className={`${styles['black-color']} ${styles['fs-12']} ${styles['pl-5']} ${styles['ht-25']} ${styles.pointer}`}
                      >
                        {result.city_name}
                      </a>
                    </MenuItem>
                  ))}
                </Dropdown.Menu>}
            </Dropdown>
            {(validation.city && validation.city.message) || (validation.city_code && validation.city_code.message) ?
              <span className={`${styles['error-msg']}`}>{validation.city.message || validation.city_code.message}</span>
              :
              null}
          </Col>
          <Col md={6} sm={12} xs={12}>
            <div className={`${styles['fp-input']} ${styles['mt-25']} ${styles['common-input-mb']}`}>
              <input type="text" name="address_line_2" onChange={inputOnChange} value={data.address_line_2} className={styles.input} required />
              <span className={styles.highlight} />
              <span className={styles.bar} />
              <label>{DELIVERY_ADDR_PAGE.LANDMARK}</label>
              {
                validation.address_line_2 && validation.address_line_2.message
                  ?
                    <span className={`${styles['error-msg']}`}>{validation.address_line_2.message}</span>
                  :
                  null
              }
            </div>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <div className={`${styles['fp-input']} ${styles['mt-25']} ${styles['common-input-mb']}`}>
              <input type="text" name="postal_code" onChange={inputOnChange} value={data.postal_code} className={styles.input} required />
              <span className={styles.highlight} />
              <span className={styles.bar} />
              <label>{DELIVERY_ADDR_PAGE.PO_BOX}</label>
            </div>
          </Col>
          <Col md={2} sm={4} xs={4} className={`${styles['pr-0']}`}>
            <div className={`${styles['fp-input']} ${styles['common-input-mb']}`}>
              <img src={ countriesImage[data.shipping_country_code] && countriesImage[data.shipping_country_code].img} alt={""} title={data.shipping_country_code} className={styles['country-flag']}/>
              <input type="number" name="mobile_country_code" value={data.mobile_country_code} className={`${styles.input} ${styles['padded']}`} required />
              <span className={styles.highlight} />
              <span className={styles.bar} />
              <label>{DELIVERY_ADDR_PAGE.CODE}</label>
            </div>
          </Col>
          <Col md={4} sm={8} xs={8}>
            <div className={`${styles['fp-input']} ${styles['common-input-mb']}`}>
              <input type="number" name="mobile_no" onChange={inputOnChange} value={data.mobile_no} className={styles.input} required />
              <span className={styles.highlight} />
              <span className={styles.bar} />
              <label>{DELIVERY_ADDR_PAGE.MOBILE_NUMBER}</label>
              {
                validation.mobile_no && validation.mobile_no.message
                  ?
                    <span className={`${styles['error-msg']}`}>{validation.mobile_no.message}</span>
                  :
                  null
              }
            </div>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <div className={`${styles.flex} ${styles['home-work-btns']}`}>
              <Button name="home" data-name="HOME" className={`${styles['fp-btn']} ${data.address_type === 'HOME' ? `${styles['fp-btn-primary']}` : `${styles['fp-btn-default']}`} ${styles['flex-center']} ${styles['border-rt-rb-0']}`} onClick={addrTypeHandler}>
                <SVGComponent clsName={`${styles['home-icon']} ${data.address_type === 'HOME' ? 'home-active' : ''}`} src="icons/common-icon/home-icon" />
                <span className={`${styles['pl-10']}`}>{DELIVERY_ADDR_PAGE.HOME}</span>
              </Button>
              <Button name="work" data-name="WORK" className={`${styles['fp-btn']} ${data.address_type === 'WORK' ? `${styles['fp-btn-primary']}` : `${styles['fp-btn-default']}`} ${styles['flex-center']} ${styles['border-lt-lb-0']}`} onClick={addrTypeHandler}>
                <SVGComponent clsName={`${styles['work-icon']} ${data.address_type === 'WORK' ? 'work-active' : ''}`} src="icons/common-icon/work-icon" />
                <span className={`${styles['pl-10']}`}>{DELIVERY_ADDR_PAGE.WORK}</span>
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <div className={styles['new-addr-inn']}>
        <Row>
          <Col md={12} sm={12} xs={12}>
            <div className={`${styles['checkbox-material']} ${styles['mt-25']} ${styles['mb-25']}`}>
              <input id="prefer-loaction" type="checkbox" onClick={setAsDefaultLocation} defaultChecked={data.default} />
              <label htmlFor="prefer-loaction" className={`${styles.fontW300} ${styles['thick-gry-clr']} ${styles['mb-0']}`}>{DELIVERY_ADDR_PAGE.PREF_LOC}</label>
            </div>
          </Col>
          <Col md={12} sm={12} xs={12} className={styles['m-flx']}>
            <Button className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-x-large']} ${styles['m-fs-11']} ${styles['text-uppercase']} ${styles['left-radius']} ${styles['m-pad-10']}`} onClick={saveBtnClickHandler} >
              {isEditAddr ?
                DELIVERY_ADDR_PAGE.SAVE_ADDR
                :
                DELIVERY_ADDR_PAGE.SAVE_DELIVER_BTN
              }
            </Button>
            <Button className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['m-fs-11']} ${styles['ml-10']} ${styles['text-uppercase']} ${styles['left-radius']} ${styles['m-pad-10']}`} onClick={resetAddAdrressForm}>{DELIVERY_ADDR_PAGE.CANCEL}</Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

AddressNew.propTypes = {
  saveBtnClickHandler: PropTypes.func.isRequired,
  setAsDefaultLocation: PropTypes.func.isRequired,
  resetAddAdrressForm: PropTypes.func.isRequired,
  addrTypeHandler: PropTypes.func.isRequired,
  getDataFromMap: PropTypes.func.isRequired,
  inputOnChange: PropTypes.func.isRequired,
  data: PropTypes.object,
  getAllCities: PropTypes.instanceOf(Array),
  selectCityFromSuggesstions: PropTypes.func,
  showCitiesData: PropTypes.bool,
  showCountriesData: PropTypes.bool,
  selectCountry: PropTypes.func.isRequired,
  countriesData: PropTypes.instanceOf(Array),
};

AddressNew.defaultProps = {
  data: {},
  getAllCities: [],
  countriesData: [],
  selectCityFromSuggesstions: f => f,
  showCitiesData: false,
  showCountriesData: false,
};

export default AddressNew;
