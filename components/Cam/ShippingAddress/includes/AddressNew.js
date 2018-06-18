import React from 'react';
import PropTypes from 'prop-types';
import { languageDefinations } from '../../../../utils/lang/';
import { Row, Col, Button } from 'react-bootstrap';

import MyGMap from './MyGMap';
import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Cam/ShippingAddress/address');

//TODO validations is pending. SF-28
//TODO country dropdown. SF-25
const AddressNew = props => {
  const { data, inputOnChange, addrTypeHandler, setAsDefaultLocation, saveBtnClickHandler, showAddAdrressForm, updateAddressFromGoogleMap } = props;
  const { DELIVERY_ADDR_PAGE } = languageDefinations();
  return (
    <div className={styles['addr-new-container']}>
      <Row>
        <Col md={10} sm={9} xs={9}>
          <h1>{DELIVERY_ADDR_PAGE.ADD_NEW_ADDR_HEAD}</h1>
        </Col>

        <Col md={12} sm={12} xs={12}>
          <div>
            <MyGMap
              updateAddressFromGoogleMap={updateAddressFromGoogleMap}
            />
          </div>
        </Col>

        <Col md={6} sm={12} xs={12}>
          <input placeholder="First name" name="first_name" onChange={inputOnChange} value={data.first_name} className={styles.input} />
        </Col>
        <Col md={6} sm={12} xs={12}>
          <input placeholder="Last name" name="last_name" onChange={inputOnChange} value={data.last_name} className={styles.input} />
        </Col>

        <Col md={6} sm={12} xs={12}>
          <input placeholder="State" name="state" onChange={inputOnChange} value={data.state} className={styles.input} />
        </Col>
        <Col md={6} sm={12} xs={12}>
          <input placeholder="City" name="city" onChange={inputOnChange} value={data.city} className={styles.input} />
        </Col>

        <Col md={6} sm={12} xs={12}>
          <input placeholder="Flat/house no.floor/Building/" name="address_line_1" onChange={inputOnChange} value={data.address_line_1} className={styles.input} />
        </Col>

        <Col md={6} sm={12} xs={12}>
          <input placeholder="Colony/Street/Locality" name="address_line_2" onChange={inputOnChange} value={data.address_line_2} className={styles.input} />
        </Col>
        <Col md={2} sm={12} xs={12}>
          <input placeholder="Postal code" name="postal_code" onChange={inputOnChange} value={data.postal_code} className={styles.input} />
        </Col>

        <Col md={2} sm={4} xs={4}>
          <input placeholder="Country code" name="mobile_country_code" onChange={inputOnChange} value={data.mobile_country_code} className={styles.input} />
        </Col>
        <Col md={2} sm={8} xs={8}>
          <input placeholder="Mobile Number" name="mobile_no" onChange={inputOnChange} value={data.mobile_no} className={styles.input} />
        </Col>
        <Col md={6} sm={12} xs={12}>
          <Button name="home" bsStyle={data.address_type === 'home' ? "primary" : 'default'} onClick={addrTypeHandler}>{DELIVERY_ADDR_PAGE.HOME}</Button>
          <Button name="work" bsStyle={data.address_type !== 'home' ? "primary" : 'default'} onClick={addrTypeHandler}>{DELIVERY_ADDR_PAGE.WORK}</Button>
        </Col>

        <Col md={12} sm={12} xs={12}>
          <div className={styles['pref-loc']}>
            <input type="checkbox" onClick={setAsDefaultLocation} defaultChecked={data.default} /> {DELIVERY_ADDR_PAGE.PREF_LOC}
          </div>
        </Col>

        <Col md={12} sm={12} xs={12}>
          <Button bsStyle="primary" onClick={saveBtnClickHandler} > {DELIVERY_ADDR_PAGE.SAVE_DELIVER_BTN} </Button> &nbsp;
          <Button onClick={showAddAdrressForm}>{DELIVERY_ADDR_PAGE.CANCEL}</Button>
        </Col>

      </Row>
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
