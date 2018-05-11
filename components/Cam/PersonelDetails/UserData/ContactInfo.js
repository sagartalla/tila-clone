import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Input from '../../Common/Input';

import CommonStyle from '../../cam.styl';


const ContactInfo = () => (
  <div className={CommonStyle['base-padding']}>
    <Row>
      <Col xs={12} md={12}>
        <h6>Contact Information</h6>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={3} className={CommonStyle['base-margin']}>
        <span>Email</span>
      </Col>
      <Col xs={12} md={9} >
        <Col xs={6} md={9}>
          <Input placeholder="Email" />
        </Col>
        <Col xs={6} md={3}>
          <span className={`${CommonStyle['float-right']} ${CommonStyle['base-margin']}`}><i className="fa fa-pencil" aria-hidden="true" /></span>
        </Col>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={3} className={CommonStyle['base-margin']}>
        <span>Password</span>
      </Col>
      <Col xs={12} md={9} >
        <Col xs={6} md={9}>
          <Input placeholder="Updated 2 months back" />
        </Col>
        <Col xs={6} md={3}>
          <span className={`${CommonStyle['float-right']} ${CommonStyle['base-margin']}`}><i className="fa fa-pencil" aria-hidden="true" /></span>
        </Col>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={4} className={CommonStyle['base-margin']}>
        <span>Phone Number</span>
      </Col>
      <Col xs={12} md={8} className={CommonStyle['base-margin']}>
        <Col xs={6} md={9}>
          <a href="#">Enter Phone number</a>
        </Col>
        <Col xs={6} md={3}>
          <span className={`${CommonStyle['float-right']} ${CommonStyle['base-margin']}`}><i className="fa fa-pencil" aria-hidden="true" /></span>
        </Col>
      </Col>

    </Row>
    <Row>
      <Col xs={12} md={12}>Deactivate account</Col>
    </Row>
  </div>
);

export default ContactInfo;
