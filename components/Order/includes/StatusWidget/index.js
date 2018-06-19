import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Order/includes/StatusWidget/statusWidget');

const statuses = ['APPROVED', 'PACKED', 'SHIPPED', 'DELIVERED'];

const StatusWidget = ({ currentStatus }) => {
  const currentStausIndex = statuses.indexOf(currentStatus);
  return (
    <div className={`${styles['widget-cont']} ${styles['pt-5']}`}>
      <Row className={styles['m-0']}>
        {statuses.map((status, index) => (
          <Col key={status} md={3} className={`${styles['item-cont']} ${(currentStausIndex >= index) ? (currentStausIndex === index) ? styles['current'] : styles['done'] : ''}`}>
            <div className={`${styles['pt-10']} ${styles['item']}` }>
              <span>{status}</span>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default StatusWidget;