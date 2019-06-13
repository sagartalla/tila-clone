import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Button from '../common/CommonButton';
import { languageDefinations } from '../../utils/lang';
import { selectors, actionCreators } from '../../store/cam/personalDetails';
import { actionCreators as authActionCreators } from '../../store/auth';
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
    const { activeObj } = this.props;
    console.log('activeObj', activeObj);
    const data = { currentFlow: 'forgot_password', activeTab: activeObj.nextPage };
    const { showNextPage } = this.props;
    showNextPage(data);
  }

  render() {
    return (
      <div className={`${styles['forgot-password']} ${styles.flex} ${styles['flex-colum']} ${styles['justify-around']}`}>
        <div>
          <h3 className={`${styles['fs-22']} ${styles['m-0']} ${styles['ff-b']}`}>{LOGIN_PAGE.FORGOT_PASSWORD}</h3>
          <div className={`${styles['text-clr']} ${styles['mt-5']}`}>Please answer the security questions below to reset the password</div>
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
            btnText="Next"
            onClick={this.showForgotPassword}
          />
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = store => ({

});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    showNextPage: authActionCreators.showNextPage,
  },
  dispatch,
);

ForgotSecurityQuestions.propTypes = {

};

ForgotSecurityQuestions.defaultProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotSecurityQuestions);
