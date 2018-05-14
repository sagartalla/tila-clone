import React from 'react';
import { Row, Col } from 'react-bootstrap';

import styles from '../address.styl';

const AddressBody = (props) => {

  //TODO clicking on <i> tag, id wont be available.
  const deleteAddr = (e) => {
    props.deleteAddr(e.target.id)
  }

  //TODO clicking on <i> tag, id wont be available.
  const editAddress = (e) => {
    props.editAddress(e.target.id)
  }

  return(
    <div className={styles['address-body']}>
      <Row>
        {
          props.data.map((val, id) => {
            return (
              <Col md={4} sm={12} xs={12} key={id}>
                <div className={styles['address-card']}>
                  <div className={styles['address-card-head']}>
                    {
                      val.default ? 
                      <span>
                        <input name="addr_checkbox" type="radio"/> Default Address
                      </span> : 
                      <span>
                        <input name="addr_checkbox" type="radio" /> Make as Default
                      </span>
                    }
                  </div>
                  <div className={styles['address-card-body']}>
                    <h5> {val.contact_name} </h5>
                    <address>
                      {val.address_line_1 +', '+ val.address_line_2 +', '+val.city+', '+val.state}
                    </address>
                    <p className={styles['address-card-phone']}>
                      {val.mobile_country_code+' '+val.mobile_no}
                    </p>
                  </div>
                  <div className={styles['address-card-actions']}>
                    <Row>
                      <Col md={4} sm={4} xs={4}>
                        <span id={val.address_id} onClick={deleteAddr}><i className="fa fa-trash"></i> Delete</span>
                      </Col>
                      <Col xs={1}> | </Col>
                      <Col md={6} sm={6} xs={6}>
                        <span id={val.address_id} onClick={editAddress}>
                          <i className="fa fa-pencil"></i> Edit Address
                        </span>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            )
          })
        }
        <Col md={4} sm={12} xs={12}>
          <div className={` ${styles['address-card']} ${styles['address-card-new']}`} onClick={props.showAddAdrressForm}>
            <div className={`${styles['flex-center']} ${styles['flex-wrap']}`}>
              <p>Add New Address</p>
              <p>Add a new network or home address where you want the orders to be delivered.</p>
              <p>Add New</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default AddressBody;