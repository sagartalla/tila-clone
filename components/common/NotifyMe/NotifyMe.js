import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../../store/cam/wishlist';
import { mergeCss } from '../../../utils/cssUtil';

const styles = mergeCss('components/common/NotifyMe/notifyMe');

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
            <label>Email</label>
            {emailErr &&
              <span className={styles['error-msg']}>{emailErr}</span>
            }
          </div>
          <div>OR</div>
          <div className={`${styles['mb-0']} ${styles['fp-input']} ${styles['pb-10']}`}>
            <input onChange={this.handleChange} name="mobile" type="number" value={mobile} required disabled={email} />
            <label>Mobile</label>
            {mobileErr &&
              <span className={styles['error-msg']}>{mobileErr}</span>
            }
          </div>
        </div>
        <div className={styles.flex}>
          <Button
            className={`${styles['fp-btn']} ${styles['fp-btn-primary']}`}
            onClick={this.notify}
          >
            Notify
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