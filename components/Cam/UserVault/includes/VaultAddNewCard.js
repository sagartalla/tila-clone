import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import InputComponent from '../../../common/InputComponent';
import SVGComponent from '../../../common/SVGComponet';
import { languageDefinations } from '../../../../utils/lang/';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Cam/UserVault/uservault');

const { VAULT_PAGE } = languageDefinations();
const dateoptions = [...Array(13)].map((number, index) => {
  if (index != 0)
    return <option>{index}</option>
});
const yearoptions = [...Array(13)].map((item, index) => <option>{(new Date()).getFullYear() + index}</option>);

// Credits https://gist.github.com/ShirtlessKirk/2134376
const luhnChk = (function (arr) {
  return function (ccNum) {
    var
      len = ccNum.length,
      bit = 1,
      sum = 0,
      val;

    while (len) {
      val = parseInt(ccNum.charAt(--len), 10);
      sum += (bit ^= 1) ? arr[val] : val;
    }

    return sum && sum % 10 === 0;
  };
}([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]));

//TODO SF-88
class VaultAddNewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card_number_error: '',
      nm_error: '',
      exp_mn_error: '',
      exp_yr_error: '',
      disableAddBtn: true
    }
    this.cardChk = this.cardChk.bind(this);
    this.nameChk = this.nameChk.bind(this);
    this.btnHandler = this.btnHandler.bind(this);
    this.expYearChk = this.expYearChk.bind(this);
    this.expMonthChk = this.expMonthChk.bind(this);
  }

  cardChk(e) {
    const value = e.target.value;
    let err = '';
    if (!luhnChk(value)) {
      err = VAULT_PAGE.CARD_ERROR;
    } else {
      this.props.inputChange(e);
    }
    this.setState({ card_number_error: err, disableAddBtn: false });
  }

  nameChk(e) {
    const value = e.target.value;
    let err = '';
    if (!/^[a-zA-Z() ]+$/.test(value)) {
      err = VAULT_PAGE.NAME_ERROR;
    } else {
      this.props.inputChange(e);
    }
    this.setState({ nm_error: err });
  }

  expMonthChk(e) {
    const value = e.target.value;
    let err = '';
    if (value == 0) {
      err = VAULT_PAGE.EXP_MN_ERROR;
    } else {
      this.props.inputChange(e);
    }
    this.setState({ exp_mn_error: err });
  }

  expYearChk(e) {
    const value = e.target.value;
    let err = '';
    if (value == 0) {
      err = VAULT_PAGE.EXP_YR_ERROR;
    } else {
      this.props.inputChange(e);
    }
    this.setState({ exp_yr_error: err });
  }

  btnHandler() {
    const { card_number_error, nm_error, exp_mn_error, exp_yr_error } = this.state;
    if (card_number_error == '' && nm_error == '' && exp_mn_error == '' && exp_yr_error == '') {
      this.props.addBtnClickHandler();
    }
  }

  render() {
    const { card_number_error, nm_error, exp_mn_error, exp_yr_error, disableAddBtn } = this.state;
    const { checked, inputChange, addBtnClickHandler, setAsDefaultCard, toggleAddCardBlock } = this.props;

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
          <div>
            <Row>
              <Col md={5}>
                <Col md={12} sm={12} xs={12} className={styles['pl-0']}>
                  <InputComponent
                    labelTxt={VAULT_PAGE.CARD_NUMBER}
                    inputName='card_number'
                    onChangeFunc={this.cardChk}
                    error={card_number_error}
                  />
                </Col>
                <Col md={12} sm={12} xs={12} className={styles['pl-0']}>
                  <InputComponent
                    labelTxt={VAULT_PAGE.NAME_ON_CARD}
                    inputName='user_name'
                    onChangeFunc={this.nameChk}
                    error={nm_error}
                  />
                </Col>
                <Col md={6} sm={12} xs={12} className={styles['pl-0']}>
                  <div className={styles['select']}>
                    <select name="exp_mm" className={styles['select-text']} onChange={this.expMonthChk} required>
                      <option value="0">{VAULT_PAGE.EXPIRY_MONTH}</option>
                      {dateoptions}
                    </select>
                    <span className={styles['select-highlight']}></span>
                    <span className={styles['select-bar']}></span>
                    <span className={styles['error']}>{exp_mn_error}</span>
                  </div>
                </Col>
                <Col md={6} sm={12} xs={12} className={styles['pl-0']}>
                  <div className={styles['select']}>
                    <select name="exp_yr" className={styles['select-text']} onChange={this.expYearChk} required>
                      <option value="0">{VAULT_PAGE.EXPIRY_YEAR}</option>
                      {yearoptions}
                    </select>
                    <span className={styles['select-highlight']}></span>
                    <span className={styles['select-bar']}></span>
                    <span className={styles['error']}>{exp_yr_error}</span>
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
                <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-add-new-card']} ${styles['mr-10']}`} onClick={this.btnHandler} disabled = {disableAddBtn}>{VAULT_PAGE.ADD_NEW_CARD}</button>
                <button className={`${styles['fp-btn']} ${styles['fp-btn-default']}`} onClick={toggleAddCardBlock}>{VAULT_PAGE.CANCEL}</button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
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
