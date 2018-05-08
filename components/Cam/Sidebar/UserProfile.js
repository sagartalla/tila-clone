import React, { Component } from 'react';


import styles from '../cam.styl';

const UserProfile = () => {
  return (
    <div className={styles['user-profile']}>
      <div className={styles['profile-pic']}>
       <div className={styles['img-style']}></div>
      </div>
      <div className={styles['profile-details']}>
       <div>Hello</div>
       <div>Vinoth</div>
      </div>
    </div>
  );
};

export default UserProfile;
