import React, { Component } from 'react';

import UserData from './UserData';
import SocialMedia from './SocialMedia';
import Notification from './Notification';

import styles from '../cam.styl';

const UserInfo = () => {
  return (
    <div className={styles['right-layout-container']}>
      <UserData />
      <SocialMedia />
      <Notification />
    </div>
  );
};

export default UserInfo;
