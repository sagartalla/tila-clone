import React from 'react';
import PropTypes from 'prop-types';

import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';

const styles = lang === 'en' ? main_en : main_ar;

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
