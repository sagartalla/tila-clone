import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';

import MyGMap from './MyGMap';
import styles from '../address.styl';

//TODO validations is pending. SF-28
//TODO country dropdown. SF-25
const AddressNew = props => (

  <div className={styles['addr-new-container']}>
    <Row>
      <Col md={10} sm={9} xs={9}>
        <h1>Add New Delivery Address</h1>
      </Col>

      <Col md={12} sm={12} xs={12}>
        <div>
          <MyGMap
            updateAddressFromGoogleMap={props.updateAddressFromGoogleMap}
          />
        </div>
      </Col>

      <Col md={6} sm={12} xs={12}>
        <input placeholder="First name" name="first_name" onChange={props.inputOnChange} value={props.data.first_name} className={styles.input} />
      </Col>
      <Col md={6} sm={12} xs={12}>
        <input placeholder="Last name" name="last_name" onChange={props.inputOnChange} value={props.data.last_name} className={styles.input} />
      </Col>

      <Col md={6} sm={12} xs={12}>
        <input placeholder="State" name="state" onChange={props.inputOnChange} value={props.data.state} className={styles.input} />
      </Col>
      <Col md={6} sm={12} xs={12}>
        <input placeholder="City" name="city" onChange={props.inputOnChange} value={props.data.city} className={styles.input} />
      </Col>

      <Col md={6} sm={12} xs={12}>
        <input placeholder="Flat/house no.floor/Building/" name="address_line_1" onChange={props.inputOnChange} value={props.data.address_line_1} className={styles.input} />
      </Col>

      <Col md={6} sm={12} xs={12}>
        <input placeholder="Colony/Street/Locality" name="address_line_2" onChange={props.inputOnChange} value={props.data.address_line_2} className={styles.input} />
      </Col>
      <Col md={2} sm={12} xs={12}>
        <input placeholder="Postal code" name="postal_code" onChange={props.inputOnChange} value={props.data.postal_code} className={styles.input} />
      </Col>

      <Col md={2} sm={4} xs={4}>
        <input placeholder="Country code" name="mobile_country_code" onChange={props.inputOnChange} value={props.data.mobile_country_code} className={styles.input} />
      </Col>
      <Col md={2} sm={8} xs={8}>
        <input placeholder="Mobile Number" name="mobile_no" onChange={props.inputOnChange} value={props.data.mobile_no} className={styles.input} />
      </Col>
      <Col md={6} sm={12} xs={12}>
        <Button name="home" bsStyle={props.data.address_type === 'home' ? "primary" : 'default'} onClick={props.addrTypeHandler}>HOME</Button>
        <Button name="work" bsStyle={props.data.address_type !== 'home' ? "primary" : 'default'} onClick={props.addrTypeHandler}>WORK</Button>
      </Col>

      <Col md={12} sm={12} xs={12}>
        <div className={styles['pref-loc']}>
          <input type="checkbox" onClick={props.setAsDefaultLocation} defaultChecked={props.data.default} /> My Preffered Location
        </div>
      </Col>

      <Col md={12} sm={12} xs={12}>
        <Button bsStyle="primary" onClick={props.saveBtnClickHandler} > Save and Deliver here </Button> &nbsp;
        <Button onClick={props.showAddAdrressForm}>Cancel</Button>
      </Col>

    </Row>
  </div>
);

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