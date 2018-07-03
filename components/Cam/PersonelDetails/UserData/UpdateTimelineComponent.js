import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../../store/cam/personalDetails';

import UpdatePersonalInfoModal from './UpdatePersonalInfoModal';
import Btn from '../../../common/Button';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Cam/PersonelDetails/profile');

class UpdateTimelineComponent extends React.Component {

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

  handleShow = (val) => (e) => {
    this.setState({ show: val });
  }

  render() {
    const { show, personalInfo } = this.state;
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
            <Btn btnWidth="95%" btnText="Update Your Info" BtnClickHandler={this.handleShow(true)} />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12} className={`${styles['t-c']}`}>Timeline Component</Col>
        </Row>
        <Row>
          <Col xs={12} md={12} className={styles['t-c']}>We wont Spam.Swear!</Col>
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


UpdateTimelineComponent.propTypes = {
  userInfo: PropTypes.object,
  handleShow: PropTypes.func
};

export default connect(mapStateToProps)(UpdateTimelineComponent);
