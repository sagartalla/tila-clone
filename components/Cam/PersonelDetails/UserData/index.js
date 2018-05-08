import React, { Component } from "react";

import PersonalInfo from './PersonalInfo';
import ContactInfo from './ContactInfo';

import styles from "../../cam.styl";

const UserData = () => {
  return (
    <div className={styles['user-data-container']}>
      <PersonalInfo />
      <ContactInfo />
    </div>
  );
};

export default UserData;
