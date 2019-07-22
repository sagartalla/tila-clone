import React, { Fragment } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import OrderHeader from './OrderHeader';
import OrderItem from './OrderItem';
import { languageDefinations } from '../../../../utils/lang';
import OrderIssueWidget from '../OrderIssueWidget';
import { Router } from '../../../../routes';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../../order_en.styl';
import styles_ar from '../../order_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';
const { ORDER_PAGE } = languageDefinations();


const OrderDetails = ({ query, orderData, thankyouPage }) => {
  const routeChange = (route) => {
    Router.push(route);
  };
  return (
    <div>
      <Grid>
        <Row className={styles['m-0']}>
          <Col md={12}>
            <div className={`${styles['mt-20']} ${styles['mb-20']} ${styles['black-color']}`}>
              {
                thankyouPage ? '' :
                <Fragment>
                  <span><a className={`${styles['black-color']}`} onClick={() => routeChange(`/${country}/${language}/customer/profile`)}>{ORDER_PAGE.MY_ACCOUNT}</a></span>
                  <span> > </span>
                  <span ><a className={`${styles['black-color']}`} onClick={() => routeChange(`/${country}/${language}/customer/orders`)}>{ORDER_PAGE.ORDERS}</a></span>
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
        <Row className={`${styles['m-0']} ${styles['mb-40']}`}>
          <Col md={12}>
            <div className={`${styles.box} ${styles['p-20']} ${styles['mt-20']} ${styles['order-conf-part']}`}>
              {orderData.orderItems.map(item => (
                <OrderItem
                  key={item.id}
                  payments={orderData.payments}
                  orderItem={item}
                  showPriceInfo
                  needHelp
                  orderId={orderData.orderId}
                  thankyouPage={thankyouPage}
                  variantId={item.variantId}
                  isCancelable={item.isCancelable}
                  isReturnable={item.isReturnable}
                  isExchangable={item.isExchangable}
                />
              ))}
            </div>
          </Col>
        </Row>
      </Grid>
      <OrderIssueWidget />
    </div>
  );
};

export default OrderDetails;
