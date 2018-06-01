import React from 'react';
import { FormControl } from 'react-bootstrap';

import styles from './common.styl';


const Input = props => {
const val = props.val ? props.val : "";
const type = props.type ? props.type : "text";
return (
  <FormControl
    type={type}
    value={val}
    placeholder={props.placeholder}
    className={styles.input}
    onChange={props.onChange}
    onBlur={props.onBlur}
  />
);
}
export default Input;
