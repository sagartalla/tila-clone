import React from 'react';
import { FormControl } from 'react-bootstrap';

const Input = (props) => {
  const val = props.val ? props.val : '';
  const type = props.type ? props.type : 'text';
  return (
    <FormControl
      type={type}
      value={val}
      placeholder={props.placeholder}
      style={props.style}
      onChange={props.onChange}
      onBlur={props.onBlur}
      autoFocus={props.autoFocus}
      onKeyPress={props.onKeyPress}
      className={props.className}
    />
  );
};

export default Input;
