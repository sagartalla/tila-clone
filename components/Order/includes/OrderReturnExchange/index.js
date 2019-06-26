import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectors, actionCreators } from '../../../../store/order';
import OrderIssueBody from '../OrderIssueWidget/body';

import constants from '../../../../constants';
import { ORDER_ISSUE_STEPS as STEPS, ORDER_ISSUE_TYPES } from '../../constants';

import { Link } from '../../../../routes';
import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../../order_en.styl';
import styles_ar from '../../order_ar.styl';
const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

import { languageDefinations } from '../../../../utils/lang';
import Cookie from 'universal-cookie';
const { ORDER_PAGE, CART_PAGE } = languageDefinations();
const cookies = new Cookie();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

class OrderReturnExchange extends Component {
  state = { fetchRender: true }
  componentDidMount() {
    const {
      query,
      orderIssue,
      getSelectedOrder,
      setOrderIssueData,
      getOrderDetails,
    } = this.props;
    const {
      orderId, orderItemId, returnExchangeType,
    } = query;

    const params = {
      orderId,
      issueType: returnExchangeType,
      step: STEPS.REASONS,
      returnExchangeType,
    };
    if(orderIssue.orderId !== orderId) {
      getOrderDetails({ orderId });
    } else {
      params.selectedItem = getSelectedOrder(orderItemId);
      setOrderIssueData(params);
    }

  }

  componentWillReceiveProps(nextProps) {
    const {
      query, orderIssue, getSelectedOrder, setOrderIssueData, orderDetails,
    } = nextProps;
    const {
      orderId, orderItemId, returnExchangeType, variantId,
    } = query;
    const params = {
      orderId,
      issueType: returnExchangeType,
      step: STEPS.REASONS,
      returnExchangeType,
    };
    if (orderDetails.order_id === orderId && this.state.fetchRender) {
      params.selectedItem = getSelectedOrder(orderItemId);
      this.setState({
        fetchRender: false,
      }, () => setOrderIssueData(params));
    }
  }

  render() {
    const {
      query, orderIssue, orderDetails,
    } = this.props;
    const { orderId, selectedItem } = orderIssue;
    const { img, name, item = {} } = selectedItem || {};
    const { variant_id, variant_info = {} } = item;
    return (
      <div>
        <Grid>
          <Row>
            <div className={`${styles['ret-exch-wrap']} ${styles['mt-20']}`}>
              <div className={`${styles.breadcrums} ${styles['fs-12']}`}>
                <Link route={`/${country}/${language}/cam`}>
                  <a>
                    <span className={`${styles['thick-gry-clr']}`}>{ORDER_PAGE.MY_ACCOUNT}</span>
                  </a>
                </Link>
                <span> > </span>
                <Link route={`/${country}/${language}/cam/orders`}>
                  <a>
                    <span className={`${styles['thick-gry-clr']}`}>{ORDER_PAGE.ORDERS}</span>
                  </a>
                </Link>
                <span> > </span>
                <Link route={`/${country}/${language}/cam/orders/${orderId}`}>
                  <a>
                    <span className={`${styles['black-color']}`}>{orderId}</span>
                  </a>
                </Link>
              </div>
              <div className={`${styles['ret-exch-cont']} ${styles['pt-25']} ${styles['pb-25']}`}>
                <Grid>
                  <Row>
                    <Col md={6}>
                      <div className={styles['product-wrap']}>
                        <Col md={2}>
                          <img src={`${constants.mediaDomain}/${img}`} />
                        </Col>
                        <Col md={10}>
                          <Link route={`/${country}/${language}/product?productId=${variant_info.product_id}${variant_id ? `&variantId=${variant_id}` : ''}&catalogId=${variant_info.catalog_id}&itemType=${variant_info.item_type}`}>
                            <h4 className={`${styles['fs-16']} ${styles['mt-0']} ${styles.fontW600} ${styles.pointer}`}>{name}</h4>
                          </Link>
                          <span className={styles['fs-14']}>{CART_PAGE.QUANTITY}: {orderDetails && orderDetails.order_items && orderDetails.order_items[0].quantity}</span>
                        </Col>
                        <Col md={10}>
                          <h4
                            className={
                              `${styles['fs-14']} ${styles.fontW600} ${styles['pt-20']}`}
                          >
                            {ORDER_PAGE.ADDRESS_PICKUP}
                          </h4>
                        </Col>
                        <Col
                          md={10}
                        >
                          <div className={`${styles['p-10']} ${styles['bg-light-gray']}`}>
                            <h4
                              className={
                                `${styles['fs-16']} ${styles.fontW600}
                                 ${styles['m-0']}`}
                            >
                              {orderDetails.address.first_name}&nbsp;
                              {orderDetails.address.last_name}
                            </h4>
                            <div
                              className={
                                `${styles['fs-12']}
                                 ${styles['light-gry-clr']}
                                 ${styles.fontW300}`}
                            >
                              {orderDetails.address.address_line_1}
                            </div>
                            <span className={
                                `${styles['fs-14']}
                                 ${styles.fontW400}
                                 ${styles['thick-gry-clr']}`}
                            >
                              {orderDetails.address.account_mobile_number}
                            </span>
                          </div>
                        </Col>
                        {
                          orderIssue.refundInitiated &&
                          <div>Refund initiated </div>
                        }
                      </div>
                    </Col>
                    <Col md={5} className={styles['thick-border-left']}>
                      <OrderIssueBody query={query} />
                    </Col>
                  </Row>
                </Grid>
              </div>
            </div>
          </Row>
        </Grid>
      </div>
    );
  }
}

OrderReturnExchange.propTypes = {
  query: PropTypes.object.isRequired,
  orderIssue: PropTypes.object.isRequired,
  setOrderIssueData: PropTypes.func.isRequired,
  getSelectedOrder: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  orderIssue: selectors.getOrderIssue(store),
  getSelectedOrder: selectors.getSelectedOrder(store),
  orderDetails: selectors.getOrderInfo(store),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setOrderIssueData: actionCreators.setOrderIssueData,
    getOrderDetails: actionCreators.getOrderDetails,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(OrderReturnExchange);
