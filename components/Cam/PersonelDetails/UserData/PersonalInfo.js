import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Input from '../../Common/Input';
import UpdateModal from './UpdateInfo/UpdateModal';

import styles from '../user.styl';
import CommonStyle from '../../cam.styl';

class PersonalInfo extends React.Component {
  constructor() {
    super();
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
    };
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }


  render() {
    const { name, dob, gender } = this.props.personalInfo ? this.props.personalInfo : { name: "", dob: "", gender: "" };
    const { show } = this.state;
    return (
      <div className={CommonStyle['base-padding']}>
        <Row className={styles['title-container']}>
          <Col xs={6} md={6}>
            <h6>Personel Information</h6>
          </Col>
          <Col xs={6} md={6}>
            <span className={`${CommonStyle['float-right']} ${CommonStyle['p-0']} ${CommonStyle['m-5']}`}>
              <a onClick={this.handleShow}>Edit</a>
              <Col md={8} />
              <Col md={4} xs={12}>
                <UpdateModal show={show} handleClose={this.handleClose} />
              </Col>
            </span>
          </Col>
        </Row>
        <Row className={`${CommonStyle['bb-dashed']} ${CommonStyle['pb-5']} ${CommonStyle['pt-5']}`}>
          <Col xs={12} md={3} className={`${CommonStyle['pl-15']} ${CommonStyle['pr-0']} ${CommonStyle['m-5']}`}>
            <span>Name</span>
          </Col>
          <Col xs={12} md={8} className={`${CommonStyle['p-0']} ${CommonStyle['m-5']}`}>
            <span className={CommonStyle['pl-15']}>{name}</span>
          </Col>
        </Row>
        <Row className={`${CommonStyle['bb-dashed']} ${CommonStyle['pb-5']} ${CommonStyle['pt-5']}`}>
          <Col xs={12} md={3} className={`${CommonStyle['pl-15']} ${CommonStyle['pr-0']} ${CommonStyle['m-5']}`}>
            <span>Date Of Birth</span>
          </Col>
          <Col xs={12} md={8} className={`${CommonStyle['p-0']} ${CommonStyle['m-5']}`}>
            <span className={CommonStyle['pl-15']}>{dob}</span>
          </Col>
        </Row>
        <Row className={`${CommonStyle['pt-5']}`}>
          <Col xs={12} md={3} className={`${CommonStyle['pl-15']} ${CommonStyle['pr-0']} ${CommonStyle['m-5']}`}>
            <span>Gender</span>
          </Col>
          <Col xs={12} md={8} className={`${CommonStyle['p-0']} ${CommonStyle['m-5']}`}>
            <span className={CommonStyle['pl-15']}>{gender}</span>
          </Col>
        </Row>
      </div>
    );
  }
}

PersonalInfo.propTypes = {
  personalInfo: PropTypes.object
};

export default PersonalInfo;
