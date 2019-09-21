import React from 'react';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { selectors } from '../../../../store/cam/userVault';
import SVGComponent from '../../../common/SVGComponet';
import { languageDefinations } from '../../../../utils/lang/';
import lang from '../../../../utils/language';
import TilaVoucher from './TilaVoucher';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../uservault_en.styl';
import styles_ar from '../uservault_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { VAULT_PAGE } = languageDefinations();
const VaultHeader = props => (
  <div className={`${styles['vault-card-header']}`}>
    <Row>
      <Col md={12} sm={12} xs={12}>
        <div className={`${styles.flex} ${styles['flex-center']} ${styles['p-30']}`}>
          <SVGComponent clsName={`${styles['cards-vocher']}`} src="icons/cam/uservault/manage-vault" />
          <div className={`${styles['pl-15']}`}>
            <h1 className={`${styles.fontW600} ${styles['fs-20']} ${styles['m-0']}`}>{VAULT_PAGE.MANAGE_VAULT_HDR}</h1>
            <small className={`${styles['label-gry-clr']}`}>{VAULT_PAGE.SUB_TAG}</small>
          </div>
        </div>
      </Col>
      <Col md={12}>
        {/* <ul className={`${styles['card-items-list']} ${styles['mb-0']} ${styles['pl-30']}`}>
          <li className={`${styles['pointer']} ${styles['p-10']} ${styles['thick-gry-clr']}`}>{VAULT_PAGE.SAVED_CARDS}</li>
        </ul> */}
        <Tabs defaultActiveKey={1} className={`${styles['card-items-list']} ${styles['mb-0']}`} id="vault-section">
          <Tab eventKey={1} title={VAULT_PAGE.SAVED_CARDS} className={`${styles['p-10']} ${styles['thick-gry-clr']}`}>
            {props.children}
          </Tab>
          <Tab eventKey={2} title={`${VAULT_PAGE.TILA_GIFT}`} className={`${styles['thick-gry-clr']}`}>
            <TilaVoucher transactions={props.transactions} tilaCredit={props.tilaCredit}/>
          </Tab>
        </Tabs>
      </Col>
    </Row>
  </div>
);

const mapStateToProps = store => ({
  tilaCredit: selectors.getTilaCredit(store),
});

export default connect(mapStateToProps, null)(VaultHeader);
