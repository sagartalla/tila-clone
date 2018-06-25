import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import SVGComponent from '../../../common/SVGComponet';
import { languageDefinations } from '../../../../utils/lang/';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Cam/UserVault/uservault');

class VaultBody extends Component {

  makeCardDefault(token) {
    this.props.makeDefault(token)
  }

  deleteCard(token) {
    this.props.deleteCard(token);
  }

  render() {
    const { VAULT_PAGE } = languageDefinations();
    const { data, toggleAddCardBlock } = this.props;

    return (
      <div className={`${styles['vault-card-body']} ${styles['p-30']}`}>
        <h4>{VAULT_PAGE.MANAGE_SAVED_CARDS}</h4>
        <Row>
          {
            data.length > 0 && data.map((card, index) => {
              const { card_token, bank_name, masked_number, holder_name, expiry_month, expiry_year } = card;
              return (
                <Col md={4} key={index}>
                  <div className={`${styles['vault-card-item']} ${styles['mb-20']} ${styles['p-20']} ${styles['border-radius2']}`}>
                    <span onClick={this.deleteCard.bind(this, card_token)}>
                      <SVGComponent clsName={`${styles['delete-icon']}`} src="icons/delete-icon/delete-icon" />
                    </span>
                    {bank_name}<br />
                    {masked_number}<br />
                    {VAULT_PAGE.NAME}: {holder_name} <br />
                    {VAULT_PAGE.EXPIRY} : {expiry_month}/{expiry_year}
                  </div>
                  <div className={styles['make-default']}>
                    {
                      card.default ?
                        <span>
                          <input type="radio" name="make-default" checked="checked" onClick={this.makeCardDefault.bind(this, card_token)} /> {VAULT_PAGE.DEFAULT}
                        </span>
                        :
                        <span>
                          <input type="radio" name="make-default" onClick={this.makeCardDefault.bind(this, card_token)} /> {VAULT_PAGE.MAKE_DEFAULT}
                        </span>
                    }
                  </div>
                </Col>
              )
            })
          }

          <Col md={4} sm={12} xs={12}>
            <div className={` ${styles['vault-card-item']} ${styles['vault-card-item-new']} ${styles['border-lg']} ${styles['border-radius2']}`} onClick={toggleAddCardBlock}>
              <div className={`${styles['flex-center']} ${styles['flex-wrap']}`}>
                <h5 className={`${styles['m-0']} ${styles['mb-10']} ${styles['thick-blue']} ${styles['fontW600']}`}>{VAULT_PAGE.ADD_NEW_CARD}</h5>
                <p>{VAULT_PAGE.ADD_NEW_SUB_TXT}</p>
                <p>
                  <button className={`${styles['fp-btn']} ${styles['fp-btn-default']}  ${styles['fs-12']}`}>
                    {VAULT_PAGE.ADD_NEW_BTN}
                  </button>
                </p>
              </div>
            </div>
          </Col>

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
