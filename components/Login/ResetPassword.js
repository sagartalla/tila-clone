import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';
import { Modal } from 'react-router-modal';
import { languageDefinations } from '../../utils/lang';
import { actionCreators, selectors } from '../../store/cam/personalDetails';
import SVGComponent from '../common/SVGComponet';
import Button from '../common/CommonButton';
import lang from '../../utils/language';
import ShowHidePassword from './ShowHidePassword';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './login_en.styl';
import styles_ar from './login_ar.styl';
import HeaderBar from '../HeaderBar';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { LOGIN_PAGE } = languageDefinations();

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      password: '',
      confirmPassword: '',
      hide: true,
      showModal: true,
    };
    this.passwordSuccess = this.passwordSuccess.bind(this);
  }

    onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }


  onBackdropClick = () => {
    this.setState({
      showModal: false,
    });
  }

  hideToggle = () => {
    this.setState({
      hide: !this.state.hide,
    });
  }


  passwordSuccess() {
    const { password } = this.state;
    if (password) {
      const body = {
        password,
        token: this.props.token,
      };
      this.props.resetPassword(body).then((res) => {
        if (res && res.value && res.value.data && res.value.data.Response === 'SUCCESS') {
          this.setState({ success: true });
        } else {
          this.setState({ success: false });
        }
      });
    }
  }
  render() {
    const { password, hide, success, showModal } = this.state;
    return (
      <React.Fragment>
        {success ?
          <div className={`${styles.flex} ${styles['justify-center']}  ${styles['flex-center']} ${styles['flex-col']} ${styles['bg-gray']}`}>
            <div className={`${styles.flex} ${styles['justify-center']} ${styles['flex-center']} ${styles['flex-col']} ${styles['ht-240']}`}>
              <Col xs={12} md={12} className={`${styles['flex-center']} ${styles['reset-part']}`}>
                <SVGComponent clsName={`${styles['reset-icon']}`} src="icons/common-icon/reset-success" />
              </Col>
            </div>
          </div> :
          showModal &&
          <Modal className={`react-router-modal__modal ${styles['login-reg-modal']} ${styles['p-10']}`} onBackdropClick={this.onBackdropClick}>
            <Row className={`${styles['bg-white']} ${styles['m-0']}`}>
              <div className={`${styles.flex}`}>
                <Col md={4} xs={12} sm={4} className={`${styles['pl-0']} ${styles['pr-10']} ${styles['m-hdn']}`}>
                  <div className={`${styles.flex} ${styles['image-placeholder']}`}>
                    <img src="../../static/img/icons/login-logo.png" className={`${styles['img-responsive']}`} alt="" />
                  </div>
                </Col>
                <Col md={8} xs={12} sm={8} className={`${styles['bg-white']} ${styles['border-radius4']}`}>
                  <div className={`${styles.flex} ${styles['align-center']} ${styles['justify-between']} ${styles['flex-row']}`}>
                    <div className={`${styles.flex} ${styles['mt-10']} ${styles.pointer}`} onClick={this.onBackdropClick}>
                      <SVGComponent clsName={`${styles['cross-icon']}`} src="icons/common-icon/cross-button" />
                    </div>
                  </div>
                  <div className={`${styles['reset-password']} ${styles.flex} ${styles['justify-between']} ${styles['flex-colum']}`}>
                    <Row className={`${styles['reset-main']} ${styles['m-0']} ${styles['flex-center']} ${styles['justify-between']} ${styles['p-10']} ${styles.width100}`}>
                      <div className={`${styles['fs-22']}`}><b>{LOGIN_PAGE.RESET_PASSWORD}</b></div>
                      <div className={`${styles.flex}`}><SVGComponent clsName={`${styles['reset-password-icon']}`} src="icons/common-icon/reset-password" /></div>
                    </Row>
                    <h4 className={`${styles['fs-16']} ${styles['ff-b']}`}>
                      {LOGIN_PAGE.PLEASE_SET_YOUR_SECURE_PASSWORD}
                    </h4>
                    <div className={`${styles['mt-15']} ${styles.relative} ${styles.reset_show} ${styles['fp-input']}`}>
                      <input
                        type={hide ? 'password' : 'text'}
                        autoComplete="off"
                        name="password"
                        value={password}
                        className={`${styles.width100}`}
                        onChange={this.onChange}
                        required
                      />
                      <label className={`${styles['label-light-grey']}`}>{LOGIN_PAGE.ENTER_NEW_PASSWORD}</label>
                      <ShowHidePassword hide={hide} hideToggle={this.hideToggle} />
                    </div>
                    <Button
                      className={`${styles['flex-center']} ${styles.width100} ${styles['fs-14']} ${styles['text-uppercase']} ${styles['button-radius']}`}
                      onClick={this.passwordSuccess}
                      btnText={LOGIN_PAGE.NEXT}
                    />
                  </div>
                </Col>
              </div>
            </Row>
          </Modal>}
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => ({
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    resetPassword: actionCreators.resetPassword,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
