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
    <div className={styles['vault-card-header']}>
      <Row>
        <Col md={1} sm={3} xs={3}>
          <Row>
            <SVGComponent src="icons/cam/uservault/manage-vault" />
          </Row>
        </Col>
        <Col md={10} sm={9} xs={9}>
          <h1 className={`${styles['black-color']} ${styles['m-0']} ${styles['fs-16']}`}>{VAULT_PAGE.MANAGE_VAULT_HDR}</h1>
          <small>{VAULT_PAGE.SUB_TAG}</small>
        </Col>
        <Col md={12}>
          <ul>
            <li>{VAULT_PAGE.SAVED_CARDS}</li>
          </ul>
        </Col>
      </Row>
    </div>
  )
};

export default VaultHeader;
