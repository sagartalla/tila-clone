import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import List from './List';
import Reason from './Reason';
import CancelComplete from './CancelComplete';

import { selectors, actionCreators } from '../../../../store/order';

import styles from './orderIssue.styl';

const STEPS = {
  list: 'list',
  reasons: 'reasons',
  cancelSuccess: 'cancelSuccess',
}

class OrderIssueWidget extends Component {
  constructor(props) {
    super(props);
    this.goToNextStep = this.goToNextStep.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  getBody(step, items) {
    switch(step) {
      case STEPS.list: {
        return <List goToNextStep={this.goToNextStep} />;
        break;
      }
      case STEPS.reasons: {
        return <Reason goToNextStep={this.goToNextStep} />;
        break
      }
      case STEPS.cancelSuccess: {
        return <CancelComplete goToNextStep={this.goToNextStep} />
      }
      default: {
        return <List items={items} />;
        break;
      }
    }
  }

  goToNextStep() {
    const { goToNextStep, resetOrderIssue, orderIssue } = this.props;
    const { step: currentStep } = orderIssue;
    let nextStep = 'list'
    switch (currentStep) {
      case STEPS.list: {
        nextStep = STEPS.reasons;
        break;
      }
      case STEPS.reasons: {
        nextStep = STEPS.cancelSuccess;
        break;
      }
      case STEPS.cancelSuccess: {
        nextStep = null;
        break;
      }
    }
    nextStep ? goToNextStep({ nextStep, }) : resetOrderIssue();
  }

  closePopup() {
    this.props.resetOrderIssue();
  }

  getButton(step) {
    if(step === 'cancelSuccess') {
      return 'done';
    } else {
      return 'continue';
    }
  }

  getTitle(step) {
    switch(step) {
      case STEPS.list: {
        return 'Choose an order to Cancel';
        break;
      }
      case STEPS.reasons: {
        return 'Choose a reason';
        break;
      }
      case STEPS.cancelSuccess: {
        return 'Cancellation Status';
        break;
      }
    }
  }

  render() {
    const { title, orderIssue } = this.props;
    const { step, issueType } = orderIssue;
    return (
      <div className={styles['order-issue-wrap']}>
      {
        step
        ?
        <div className={styles['back-drop']}>
          <div className={`${styles['widget-cont']} ${styles['box']} ${styles['p-0']} ${styles['middle']} ${styles['center']}`}>
            <div className={`${styles['widget-head']} ${styles['flx-space-bw']} ${styles['p-20']} ${styles['fs-16']}`}>
              <div>{this.getTitle(step)}</div> 
              <div onClick={this.closePopup}>X</div>
            </div>
            <div className={styles['widget-body']}>
              {this.getBody(step)}
            </div>
          </div>
        </div>
        :
        null
      }
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return ({
    orderIssue: selectors.getOrderIssue(store)
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { 
      goToNextStep: actionCreators.goToNextStep,
      resetOrderIssue: actionCreators.resetOrderIssue,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderIssueWidget);
