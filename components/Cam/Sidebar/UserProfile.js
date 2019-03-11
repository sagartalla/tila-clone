import React from 'react';
import { connect } from 'react-redux';
import { Link } from '../../../routes';
import { mergeCss } from '../../../utils/cssUtil';
import { selectors } from '../../../store/cam/personalDetails';
const styles = mergeCss('components/Cam/Sidebar/sidebar');

const UserProfile = (props) => {
  const { query } = props;
  const { tabDetails } = query;
  const [tab, ...queryParams] = tabDetails ? tabDetails.split('/') : [];
  let full_name = props.userInfo.personalInfo.first_name + " " + props.userInfo.personalInfo.last_name
  let name = full_name ? (full_name.length < 20 ? full_name : (full_name.slice(0,20) + "...")) : null;
  return(
  <Link route="/cam/profile">
    <a style={{ display:'block'}}> 
    <div className={`${'/cam/profile' === `/cam/${tab}` ? styles['active'] : {}} ${styles['user-profile']} ${styles['p-10-20']}  ${styles['align-center']} ${styles['flex']}`}>
      <div className={`${styles['profile-pic']} ${styles['pr-15']}`}>
        <div className={styles['img-style']} />
      </div>
      <div className={styles['profile-details']}>
        <span className={`${styles['fs-12']} ${styles['light-gry-clr']}`}>Hello,</span>
        <div>{name}</div>
      </div>
    </div>
    </a>
  </Link>
)};

const mapStateToProps = (store) => ({
  userInfo: selectors.getUserInfo(store)
});

export default connect(mapStateToProps)(UserProfile);;
