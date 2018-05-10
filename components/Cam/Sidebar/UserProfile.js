import React from 'react';

import styles from './sidebar.styl';

const UserProfile = () => (
  <div className={styles['user-profile']}>
    <div className={styles['profile-pic']}>
      <div className={styles['img-style']} />
    </div>
    <div className={styles['profile-details']}>
      <div>Hello</div>
      <div>Vinoth</div>
    </div>
  </div>
);

export default UserProfile;
