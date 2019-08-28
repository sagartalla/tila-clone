import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import SVGComponent from '../../../common/SVGComponet';
import { languageDefinations } from '../../../../utils/lang/';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../address_en.styl';
import styles_ar from '../address_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const AddressBody = (props) => {
  const deleteAddr = (e) => {
    const confirmDelete = confirm('Are you sure you want to delete this address?');
    if (confirmDelete) {
      props.deleteAddr(e.currentTarget.id);
    }
  };

  const editAddress = e => props.editAddress(e.currentTarget.id);

  const makeDefaultAddress = e => props.makeDefaultAddress(e.target.id);

  const selectDeliverToAddress = e => props.selectDeliverToAddress(e.target.id);

  const { DELIVERY_ADDR_PAGE } = languageDefinations();

  return (
    <div className={`${styles['address-body']} ${props.standalone === true ? styles['p-30'] : ''}`}>
      <Row className={`${styles.flex} ${styles['flex-wrp']}`}>
        {
          props.data && props.data.map((val, id) => {
            const isDefault = val.default;
            const isSelected = val.address_id === (props.selectedAddress || {}).address_id
            const colLength = props.isPaymentPage && !isDefault ? 4 : 6;
            return (
              <Col md={4} sm={12} xs={12} key={id}>
                <div className={`${styles['address-card']} ${isSelected ? styles['address-selected'] : ''}`}>
                  <div className={styles['address-card-head']}>
                    {props.isPaymentPage ?
                      <span>
                        <input id={val.address_id} name="addr_checkbox" type="radio" defaultChecked={isSelected} className={styles['radio-btn']} onClick={selectDeliverToAddress} />
                        <span className={`${styles['fs-14']} ${styles['thick-gry-clr']} ${styles['pl-10']} ${styles['delivart-active']}`}>{DELIVERY_ADDR_PAGE.DELIVER_TO} {val.first_name}</span>
                        {/* <span className={`${styles['default-address-icon']} ${styles['float-r']}`}><SVGComponent clsName={`${styles['default-address-icon-inn']}`} src="icons/shipping-address-icons/home-icon" /></span> */}
                      </span>
                      :
                      isDefault ?
                        <span>
                          <input id={val.address_id} name="addr_checkbox" type="radio" defaultChecked={isDefault} className={styles['radio-btn']} />
                          <span className={`${styles.fontW600} ${styles['pl-10']}`}>{DELIVERY_ADDR_PAGE.DEFAULT_ADDR}</span>
                          {/* <span className={`${styles['default-address-icon']} ${styles['float-r']}`}><SVGComponent clsName={`${styles['default-address-icon-inn']}`} src="icons/shipping-address-icons/home-icon" /></span> */}
                        </span> :
                        <span>
                          <input id={val.address_id} name="addr_checkbox" type="radio" onClick={makeDefaultAddress} className={styles['radio-btn']} />
                          <span className={`${styles.fontW600} ${styles['pl-10']}`}>{DELIVERY_ADDR_PAGE.MAKE_DEFAULT}</span>
                          {/* <span className={`${styles['default-address-icon']} ${styles['float-r']}`}><SVGComponent clsName={`${styles['default-address-icon-inn']}`} src="icons/shipping-address-icons/appartment-icon" /></span> */}
                        </span>
                    }
                  </div>
                  <div className={styles['address-card-body']}>
                    <h4 className={`${styles['m-0']} ${styles['mb-10']} ${styles['fs-14']} ${styles['fontW600']} ${styles.ellipsis}`} title={`${val.first_name} ${val.last_name}`}>{`${val.first_name} ${val.last_name}`}</h4>
                    <address className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['full-address-details']}`} title={`${val.address_line_1}, ${val.address_line_2}, ${val.city}, ${val.country_name}, ${val.postal_code}`}>
                      {`${val.address_line_1}, ${val.address_line_2}, ${val.city}, ${val.country_name}, ${val.postal_code}`}
                    </address>
                    <span className={`${styles['address-card-phone']} ${styles['flx-space-bw']} ${styles['align-center']}`}>
                      <span style={{direction: 'ltr'}}>{`${val.mobile_country_code} ${val.mobile_no}`}</span>
                          <span className={`${styles['work-list']}`}>{`${val.address_type}`}</span>
                    </span>
                  </div>
                  <div className={`${styles['address-card-actions']} ${styles['fs-12']}`}>
                    <Row>
                      <Col md={colLength} sm={colLength} xs={colLength} className={`${styles['thck-gry-rt-border']} ${styles['delete-action']} ${styles.flex} ${styles['justify-center']}`}>
                        <span id={val.address_id} onClick={deleteAddr} className={`${styles.pointer} ${styles['delete-icon']} ${styles['flex-center']}`}>
                          <SVGComponent clsName={`${styles['delete-icon-inn']}`} src="icons/delete-icon/delete-icon" />
                          <span className={styles['pl-5']}>{DELIVERY_ADDR_PAGE.DELETE}</span>
                        </span>
                      </Col>
                      <Col md={colLength} sm={colLength} xs={colLength} className={`${styles['pl-0']} ${styles['edit-action']} ${styles.flex} ${styles['justify-center']}`}>
                        <span id={val.address_id} onClick={editAddress} className={`${styles['edit-icon']} ${styles.pointer}`}>
                          <SVGComponent clsName={`${styles['edit-icon-inn']}`} src="icons/common-icon/edit-icon" />
                          {DELIVERY_ADDR_PAGE.EDIT}
                        </span>
                      </Col>
                      {
                          props.isPaymentPage && !isDefault ?
                            <Col md={colLength} sm={colLength} xs={colLength} className={`${styles['pl-0']} ${styles['edit-action']} ${styles['flex']} ${styles['justify-center']}`}>
                              <span id={val.address_id} onClick={makeDefaultAddress} className={`${styles['edit-icon']} ${styles.pointer}`}>
                                {DELIVERY_ADDR_PAGE.MAKE_DEFAULT}
                              </span>
                            </Col>
                          :
                            null
                      }
                    </Row>
                  </div>
                </div>
              </Col>
            );
          })
        }
        <Col md={4} sm={12} xs={12}>
          <div onClick={props.addAddressForm} className={`${styles['address-card']} ${styles['address-card-new']} ${styles['pointer']} ${styles['p-30']}`}>
            <div className={`${styles['flex-center']} ${styles['flex-wrap']} ${styles['flex-colum']}`}>
              <span className={`${styles['flex-center']}`}>
                <SVGComponent clsName={`${styles['pls-icon']}`} src="icons/common-icon/plus-icon" />
              </span>
              <h4 className={`${styles['mb-10']} ${styles['mt-20']} ${styles['pb-5']}  ${styles['black-color']} ${styles['fs-14']} ${styles.fontW600} ${styles['flex-center']} ${styles.flex}`}>
                <span className={styles['pl-10']}>{DELIVERY_ADDR_PAGE.ADD_NEW_ADDR}</span>
              </h4>
              <p className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['card-new-desb']}`}>{DELIVERY_ADDR_PAGE.ADD_NEW_ADDR_TAG}</p>
              {/* <p>
                <button className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['text-uppercase']} ${styles['left-radius']} ${styles['small-btn']}`} onClick={props.addAddressForm}>
                  {DELIVERY_ADDR_PAGE.ADD_NEW_BTN}
                </button>
              </p> */}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

AddressBody.propTypes = {
  data: PropTypes.instanceOf(Array),
  deleteAddr: PropTypes.func.isRequired,
  editAddress: PropTypes.func.isRequired,
  makeDefaultAddress: PropTypes.func.isRequired,
  selectDeliverToAddress: PropTypes.func.isRequired,
};

AddressBody.defaultProps = {
  data: [],
};

export default AddressBody;
