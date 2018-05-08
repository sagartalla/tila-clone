import React, { Component } from "react";
import { FormGroup } from "react-bootstrap";

import Input from "../../Common/Input";

import styles from "../../cam.styl";

const PersonalInfo = (props) => {
  return (
    <div className={styles["personel-data-container"]}>
      <div className={styles["title-container"]}>
        <div>
          <h6>personel Information</h6>
        </div>
        <div>
          <span className={styles["edit-icon"]}>Edit</span>
        </div>
      </div>
      <form>
        <FormGroup>
          <Input placeholder="Name" />
        </FormGroup>
        <FormGroup>
          <Input placeholder="Date of birth" />
        </FormGroup>
        <FormGroup>
          <div className={styles["display-width"]}>
            <labe>Gender</labe>
          </div>
          <div className={styles["display-width"]}>
            <div className={styles["gender-content"]}>
              <span>Male</span>
            </div>
            <div className={styles["gender-content"]}>
              <label className={styles["switch"]}>
                <input type="checkbox" />
                <span className={styles["slider"]} />
              </label>
            </div>
            <div className={styles["gender-content"]}>
              <span>Female</span>
            </div>
          </div>
        </FormGroup>
      </form>
    </div>
  );
};

export default PersonalInfo;
