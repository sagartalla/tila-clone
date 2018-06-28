import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import SVGComponent from '../../../common/SVGComponet';
import { languageDefinations } from '../../../../utils/lang/';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Cam/UserVault/uservault');

const VaultHeader = (props) => {
  const { VAULT_PAGE } = languageDefinations();

  return (
    <div className={`${styles['vault-card-header']}`}>
      <Row>
        <Col md={12} sm={12} xs={12}>
          <div className={`${styles['flex']} ${styles['flex-center']} ${styles['p-20-40']}`}>
            <SVGComponent clsName={`${styles['cards-vocher']}`} src="icons/cam/uservault/manage-vault" />
            <div className={`${styles['pl-15']}`}>
              <h1 className={`${styles['fontW600']} ${styles['fs-20']} ${styles['m-0']}`}>{VAULT_PAGE.MANAGE_VAULT_HDR}</h1>
              <small className={`${styles['label-gry-clr']}`}>{VAULT_PAGE.SUB_TAG}</small>
            </div>
          </div>

        </Col>
        <Col md={12}>
          <ul className={`${styles['card-items-list']} ${styles['mb-0']} ${styles['pl-30']}`}>
            <li className={`${styles['pointer']} ${styles['p-10']} ${styles['thick-gry-clr']}`}>{VAULT_PAGE.SAVED_CARDS}</li>
          </ul>
        </Col>
      </Row>
    </div>
  )
};

export default VaultHeader;
