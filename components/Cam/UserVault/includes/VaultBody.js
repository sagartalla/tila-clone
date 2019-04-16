import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import SVGComponent from '../../../common/SVGComponet';
import { languageDefinations } from '../../../../utils/lang/';
import lang from '../../../../utils/language';

import styles_en from '../uservault_en.styl';
import styles_ar from '../uservault_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;

class VaultBody extends Component {

  makeCardDefault(token) {
    this.props.makeDefault(token)
  }

  deleteCard(token) {
    let confirmCardDelete = confirm("Are you sure you want to delete this card?");
    confirmCardDelete ?
    this.props.deleteCard(token) : null;
  }

  paymentCardIcon(provider_type) {
    switch (provider_type) {
      case 'VISA':
        return "icons/cards-icons-list/visa-icon-no-bg";
      case 'MASTER':
        return "icons/cards-icons-list/bg-master-icon";
      case 'MASTRO':
        return "icons/cards-icons-list/bg-mastro-icon";
    }
  }

  render() {
    const { VAULT_PAGE } = languageDefinations();
    const { data, toggleAddCardBlock } = this.props;
    return (
      <div className={`${styles['vault-card-body']} ${styles['p-20-40']}`}>
        <h4 className={`${styles['pb-5']} ${styles['fontW300']} ${styles['lgt-blue']}`}>{VAULT_PAGE.MANAGE_SAVED_CARDS}</h4>
        <Row className={styles['mr-0']}>
          {
            data.length > 0 && data.map((card, index) => {
              const { card_token, bank_name, masked_number, holder_name, expiry_month, expiry_year } = card;
              return (
                <Col md={4} key={index} className={styles['pr-0']}>
                  <div className={`${styles['vault-card-item']} ${styles['mb-25']} ${styles['p-15']} ${styles['border-radius4']} ${card.default ? styles['active-card'] : ''}`}>
                    <span className={`${styles['vault-card-delete-icon']} ${styles['flex-center']} ${styles['justify-center']}`} onClick={this.deleteCard.bind(this, card_token)}>
                      <SVGComponent clsName={`${styles['delete-icon']}`} src="icons/delete-icon/delete-icon" />
                    </span>
                    <div className={`${styles['flex']} ${styles['flex-colum']} ${styles['vault-card-item-inn']}`}>
                      <span>{bank_name}</span>
                      <span className={`${styles['pt-25']} ${styles['pb-25']} ${styles['fs-18']}`}>{masked_number.replace(/(.{4})/g, '$1 ')}</span>
                      <div className={`${styles['flx-space-bw']}`}>
                        <span className={`${styles['flex']} ${styles['flex-colum']}`}>
                          <span className={`${styles['fs-12']}`}>{VAULT_PAGE.NAME}: {holder_name}</span>
                          <span className={`${styles['fs-12']}`}>{VAULT_PAGE.EXPIRY} : {expiry_month}/{expiry_year}</span>
                        </span>
                        <span className={`${styles['flex']}`}>
                          {
                            this.paymentCardIcon(card.provider_type) ?
                              <SVGComponent clsName={`${styles['vault-card']}`} src={this.paymentCardIcon(card.provider_type)} />
                              : ''
                          }
                        </span>
                      </div>
                    </div>
                    <div className={`${styles['make-default']} ${styles['pr-5']}`}>
                      {
                        card.default ?
                          <div>
                            <label className={`${styles['fs-12']} ${styles['pr-5']}`}> {VAULT_PAGE.DEFAULT} </label>
                            <input type="radio" className={`${styles['tickmark-radio']}`} name="make-default" checked="checked" onClick={this.makeCardDefault.bind(this, card_token)} />
                          </div>
                          :
                          <span>
                            <label className={`${styles['fs-12']} ${styles['fontW600']} ${styles['pr-5']}`}> {VAULT_PAGE.MAKE_DEFAULT} </label>
                            <input type="radio" className={styles['tickmark-radio']} name="make-default" onClick={this.makeCardDefault.bind(this, card_token)} />
                          </span>
                      }
                    </div>
                  </div>

                </Col>
              )
            })
          }

          {/* 
            **
            DON'T REMOVE THIS CODE - Add new card button. Enable this coded when we do PCD-IS
            **
            <Col md={4} sm={12} xs={12} className={styles['pr-0']}>
            <div className={` ${styles['vault-card-item']} ${styles['vault-card-item-new']} ${styles['border-lg']} ${styles['border-radius4']} ${styles['p-15']}`} onClick={toggleAddCardBlock}>
              <div className={`${styles['flex-center']} ${styles['flex-wrap']}`}>
                <h5 className={`${styles['m-0']} ${styles['mb-10']} ${styles['fontW600']} ${styles['flex-center']}`}>
                  <SVGComponent clsName={`${styles['pls-icon']}`} src="icons/common-icon/plus-icon" />
                  <span className={`${styles['pl-10']} ${styles['black-color']}`}>{VAULT_PAGE.ADD_NEW_CARD}</span>
                </h5>
                <p className={`${styles['thick-gry-clr']} ${styles['fs-12']}`}>{VAULT_PAGE.ADD_NEW_SUB_TXT}</p>
                <p>
                  <button className={`${styles['fp-btn']} ${styles['fp-btn-default']}  ${styles['fs-12']}`}>
                    {VAULT_PAGE.ADD_NEW_BTN}
                  </button>
                </p>
              </div>
            </div>
          </Col> 
          */}
        </Row>
      </div>
    )
  }
}

VaultBody.propTypes = {
  data: PropTypes.array,
  toggleAddCardBlock: PropTypes.func.isRequired
};

VaultBody.defaultProps = {
  data: []
};

export default VaultBody;
