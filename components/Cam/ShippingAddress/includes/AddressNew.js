import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';
import { languageDefinations } from '../../../../utils/lang/';
import SVGComponent from '../../../common/SVGComponet';
import MyGMap from './MyGMap';
import lang from '../../../../utils/language';

import styles_en from '../address_en.styl';
import styles_ar from '../address_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;

// TODO validations is pending. SF-28
// TODO country dropdown. SF-25
const AddressNew = (props) => {
  const {
    data, inputOnChange, addrTypeHandler, setAsDefaultLocation, selectCountry,
    saveBtnClickHandler, resetAddAdrressForm, countriesData, showCountriesData,
    getDataFromMap, getAllCities, selectCityFromSuggesstions, showCitiesData, validation,
  } = props;
  const { DELIVERY_ADDR_PAGE } = languageDefinations();
  return (
    <div className={`${styles['addr-new-container']} ${styles['pb-30']} ${styles['pr-30']} ${styles['pl-30']}`}>
      <div className={styles['new-addr-inn']}>
        <Row>
          <Col md={10} sm={9} xs={12}>
            <h1 className={`${styles['thick-blue']} ${styles['mb-20']} ${styles['fs-20']} ${styles.fontW300} ${styles['m-fs-16']}`}>{DELIVERY_ADDR_PAGE.ADD_NEW_ADDR_HEAD}</h1>
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
            <div className={`${styles['fp-input']} ${styles['common-input-mb']}`}>
              <input type="text" name="country_name" onChange={inputOnChange} value={data.country_name} className={styles.input} required />
              <span className={styles.highlight} />
              <span className={styles.bar} />
              <label>{DELIVERY_ADDR_PAGE.COUNTRY}</label>
              {
                <div className={`${styles['auto-suggestions-list']}`}>
                  {showCountriesData && countriesData.map(result => (
                    <div
                      key={result.country_id}
                      className={`${styles['auto-suggestions']} ${styles['bg-white']}`}
                    >
                      <div data-id={result.code3} name="shipping_country_code" onClick={selectCountry} className={`${styles.item} ${styles['fs-12']} ${styles['pl-5']} ${styles['ht-25']} ${styles.pointer}`}>{result.country_name}</div>
                    </div>
                  ))}
                </div>
              }
              {
                validation.country_name && validation.country_name.message
                  ?
                    <span className={`${styles['error-msg']}`}>{validation.country_name.message}</span>
                  :
                  null
              }
            </div>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <div
              className={`${styles['fp-input']} ${styles['common-input-mb']}`}
            >
              <input type="text" name="city" onChange={inputOnChange} value={data.city} className={styles.input} disabled={!data.shipping_country_code} required />
              <span className={styles.highlight} />
              <span className={styles.bar} />
              <label>{DELIVERY_ADDR_PAGE.CITY}</label>
              {
                <div className={`${styles['auto-suggestions-list']}`}>
                  {showCitiesData && getAllCities.map(result =>(
                    <div
                      key={result.rescity_nameult}
                      className={`${styles['auto-suggestions']} ${styles['bg-white']}`}
                    >
                      <div data-id={result.code} name="city_code" onClick={selectCityFromSuggesstions} className={`${styles.item} ${styles['fs-12']} ${styles['pl-5']} ${styles['ht-25']} ${styles.pointer}`}>{result.city_name}</div>
                    </div>
                  ))}
                </div>
              }
              {
                validation.city && validation.city.message
                  ?
                    <span className={`${styles['error-msg']}`}>{validation.city.message}</span>
                  :
                  null
              }
            </div>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <div className={`${styles['fp-input']} ${styles['common-input-mb']}`}>
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
            <div className={`${styles['fp-input']} ${styles['common-input-mb']}`}>
              <input type="text" name="postal_code" onChange={inputOnChange} value={data.postal_code} className={styles.input} required />
              <span className={styles.highlight} />
              <span className={styles.bar} />
              <label>{DELIVERY_ADDR_PAGE.PO_BOX}</label>
            </div>
          </Col>
          <Col md={2} sm={4} xs={4} className={`${styles['pr-0']}`}>
            <div className={`${styles['fp-input']} ${styles['common-input-mb']}`}>
              <input type="text" name="mobile_country_code" onChange={inputOnChange} value={data.mobile_country_code} className={styles.input} required />
              <span className={styles.highlight} />
              <span className={styles.bar} />
              <label>{DELIVERY_ADDR_PAGE.CODE}</label>
            </div>
          </Col>
          <Col md={4} sm={8} xs={8}>
            <div className={`${styles['fp-input']} ${styles['common-input-mb']}`}>
              <input type="text" name="mobile_no" onChange={inputOnChange} value={data.mobile_no} className={styles.input} required />
              <span className={styles.highlight} />
              <span className={styles.bar} />
              <label>{DELIVERY_ADDR_PAGE.MOBILE_NUMBER}</label>
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
            <Button className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-x-large']} ${styles['m-fs-11']} ${styles['m-pad-10']}`} onClick={saveBtnClickHandler} > {DELIVERY_ADDR_PAGE.SAVE_DELIVER_BTN} </Button>
            <Button className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['m-fs-11']} ${styles['ml-10']} ${styles['m-pad-10']}`} onClick={resetAddAdrressForm}>{DELIVERY_ADDR_PAGE.CANCEL}</Button>
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
