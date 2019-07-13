import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { selectors } from '../../../../store/cam/personalDetails';
import { languageDefinations } from '../../../../utils/lang/';
import UpdateContactInfoModal from './UpdateContactInfoModal';
import SVGComponent from '../../../common/SVGComponet';
import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../profile_en.styl';
import styles_ar from '../profile_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const sociaImages = {
  FB: {
    value: 'facebook',
  },
  GOOGLE: {
    value: 'google',
  },
  LKD: {
    value: 'linkedIn',
  },
  TWITTER: {
    value: 'twitter',
  },
  INSTAGRAM: {
    value: 'instagram',
  },
};
class ContactInfo extends React.Component {
  state = {
    show: false,
    element: "",
    contactInfo: {},
    showToolTip: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.userInfo.contactInfo) {
      this.setState({
        contactInfo: nextProps.userInfo.contactInfo
      });
    }
  }

  handleShow = (showVal, elem) => (e) => {
    if (showVal === true) {
      document.getElementsByTagName('BODY')[0].style.overflow = 'hidden';
    } else {
      document.getElementsByTagName('BODY')[0].style.overflow = 'auto';
    }
    this.setState({
      show: showVal,
      element: elem
    });
  }


  showToolTip = () => {
    this.setState({ showToolTip: true });
  }

  hideToolTip = () => {
    this.setState({ showToolTip: false });
  }

  render() {
    const { mailId, email, mobile_no, lastUpdated, phoneNum, email_verified, mobile_verified, password_exists, social_accounts } = this.state.contactInfo ? this.state.contactInfo : { mailId: "", email: "", mobile_no: "", lastUpdated: "not available", phoneNum: "", email_verified: "" };
    const { element, show, showToolTip } = this.state;
    console.log('userInfo', social_accounts);
    const { CONTACT_INFO_MODAL } = languageDefinations();
    return (
      <div className={`${styles['mb-10']}`}>
        <h4 className={styles['fontW600']}>{CONTACT_INFO_MODAL.HEADING}</h4>
        <div className={`${styles['bb-dashed']} ${styles['flex-center']} ${styles['pt-10']} ${styles['pb-10']}`}>
          <Col xs={12} md={3} className={`${styles['pl-0']} ${styles['pr-0']}`}>
            <span className={`${styles['fs-14']} ${styles['thick-gry-clr']}`}>{CONTACT_INFO_MODAL.EMAIL}</span>
          </Col>
          <Col xs={6} md={8} className={`${styles['flex-center']} ${styles['tickmark-part']}`}>
            <span className={styles['pr-20']}>{email}</span>
            <span className={email_verified !== 'NV' ? `${styles['showDiv']}` : `${styles['hideDiv']}`}>
              <span className={styles['flex']}><SVGComponent clsName={`${styles['tickmark-icon']}`} src="icons/common-icon/bg-tick-mark" /></span>
            </span>
          </Col>
          <Col xs={3} md={1} className={styles['pr-0']}>
            {/* <span className={`${styles['float-r']} ${styles['p-0']} ${styles['ml-5']}`}>
              <a onClick={this.handleShow(true, `email`)}>Edit</a>
            </span> */}
          </Col>
        </div>
        <div className={`${styles['flex-center']} ${styles['bb-dashed']} ${styles['pt-10']} ${styles['pb-10']}`}>
          <Col xs={12} md={3} className={`${styles['pl-0']} ${styles['pr-0']}`}>
            <span className={`${styles['fs-14']} ${styles['thick-gry-clr']}`}>{CONTACT_INFO_MODAL.PASSWORD}</span>
          </Col>
          <Col xs={6} md={8} className={`${styles.flex}`}>
            {password_exists ? lastUpdated :
          <React.Fragment>            
            <a onClick={this.handleShow(true, `setPassword`)} className={`${styles['p-0']} ${styles['text-blue']}`}>Set Password</a>
            <div className={`${styles['relative']} ${styles['cart-price-toltp']}`}>
                        <span
                          className={
                            `${styles.question}
                            ${styles['ml-5']}
                            ${styles['flex-center']}
                            ${styles['justify-center']}
                            ${styles['default-shadow']}
                            ${styles['fs-14']}
                            ${styles.pointer}
                            ${lang === 'en' ? '' : styles['flip-questionmark']}
                            `
                          }

                          >  ? </span>
                        <div className={`${styles['p-20']} ${styles['tool-tip']} ${styles['justify-between']} ${styles['flex-colum']} ${styles['cart-tool-tip']}`}>
                                <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles.fontW600}`}>Your account is connected using</div>
                                <Col md={12} xs={12} sm={12}>
                  {social_accounts && social_accounts.length > 0 &&
                  social_accounts.map(ll => (
                    <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles.pointer} ${styles['mt-20']} ${styles['border-radius4']} ${styles['mb-20']} ${styles['p-5']}`}>
                        <SVGComponent clsName={`${styles[`bg-${ll}-icon`]} ${styles['mr-10']}`} src={`icons/social-icons/bg-${sociaImages[ll].value}`} />
                    </div>
                  ))}
          </Col>
          <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']}`}>
                  To set your Tila password<br/>
                    <a onClick={this.handleShow(true, `setPassword`)}>Click here</a>
                   </div>

                        </div>
                      </div></React.Fragment>
          }
          </Col>
          <Col xs={6} md={1} className={styles['pr-0']}>
            <span onClick={this.handleShow(true, `password`)} className={`${styles['float-r']} ${styles['flex']} ${styles['p-0']} ${styles['ml-5']}`}>
              <SVGComponent clsName={`${styles['edit-icon']}`} src="icons/common-icon/edit/edit-penc" />
            </span>
          </Col>
        </div>
        <div className={`${styles['flex-center']} ${styles['pt-10']} ${styles['pb-10']}`}>

          <Col xs={12} md={3} className={`${styles['pl-0']} ${styles['pr-0']}`}>
            <span className={`${styles['fs-14']} ${styles['thick-gry-clr']}`}>{CONTACT_INFO_MODAL.PHONE_NUMBER}</span>
          </Col>
          <Col xs={6} md={8} className={`${styles['flex-center']} ${styles['tickmark-part']}`}>
            <span className={styles['pr-20']}>{phoneNum}</span>
            <span className={mobile_verified !== 'NV' ? `${styles['showDiv']}` : `${styles['hideDiv']}`}>
              <span className={styles['flex']}><SVGComponent clsName={`${styles['tickmark-icon']}`} src="icons/common-icon/bg-tick-mark" /></span>
            </span>
          </Col>
          <Col xs={6} md={1} className={styles['pr-0']}>
            <span
              onClick={this.handleShow(true, `phone`)}
              className={`${styles['float-r']} ${styles['pointer']} ${styles['flex']} ${styles['p-0']} ${styles['ml-5']}`}>
              <SVGComponent
                clsName={`${styles['edit-icon']}`}
                src="icons/common-icon/edit/edit-penc"
              />
            </span>
          </Col>
        </div>
        <div className={show ? `${styles['modalContainer']} ${styles['showDiv']}`
          : `${styles['modalContainer']} ${styles['hideDiv']}`}>
          <div onClick={this.handleShow(false, '')} className={`${styles['disabled']}`} />
        </div>
        <div className={show ? `${styles['openModal']}` : `${styles['closeModal']}`}>
          <UpdateContactInfoModal
            handleShow={this.handleShow}
            show={show}
            element={element}
          />
        </div>
      </div>
    );
  }
}


ContactInfo.propTypes = {
  userInfo: PropTypes.object
};


const mapStateToProps = (store) => ({
  userInfo: selectors.getUserInfo(store),
});



export default connect(mapStateToProps)(ContactInfo);
