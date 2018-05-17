import React from 'react';
import { Row, Col } from 'react-bootstrap';

import UpdateModal from './UpdateModal';
import GenericUpdate from '../../../Common/GenericUpdate';
import Btn from '../../../Common/Button';

import styles from '../../../cam.styl';
import userStyle from '../../user.styl';


class UpdateInfoComponent extends React.Component {
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
    const { show } = this.state;
    return (
      <div className={userStyle['update-info']}>
        <Row>
          <Col xs={12} md={12}><span className={styles['float-right']}>1/2</span></Col>
        </Row>
        <GenericUpdate />
        <Row>
          <Col xs={12} md={12} className={styles['text-align-center']}>
            <Btn btnWidth="95%" btnText="Update Your Information" BtnClickHandler={this.handleShow} />
            <Col md={8} />
            <Col md={4} xs={12}>
              <UpdateModal show={show} handleClose={this.handleClose} />
            </Col>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12} className={`${styles['text-align-center']} ${styles['base-margin']}`}>Timeline Component</Col>
        </Row>
        <Row>
          <Col xs={12} md={12} className={styles['text-align-center']}>We wont Spam.Swear!</Col>
        </Row>
      </div>
    );
  }
}
export default UpdateInfoComponent;
