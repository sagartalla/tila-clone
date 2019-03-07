import React from 'react';
import PropTypes from 'prop-types';
import { mergeCss } from '../../../utils/cssUtil';

const styles = mergeCss('components/common/commonInput/index');

const Rectangle = props => (
  <div
    className={
        `${styles.Rectangle}`
      }
    style={props.style}
  />
);

Rectangle.propTypes = {
  style: PropTypes.object,
};

Rectangle.defaultProps = {
  style: {},
};

export default Rectangle;
