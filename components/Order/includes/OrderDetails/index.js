import React, { Fragment } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Cookies from 'universal-cookie';

import OrderHeader from './OrderHeader';
import OrderItem from './OrderItem';
import OrderIssueWidget from '../OrderIssueWidget';
import { Router } from '../../../../routes';
import { mergeCss } from '../../../../utils/cssUtil';

const styles = mergeCss('components/Order/order');
const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';


const OrderDetails = ({ query, orderData, thankyouPage }) => {
  const routeChange = (route) => {
    Router.push(route);
  }
  return (
    <div>
      <Grid>
        <Row className={styles['m-0']}>
          <Col md={12}>
            <div className={`${styles['mb-20']}`}>
              {
                thankyouPage ? '' :
                  <Fragment>
                    <span><a onClick={() => routeChange(`/${country}/${language}/cam/profile`)}>My account</a></span>
                    <span> > </span>
                    <span><a onClick={() => routeChange(`/${country}/${language}/cam/orders`)}>Orders</a></span>
                    <span> > </span>
                    <span>{query.orderId}</span>
                  </Fragment>
              }
              {/* TODO Breadcrums */}

            </div>
          </Col>
        </Row>
        <Row className={styles['m-0']}>
          <Col md={12}>
            <div>
              <OrderHeader orderDetails={orderData} />
            </div>
          </Col>
        </Row>
        <Row className={styles['m-0']}>
          <Col md={12}>
            <div className={`${styles['box']} ${styles['p-20']} ${styles['mt-20']}`}>
              {
                orderData.orderItems.map((item) => <OrderItem key={item.id} payments={orderData.payments} orderItem={item} orderId={orderData.orderId} showWidget={true} thankyouPage={thankyouPage} />)
              }
            </div>
          </Col>
        </Row>
      </Grid>
      <OrderIssueWidget />
    </div>
  );
}

export default OrderDetails;
