import React, { Component, Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';

import { languageDefinations } from '../../../../utils/lang/';

import lang from '../../../../utils/language';

import styles_en from '../uservault_en.styl';
import styles_ar from '../uservault_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;

class MiniVault extends Component {

  makeCardDefault(token) {
    this.props.makeDefault(token)
  }

  render() {
    const { VAULT_PAGE } = languageDefinations();
    const { data, toggleAddCardBlock } = this.props;

    return (
      <div className={`${styles['absolute']} ${styles['valut-card-main']} ${styles['bg-white']}`}>
        <div className={`${styles['vault-card-item-inn']}`}>
          {
            data.length > 0 && data.map((card, index) => {
              const { card_token, bank_name, masked_number, holder_name, expiry_month, expiry_year } = card;
              return (
                <div className={`${styles['flex']} ${styles['flex-colum']} ${styles['valut-card-main-inn']} ${styles['p-10-20']} ${styles['pointer']}`} onClick={this.makeCardDefault.bind(this, card_token)}>
                  {/* <span>{bank_name}</span> */}
                  <h5 className={`${styles['mt-5']} ${styles['mb-5']}`}>{masked_number.replace(/(.{4})/g, '$1 ')}</h5>
                  <div className={`${styles['flx-space-bw']}`}>
                    <span>{holder_name}</span>
                    <span> {expiry_month}/{expiry_year}</span>
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

