import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Body from './body';

import { ORDER_ISSUE_STEPS as STEPS, ORDER_ISSUE_TYPES } from '../../constants';

import { selectors, actionCreators } from '../../../../store/order';

import lang from '../../../../utils/language';

import styles_en from './orderIssue_en.styl';
import styles_ar from './orderIssue_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;


const OrderIssueWidget = ({orderIssue, resetOrderIssue}) => {
  const { step,issueType } = orderIssue;

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
      step && issueType === 'CANCEL'
      ?
      <div className={styles['back-drop']}>
        <div className={`${styles['widget-cont']} ${styles['box']} ${styles['p-0']} ${styles['middle']} ${styles['center']}`}>
          <div className={`${styles['widget-head']} ${styles['flx-space-bw']} ${styles['p-20']} ${styles['fontW600']}`}>
            <span>{getTitle(step)}</span>
            <span onClick={closePopup}>X</span>
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
