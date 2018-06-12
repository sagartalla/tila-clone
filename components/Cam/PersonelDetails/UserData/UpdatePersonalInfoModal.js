import Calendar from 'rc-calendar';
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import DatePicker from 'rc-calendar/lib/Picker';
import moment from 'moment';

import Btn from '../../../common/Button';
import Input from '../../../common/Input';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../../store/cam/personalDetails';

import styles from '../../cam.styl';

class UpdatePersonalInfoModal extends React.Component {
  state = {
    user_name: "",
    user_gender: "",
    user_dob: moment(new Date()),
    show: this.props.show,
    responseState: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.userInfo.personalInfo && Object.keys(nextProps.userInfo.personalInfo).length > 0 && this.state.user_name == "" && this.state.user_gender == "") {
      this.setState({
        user_name: nextProps.userInfo.personalInfo.user_name,
        user_gender: nextProps.userInfo.personalInfo.gender,
        user_dob: nextProps.userInfo.personalInfo.dob != "" && nextProps.userInfo.personalInfo.dob ? moment(new Date(nextProps.userInfo.personalInfo.dob)) : moment(new Date()),
        show: nextProps.show
      })
    }
    if (nextProps.getEditPersonalInfoStatus && nextProps.getEditPersonalInfoStatus.Response == "SUCCESS" && nextProps.userInfo.personalInfo && !this.state.responseState) {
      this.setState({
        user_name: nextProps.userInfo.personalInfo.user_name,
        user_gender: nextProps.userInfo.personalInfo.gender,
        user_dob: nextProps.userInfo.personalInfo.dob != "" && nextProps.userInfo.personalInfo.dob ? moment(new Date(nextProps.userInfo.personalInfo.dob)) : moment(new Date()),
        show: nextProps.show,
        responseState: true
      })
      alert("Details updated successfully!!");
      this.handleClose();
    }
  }

  handleClose = () => {
    this.setState({
      user_dob: moment(new Date()),
      user_name: "",
      user_gender: "",
      show: false
    });
    this.props.handleShow(false)();
  }

  handleNameChange = (e) => {
    this.setState({
      user_name: e.target.value
    });
  }

  handleDobChange = (value) => {
    this.setState({
      user_dob: moment(new Date(value))
    })
  }


  handleGenderChange = (val) => (e) => {
    this.setState({ user_gender: val });
  }

  handleSubmit = () => {
    const { user_name, user_dob, user_gender } = this.state;
    this.setState({ responseState: false });
    this.props.EditPersonalInfo({
      "first_name": user_name.length > 0 ? user_name.split(" ")[0] : "",
      "dob": user_dob.format("YYYY-MM-DD"),
      "gender": user_gender,
      "last_name": user_name.length > 0 ? user_name.split(" ")[1] : "",
      "image_url": ""
    });
  }
  render() {
    const calendar = (
      <Calendar />
    );
    const { user_name, user_dob, user_gender } = this.state;
    return (
      <div>
        <div className={styles['editProfileModal']}>
          <Row>
            <Col xs={11} md={11}>
              <h3>Personal Information</h3>
            </Col>
            <Col xs={1} md={1} onClick={this.handleClose}><a>
              X</a>
            </Col>
          </Row>
          <div>
            <Row>
              <Col xs={4} md={4} />
              <Col xs={4} md={4}>
                <div className={styles['image-block-style']} />
              </Col>
              <Col xs={4} md={4} />
            </Row>

            <Row className={`${styles['m-5']} ${styles['mt-20']}`}>
              <Col xs={4} md={4} />
              <Col xs={4} md={4} className={styles['dp-flex']}>
                <div className={styles['t-c']}>
                  <a onClick={this.handleGenderChange("M")} className={user_gender == 'M' ? `${styles['gender-select']}` : `${styles['gender-unselect']}`}>
                    <img src="http://via.placeholder.com/20x20" className={`${styles['dp-flex']} ${styles['m-auto']}`} />
                    <span>Male</span>
                  </a>
                </div>
                <div className={styles['t-c']}>or</div>
                <div className={styles['t-c']} onClick={this.handleGenderChange("F")}>
                  <a onClick={this.handleGenderChange("M")} className={user_gender == 'F' ? `${styles['gender-select']}` : `${styles['gender-unselect']}`}>
                    <img src="http://via.placeholder.com/20x20" className={`${styles['dp-flex']} ${styles['m-auto']}`} />
                    <span>Female</span>
                  </a>
                </div>
              </Col>
              <Col xs={4} md={4} />
            </Row>
            <Row className={`${styles['m-5']} ${styles['mt-20']}`}>
              <Col xs={12} md={12}>
                <div>Name</div>
                <Input placeholder="Enter Name" val={user_name} onChange={this.handleNameChange} />
              </Col>
            </Row>
            <Row className={`${styles['m-5']} ${styles['mt-20']}`}>
              <Col xs={12} md={12}>
                <div>Date Of Birth</div>

                <DatePicker
                  animation="slide-up"
                  value={user_dob}
                  disabled={false}
                  calendar={calendar}
                  onChange={(value) => this.handleDobChange(value)}
                >{
                    ({ value }) => {
                      return (
                        <input value={value ? value.format('YYYY-MM-DD') : ''} readOnly />
                      )
                    }
                  }</DatePicker>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12} className={`${styles['text-align-center']}`}>
                <Btn btnWidth="95%" backGround="#034e94" color="#fff" btnText="Update Personal Details" BtnClickHandler={this.handleSubmit} />
              </Col>
            </Row>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  getEditPersonalInfoStatus: selectors.getEditPersonalInfoStatus(store),
  errorMessege: selectors.getErrorMessege(store),
  userInfo: selectors.getUserInfo(store)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      EditPersonalInfo: actionCreators.EditPersonalInfo
    },
    dispatch,
  );

  UpdatePersonalInfoModal.propTypes = {
  show: PropTypes.bool,
  handleShow: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
  getEditPersonalInfoStatus: PropTypes.object,
  errorMessege: PropTypes.string,
  EditPersonalInfo: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePersonalInfoModal);
