import React from 'react';
import Cookie from 'universal-cookie';
import SVGComponent from '../common/SVGComponet';
import Theme from '../helpers/context/theme';
import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './header_en.styl';
import styles_ar from './header_ar.styl';

const cookies = new Cookie();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const Logo = () => (
  <Theme.Consumer>
    {
      categoryTree => (
        <div className={`${styles['flex-center']} ${styles['logos-part']}`}>
          <a href={`/${country}/${language}`} className={styles.flex}>
            <SVGComponent clsName={`${styles['default-logo']}`} src={`icons/logos/${categoryTree}-logo`} />
          </a>
        </div>
      )
    }
  </Theme.Consumer>
);

export default Logo;
