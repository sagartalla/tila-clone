import React from 'react';
import { connect } from 'react-redux';
import { mergeCss } from '../../../utils/cssUtil';
import { selectors } from '../../../store/cam/personalDetails';
const styles = mergeCss('components/Cam/Sidebar/sidebar');

const UserProfile = (props) => {
  
  return(
  <a href="/cam/profile">
    <div className={`${styles['user-profile']} ${styles['p-10-20']}  ${styles['align-center']} ${styles['flex']}`}>
      <div className={`${styles['profile-pic']} ${styles['pr-15']}`}>
        <div className={styles['img-style']} />
      </div>
      <div className={styles['profile-details']}>
        <span className={`${styles['fs-12']} ${styles['light-gry-clr']}`}>Hello</span>
        <div>{props.userInfo.personalInfo.first_name}</div>
      </div>
    </div>
  </a>
)};

const mapStateToProps = (store) => ({
  userInfo: selectors.getUserInfo(store)
});

export default connect(mapStateToProps)(UserProfile);;
