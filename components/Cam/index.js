import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import NoSSR from 'react-no-ssr';
import PropTypes from 'prop-types';

import HeaderBar from '../HeaderBar/index';
import Sidebar from './Sidebar';
import UserInfo from './UserInfo';

import styles from './cam.styl';


const Cam = () => {
  return (
    <div>
      <HeaderBar />
      <Grid>
        <Row>
          <Col xs={12} md={3}>
            <Sidebar />
          </Col>
          <Col xs={12} md={9}>
            <UserInfo />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Cam;
