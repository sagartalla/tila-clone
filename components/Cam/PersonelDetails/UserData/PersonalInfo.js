import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../../store/cam/personalDetails';

import UpdateModal from './UpdateInfo/UpdateModal';

import commonStyle from '../../cam.styl';

class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDobChange = this.handleDobChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.state = {
      show: false,
      name: "",
      gender: "",
      dob: "",
      user_name: "",
      user_gender: "",
      user_dob: moment(new Date())
    };
  }

  componentWillReceiveProps(nextProps) {
      if(nextProps.personalInfo){
     this.setState({
      name: nextProps.personalInfo.first_name+ " "+nextProps.personalInfo.last_name,
      gender: nextProps.personalInfo.gender,
      dob: nextProps.personalInfo.dob
     })
    }
    if (nextProps.getEditPersonalInfoStatus && nextProps.getEditPersonalInfoStatus.Response=="SUCCESS" && nextProps.personalInfo) {
      this.setState({
        name: nextProps.personalInfo.first_name + " " + nextProps.personalInfo.last_name,
        gender: nextProps.personalInfo.gender,
        dob: nextProps.personalInfo.dob
      })
      this.handleClose();
    }
  }

  handleClose() {
    this.setState({
      show: false,
      user_dob: moment(new Date()),
      user_name: "",
      user_gender: ""
    });
  }

  handleShow() {
    const { name, gender, dob } = this.state;
    let date= dob!="" && dob? new Date(dob): new Date();
    this.setState({
      show: true,
      user_dob: moment(dob),
      user_name: name,
      user_gender: gender
    });
  }

  handleNameChange(val) {
    this.setState({ user_name: val });
  }

  handleDobChange(value) {
    this.setState({ user_dob: value })
  }


  handleGenderChange(val) {
    this.setState({ user_gender: val });
  }

  handleSubmit() {
    const {name, user_name, dob, user_dob, gender, user_gender}=this.state;
    if (name!=user_name || dob!=user_dob || gender!=user_gender) {
      this.props.EditPersonalInfo({
        "first_name": user_name.length > 0 ? user_name.split(" ")[0] : "",
        "dob": user_dob.format("YYYY-MM-DD"),
        "gender": user_gender,
        "last_name": user_name.length > 0 ? user_name.split(" ")[1] : "",
        "image_url": ""
      });
    }
  }


  render() {
    const { name, dob, gender, showInput, user_name, user_dob, user_gender, show } = this.state;
    return (
      <div className={`${commonStyle['ml-15']} ${commonStyle['mt-10']}`}>
        <Row>
          <Col xs={6} md={6}>
            <h6>Personel Information</h6>
          </Col>
          <Col xs={6} md={6}>
            <span className={`${commonStyle['float-r']} ${commonStyle['p-0']} ${commonStyle['m-5']}`}>
              <a onClick={this.handleShow}>Edit</a>
              <Col md={8} />
              <Col md={4} xs={12}>
                <UpdateModal
                  show={show}
                  handleClose={this.handleClose}
                  user_name={user_name}
                  user_dob={user_dob}
                  user_gender={user_gender}
                  handleNameChange={this.handleNameChange}
                  handleDobChange={this.handleDobChange}
                  handleGenderChange={this.handleGenderChange}
                  handleSubmit={this.handleSubmit} />
              </Col>
            </span>
          </Col>
        </Row>
        <Row className={`${commonStyle['bb-dashed']} ${commonStyle['pb-5']} ${commonStyle['pt-5']}`}>
          <Col xs={12} md={3} className={`${commonStyle['pl-0']} ${commonStyle['pr-0']} ${commonStyle['m-5']}`}>
            <span>Name</span>
          </Col>
          <Col xs={12} md={8} className={`${commonStyle['p-0']} ${commonStyle['m-5']}`}>
            <span className={commonStyle['pl-15']}>{name}</span>
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
            <span className={commonStyle['pl-15']}>{gender=='F'? "Female" : "Male"}</span>
          </Col>
        </Row>
      </div>
    );
  }
}


const mapStateToProps = (store) => ({
  getEditPersonalInfoStatus: selectors.getEditPersonalInfoStatus(store),
  errorMessege: selectors.getErrorMessege(store)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      EditPersonalInfo: actionCreators.EditPersonalInfo
    },
    dispatch,
  );

PersonalInfo.propTypes = {
  personalInfo: PropTypes.object,
  getEditPersonalInfoStatus: PropTypes.object,
  errorMessege: PropTypes.string,
  EditPersonalInfo: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);

