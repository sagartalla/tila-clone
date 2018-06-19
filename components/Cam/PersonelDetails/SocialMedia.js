import React from 'react';
import { Row, Col } from 'react-bootstrap';


const SocialMedia = () => (
  <div>
    <Row>
      <Col xs={12} md={12}>
        <span>Link to Social Media</span>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={12}>
        <span>Easy one clicklogin when using your Social Media Accounts</span>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={12} >
        <Col xs={4} md={4}>
          <span>Icon</span>
        </Col>
        <Col xs={4} md={4}>
          <span>Icon</span>
        </Col>
        <Col xs={4} md={4}>
          <span>Icon</span>
        </Col>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={12}>
        <span>Your facebook account has been linked with abcd.com<span>(</span><a href="#">Unlink Now</a><span>)</span></span>
      </Col>
    </Row>
  </div>
);

export default SocialMedia;
