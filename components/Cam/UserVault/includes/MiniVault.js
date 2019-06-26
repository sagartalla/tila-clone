import React, { Component } from 'react';
import lang from '../../../../utils/language';
import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../uservault_en.styl';
import styles_ar from '../uservault_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

class MiniVault extends Component {

  makeCardDefault(token) {
    this.props.makeDefault(token)
  }

  render() {
    const { data } = this.props;

    return (
      <div className={`${styles['absolute']} ${styles['valut-card-main']} ${styles['bg-white']}`}>
        <div className={`${styles['vault-card-item-inn']}`}>
          {
            data.length > 0 && data.map((card, index) => {
              const { card_token, masked_number, holder_name, expiry_month, expiry_year } = card;
              return (
                <div className={`${styles['flex']} ${styles['flex-colum']} ${styles['valut-card-main-inn']} ${styles['p-10-20']} ${styles['pointer']}`} onClick={this.makeCardDefault.bind(this, card_token)} key={index}>
                  {/* <span>{bank_name}</span> */}
                  <h5 className={`${styles['mt-5']} ${styles['mb-5']} ${styles['card-number']}`}>{masked_number.replace(/(.{4})/g, '$1 ')}</h5>
                  <div className={`${styles['flx-space-bw']} ${styles['thick-gry-clr']}`}>
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
