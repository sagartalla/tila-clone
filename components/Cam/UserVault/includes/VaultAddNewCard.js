import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import { languageDefinations } from '../../../../utils/lang/';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Cam/UserVault/uservault');

//TODO SF-88
const VaultAddNewCard = (props) => {
  const { VAULT_PAGE } = languageDefinations();
  const { checked, inputChange, addBtnClickHandler, setAsDefaultCard, toggleAddCardBlock } = props;
  return (
    <div className={`${styles['vault-add-card-new']} ${styles['p-30']}`}>
      <h1>{VAULT_PAGE.ADD_NEW_CARD_HEADER}</h1>
      <div>
        <Row>
          <Col md={7}>
            <Col md={12} sm={12} xs={12}>
              <input type="text" placeholder="Card Number*" name="card_number" onChange={inputChange} />
            </Col>
            <Col md={12} sm={12} xs={12}>
              <input type="text" placeholder="Name on Card*" name="user_name" onChange={inputChange} />
            </Col>
            <Col md={6} sm={12} xs={12}>
              <input type="text" placeholder="Expiry Month" name="exp_mm" onChange={inputChange} />
            </Col>
            <Col md={6} sm={12} xs={12}>
              <input type="text" placeholder="Expiry Year" name="exp_yr" onChange={inputChange} />
            </Col>
            <Col md={12}>
              <div className={`${styles['mt-20']}`}>
                <input type="checkbox" onClick={setAsDefaultCard} defaultChecked={checked} /> {VAULT_PAGE.SAVE_CARD_MSG}
              </div>
            </Col>
            <Col>
              <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']}`} onClick={addBtnClickHandler}>{VAULT_PAGE.ADD_NEW_CARD}</button>
              <button className={`${styles['fp-btn']} ${styles['fp-btn-default']}`} onClick={toggleAddCardBlock}>{VAULT_PAGE.CANCEL}</button>
            </Col>
          </Col>
        </Row>
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
