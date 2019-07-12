import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators, selectors } from '../../store/auth';
import { actionCreators as personalActionCreators } from '../../store/cam/personalDetails';

import { languageDefinations } from '../../utils/lang';
import SVGComponent from '../common/SVGComponet';
import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './login_en.styl';
import styles_ar from './login_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { EMAIL_VERIFICATION, LOGIN_PAGE } = languageDefinations();

class ThankYou extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    if (this.props.showUserInfo) {
      this.props.getUserInfoData();
      this.props.getUserProfileInfo();
    }
  }

  render() {
    const { text } = this.props;
    return (
      <div className={`${styles['reset-part']} ${styles.relative}`}>
        <div className={`${styles['t-c']} ${styles.absolute} ${styles['success-text']}`}>
          {text}
          <div className={`${styles.flex} ${styles['justify-center']} ${styles['mt-25']}`}>
            <SVGComponent clsName={styles['logo-icon']} src={`icons/logos/default-logo-${lang}`} />
          </div>
        </div>
        <img className={`${styles['reset-icon']}`} src="/static/img/icons/common-icon/thanksimg.png" alt="thankyou" />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  text: selectors.getActiveText(store),
  showUserInfo: selectors.showUserInfo(store),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getUserInfoData: actionCreators.getUserInfoData,
    getUserProfileInfo: personalActionCreators.getUserProfileInfo,
  },
  dispatch,
);


export default connect(mapStateToProps, mapDispatchToProps)(ThankYou);
