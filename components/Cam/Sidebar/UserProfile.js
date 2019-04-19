import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { languageDefinations } from '../../../utils/lang/';
import { Link } from '../../../routes';
import { selectors } from '../../../store/cam/personalDetails';
import lang from '../../../utils/language';

import styles_en from './sidebar_en.styl';
import styles_ar from './sidebar_ar.styl';


const styles = lang === 'en' ? styles_en : styles_ar;

const cookies = new Cookies();
const { PERSONAL_INFO_MODAL } = languageDefinations();
const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

const UserProfile = (props) => {
  const { query } = props;
  const { tabDetails } = query;
  const {first_name, last_name} = props.userInfo.personalInfo;
  const [tab, ...queryParams] = tabDetails ? tabDetails.split('/') : [];
  let full_name = first_name || last_name ? first_name + " " + last_name : "";
  let name = full_name ? (full_name.length < 20 ? full_name : (full_name.slice(0,20) + "...")) : "";
  return(
  <Link route={`/${country}/${language}/cam/profile`}>
    <a style={{ display:'block'}}>
    <div className={`${`/${country}/${language}/cam/profile` === `/${country}/${language}/cam/${tab}` ? styles['active'] : {}} ${styles['user-profile']} ${styles['p-10-20']}  ${styles['align-center']} ${styles['flex']}`}>
      <div className={`${styles['profile-pic']} ${styles['pr-15']}`}>
        <div className={styles['img-style']} />
      </div>
      <div className={styles['profile-details']}>
        <span className={`${styles['fs-12']} ${styles['light-gry-clr']}`}>{PERSONAL_INFO_MODAL.HELLO}</span>
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
