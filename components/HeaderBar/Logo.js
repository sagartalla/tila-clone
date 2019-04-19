import React from "react";
import SVGComponent from '../common/SVGComponet';
import Theme from '../helpers/context/theme';
import lang from '../../utils/language';

import styles_en from './header_en.styl';
import styles_ar from './header_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;
const Logo = () => (
  <Theme.Consumer>
    {
      categoryTree => (
        <div className={`${styles['flex-center']} ${styles['logos-part']}`}>
          <a href="/" className={styles['flex']}>
            <SVGComponent clsName={`${styles['default-logo']}`} src={`icons/logos/${categoryTree}-logo`} />
          </a>
        </div>
      )
    }
  </Theme.Consumer>
);

export default Logo;
