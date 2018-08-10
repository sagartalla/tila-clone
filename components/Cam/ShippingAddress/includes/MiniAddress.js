import React from 'react';

import { languageDefinations } from '../../../../utils/lang/';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Cam/ShippingAddress/address');
const { DELIVERY_ADDR_PAGE } = languageDefinations();

const MiniAddress = (props) => {
  const { data, showAddAdrressForm } = props;
  const makeDefaultAddress = (e) => {
    props.makeDefaultAddress(e.currentTarget.id);
  }
  return (
    <div className={`${styles['absolute']} ${styles['bg-white']} ${styles['min-address-part']}`}>
      <div className={styles['min-address-list']}>
        {
          data && data.map((val, id) => {
            return (
              <div key={id} id={val.address_id} className={`${styles['flex']} ${styles['flex-colum']} ${styles['p-10-20']} ${styles['min-address-part-inn']} ${styles['pointer']}`} onClick={makeDefaultAddress}>
                <h5 className={`${styles['fontW600']} ${styles['m-0']} ${styles['mb-5']} ${styles['thick-gry-clr']}`}> {val.first_name + ' ' + val.last_name} </h5>
                <address className={`${styles['fs-12']} ${styles['mb-0']} ${styles['full-address-details']} ${styles['label-gry-clr']}`}>
                  {val.address_line_1 + ', ' + val.address_line_2 + ', ' + val.city + ', ' + val.country_name}
                </address>
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

