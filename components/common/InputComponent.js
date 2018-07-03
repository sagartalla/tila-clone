import React from 'react';
import PropTypes from 'prop-types';

import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('');

const InputComponent = (props) => (
  <div className={`${styles['fp-input']}`}>
    <input
      type={props.inputType || 'text'}
      name={props.inputName}
      className={props.clsName}
      onChange={props.onChangeFunc}
      required />
    <span className={styles['highlight']}></span>
    <span className={styles['bar']}></span>
    <label>{props.labelTxt}</label>
    <span className={styles['error']}>{props.error}</span>
  </div>
);

InputComponent.propTypes = {
  inputType: PropTypes.string,
  inputName: PropTypes.string,
  clsName: PropTypes.string,
  labelTxt: PropTypes.string,
  error: PropTypes.string,
  onChangeFunc: PropTypes.func,
}

export default InputComponent;