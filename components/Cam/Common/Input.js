import React, { Component } from "react";
import {FormControl} from 'react-bootstrap';

import styles from "./common.styl";



const Input = (props) => {
  return (
   <FormControl
   type="text"
   value=""
   placeholder={props.placeholder}
   className={styles["input"]}
 />
  );
};

export default Input;
