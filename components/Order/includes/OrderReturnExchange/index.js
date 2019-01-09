import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Grid, Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectors, actionCreators } from '../../../../store/order';
import OrderIssueBody from '../OrderIssueWidget/body';

import constants from '../../../../constants';
import { ORDER_ISSUE_STEPS as STEPS } from '../../constants';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Order/order');
import {languageDefinations} from '../../../../utils/lang'
const {ORDER_PAGE} = languageDefinations()

class OrderReturnExchange extends Component {
  componentDidMount(){
    const { query, orderIssue, getSelectedOrder, setOrderIssueData } = this.props;
    const { orderId, orderItemId, returnExchangeType } = query;
    const params = {
      orderId: orderId,
      issueType: null,
      step: STEPS.REASONS,
      returnExchangeType: returnExchangeType,
    };
    if(!orderIssue.selectedItem) {
      params.selectedItem = getSelectedOrder(query.orderItemId);
    }
    setOrderIssueData(params);
  }

  render() {
    const { query, orderIssue } = this.props;
    const { orderId, selectedItem } = orderIssue;
    const { img, name } = selectedItem || {};
    return (
      <div className={styles['ret-exch-wrap']}>
        <div className={styles['Breadcrums']}>
          <span>{ORDER_PAGE.MY_ACCOUNT}</span>
          <span>></span>
          <span>{ORDER_PAGE.ORDERS}</span>
          <span>></span>
          <span>{orderId}</span>
        </div>
        <div className={styles['ret-exch-cont']}>
          <Grid>
            <Row>
              <Col md={6}>
                <div className={styles['product-wrap']}>
                  <img src={`${constants.mediaDomain}/${img}`} />
                  <div className={styles['title']}>{name}</div>
                </div>
              </Col>
              <Col md={6}>
                <OrderIssueBody />
              </Col>
            </Row>
          </Grid>
        </div>
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
