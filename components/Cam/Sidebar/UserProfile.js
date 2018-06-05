import React from 'react';

import styles from './sidebar.styl';

const UserProfile = () => (
  <a href="/cam/profile">
    <div className={`${styles['user-profile']} ${styles['p-10-20']}  ${styles['align-center']} ${styles['flex']}`}>
      <div className={`${styles['profile-pic']} ${styles['pr-15']}`}>
        <div className={styles['img-style']} />
      </div>
      <div className={styles['profile-details']}>
        <span className={`${styles['fs-12']} ${styles['light-gry-clr']}`}>Hello</span>
        <div>Vinoth</div>
      </div>
    </div>
  </a>
);

export default UserProfile;
