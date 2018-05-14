import React from 'react';
import { FormControl } from 'react-bootstrap';

import styles from './common.styl';


const Input = props => (
  <FormControl
    type="text"
    value=""
    placeholder={props.placeholder}
    className={styles.input}
    onChange={props.onChange}
  />
);

export default Input;
