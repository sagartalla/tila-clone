import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import HeaderBar from '../HeaderBar/index';
import Sidebar from './Sidebar';
import UserInfo from './PersonelDetails';


const Cam = () => (
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

export default Cam;
