import React from 'react';
import { Row, Col } from 'react-bootstrap';

import { languageDefinations } from '../../../../utils/lang/';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Cam/ShippingAddress/address');
const { DELIVERY_ADDR_PAGE } = languageDefinations();

const MiniAddress = (props) => {
  const { data, showAddAdrressForm } = props;
  const makeDefaultAddress = (e) => {
    props.makeDefaultAddress(e.target.id);
  }
  return (
    <div className={`${styles['absolute']} ${styles['bg-white']} ${styles['min-address-part']}`}>
      <div className={styles['min-address-list']}>
        {
          data && data.map((val, id) => {
            return (
              <div key={id} className={`${styles['flex']} ${styles['p-10']} ${styles['min-address-part-inn']}`}>
                <div className={styles['address-radio-btn']}>
                  {
                    val.default ?
                      <span>
                        <input id={val.address_id} name="addr_checkbox" type="radio" defaultChecked={val.default} className={styles['radio-btn']} />
                      </span> :
                      <span>
                        <input id={val.address_id} name="addr_checkbox" type="radio" onClick={makeDefaultAddress} className={styles['radio-btn']} />
                      </span>
                  }
                </div>
                <div>
                  <h5 className={`${styles['fontW600']} ${styles['m-0']} ${styles['mb-10']} ${styles['thick-gry-clr']}`}> {val.first_name + ' ' + val.last_name} </h5>
                  <address className={`${styles['fs-12']} ${styles['mb-0']} ${styles['full-address-details']} ${styles['label-gry-clr']}`}>
                    {val.address_line_1 + ', ' + val.address_line_2 + ', ' + val.city + ', ' + val.state}
                  </address>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className={`${styles['flex']} ${styles['justify-center']} ${styles['p-10']} ${styles['add-new-addres']}`}>
        <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-large']}`} onClick={showAddAdrressForm}> {DELIVERY_ADDR_PAGE.ADD_NEW_BTN} </button>
      </div>
    </div>
  )
}
export default MiniAddress;

