import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';

import styles from './common.styl';

const Toggle = props => (
  <Col xs={12} md={props.mdSpan}>
    <Col xs={4} md={3}>
      <span>Male</span>
    </Col>
    <Col xs={4} md={6}>
      <label className={styles.switch}>
        <input type="checkbox" />
        <span className={styles.slider} />
      </label>
    </Col>
    <Col xs={4} md={3}>
      <span>Female</span>
    </Col>
  </Col>
);

Toggle.propTypes = {
  mdSpan: PropTypes.number,
};
Toggle.defaultProps = {
  mdSpan: 6,
};
export default Toggle;
