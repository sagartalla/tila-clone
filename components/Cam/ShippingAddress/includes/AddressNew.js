import React from 'react';
import PropTypes from 'prop-types';
import { languageDefinations } from '../../../../utils/lang/';
import { Row, Col, Button } from 'react-bootstrap';
import SVGComponent from '../../../common/SVGComponet';
import MyGMap from './MyGMap';
import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Cam/ShippingAddress/address');

//TODO validations is pending. SF-28
//TODO country dropdown. SF-25
const AddressNew = props => {
  const { data, inputOnChange, addrTypeHandler, setAsDefaultLocation, saveBtnClickHandler, showAddAdrressForm, updateAddressFromGoogleMap } = props;
  const { DELIVERY_ADDR_PAGE } = languageDefinations();
  return (
    <div className={`${styles['addr-new-container']} ${styles['pb-30']} ${styles['pr-30']} ${styles['pl-30']}`}>
      <div className={styles['new-addr-inn']}>
        <Row>
          <Col md={10} sm={9} xs={9}>
            <h1 className={`${styles['thick-blue']} ${styles['mb-20']} ${styles['fs-20']} ${styles['fontW300']}`}>{DELIVERY_ADDR_PAGE.ADD_NEW_ADDR_HEAD}</h1>
          </Col>

          <Col md={12} sm={12} xs={12}>
            <div>
              <MyGMap
                updateAddressFromGoogleMap={updateAddressFromGoogleMap}
              />
            </div>
          </Col>

          <Col md={6} sm={12} xs={12}>
            <div className={`${styles['fp-input']}`}>
              <input type="text" name="first_name" onChange={inputOnChange} value={data.first_name} className={styles.input} required />
              <span className={styles['highlight']}></span>
              <span className={styles['bar']}></span>
              <label>First Name</label>
            </div>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <div className={`${styles['fp-input']}`}>
              <input type="text" name="last_name" onChange={inputOnChange} value={data.last_name} className={styles.input} required />
              <span className={styles['highlight']}></span>
              <span className={styles['bar']}></span>
              <label>Last Name</label>
            </div>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <div className={`${styles['fp-input']}`}>
              <input type="text" name="state" onChange={inputOnChange} value={data.state} className={styles.input} required />
              <span className={styles['highlight']}></span>
              <span className={styles['bar']}></span>
              <label>State</label>
            </div>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <div className={`${styles['fp-input']}`}>
              <input type="text" name="city" onChange={inputOnChange} value={data.city} className={styles.input} required />
              <span className={styles['highlight']}></span>
              <span className={styles['bar']}></span>
              <label>City</label>
            </div>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <div className={`${styles['fp-input']}`}>
              <input type="text"name="address_line_1" onChange={inputOnChange} value={data.address_line_1} className={styles.input} required />
              <span className={styles['highlight']}></span>
              <span className={styles['bar']}></span>
              <label>Flat/house no.floor/Building/</label>
            </div>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <div className={`${styles['fp-input']}`}>
              <input type="text" name="address_line_2" onChange={inputOnChange} value={data.address_line_2} className={styles.input} required />
              <span className={styles['highlight']}></span>
              <span className={styles['bar']}></span>
              <label>Colony/Street/Locality</label>
            </div>
          </Col>
          <Col md={2} sm={12} xs={12}>
            <div className={`${styles['fp-input']}`}>
              <input type="text" name="postal_code" onChange={inputOnChange} value={data.postal_code} className={styles.input} required />
              <span className={styles['highlight']}></span>
              <span className={styles['bar']}></span>
              <label>Postal code</label>
            </div>
          </Col>
          <Col md={1} sm={4} xs={4} className={`${styles['pl-0']} ${styles['pr-0']}`}>
            <div className={`${styles['fp-input']}`}>
              <input type="text" name="mobile_country_code" onChange={inputOnChange} value={data.mobile_country_code} className={styles.input} required />
              <span className={styles['highlight']}></span>
              <span className={styles['bar']}></span>
              <label>Code</label>
            </div>
          </Col>
          <Col md={3} sm={8} xs={8}>
            <div className={`${styles['fp-input']}`}>
              <input type="text" name="mobile_no" onChange={inputOnChange} value={data.mobile_no} className={styles.input} required />
              <span className={styles['highlight']}></span>
              <span className={styles['bar']}></span>
              <label>Mobile Number</label>
            </div>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <div className={`${styles['flex']} ${styles['home-work-btns']}`}>
              <Button name="home" className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['flex-center']} ${styles['border-rt-rb-0']}`} onClick={addrTypeHandler}>
                <SVGComponent clsName={`${styles['home-icon']}`} src="icons/common-icon/home-icon" />
                <span className={`${styles['pl-10']}`}>{DELIVERY_ADDR_PAGE.HOME}</span>
              </Button>
              <Button name="work" className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['flex-center']} ${styles['border-lt-lb-0']}`} onClick={addrTypeHandler}>
                <SVGComponent clsName={`${styles['work-icon']}`} src="icons/common-icon/work-icon" />
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
              <label for="prefer-loaction" className={`${styles['fontW300']} ${styles['thick-gry-clr']} ${styles['mb-0']}`}>{DELIVERY_ADDR_PAGE.PREF_LOC}</label>
            </div>
          </Col>
          <Col md={12} sm={12} xs={12}>
            <Button className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-x-large']} ${styles['text-uppercase']}`} onClick={saveBtnClickHandler} > {DELIVERY_ADDR_PAGE.SAVE_DELIVER_BTN} </Button>
            <Button className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['text-uppercase']} ${styles['ml-10']} `} onClick={showAddAdrressForm}>{DELIVERY_ADDR_PAGE.CANCEL}</Button>
          </Col>
        </Row>
      </div>
    </div>
  )
}

AddressNew.propTypes = {
  saveBtnClickHandler: PropTypes.func.isRequired,
  setAsDefaultLocation: PropTypes.func.isRequired,
  addrTypeHandler: PropTypes.func.isRequired,
  updateAddressFromGoogleMap: PropTypes.func.isRequired,
  inputOnChange: PropTypes.func.isRequired,
  data: PropTypes.object
};

AddressNew.defaultProps = {
  data: {}
};

export default AddressNew;
