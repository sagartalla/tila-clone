import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Button from '../common/CommonButton';
import { languageDefinations } from '../../utils/lang';
import { actionCreators as authActionCreators, selectors } from '../../store/auth';
import VerifyStatus from './VerifyStatus';

import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './login_en.styl';
import styles_ar from './login_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { LOGIN_PAGE } = languageDefinations();

/* eslint- disable */
class ForgotSecurityQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  showForgotPassword = () => {
    const { activeObj, showUserInfo, activeEmailId } = this.props;
    showUserInfo(activeEmailId).then((res) => {
      if (res.value.status === 200) {
        const { v2NextPage } = this.props;
        v2NextPage();
      }
    });
  }


  render() {
    const { loadingStatus } = this.props;
    return (
      <div className={`${styles['forgot-password']} ${styles.flex} ${styles['flex-colum']} ${styles['justify-around']}`}>
        <div>
          <h3 className={`${styles['fs-22']} ${styles['m-0']} ${styles['ff-b']}`}>{LOGIN_PAGE.FORGOT_PASSWORD}</h3>
          <div className={`${styles['text-clr']} ${styles['mt-5']}`}>{LOGIN_PAGE.PLEASE_ANSWER_SECURITY_QUESTIONS}</div>
        </div>
        <React.Fragment>
          <div>
            <div className={`${styles['fp-input']} ${styles['pb-30']}`}>
              <input name="email" type="text" autoComplete="off" required />
              <label className={`${styles['label-light-grey']}`}>What is your Birth place?*</label>
            </div>
            <div className={`${styles['fp-input']} ${styles['pb-30']}`}>
              <input name="email" type="text" autoComplete="off" required />
              <label className={`${styles['label-light-grey']}`}>What i your mothers maiden name?*</label>
            </div>
          </div>
          <Button
            className={`${styles['flex-center']}  ${styles.width100} ${styles['fs-14']} ${styles['text-uppercase']} ${styles['button-radius']}`}
            btnText={LOGIN_PAGE.NEXT}
            btnLoading={loadingStatus}
            onClick={this.showForgotPassword}

          />
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  activeObj: selectors.getActive(store),
  activeEmailId: selectors.getActiveEmailId(store),
  loadingStatus: selectors.getLoadingStatus(store),
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    v2NextPage: authActionCreators.v2NextPage,
    showUserInfo: authActionCreators.showUserInfo,
  },
  dispatch,
);

ForgotSecurityQuestions.propTypes = {

};

ForgotSecurityQuestions.defaultProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotSecurityQuestions);
