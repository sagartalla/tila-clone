import Calendar from 'rc-calendar';
import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import DatePicker from 'rc-calendar/lib/Picker';
import moment from 'moment';
import { toast } from 'react-toastify';
import { languageDefinations } from '../../../../utils/lang';
import Btn from '../../../common/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../../store/cam/personalDetails';
import SVGComponent from '../../../common/SVGComponet';
import ToastContent from '../../../common/ToastContent';
import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../profile_en.styl';
import styles_ar from '../profile_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { PERSONAL_INFO_MODAL } = languageDefinations();


class UpdatePersonalInfoModal extends React.Component {
  state = {
    user_name: '',
    user_gender: '',
    user_dob: moment(new Date()),
    show: this.props.show,
    responseState: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.userInfo.personalInfo && Object.keys(nextProps.userInfo.personalInfo).length > 0 && this.state.user_name == '' && this.state.user_gender == '') {
      this.setState({
        user_name: nextProps.userInfo.personalInfo.user_name,
        user_gender: nextProps.userInfo.personalInfo.gender,
        user_dob: nextProps.userInfo.personalInfo.dob != '' && nextProps.userInfo.personalInfo.dob ? moment(new Date(nextProps.userInfo.personalInfo.dob)) : moment(new Date()),
        show: nextProps.show,
      });
    }
    if (nextProps.getEditPersonalInfoStatus && nextProps.getEditPersonalInfoStatus.Response == 'SUCCESS' && nextProps.userInfo.personalInfo && !this.state.responseState) {
      this.setState({
        user_name: nextProps.userInfo.personalInfo.user_name,
        user_gender: nextProps.userInfo.personalInfo.gender,
        user_dob: nextProps.userInfo.personalInfo.dob != '' && nextProps.userInfo.personalInfo.dob ? moment(new Date(nextProps.userInfo.personalInfo.dob)) : moment(new Date()),
        show: nextProps.show,
        responseState: true,
      });
    }
  }

  handleClose = () => {
    this.setState({
      user_dob: moment(new Date()),
      user_name: '',
      user_gender: '',
      show: false,
    });
    this.props.handleShow(false)();
  }

  handleNameChange = (e) => {
    this.setState({
      user_name: e.target.value,
    });
  }

  handleDobChange = (value) => {
    this.setState({
      user_dob: moment(new Date(value)),
    });
  }

  handleGenderChange = val => (e) => {
    this.setState({ user_gender: val });
  }

  disabledDate = (current) => {
    if (!current) {
      // allow empty select
      return false;
    }
    const date = moment();
    date.hour(0);
    date.minute(0);
    date.second(0);
    return current.valueOf() > date.valueOf();
  }

  handleSubmit = () => {
    const { user_name, user_dob, user_gender } = this.state;
    this.setState({ responseState: false });
    let [first_name, ...second_name] = user_name.split(' ');
    second_name = second_name.join(' ');
    if (user_name && user_dob && user_gender) {
      this.props.EditPersonalInfo({
        first_name: first_name || '',
        dob: user_dob.format('YYYY-MM-DD'),
        gender: user_gender,
        last_name: second_name || '',
        image_url: '',
      });
      this.handleClose();
      toast(<ToastContent
        msg="Your personal information has been updated."
        msgType="success"
      /> );
    } else {
      toast(<ToastContent
        msg="Fill in all the fields"
        msgType="error"
      /> );
    }
  }

  render() {
    const calendar = (
      <Calendar disabledDate={this.disabledDate} />
    );
    const { user_name, user_dob, user_gender } = this.state;
    return (
      <div>
        <div className={styles.editProfileModal}>
          <h4 className={`${styles['flx-spacebw-alignc']} ${styles['m-0']}`}>
            <span className={`${styles['fs-20']}`}>Personal Information</span>
            <a onClick={this.handleClose} className={`${styles['fs-22']} ${styles['black-color']}`}>X</a>
          </h4>
          <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
            <div className={`${styles['flex-center']} ${styles['flex-colum']} ${styles['personal-info-main']}`}>
              <div className={`${styles['personal-info-img']} ${styles.flex} ${styles['justify-center']}`}>
                <SVGComponent clsName={`${styles['personal-info-img-icon']}`} src="icons/common-icon/personal-info-mobile" />
              </div>
              <p className={`${styles['thick-gry-clr']} ${styles['fs-12']} ${styles['t-c']}`}>{PERSONAL_INFO_MODAL.ENTER_YOUR_NAME}{PERSONAL_INFO_MODAL.EXPERIANCE}</p>
            </div>
            <div className={`${styles['m-5']} ${styles['mt-20']} ${styles['gender-select-main']} ${styles['flex-center']} ${styles['justify-center']}`}>
              <div className={styles['t-c']}>
                <a onClick={this.handleGenderChange('M')} className={user_gender == 'M' ? `${styles['gender-select']}` : `${styles['gender-unselect']}`}>
                  <SVGComponent clsName={`${styles['gender-select-inn']} ${user_gender == 'M' ? 'select-icon' : 'not-select-icon'}`} src="icons/common-icon/male" />
                  <span className={`${styles['fs-12']} ${styles['label-gry-clr']}`}>{PERSONAL_INFO_MODAL.MALE}</span>
                </a>
              </div>
              <div className={`${styles['fs-12']} ${styles['ml-10']} ${styles['mr-10']} ${styles['gender-or']} ${styles['flex-center']} ${styles['justify-center']}`}>{PERSONAL_INFO_MODAL.OR}</div>
              <div className={styles['t-c']} onClick={this.handleGenderChange('F')}>
                <a onClick={this.handleGenderChange('M')} className={user_gender == 'F' ? `${styles['gender-select']}` : `${styles['gender-unselect']}`}>
                  <SVGComponent clsName={`${styles['gender-select-inn']} ${user_gender == 'F' ? 'select-icon' : 'not-select-icon'}`} src="icons/common-icon/female" />
                  <span className={`${styles['fs-12']} ${styles['label-gry-clr']}`}>{PERSONAL_INFO_MODAL.FEMALE}</span>
                </a>
              </div>
            </div>
            <div className={`${styles['personal-info-upadate-main']} ${styles.flex} ${styles['flex-colum']}`}>
              <div className={`${styles['m-5']} ${styles['mt-20']} ${styles['update-profile-input']} ${styles.flex}`}>
                <Col xs={12} md={12}>
                  <div className={styles['fp-input']}>
                    <input
                      className={styles['user-name']}
                      type="text"
                      value={user_name}
                      onChange={this.handleNameChange}
                      maxLength={40}
                      required
                    />
                    <label className={`${styles['label-light-grey']}`}>{PERSONAL_INFO_MODAL.USERNAME}</label>
                    {/* <span className={styles['highlight']}></span>
                  <span className={styles['bar']}></span>
                  <label>Email / Username</label> */}
                  </div>
                  {/* <div>Name</div>
                <Input placeholder="Enter Name" val={user_name} onChange={this.handleNameChange}  /> */}
                </Col>
              </div>
              <div className={`${styles['m-5']} ${styles['mt-20']} ${styles.flex}`}>
                <Col xs={12} md={12}>
                  <div className={`${styles['fp-input']} ${styles['date-dob-caldr']}`}>
                    <div className={`${styles['mb-0']} ${styles['fs-12']} ${styles['label-gry-clr']} ${styles['profile-dts']}`}>{PERSONAL_INFO_MODAL.DOB}</div>
                    <DatePicker
                      animation="slide-up"
                      value={user_dob}
                      disabled={false}
                      calendar={calendar}
                      onChange={value => this.handleDobChange(value)}
                    >{
                        ({ value }) => (
                          <input value={value ? value.format('YYYY-MM-DD') : ''} readOnly />
                          )
                      }
                    </DatePicker>
                  </div>
                </Col>
              </div>
              <div>
                <Col xs={12} md={12} className={`${styles['pt-30']}`}>
                  {/* <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-large']} ${styles['update-profile-btn']} ${styles['text-uppercase']}`} onClick={this.handleSubmit} >Update Personal Details</button> */}
                  <Btn className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-large']} ${styles['update-profile-btn']} `} btnText={PERSONAL_INFO_MODAL.UPDATE_PERSONAL_INFORMATION} onClick={this.handleSubmit} />
                </Col>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = store => ({
  getEditPersonalInfoStatus: selectors.getEditPersonalInfoStatus(store),
  errorMessege: selectors.getErrorMessege(store),
  userInfo: selectors.getUserInfo(store),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      EditPersonalInfo: actionCreators.EditPersonalInfo,
    },
    dispatch,
  );

UpdatePersonalInfoModal.propTypes = {
  show: PropTypes.bool,
  handleShow: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
  getEditPersonalInfoStatus: PropTypes.object,
  errorMessege: PropTypes.string,
  EditPersonalInfo: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePersonalInfoModal);
