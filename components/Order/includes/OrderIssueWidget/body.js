import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { Router } from '../../../../routes';
import List from './List';
import Reason from './Reason';
import CancelComplete from './CancelComplete';
import ReturnExchange from './ReturnExchange';
import ChooseAddress from './ChooseAddress';
import ReturnComplete from './ReturnComplete';
import { ORDER_ISSUE_STEPS as STEPS, ORDER_ISSUE_TYPES } from '../../constants';

import { selectors, actionCreators } from '../../../../store/order';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Order/includes/OrderIssueWidget/orderIssue');

class Body extends Component {
  constructor(props) {
    super(props);
    this.goToNextStep = this.goToNextStep.bind(this);
  }

  getBody(step, items) {
    switch(step) {
      case STEPS.LIST: {
        return <List goToNextStep={this.goToNextStep} />;
      }
      case STEPS.REASONS: {
        return <Reason goToNextStep={this.goToNextStep} />;
      }
      case STEPS.CANCEL_COMPLETE: {
        return <CancelComplete goToNextStep={this.goToNextStep} />;
      }
      case STEPS.CHOOSE_RETURN_EXCHANGE: {
        return <ReturnExchange goToNextStep={this.goToNextStep} />;
      }
      case STEPS.CHOOSE_ADDRESS: {
        return <ChooseAddress goToNextStep={this.goToNextStep} />
      }
      case STEPS.RETURN_COMPLETE: {
        return <ReturnComplete goToNextStep={this.goToNextStep} />
      }
      default: {
        return <List goToNextStep={this.goToNextStep} />;;
      }
    }
  }

  goToNextStep() {
    const { goToNextStep, resetOrderIssue, orderIssue } = this.props;
    const { step: currentStep, issueType, returnExchangeType, selectedItem } = orderIssue;
    let nextStep = STEPS.LIST;
    switch (currentStep) {
      case STEPS.LIST: {
        nextStep = issueType ? STEPS.REASONS : STEPS.CHOOSE_RETURN_EXCHANGE;
        break;
      }
      case STEPS.REASONS: {
        nextStep = issueType ? STEPS.CANCEL_COMPLETE : STEPS.CHOOSE_ADDRESS;
        break;
      }
      case STEPS.CANCEL_COMPLETE: {
        nextStep = null;
        break;
      }
      case STEPS.CHOOSE_RETURN_EXCHANGE: {
        nextStep = returnExchangeType;
        break
      }
      case STEP.CHOOSE_ADDRESS: {
        nextStep = STEPS.RETURN_COMPLETE;
      }
      case STEP.RETURN_COMPLETE: {
        Rotuer.pushRoute('/cam/orders');
        return;
      }
    }
    nextStep !== null
    ?
    nextStep === ORDER_ISSUE_TYPES.EXCHANGE || nextStep === ORDER_ISSUE_TYPES.RETURN
    ?
    Router.pushRoute(`/cam/orders/${orderIssue.orderId}/issue/${returnExchangeType}/item/${selectedItem.id}`)
    :
    goToNextStep({ nextStep, })
    :
    resetOrderIssue();
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

  render() {
    const { orderIssue } = this.props;
    const { step } = orderIssue;
    return (
      <div>
        {this.getBody(step)}
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

Body.propTypes = {
  goToNextStep: PropTypes.func.isRequired,
  resetOrderIssue: PropTypes.func.isRequired,
  orderIssue: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Body);
