import React from 'react';
import { Row, Col} from 'react-bootstrap';

import Button from '../../Common/Button';

import styles from '../address.styl';

const AddressHeader = props => (

  <div className={` ${styles['addr-new-container']} ${props.showNewAddr ? '': styles['hide']}`}>
    <Row>
      <Col md={10} sm={9} xs={9}>
        <h1>Add New Delivery Address</h1>
      </Col>

      <Col md={12} sm={12} xs={12}>
        <div className={styles['map']}></div>
      </Col>
      
      <Col md={6} sm={12} xs={12}>
        <input placeholder="First name" name="fName" onChange={props.inputOnChange} default={props.data.fname} className={styles.input}/>
      </Col>
      <Col md={6} sm={12} xs={12}>
        <input placeholder="Last name" name="lName" onChange={props.inputOnChange} default={props.data.lName} className={styles.input}/>
      </Col>

      <Col md={6} sm={12} xs={12}>
        <input placeholder="City"  name="city" onChange={props.inputOnChange} default={props.data.city} className={styles.input}/>
      </Col>
      <Col md={6} sm={12} xs={12}>
        <input placeholder="Colony/Street/Locality" name="colony" onChange={props.inputOnChange} default={props.data.colony} className={styles.input}/>
      </Col>

      <Col md={6} sm={12} xs={12}>
        <input placeholder="Street name" name="street_name" onChange={props.inputOnChange} default={props.data.street_name} className={styles.input}/>
      </Col>
      <Col md={6} sm={12} xs={12}>
        <input placeholder="Flat/house no.floor/Building" name="flat" onChange={props.inputOnChange} default={props.data.flat} className={styles.input}/>
      </Col>

      <Col md={6} sm={12} xs={12}>
        <input placeholder="Mobile Number" name="mob" onChange={props.inputOnChange} default={props.data.mob} className={styles.input}/>
      </Col>
      <Col md={6} sm={12} xs={12}>
        <Button btnText="HOME" /><Button btnText="WORK" />
      </Col>

      <Col md={12} sm={12} xs={12}>
        <div className={styles['pref-loc']}>
          <input type="checkbox" /> My Preffered Location
        </div>
      </Col>

      <Col md={12} sm={12} xs={12}>
        <Button BtnClickHandler={props.saveBtnClickHandler} btnText="Save and Deliver here" /> &nbsp;
        <Button btnText="Cancel" />
      </Col>

    </Row>
  </div>
);


export default AddressHeader;