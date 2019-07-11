import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PanelGroup, Panel } from 'react-bootstrap';

import lang from '../../../../utils/language';
import { languageDefinations } from '../../../../utils/lang/';
import { actionCreators, selectors } from '../../../../store/cam/preferences';
import { Preferences, settingValues } from './notification';
import Button from '../../../common/CommonButton';
import SVGCompoent from '../../../common/SVGComponet';
import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';

import styles_en from '../preferences_en.styl';
import styles_ar from '../preferences_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { PREFERENCES } = languageDefinations();

class NotificationPreferences extends React.Component {
  constructor(props) {
    super(props);
    const { notificationPreferences } = props;
    this.state = {
      notificationPreferences,
    };
    this.changeSetting = this.changeSetting.bind(this);
    this.savePreferences = this.savePreferences.bind(this);
  }

  componentDidMount() {
    const { getNotificationPreferences } = this.props;
    getNotificationPreferences();
  }

  componentWillReceiveProps(newProps) {
    const { notificationPreferences } = newProps;
    this.setState({
      notificationPreferences,
    });
  }

  changeSetting({ target }) {
    const { notificationPreferences } = this.state;
    const group = target.getAttribute('data-group');
    const value = target.getAttribute('data-value');
    if (target.checked) {
      if (!notificationPreferences[group]) {
        notificationPreferences[group] = {
          setting_name: 'MODE',
          setting_sub_group: group,
          setting_group: 'NOTIFICATION',
        };
      }
      if (notificationPreferences[group].setting_value) {
        notificationPreferences[group].setting_value.push(value);
      } else {
        notificationPreferences[group].setting_value = [value];
      }
    } else {
      notificationPreferences[group].setting_value.splice(_.findIndex(notificationPreferences[group].setting_value, v => v === value), 1);
    }
    this.setState({ notificationPreferences });
  }

  savePreferences({ target }) {
    const { postPreferences } = this.props;
    const { notificationPreferences } = this.state;

    if (notificationPreferences[target.id] && notificationPreferences[target.id].setting_value) {
      postPreferences(notificationPreferences[target.id]);
    }
  }

  render() {
    const { notificationPreferences } = this.state;
    return (
      <div className={`${styles['m-40']} ${styles.border}`}>
        <PanelGroup accordion id="notification-preference">
          {Object.keys(Preferences).map((k, index) => (
            <Panel key={Preferences[k].heading} eventKey={k} className={`${styles['border-b']}`}>
              <Panel.Heading className={`${styles['p-10-20']}`}>
                <Panel.Title toggle className={`${styles['preference-list']} ${styles['black-color']} ${styles['p-10-20']} ${styles['flx-spacebw-alignc']}`}>
                  <div className={` ${styles['flx-spacebw-alignc']} ${styles.width100}`}>
                    <div className={`${styles['flx-space-bw']}`}>
                      <div className={`${styles['fs-12']} ${styles['p-10']} ${styles['thick-gry-clr']} ${styles['perference-list-in-clr']} ${styles['bg-light-gray']}`}>{index + 1}</div>
                      <div className={`${styles['flx-space-bw']} ${styles['pl-20']} ${styles['flex-colum']}`}>
                        <div className={`${styles['fs-14']}`}>{Preferences[k].heading}</div>
                        <div className={`${styles['fs-12']} ${styles['thick-gry-clr']}`}>{Preferences[k].subheading}</div>
                      </div>
                    </div>
                    <div className={`${styles.flex}`}>
                      <SVGCompoent clsName={`${styles['down-icon']}`} src="icons/common-icon/down-arrow" />
                    </div>
                  </div>
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible>
                <div className={`${styles['p-20']} ${styles['border-t']} ${styles['bg-light-gray']}`}>
                  <div className={`${styles['flx-spacebw-alignc']} ${styles['pl-65']} ${styles['pr-20']}`}>
                    {settingValues.map(s => (
                      <div
                        key={s.value}
                        className={`${styles['checkbox-material']} ${styles.flex} ${styles['add-to-compare']}`}
                      >
                        <input
                          id={`${k}-${s.value}`}
                          type="checkbox"
                          data-group={k}
                          data-value={s.value}
                          onChange={this.changeSetting}
                          defaultChecked={notificationPreferences && notificationPreferences[k] && notificationPreferences[k].setting_value &&
                            _.findIndex(notificationPreferences[k].setting_value, v => v === s.value) > -1}
                        />
                        <label htmlFor={`${k}-${s.value}`} className={`${styles['fs-12']}`}> {s.title}</label>
                      </div>
                    ))}
                    <Button
                      id={k}
                      className={`${styles.flex} ${styles['preference-save']} ${styles.fontW600} ${styles['fs-10']} ${styles['text-uppercase']}`}
                      btnText="SAVE"
                      onClick={this.savePreferences}
                    />
                  </div>
                  <div className={`${styles['fs-12']} ${styles['pl-65']} ${styles['mt-10']}`}>
                  {notificationPreferences && notificationPreferences[k] && notificationPreferences[k].setting_value &&
                            notificationPreferences[k].setting_value.length > 0 &&
                    <span>
                    <span className={`${styles.fontW600}`}>{PREFERENCES.NOTE}</span>
                    <span>{PREFERENCES.YOU_WILL_BE_UNSUBSCRIBED}</span>
                    </span>
                    }
                  </div>
                </div>
              </Panel.Body>
            </Panel>
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
    postPreferences: actionCreators.postPreferences,
  },
  dispatch,
);


export default connect(mapStateToProps, mapDispatchToProps)(NotificationPreferences);
