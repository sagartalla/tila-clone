import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { languageDefinations } from '../../../../utils/lang/';
import SVGComponent from '../../../common/SVGComponet';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../address_en.styl';
import styles_ar from '../address_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const AddressHeader = () => {
  const {DELIVERY_ADDR_PAGE} = languageDefinations();
  return(
    <div className={styles['addr-header']}>
      <Row>
        <Col md={1} sm={3} xs={3}>
          <SVGComponent clsName={`${styles['map-icon']}`} src="icons/shipping-address-icons/shipping-title-icon" />
        </Col>
        <Col md={10} sm={9} xs={9}>
          <h1 className={`${styles['black-color']} ${styles['m-0']} ${styles['fs-20']} ${styles['fontW600']}`}>{DELIVERY_ADDR_PAGE.MANAGE_SHIP_ADDR}</h1>
          <small className={`${styles['label-gry-clr']}`}>{DELIVERY_ADDR_PAGE.SUB_TAG}</small>
        </Col>
      </Row>
    </div>
  );
};

export default AddressHeader;
