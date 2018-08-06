import React, { Component, Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';

import { languageDefinations } from '../../../../utils/lang/';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Cam/UserVault/uservault');

class MiniVault extends Component {

  makeCardDefault(token) {
    this.props.makeDefault(token)
  }

  render() {
    const { VAULT_PAGE } = languageDefinations();
    const { data, toggleAddCardBlock } = this.props;

    return (
      <div>
        <h6>Saved Cards</h6>
        <div className={`${styles['vault-card-item-inn']}`}>
          {
            data.length > 0 && data.map((card, index) => {
              const { card_token, bank_name, masked_number, holder_name, expiry_month, expiry_year } = card;
              return (
                <div className={styles['flex']} onClick={this.makeCardDefault.bind(this, card_token)}>
                  <div>
                    {
                      card.default ?
                        <input type="radio" className={`${styles['tickmark-radio']}`} name="make-default" checked="checked"/>
                        :
                        <input type="radio" className={styles['tickmark-radio']} name="make-default"/>
                    }
                  </div>
                  <div>
                    <span>{bank_name}</span>
                    <h6 className={` ${styles['fs-18']}`}>{masked_number.replace(/(.{4})/g, '$1 ')}</h6>
                    <div className={`${styles['flx-space-bw']}`}>
                      <span className={`${styles['flex']} ${styles['flex-colum']}`}>
                        <span className={`${styles['fs-12']}`}>{VAULT_PAGE.NAME}: {holder_name}</span>
                        <span className={`${styles['fs-12']}`}>{VAULT_PAGE.EXPIRY} : {expiry_month}/{expiry_year}</span>
                      </span>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        {/* <Col md={12}>
          <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']}`} > Add New </button>
        </Col> */}
      </div>
    )
  }
}
export default MiniVault;

