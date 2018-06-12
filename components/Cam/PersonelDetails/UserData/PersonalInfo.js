import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../../store/cam/personalDetails';

import UpdatePersonalInfoModal from './UpdatePersonalInfoModal';
import styles from '../../cam.styl';

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
    return (
      <div className={`${styles['ml-15']} ${styles['mt-10']}`}>
        <Row>
          <Col xs={6} md={6}>
            <h6>Personel Information</h6>
          </Col>
          <Col xs={6} md={6}>
            <span className={`${styles['float-r']} ${styles['p-0']} ${styles['m-5']}`}>
              <a onClick={this.handleShow(true)}>Edit</a>
            </span>
          </Col>
        </Row>
        <Row className={`${styles['bb-dashed']} ${styles['pb-5']} ${styles['pt-5']}`}>
          <Col xs={12} md={3} className={`${styles['pl-0']} ${styles['pr-0']} ${styles['m-5']}`}>
            <span>Name</span>
          </Col>
          <Col xs={12} md={8} className={`${styles['p-0']} ${styles['m-5']}`}>
            <span className={styles['pl-15']}>{first_name} {last_name}</span>
          </Col>
        </Row>
        <Row className={`${styles['bb-dashed']} ${styles['pb-5']} ${styles['pt-5']}`}>
          <Col xs={12} md={3} className={`${styles['pl-0']} ${styles['pr-0']} ${styles['m-5']}`}>
            <span>Date Of Birth</span>
          </Col>
          <Col xs={12} md={8} className={`${styles['p-0']} ${styles['m-5']}`}>
            <span className={styles['pl-15']}>{dob}</span>
          </Col>
        </Row>
        <Row className={`${styles['pt-5']} ${styles['ml-0']}`}>
          <Col xs={12} md={3} className={`${styles['pl-0']} ${styles['pr-0']} ${styles['m-5']}`}>
            <span>Gender</span>
          </Col>
          <Col xs={12} md={8} className={`${styles['p-0']} ${styles['m-5']}`}>
            <span className={styles['pl-15']}>{gender == 'F' ? "Female" : gender == "M" ? "Male" : ""}</span>
          </Col>
        </Row>
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
