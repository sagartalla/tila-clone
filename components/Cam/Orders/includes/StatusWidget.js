import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

const statuses = ['APPROVED', 'PACKED', 'SHIPPED', 'DELIVERED'];

const StatusWidget = ({ currentStatus }) => {
  const currentStausIndex = statuses.indexOf(currentStatus);
  return (
    <div>
      <Row>
        {statuses.map((status, index) => (
          <Col key={status} md={4}>
            <div className={(currentStausIndex >= index) ? (currentStausIndex === index) ? 'current' : 'done' : '' }>
              <span>{status}</span>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default StatusWidget;