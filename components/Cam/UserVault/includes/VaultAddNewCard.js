import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import SVGComponent from '../../../common/SVGComponet';
import { languageDefinations } from '../../../../utils/lang/';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Cam/UserVault/uservault');
const numbers = [1,2,3,4,5,6,7,8,9,10,11,12];

const dateoptions = numbers.map((number) =>
  <option>{number}</option>
);
//TODO SF-88
const VaultAddNewCard = (props) => {
  const { VAULT_PAGE } = languageDefinations();
  const { checked, inputChange, addBtnClickHandler, setAsDefaultCard, toggleAddCardBlock } = props;
  
  return (
    <div className={`${styles['vault-add-card-new']} ${styles['pl-30']} ${styles['pr-30']}`}>
      <div className={`${styles['credit-debit-card-details']} ${styles['pt-30']} ${styles['pb-30']}`} >
        <h4 className={`${styles['fontW300']} ${styles['lgt-blue']} ${styles['mb-30']} ${styles['flex-center']}`}>
          <span>{VAULT_PAGE.ADD_NEW_CARD_HEADER}</span>
          <span className={`${styles['flex']} ${styles['card-list-items']}`}>
            <span className={`${styles['flex']} ${styles['pr-15']}`}><SVGComponent clsName={`${styles['bg-card']}`} src="icons/cards-icons-list/bg-visa-icon" /></span>
            <span className={`${styles['flex']} ${styles['pr-15']}`}><SVGComponent clsName={`${styles['bg-card']}`} src="icons/cards-icons-list/bg-master-icon" /></span>
            <span className={`${styles['flex']} ${styles['pr-15']}`}><SVGComponent clsName={`${styles['bg-card']}`} src="icons/cards-icons-list/bg-mastro-icon" /></span>
          </span>
        </h4>
        <div >
          <Row>
            <Col md={5}>
              <Col md={12} sm={12} xs={12} className={styles['pl-0']}>
                <div className={`${styles['fp-input']}`}> 
                  <input type="text" name="card_number" onChange={inputChange} required />
                  <span className={styles['highlight']}></span>
                  <span className={styles['bar']}></span>
                  <label>Card Number*</label>
                </div>
              </Col>
              <Col md={12} sm={12} xs={12} className={styles['pl-0']}>
                <div className={`${styles['fp-input']}`}> 
                  <input type="text" name="user_name" onChange={inputChange} required />
                  <span className={styles['highlight']}></span>
                  <span className={styles['bar']}></span>
                  <label>Name on Card*</label>
                </div>
              </Col>
              <Col md={6} sm={12} xs={12} className={styles['pl-0']}>
                <div className={styles['select']}>
                  <select name="exp_mm" className={styles['select-text']} onChange={inputChange}  required>
                    <option>Expiry Month</option>
                    {dateoptions}
                  </select>
                  <span className={styles['select-highlight']}></span>
                  <span className={styles['select-bar']}></span>
                </div>
              </Col>
              <Col md={6} sm={12} xs={12} className={styles['pl-0']}>
                <div className={styles['select']}>
                  <select name="exp_yr" className={styles['select-text']} onChange={inputChange}  required>
                    <option>Expiry Year</option>
                    <option>2018</option>
                    <option>2019</option>
                    <option>2020</option>
                    <option>2021</option>
                    <option>2022</option>
                    <option>2023</option>
                    <option>2024</option>
                  </select>
                  <span className={styles['select-highlight']}></span>
                  <span className={styles['select-bar']}></span>
                </div>
              </Col>
              <Col md={12} className={styles['pl-0']}>
                <div className={`${styles['checkbox-material']} ${styles['flex-center']} ${styles['pb-30']} ${styles['mt-30']}`}>
                  <input id="card-check" type="checkbox" onClick={setAsDefaultCard} defaultChecked={checked} /> 
                  <label for="card-check" className={styles['fs-12']}> {VAULT_PAGE.SAVE_CARD_MSG}</label>
                </div>
              </Col>
            </Col>
            <Col md={8}>
                <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-add-new-card']} ${styles['mr-10']}`} onClick={addBtnClickHandler}>{VAULT_PAGE.ADD_NEW_CARD}</button>
                <button className={`${styles['fp-btn']} ${styles['fp-btn-default']}`} onClick={toggleAddCardBlock}>{VAULT_PAGE.CANCEL}</button>
              </Col>
          </Row>
        </div>
      </div>
    </div>
  )
};

VaultAddNewCard.propTypes = {
  checked: PropTypes.bool.isRequired,
  inputChange: PropTypes.func.isRequired,
  addBtnClickHandler: PropTypes.func.isRequired,
  setAsDefaultCard: PropTypes.func.isRequired,
  toggleAddCardBlock: PropTypes.func.isRequired
};

VaultAddNewCard.defaultProps = {
  
};

export default VaultAddNewCard;
