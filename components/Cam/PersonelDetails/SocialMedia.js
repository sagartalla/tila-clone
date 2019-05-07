import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SVGComponent from '../../common/SVGComponet';
import { languageDefinations } from '../../../utils/lang/';
import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './profile_en.styl';
import styles_ar from './profile_ar.styl';
const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const { LINK_TO_SOCIAL_MEDIA } = languageDefinations();
const SocialMedia = () => (
  <div className={`${styles['box']}`}>
    <div className={`${styles['flex']} ${styles['p-30']}`}>
      <span>
      </span>
      <span>
        <h4 className={`${styles['fontW300']} ${styles['mt-0']} ${styles['mb-0']}`}>{LINK_TO_SOCIAL_MEDIA.HEADING}</h4>
        <span className={`${styles['fs-12']} ${styles['label-gry-clr']}`}>{LINK_TO_SOCIAL_MEDIA.SUB_TITTLE}</span>
      </span>
    </div>
    <div className={`${styles['social-media-main']}  ${styles['bg-light-gray']}`}>
      <div className={`${styles['flx-space-bw']} ${styles['social-media-part']} ${styles['pb-10']}`}>
        <a className={`${styles['flex-center']} ${styles['social-facebook']} ${styles['facebook-blue-color']} ${styles['border-radius4']}`}>
          <span className={`${styles['flex']} ${styles['pr-10']} ${styles['social-facebook-inn']}`}>
            <SVGComponent clsName={`${styles['facebook-icon']}`} src="icons/social-icons/facebook" />
          </span>
          <span className={`${styles['fs-12']} ${styles['facebook-blue-lt-color']} ${styles['title']} ${styles['facebook-clr']} ${styles['fontW600']}`}>
            {LINK_TO_SOCIAL_MEDIA.FACEBOOK}
          </span>
        </a>
        <a className={`${styles['flex-center']} ${styles['social-google']} ${styles['border-radius4']}`}>
          <span className={`${styles['flex']} ${styles['pr-10']} ${styles['social-google-inn']}`}>
            <SVGComponent clsName={`${styles['google-icon']}`} src="icons/social-icons/gmail" />
          </span>
          <span className={`${styles['fs-12']} ${styles['title']} ${styles['google-clr']} ${styles['fontW600']}`}>
            {LINK_TO_SOCIAL_MEDIA.GOOGLE}
          </span>
        </a>
        <a className={`${styles['flex-center']} ${styles['social-twitter']} ${styles['border-radius4']}`}>
          <span className={`${styles['flex']} ${styles['pr-5']} ${styles['social-twitter-inn']}`}>
            <SVGComponent clsName={`${styles['twitter-icon']}`} src="icons/social-icons/twitter" />
          </span>
          <span className={`${styles['fs-12']} ${styles['title']} ${styles['twitter-clr']} ${styles['fontW600']}`}>
            {LINK_TO_SOCIAL_MEDIA.TWITTER}
          </span>
        </a>
      </div>
      <span className={`${styles['fs-10']}`}>{LINK_TO_SOCIAL_MEDIA.NOTE} <a href="#">({LINK_TO_SOCIAL_MEDIA.UN_LINK})</a></span>
    </div>
  </div>
);

export default SocialMedia;
