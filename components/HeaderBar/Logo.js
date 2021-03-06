import React, { useState, useEffect } from 'react';
import Cookie from 'universal-cookie';
import SVGComponent from '../common/SVGComponet';
import Theme from '../helpers/context/theme';
import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './header_en.styl';
import styles_ar from './header_ar.styl';

const cookies = new Cookie();

const language = cookies.get('language') || 'ar';
const country = cookies.get('country') || 'SAU';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};


const Logo = () => {
  const [selectedLanguage,setLanguage] = useState(language)

  useEffect(() => {
    setLanguage(language)
  },[language])

  return (
    <Theme.Consumer>
      {
        categoryTree => (
          <div className={`${styles['flex-center']} ${styles['logos-part']}`}>
            <a href={`/${selectedLanguage}`} className={styles.flex}>
              <SVGComponent clsName={`${styles['default-logo']}`} src={`icons/logos/${categoryTree || 'default' }-logo-${selectedLanguage}`} />
            </a>
          </div>
        )
      }
    </Theme.Consumer>
  )
}

export default Logo;
