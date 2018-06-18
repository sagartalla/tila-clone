import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import HeaderBar from '../HeaderBar/index';
import Sidebar from './Sidebar';
import UserInfo from './PersonelDetails';
import ShippingAddress from './ShippingAddress';
import Orders from './Orders'
import Wishlist from './Wishlist';


import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/Cam/cam');

const Cam = ({ tabDetails }) => {
  const [tab, ...queryParams] = tabDetails ? tabDetails.split('/') : [];
  const camComponent = ((tabName) => {
    switch (tabName) {
      case 'orders':
        return <Orders />;
      case 'address':
        return <ShippingAddress standalone={true} />;
      case 'wishlist':
        return <Wishlist />;
      case 'profile':
        return <UserInfo />;
      default:
        return <UserInfo />;
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
            { camComponent }
          </Col>
        </Row>
      </Grid>
    </div>
  )
};

export default Cam;
