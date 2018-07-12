import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Row, Col } from 'react-bootstrap';

import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/common/InstantCheckout/instant');

const Instantcheckout = props => {
  return (
    <div className={`${styles['instant-checkout']}`}>
      Hello Instant checkout
    </div>
  )
};

Instantcheckout.propTypes = {

};

Instantcheckout.defaultProps = {

};

export default Instantcheckout;

