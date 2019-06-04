import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { languageDefinations } from '../../../utils/lang/';
import { actionCreators } from '../../../store/cam/wishlist';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';

const styles = lang === 'en' ? main_en : main_ar;

const { CONTACT_INFO_MODAL, PERSONAL_INFO_MODAL } = languageDefinations();
class NotifyMe extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      mobile: '',
      emailErr: '',
      mobileErr: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  notify = () => {
    const { pId, notifyMe, closeNotify } = this.props;
    let {
      email, mobile, emailErr, mobileErr,
    } = this.state;
    /* email validation regex, TODO:: move to utils */
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let params = {
      product_id: pId,
    };
    if (email) {
      if (emailRegex.test(email)) {
        params.email = email;
        notifyMe(params);
        closeNotify();
      } else {
        emailErr = 'Enter Valid EmailId';
      }
    }
    if (mobile) {
      if (mobile.length > 8) {
        params.mobile = mobile;
        notifyMe(params);
        closeNotify();
      } else {
        mobileErr = 'Enter Valid Mobile Number';
      }
    }
    this.setState({
      mobileErr,
      emailErr,
    });
  }

  render() {
    const {
      email, mobile, emailErr, mobileErr,
    } = this.state;
    return (
      <React.Fragment>
        <div className={`${styles['flex-center']} ${styles['justify-around']}`}>
          <div className={`${styles['mb-0']} ${styles['fp-input']} ${styles['pb-10']}`}>
            <input onChange={this.handleChange} name="email" type="text" value={email} required disabled={mobile} />
            <label>{CONTACT_INFO_MODAL.EMAIL}</label>
            {emailErr &&
              <span className={styles['error-msg']}>{emailErr}</span>
            }
          </div>
          <div>{PERSONAL_INFO_MODAL.OR}</div>
          <div className={`${styles['mb-0']} ${styles['fp-input']} ${styles['pb-10']}`}>
            <input onChange={this.handleChange} name="mobile" type="number" value={mobile} required disabled={email} />
            <label>{PERSONAL_INFO_MODAL.MOBILE}</label>
            {mobileErr &&
              <span className={styles['error-msg']}>{mobileErr}</span>
            }
          </div>
        </div>
        <div className={styles.flex}>
          <Button
            className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-x-large']} ${styles['text-uppercase']} ${styles['right-radius']}`}
            onClick={this.notify}
          >
            {PERSONAL_INFO_MODAL.NOTIFY}
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

NotifyMe.propTypes = {
  notifyMe: PropTypes.func.isRequired,
  closeNotify: PropTypes.func.isRequired,
  pId: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    notifyMe: actionCreators.notifyMe,
  },
  dispatch,
);

export default connect(null, mapDispatchToProps)(NotifyMe);
