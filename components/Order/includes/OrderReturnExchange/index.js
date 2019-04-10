import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectors, actionCreators } from '../../../../store/order';
import OrderIssueBody from '../OrderIssueWidget/body';

import constants from '../../../../constants';
import { ORDER_ISSUE_STEPS as STEPS,ORDER_ISSUE_TYPES } from '../../constants';
import { Link } from '../../../../routes'
import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Order/order');
import { languageDefinations } from '../../../../utils/lang'
import Cookie from 'universal-cookie';
const { ORDER_PAGE, CART_PAGE } = languageDefinations()
const cookies = new Cookie();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

class OrderReturnExchange extends Component {
  componentDidMount() {
    const { query, orderIssue, getSelectedOrder, setOrderIssueData } = this.props;
    const { orderId, orderItemId, returnExchangeType, variantId } = query;
    const params = {
      orderId: orderId,
      issueType: returnExchangeType,
      step: STEPS.REASONS,
      returnExchangeType: returnExchangeType
    };
    if (!orderIssue.selectedItem) {
      params.selectedItem = getSelectedOrder(query.orderItemId);
    }
    setOrderIssueData(params);
  }

  render() {
    const { query, orderIssue } = this.props;
    const { orderId, selectedItem } = orderIssue;
    const { img, name } = selectedItem || {};
    return (
      <div>
        <Grid>
          <Row>
            <div className={`${styles['ret-exch-wrap']} ${styles['mt-20']}`}>
              <div className={`${styles['breadcrums']} ${styles['fs-12']}`}>
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
                          <h4 className={`${styles['fs-16']} ${styles['fontW600']}`}>{name}</h4>
                          <span className={styles['fs-14']}>{CART_PAGE.QUANTITY}:</span>
                        </Col>
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
}

const mapStateToProps = (store) => {
  return ({
    orderIssue: selectors.getOrderIssue(store),
    getSelectedOrder: selectors.getSelectedOrder(store)
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { setOrderIssueData: actionCreators.setOrderIssueData },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderReturnExchange);
