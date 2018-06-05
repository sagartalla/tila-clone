import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import HeaderBar from '../HeaderBar/index';
import Sidebar from './Sidebar';
import UserInfo from './PersonelDetails';
import ShippingAddress from './ShippingAddress';
import Orders from './Orders'
import Wishlist from './Wishlist';

import styles from './cam.styl';

const Cam = ({tabDetails}) => {
  const [tab, ...queryParams] = tabDetails ? tabDetails.split('/') : [];
  const camComponent = ((tabName) => {
    switch (tabName) {
      case 'orders':
        return <Orders />;
      case 'address':
        return <ShippingAddress standalone={true}/>;
      case 'profile':
        return <UserInfo />; 
        case 'wishlist':
        return <Wishlist />; 
      default:
        return <Orders />; 
    }
  })(tab)
  return (
    <div className={styles['bg-color']}>
      <HeaderBar />
      <Grid>
        <Row>
          <Col xs={12} md={3}>
            <Row>
              <Sidebar />
            </Row>
          </Col>
          <Col xs={12} md={9}>
            <Row>
              { camComponent }
            </Row>
          </Col>
        </Row>
      </Grid>
    </div>
  )
};

export default Cam;
