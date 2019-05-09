import React from 'react';

import SVGComponent from '../../common/SVGComponet';
import lang from '../../../utils/language';
import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';

import styles_en from './preferences_en.styl';
import styles_ar from './preferences_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

class Preferences extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className={`${styles.box}`}>
        <div className={`${styles.flex} ${styles['pt-15']} ${styles['pb-15']}`}>
          <div className={`${styles.flex}`}>
            <SVGComponent clsName={styles.preferenceIcon} src="icons/speaker" />
          </div>
          <div className={`${styles['flx-space-even']} ${styles['flex-colum']} ${styles['pl-15']}`}>
            <h2 className={`${styles['fs-20']} ${styles.fontW600} ${styles['m-0']}`}>Notification and Communication Preferences</h2>
            <span>Choose the notifications you want to receive.</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Preferences;
