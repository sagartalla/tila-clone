import React from 'react';
import PropTypes from 'prop-types';
import { mergeCss } from '../../../utils/cssUtil';

const styles = mergeCss('components/common/commonInput/index');


const Input = props => (
  <div
    className={
        `${styles.input}`
      }
    style={props.style}

  />
);

Input.propTypes = {
  style: PropTypes.object,
};

Input.defaultProps = {
  style: {},
};

export default Input;
