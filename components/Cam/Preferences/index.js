import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import NotificationPreferences from './includes/NotificationPreferences';
import SVGComponent from '../../common/SVGComponet';
import lang from '../../../utils/language';
import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import { languageDefinations } from '../../../utils/lang/';
import styles_en from './preferences_en.styl';
import styles_ar from './preferences_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { PREFERENCES } = languageDefinations();

class Preferences extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className={`${styles.box} ${styles.flex} ${styles['flex-colum']}`}>
        <div className={`${styles.flex} ${styles['p-15']}`}>
          <div className={`${styles.flex}`}>
            <SVGComponent clsName={styles.preferenceIcon} src="icons/speaker" />
          </div>
          <div className={`${styles['flx-space-even']} ${styles['flex-colum']} ${styles['pl-15']}`}>
            <h2 className={`${styles['fs-20']} ${styles.fontW600} ${styles['m-0']}`}>{PREFERENCES.PAGE_TITLE}</h2>
            <span className={`${styles['dottes-gry-clr']} ${styles['fs-12']}`}>{PREFERENCES.SELECT_OPTION}</span>
          </div>
        </div>
        <Tabs defaultActiveKey={1} onSelect={this.handleSelect} id="preferences">
          <Tab eventKey={1} title={PREFERENCES.NOTIFICATION_PREFERENCES}>
            <NotificationPreferences />
          </Tab>
          {/* <Tab eventKey={2} title={PREFERENCES.CATEGORY_PREFERENCES}>
            <div>category</div>
          </Tab> */}
        </Tabs>
      </div>
    );
  }
}

export default Preferences;
