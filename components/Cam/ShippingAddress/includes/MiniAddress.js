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
    <div>
      <h6>Saved Locations</h6>
      {
        data && data.map((val, id) => {
          return (
            <div key={id} className={styles['flex']}>
              <div>
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
                <h5 className={`${styles['fontW600']} ${styles['m-0']} ${styles['mb-10']} ${styles['lgt-blue']}`}> {val.first_name + ' ' + val.last_name} </h5>
                <address className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['full-address-details']}`}>
                  {val.address_line_1 + ', ' + val.address_line_2 + ', ' + val.city + ', ' + val.state}
                </address>
              </div>
            </div>
          )
        })
      }
      <Col md={12}>
        <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']}`} onClick={showAddAdrressForm}> {DELIVERY_ADDR_PAGE.ADD_NEW_BTN} </button>
      </Col>
    </div>
  )
}
export default MiniAddress;

