import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import HeaderBar from '../HeaderBar/index';
import Sidebar from './Sidebar';
import UserInfo from './PersonelDetails';

import styles from './cam.styl';


const Cam = () => (
  <div className={styles['cam-container']}>
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

export default Cam;
