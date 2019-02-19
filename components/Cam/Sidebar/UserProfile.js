import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';

import { Link } from '../../../routes';
import { mergeCss } from '../../../utils/cssUtil';
import { selectors } from '../../../store/cam/personalDetails';
const styles = mergeCss('components/Cam/Sidebar/sidebar');

const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

const UserProfile = (props) => {
  const { query } = props;
  const { tabDetails } = query;
  const [tab, ...queryParams] = tabDetails ? tabDetails.split('/') : [];
  return(
  <Link route={`/${country}/${language}/cam/profile`}>
    <a style={{ display:'block'}}>
    <div className={`${`/${country}/${language}/cam/profile` === `/${country}/${language}/cam/${tab}` ? styles['active'] : {}} ${styles['user-profile']} ${styles['p-10-20']}  ${styles['align-center']} ${styles['flex']}`}>
      <div className={`${styles['profile-pic']} ${styles['pr-15']}`}>
        <div className={styles['img-style']} />
      </div>
      <div className={styles['profile-details']}>
        <span className={`${styles['fs-12']} ${styles['light-gry-clr']}`}>Hello</span>
        <div>{props.userInfo.personalInfo.first_name}</div>
      </div>
    </div>
    </a>
  </Link>
)};

const mapStateToProps = (store) => ({
  userInfo: selectors.getUserInfo(store)
});

export default connect(mapStateToProps)(UserProfile);;
