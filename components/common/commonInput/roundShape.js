import React from 'react';
import PropTypes from 'prop-types';
import { mergeCss } from '../../../utils/cssUtil';

const styles = mergeCss('components/common/commonInput/index');

const Round = props => (
  <div
    className={
        `${styles.dot}`
      }
    style={props.style}
  />
);

Round.propTypes = {
  style: PropTypes.object,
};

Round.defaultProps = {
  style: {},
};

export default Round;
