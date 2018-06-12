import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../../store/cam/personalDetails';

import UpdateModal from './UpdateModal';
import commonStyle from '../../cam.styl';

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
    if (
      JSON.stringify(nextProps.userInfo.personalInfo) !== JSON.stringify(this.props.userInfo.personalInfo) ||
      JSON.stringify(nextProps.userInfo.personalInfo) !== JSON.stringify(this.state.personalInfo) ||
      JSON.stringify(nextProps.userInfo.personalInfo) !== JSON.stringify(nextState.personalInfo) ||
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
      <div className={`${commonStyle['ml-15']} ${commonStyle['mt-10']}`}>
        <Row>
          <Col xs={6} md={6}>
            <h6>Personel Information</h6>
          </Col>
          <Col xs={6} md={6}>
            <span className={`${commonStyle['float-r']} ${commonStyle['p-0']} ${commonStyle['m-5']}`}>
              <a onClick={this.handleShow(true)}>Edit</a>
            </span>
          </Col>
        </Row>
        <Row className={`${commonStyle['bb-dashed']} ${commonStyle['pb-5']} ${commonStyle['pt-5']}`}>
          <Col xs={12} md={3} className={`${commonStyle['pl-0']} ${commonStyle['pr-0']} ${commonStyle['m-5']}`}>
            <span>Name</span>
          </Col>
          <Col xs={12} md={8} className={`${commonStyle['p-0']} ${commonStyle['m-5']}`}>
            <span className={commonStyle['pl-15']}>{first_name} {last_name}</span>
          </Col>
        </Row>
        <Row className={`${commonStyle['bb-dashed']} ${commonStyle['pb-5']} ${commonStyle['pt-5']}`}>
          <Col xs={12} md={3} className={`${commonStyle['pl-0']} ${commonStyle['pr-0']} ${commonStyle['m-5']}`}>
            <span>Date Of Birth</span>
          </Col>
          <Col xs={12} md={8} className={`${commonStyle['p-0']} ${commonStyle['m-5']}`}>
            <span className={commonStyle['pl-15']}>{dob}</span>
          </Col>
        </Row>
        <Row className={`${commonStyle['pt-5']} ${commonStyle['ml-0']}`}>
          <Col xs={12} md={3} className={`${commonStyle['pl-0']} ${commonStyle['pr-0']} ${commonStyle['m-5']}`}>
            <span>Gender</span>
          </Col>
          <Col xs={12} md={8} className={`${commonStyle['p-0']} ${commonStyle['m-5']}`}>
            <span className={commonStyle['pl-15']}>{gender == 'F' ? "Female" : gender == "M" ? "Male" : ""}</span>
          </Col>
        </Row>
        <div className={show ? `${commonStyle['modalContainer']} ${commonStyle['showDiv']}` : `${commonStyle['modalContainer']} ${commonStyle['hideDiv']}`}>
          <div className={`${commonStyle['disabled']}`}>
          </div>
        </div>
        <div className={show ? `${commonStyle['openModal']}` : `${commonStyle['closeModal']}`}>
          <UpdateModal
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
