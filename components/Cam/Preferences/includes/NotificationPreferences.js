import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PanelGroup, Panel } from 'react-bootstrap';

import lang from '../../../../utils/language';
import { languageDefinations } from '../../../../utils/lang/';
import { actionCreators, selectors } from '../../../../store/cam/preferences';
import Notifications from './notification';
import SVGCompoent from '../../../common/SVGComponet';
import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';

import styles_en from '../preferences_en.styl';
import styles_ar from '../preferences_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { PREFERENCES } = languageDefinations();

class NotificationPreferences extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { getNotificationPreferences } = this.props;
    getNotificationPreferences();
  }

  render() {
    return (
      <div>
        <PanelGroup accordion>
          {Object.keys(Notifications).map(k => (
            <div>
              <Panel>
                <Panel.Heading className={styles['category-list-head']}>
                  <Panel.Title toggle className={`${styles['category-list-title']} ${styles['black-color']} ${styles['p-10-20']} ${styles['flx-spacebw-alignc']}`}>
                    <div className={`${styles['flx-space-bw']}`}>
                      <div className={`${styles['flx-space-bw']} ${styles['flex-colum']}`}>
                        <div>{Notifications[k].heading}</div>
                        <div>{Notifications[k].subheading}</div>
                      </div>
                      <div className={`${styles.flex}`}>
                        <SVGCompoent clsName={`${styles['down-icon']}`} src="icons/common-icon/down-arrow" />
                      </div>
                    </div>
                  </Panel.Title>
                </Panel.Heading>
              </Panel>
            </div>
          ))}
        </PanelGroup>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  notificationPreferences: selectors.getNotificationPreferences(store),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getNotificationPreferences: actionCreators.getNotificationPreferences,
  },
  dispatch,
);


export default connect(mapStateToProps, mapDispatchToProps)(NotificationPreferences);
