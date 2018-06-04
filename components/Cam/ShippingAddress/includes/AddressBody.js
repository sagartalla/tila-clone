import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import styles from '../address.styl';

const AddressBody = (props) => {

  const deleteAddr = (e) => {
    props.deleteAddr(e.target.id || e.target.parentNode.id)
  }

  const editAddress = (e) => {
    props.editAddress(e.target.id || e.target.parentNode.id);
  }

  const makeDefaultAddress = (e) => {
    props.makeDefaultAddress(e.target.id);
  }

  return (
    <div className={`${styles['address-body']} ${props.standalone === true ? styles['p-32'] : ''}`}>
      <Row>
        {
          props.data && props.data.map((val, id) => {
            return (
              <Col md={4} sm={12} xs={12} key={id}>
                <div className={`${styles['address-card']} ${val.default ? styles['address-selected'] : ''}`}>
                  <div className={styles['address-card-head']}>
                    {
                      val.default ?
                        <span>
                          <input id={val.address_id} name="addr_checkbox" type="radio" defaultChecked={val.default} className={styles['radio-btn']} /> 
                          <span className={`${styles['lgt-black']} ${styles['fs-12']} ${styles['fontW600']} ${styles['pl-5']}`}>Default Address</span>
                      </span> :
                        <span>
                          <input id={val.address_id} name="addr_checkbox" type="radio" onClick={makeDefaultAddress} className={styles['radio-btn']} />
                          <span className={`${styles['black']} ${styles['fs-12']} ${styles['fontW600']} ${styles['pl-5']}`}>Make as Default</span>
                      </span>
                    }
                  </div>
                  <div className={styles['address-card-body']}>
                    <h6 className={`${styles['fontW600']} ${styles['m-0']} ${styles['mb-10']} ${styles['black-color']}`}> {val.first_name + ' ' + val.last_name} </h6>
                    <address>
                      {val.address_line_1 + ', ' + val.address_line_2 + ', ' + val.city + ', ' + val.state}
                    </address>
                    <p className={`${styles['address-card-phone']} ${styles['fontW600']} ${styles['black-color']}`}>
                      {val.mobile_country_code + ' ' + val.mobile_no}
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
              <h5 className={`${styles['m-0']} ${styles['mb-10']} ${styles['thick-blue']} ${styles['fontW600']}`}>Add New Address</h5>
              <p>Add a new network or home address where you want the orders to be delivered.</p>
              <p>
                <button className={`${styles['fp-btn']} ${styles['border-blue-btn']}  ${styles['fs-12']}`}>
                  Add New
                </button>
                </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

AddressBody.propTypes = {
  deleteAddr: PropTypes.func.isRequired,
  editAddress: PropTypes.func.isRequired,
  makeDefaultAddress: PropTypes.func.isRequired,
  data: PropTypes.array
};

AddressBody.defaultProps = {
  data: []
};

export default AddressBody;