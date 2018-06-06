import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

import UpdateModal from './UpdateModal';
import Btn from '../../../../common/Button';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../../../store/cam/personalDetails';

import styles from '../../../cam.styl';


class UpdateInfoComponent extends React.Component {
  constructor() {
    super();
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
    if (nextProps.personalInfo) {
      this.setState({
        name: nextProps.personalInfo.first_name + " " + nextProps.personalInfo.last_name,
        gender: nextProps.personalInfo.gender,
        dob: nextProps.personalInfo.dob
      })
    }
    if (nextProps.getEditPersonalInfoStatus && nextProps.getEditPersonalInfoStatus.Response == "SUCCESS" && nextProps.personalInfo) {
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
    let date = dob != "" && dob ? new Date(dob) : new Date();
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
    const { name, user_name, dob, user_dob, gender, user_gender } = this.state;
    if (name != user_name || dob != user_dob || gender != user_gender) {
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
      <div className={`${styles['ht-290']} ${styles['p-10']} ${styles['br-5']}  ${styles['bg-mauve']}`}>
        <Row>
          <Col xs={12} md={12}><span className={styles['float-r']}>1/2</span></Col>
        </Row>
        <div>
          <Row>
            <Col xs={4} md={4} />
            <Col xs={4} md={4}>
              <div className={styles['image-block-style']} />
            </Col>
            <Col xs={4} md={4} />
          </Row>
          <Row>
            <div>
              <Col xs={12} md={12}>
                <span>Enter Your Name, DOB and Gender for a</span><br />
                <span>more personalised abcd.com Experience</span>
              </Col>
            </div>
          </Row>
        </div>
        <Row>
          <Col xs={12} md={12} className={styles['t-c']}>
            <Btn btnWidth="95%" btnText="Update Your Information" BtnClickHandler={this.handleShow} />
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
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12} className={`${styles['t-c']}`}>Timeline Component</Col>
        </Row>
        <Row>
          <Col xs={12} md={12} className={styles['t-c']}>We wont Spam.Swear!</Col>
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

UpdateInfoComponent.propTypes = {
  personalInfo: PropTypes.object,
  getEditPersonalInfoStatus: PropTypes.object,
  errorMessege: PropTypes.string,
  EditPersonalInfo: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateInfoComponent);
