import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Row, Col } from 'react-bootstrap';

import GenericUpdate from '../../../Common/GenericUpdate';
import Toggle from '../../../Common/Toggle';
import Btn from '../../../Common/Button';

import styles from '../../../cam.styl';

const UpdateModal = props => (
  <div>
    <Modal show={props.show} onHide={props.handleClose} bsStyle="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Personal Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <GenericUpdate />
        <Row>
          <Col md={4} xs={12} />
          <Toggle mdSpan={4} />
          <Col md={4} xs={12} />
        </Row>
        <Row>
          <Col xs={12} md={5} mdOffset={1} className={styles['box-shadow']}>
            <div>Name</div>
            <div>Vinoth xxx</div>
          </Col>
          <Col xs={12} md={5} className={styles['box-shadow']}>
            <div>Date Of Birth</div>
            <div>21/08/1999</div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12} className={`${styles['text-align-center']} ${styles['base-margin']}`}>
            <Btn btnWidth="95%" backGround="#034e94" color="#fff" btnText="Update Personal Details" />
          </Col>
        </Row>
        <Row>
          <div className={styles['text-align-center']}>Timeline Component</div>
        </Row>
      </Modal.Body>
    </Modal>
  </div>
);
UpdateModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default UpdateModal;
