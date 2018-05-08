import React, { Component } from "react";
import { FormGroup } from "react-bootstrap";

import Input from "../../Common/Input";

import styles from "../../cam.styl";

const ContactInfo = (props) => {
  return (
    <div className={styles["personel-data-container"]}>
      <div className={styles["title-container"]}>
        <div>
          <h6>Contact Information</h6>
        </div>
        <div>
          <span className={styles["edit-icon"]}>Edit</span>
        </div>
      </div>
      <form>
        <FormGroup>
          <Input placeholder="Email" />
        </FormGroup>
        <FormGroup>
          <Input placeholder="Password" />
        </FormGroup>
        <FormGroup>
          <div className={styles["display-width"]}>
            <labe>Phone Number</labe>
          </div>
          <div className={styles["display-width"]}>
            <span>Edit Phone Number</span>
          </div>
        </FormGroup>
      </form>
    </div>
  );
};

export default ContactInfo;
