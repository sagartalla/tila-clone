import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import SVGComponent from '../../common/SVGComponet';
import ShippingAddress from '../../Cam/ShippingAddress';
import { languageDefinations } from '../../../utils/lang/';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../payment_en.styl';
import styles_ar from '../payment_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const { DELIVERY_ADDR_PAGE } = languageDefinations();

const DeliveryAddress = props => {
  const { configJson, selectedAddress, handleShippingAddressContinue, editAddressTab, showNonShippable } = props;

  return (
    <div className={`${styles['delivery-adress-prt']} ${styles['box']} ${styles['mb-20']} ${styles['relative']}`}>
      <SVGComponent clsName={`${styles['map-address']} ${configJson.done ? 'done' : ''} ${configJson.progress ? 'payment-active' : ''}`} src="icons/map/address" />
      <Row className={`${configJson.basic || configJson.done ? '' : 'hide'}`}>
        <Col md={6} sm={12} xs={12}>
          <h4 className={styles['m-0']}>{DELIVERY_ADDR_PAGE.DELIVERY_ADDR}</h4>
          <p className={`${styles['mb-0']}`}>
            <small>{DELIVERY_ADDR_PAGE.SUB_TAG}</small>
          </p>
        </Col>
        <Col md={4} sm={12} xs={7} className={`${configJson.done ? '' : 'hide'} ${styles['t-rt']} ${styles['m-tn-l']} ${styles['thin-border-right']}`}>
          {
            selectedAddress ?
              <div>
                <div className={`${styles['light-gry-clr']} ${styles['fontW600']}`}>{selectedAddress.first_name + ' ' + selectedAddress.last_name} </div>
                <small>
                  {selectedAddress.address_line_1 + ', ' + selectedAddress.address_line_2 + ', ' + selectedAddress.city}
                </small>
              </div>
              : null
          }
        </Col>
        <Col md={2} sm={12} xs={5} className={`${configJson.done ? '' : 'hide'} ${styles['t-rt']} ${styles['pl-0']}`}>
          <button className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['left-radius']} ${styles['text-uppercase']}`} onClick={editAddressTab}>
            {DELIVERY_ADDR_PAGE.EDIT}
          </button>
        </Col>
      </Row>
      {
        configJson.progress ?
          <div className={`${styles['pb-5']} ${styles['pt-5']}`}>
            <h4 className={`${styles['mb-20']} ${styles['mt-0']}`}>{DELIVERY_ADDR_PAGE.DELIVERY_ADDR}</h4>
            <ShippingAddress
              showNonShippable={showNonShippable}
              selectedAddress={selectedAddress}
              handleShippingAddressContinue={handleShippingAddressContinue}
              isPaymentPage
            />
          </div>
          : null
      }
    </div>

  );
}

DeliveryAddress.propTypes = {
  handleShippingAddressContinue: PropTypes.func.isRequired,
  editAddressTab: PropTypes.func.isRequired,
  configJson: PropTypes.object.isRequired,
}

DeliveryAddress.defaultProps = {
  configJson: {}
}

export default DeliveryAddress;
