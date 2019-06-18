import React from 'react';
import { connect } from 'react-redux';
import { selectors } from '../../store/auth';

import { languageDefinations } from '../../utils/lang';
import SVGComponent from '../common/SVGComponet';
import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './login_en.styl';
import styles_ar from './login_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { EMAIL_VERIFICATION, LOGIN_PAGE } = languageDefinations();

const ThankYou = ({ text }) => (
  <div className={`${styles['reset-part']} ${styles.relative}`}>
    <div className={`${styles['t-c']} ${styles.absolute} ${styles['success-text']}`}>
      {text}
      <div className={`${styles.flex} ${styles['justify-center']} ${styles['mt-25']}`}>
        <SVGComponent clsName={styles['logo-icon']} src={`icons/logos/default-logo-${lang}`} />
      </div>
    </div>
    <SVGComponent clsName={`${styles['reset-icon']}`} src="icons/common-icon/thankyou" />
  </div>
);

const mapStateToProps = store => ({
  text: selectors.getActiveText(store),
});

export default connect(mapStateToProps, null)(ThankYou);
