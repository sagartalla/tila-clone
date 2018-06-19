import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Body from './body';

import { ORDER_ISSUE_STEPS as STEPS, ORDER_ISSUE_TYPES } from '../../constants';

import { selectors, actionCreators } from '../../../../store/order';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Order/includes/OrderIssueWidget/orderIssue');

const OrderIssueWidget = ({orderIssue, resetOrderIssue}) => {
  const { step } = orderIssue;

  const getTitle = (step) => {
      const { issueType } = orderIssue;
      switch(step) {
        case STEPS.LIST: {
          return `Choose an order to ${issueType ? 'Cancel': 'Return/Exchange'}`;
          break;
        }
        case STEPS.REASONS: {
          return 'Choose a reason';
          break;
        }
        case STEPS.CANCEL_COMPLETE: {
          return 'Cancellation Status';
          break;
        }
        case STEPS.CHOOSE_RETURN_EXCHANGE: {
          return 'Chose Return or Exchange';
          break;
        }
      }
    }

  const closePopup = () => {
    resetOrderIssue();
  }

  return (
    <div className={styles['order-issue-wrap']}>
    {
      step
      ?
      <div className={styles['back-drop']}>
        <div className={`${styles['widget-cont']} ${styles['box']} ${styles['p-0']} ${styles['middle']} ${styles['center']}`}>
          <div className={`${styles['widget-head']} ${styles['flx-space-bw']} ${styles['p-20']} ${styles['fs-16']}`}>
            <div>{getTitle(step)}</div>
            <div onClick={closePopup}>X</div>
          </div>
          <Body />
        </div>
      </div>
      :
      null
    }
    </div>
  )
}

OrderIssueWidget.propTypes = {
  orderIssue: PropTypes.object.isRequired,
  resetOrderIssue: PropTypes.func.isRequired,
}

const mapStateToProps = (store) => {
  return ({
    orderIssue: selectors.getOrderIssue(store)
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      resetOrderIssue: actionCreators.resetOrderIssue,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderIssueWidget);
