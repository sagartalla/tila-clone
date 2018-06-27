import React from 'react';
import PropTypes from 'prop-types';

const InputComponet = (props) => {
  return(
    <div className={`${styles['fp-input']}`}>
      <input
        type={props.inputType}
        name={props.name}
        className={props.className}
        onChange={props.controlFun}
        required />
      <span className={styles['highlight']}></span>
      <span className={styles['bar']}></span>
      <label>{props.description}</label>
    </div>
  )
};

InputComponet.propTypes = {
  type: PropTypes.string,
  name: propTypes.string,
  controlFun: PropTypes.func,
}


export default InputComponet;