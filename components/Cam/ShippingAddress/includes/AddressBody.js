import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import SVGComponent from '../../../common/SVGComponet';
import { languageDefinations } from '../../../../utils/lang/';

import lang from '../../../../utils/language';

import styles_en from '../address_en.styl';
import styles_ar from '../address_ar.styl';


const styles = lang === 'en' ? styles_en : styles_ar;

const AddressBody = (props) => {

  const deleteAddr = (e) => {
    const confirmDelete = confirm("Are you sure you want to delete this address?");
    if (confirmDelete) {
      props.deleteAddr(e.target.id || e.target.parentNode.id)
    }
  };

  const editAddress = (e) => {
    props.editAddress(e.target.id || e.target.parentNode.id);
  }

  const makeDefaultAddress = (e) => {
    props.makeDefaultAddress(e.target.id);
  }

  const { DELIVERY_ADDR_PAGE } = languageDefinations();

  return (
    <div className={`${styles['address-body']} ${props.standalone === true ? styles['p-30'] : ''}`}>
      <Row className={`${styles['flex']} ${styles['flex-wrp']}`}>
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
                          <span className={`${styles['fontW600']} ${styles['pl-10']}`}>{DELIVERY_ADDR_PAGE.DEFAULT_ADDR}</span>
                          <span className={`${styles['default-address-icon']} ${styles['float-r']}`}><SVGComponent clsName={`${styles['default-address-icon-inn']}`} src="icons/shipping-address-icons/home-icon" /></span>
                        </span> :
                        <span>
                          <input id={val.address_id} name="addr_checkbox" type="radio" onClick={makeDefaultAddress} className={styles['radio-btn']} />
                          <span className={`${styles['fontW600']} ${styles['pl-10']}`}>{DELIVERY_ADDR_PAGE.MAKE_DEFAULT}</span>
                          <span className={`${styles['default-address-icon']} ${styles['float-r']}`}><SVGComponent clsName={`${styles['default-address-icon-inn']}`} src="icons/shipping-address-icons/appartment-icon" /></span>
                        </span>
                    }
                  </div>
                  <div className={styles['address-card-body']}>
                    <h5 className={`${styles['fontW600']} ${styles['m-0']} ${styles['mb-10']} ${styles['lgt-blue']}`}> {val.first_name + ' ' + val.last_name} </h5>
                    <address className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['full-address-details']}`} title={val.address_line_1 + ', ' + val.address_line_2 + ', ' + val.city + ', ' + val.country_name + ', ' + val.postal_code}>
                      {val.address_line_1 + ', ' + val.address_line_2 + ', ' + val.city + ', ' + val.country_name + ', ' + val.postal_code}
                    </address>
                    <span className={`${styles['address-card-phone']} ${styles['fontW600']} ${styles['lgt-blue']}`}>
                      {val.mobile_country_code + ' ' + val.mobile_no}
                    </span>
                  </div>
                  <div className={styles['address-card-actions']}>
                    <Row>
                      <Col md={6} sm={6} xs={6} className={`${styles['thck-gry-rt-border']} ${styles['flex']} ${styles['justify-center']}`}>
                        <span id={val.address_id} onClick={deleteAddr} className={`${styles['delete-icon']} ${styles['flex-center']}`}>
                          <SVGComponent clsName={`${styles['delete-icon-inn']}`} src="icons/delete-icon/delete-icon" />
                          <span className={styles['pl-5']}>{DELIVERY_ADDR_PAGE.DELETE}</span>
                        </span>
                      </Col>
                      <Col md={6} sm={6} xs={6} className={`${styles['pl-0']} ${styles['flex']} ${styles['justify-center']}`}>
                        <span id={val.address_id} onClick={editAddress} className={styles['edit-icon']}>
                          <SVGComponent clsName={`${styles['edit-icon-inn']}`} src="icons/common-icon/edit-icon" />
                          {DELIVERY_ADDR_PAGE.EDIT_ADDR}
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
          <div className={`${styles['address-card']} ${styles['address-card-new']} ${styles['p-20']}`} onClick={props.resetAddAdrressForm}>
            <div className={`${styles['flex-center']} ${styles['flex-wrap']}`}>
              <h5 className={`${styles['m-0']} ${styles['mb-10']} ${styles['thick-blue']} ${styles['fontW600']} ${styles['flex']}`}>
                <SVGComponent clsName={`${styles['pls-icon']}`} src="icons/common-icon/plus-icon" />
                <span className={styles['pl-10']}>{DELIVERY_ADDR_PAGE.ADD_NEW_ADDR}</span>
              </h5>
              <p className={`${styles['fs-12']} ${styles['thick-gry-clr']}`}>{DELIVERY_ADDR_PAGE.ADD_NEW_ADDR_TAG}</p>
              <p>
                <button className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['small-btn']}`}>
                  {DELIVERY_ADDR_PAGE.ADD_NEW_BTN}
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
  resetAddAdrressForm: PropTypes.func.isRequired,
  data: PropTypes.array
};

AddressBody.defaultProps = {
  data: []
};

export default AddressBody;
