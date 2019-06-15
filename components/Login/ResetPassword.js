import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';
import { Modal } from 'react-router-modal';
import { languageDefinations } from '../../utils/lang';
import { actionCreators, selectors } from '../../store/auth';
import SVGComponent from '../common/SVGComponet';
import Button from '../common/CommonButton';
import lang from '../../utils/language';
import ShowHidePassword from './ShowHidePassword';
import ResetPasswordMain from './ResetpasswordMain';

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
    };
  }

  onBackdropClick = () => {
    this.props.resetShowLogin();
  }

  render() {
    const { token, showResetScreen } = this.props;
    return (
      showResetScreen &&
      <Modal className={`react-router-modal__modal ${styles['login-reg-modal']} ${styles['p-10']}`} onBackdropClick={this.onBackdropClick}>
            <Row className={`${styles['bg-white']} ${styles['m-0']}`}>
              <div className={`${styles.flex}`}>
                <Col md={4} xs={12} sm={4} className={`${styles['pl-0']} ${styles['pr-10']} ${styles['m-hdn']}`}>
                  <div className={`${styles.flex} ${styles['image-placeholder']}`}>
                    <img src="../../static/img/icons/login-logo.png" className={`${styles['img-responsive']}`} alt="" />
                  </div>
                </Col>
                <Col md={8} xs={12} sm={8} className={`${styles['bg-white']} ${styles['border-radius4']} ${styles['pl-25']} ${styles['pr-25']}`}>
                  <ResetPasswordMain token={token} showCrossButton onBackdropClick={this.onBackdropClick} />
                </Col>
              </div>
            </Row>
          </Modal>
    );
  }
}

const mapStateToProps = store => ({
  showResetScreen: selectors.showResetScreen(store),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    resetPassword: actionCreators.resetPassword,
    resetShowLogin: actionCreators.resetShowLogin,
    v2CurrentFlow: actionCreators.v2CurrentFlow,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
