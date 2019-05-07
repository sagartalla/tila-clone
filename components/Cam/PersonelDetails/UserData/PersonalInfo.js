import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { selectors } from '../../../../store/cam/personalDetails';
import { languageDefinations } from '../../../../utils/lang/';
import UpdatePersonalInfoModal from './UpdatePersonalInfoModal';
import SVGComponent from '../../../common/SVGComponet';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../profile_en.styl';
import styles_ar from '../profile_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};


class PersonalInfo extends React.Component {

  state = {
    show: false,
    personalInfo: {}
  };


  componentWillReceiveProps(nextProps) {
    if (nextProps.userInfo.personalInfo) {
      this.setState({
        personalInfo: nextProps.userInfo.personalInfo
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const personalInfo= JSON.stringify(nextProps.userInfo.personalInfo);
    if (
      personalInfo !== JSON.stringify(this.props.userInfo.personalInfo) ||
      personalInfo !== JSON.stringify(this.state.personalInfo)  ||
      (this.state.show) !== (nextState.show)
    ) {
      return true;
    }
    return false;
  }

  handleShow = (value) => (e) => {
    this.setState({ show: value });
  }

  render() {
    const { show } = this.state;
    const { first_name, last_name, dob, gender } = this.state.personalInfo ? this.state.personalInfo : { first_name: "", last_name: "", dob: "", gender: "" };
    const { PERSONAL_INFO_MODAL } = languageDefinations();
    return (
      <div>
        <h4 className={`${styles['flx-space-bw']} ${styles['information-title']} ${styles['fontW600']} ${styles['mt-0']}`}>
          <span>{PERSONAL_INFO_MODAL.HEADING}</span>
          <a className={`${styles['flex']}`} onClick={this.handleShow(true)}>
            <SVGComponent clsName={`${styles['edit-icon']}`} src="icons/common-icon/edit/edit-penc" />
          </a>
        </h4>
        <div className={`${styles['flex-center']} ${styles['bb-dashed']} ${styles['pt-10']} ${styles['pb-10']}`}>
          <Col xs={12} md={3} className={`${styles['pl-0']} ${styles['pr-0']}`}>
            <span>{PERSONAL_INFO_MODAL.NAME}</span>
          </Col>
          <Col xs={12} md={8} className={`${styles['p-0']}`}>
            <span className={styles['pl-15']}>{first_name} {last_name}</span>
          </Col>
        </div>
        <div className={`${styles['flex-center']} ${styles['bb-dashed']} ${styles['pt-10']} ${styles['pb-10']}`}>
          <Col xs={12} md={3} className={`${styles['pl-0']} ${styles['pr-0']}`}>
            <span>{PERSONAL_INFO_MODAL.DOB}</span>
          </Col>
          <Col xs={12} md={8} className={`${styles['p-0']}`}>
            <span className={styles['pl-15']}>{dob}</span>
          </Col>
        </div>
        <div className={`${styles['flex-center']} ${styles['pt-10']} ${styles['pb-10']}`}>
          <Col xs={12} md={3} className={`${styles['pl-0']} ${styles['pr-0']}`}>
            <span>{PERSONAL_INFO_MODAL.GENDER}</span>
          </Col>
          <Col xs={12} md={8} className={`${styles['p-0']}`}>
            <span className={styles['pl-15']}>{gender == 'F' ? `${PERSONAL_INFO_MODAL.FEMALE}` : gender == "M" ? `${PERSONAL_INFO_MODAL.MALE}` : ""}</span>
          </Col>
        </div>
        <div className={show ? `${styles['modalContainer']} ${styles['showDiv']}` : `${styles['modalContainer']} ${styles['hideDiv']}`}>
          <div className={`${styles['disabled']}`}>
          </div>
        </div>
        <div className={show ? `${styles['openModal']}` : `${styles['closeModal']}`}>
          <UpdatePersonalInfoModal
            handleShow={this.handleShow}
            show={show}
          />
        </div>
      </div>
    );
  }
}


const mapStateToProps = (store) => ({
  userInfo: selectors.getUserInfo(store)
});


PersonalInfo.propTypes = {
  userInfo: PropTypes.object
};

export default connect(mapStateToProps)(PersonalInfo);
