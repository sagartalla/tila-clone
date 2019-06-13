import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors, actionCreators } from '../../store/auth';
import { languageDefinations } from '../../utils/lang';
import lang from '../../utils/language';
import Button from '../common/CommonButton';
import OTPInput from './OTPInput';
import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './login_en.styl';
import styles_ar from './login_ar.styl';
import SVGComponent from '../common/SVGComponet';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };
/* eslint-disable */

const { EMAIL_VERIFICATION, LOGIN_PAGE } = languageDefinations();

class ThankYou extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }

  render() {
    const { text } =this.props;
    return (
    <div >
    <div className={`${styles['reset-part']} ${styles.relative}`}>
        <div className={`${styles['t-c']} ${styles['fs-18']} ${styles.absolute} ${styles['success-text']} ${styles.fontW600}`}>{text}</div>
         <SVGComponent clsName={`${styles['reset-icon']}`} src="icons/common-icon/thankyou" />
         </div>
    </div>
  );
};
}


export default connect(null, null)(ThankYou);
