import Calendar from 'rc-calendar';
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Row, Col } from 'react-bootstrap';
import DatePicker from 'rc-calendar/lib/Picker';
import moment from 'moment';

import Btn from '../../../../common/Button';
import Input from '../../../../common/Input';

import styles from '../../../cam.styl';

const UpdateModal = props => {
  const { show, user_name, user_dob, user_gender, handleClose, handleNameChange, handleDobChange, handleSubmit, handleGenderChange } = props;

  const calendar = (
    <Calendar />
  );

  return (
    <div>
      <Modal show={show} onHide={handleClose} className={styles['editProfileModal']}>
        <Modal.Header closeButton>
          <Modal.Title>Personal Information</Modal.Title>
        </Modal.Header>

        <Modal.Body>
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
                <a onClick={() => handleGenderChange("M")} className={user_gender == 'M' ? `${styles['gender-select']}` : `${styles['gender-unselect']}`}>
                  <img src="http://via.placeholder.com/20x20" className={`${styles['dp-flex']} ${styles['m-auto']}`} />
                  <span>Male</span>
                </a>
              </div>
              <div className={styles['t-c']}>or</div>
              <div className={styles['t-c']} onClick={() => handleGenderChange("F")}>
                <a onClick={() => handleGenderChange("M")} className={user_gender == 'F' ? `${styles['gender-select']}` : `${styles['gender-unselect']}`}>
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
              <Input placeholder="Enter Name" val={user_name} onChange={event => handleNameChange(event.target.value)} />
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
                onChange={(value) => { handleDobChange(value) }}
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
              <Btn btnWidth="95%" backGround="#034e94" color="#fff" btnText="Update Personal Details" BtnClickHandler={handleSubmit} />
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}
UpdateModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  user_name:PropTypes.string.isRequired,
  user_dob:PropTypes.object.isRequired,
  user_gender:PropTypes.string.isRequired,
  handleNameChange:PropTypes.func.isRequired,
  handleDobChange:PropTypes.func.isRequired,
  handleSubmit:PropTypes.func.isRequired,
  handleGenderChange:PropTypes.func.isRequired
};
export default UpdateModal;
