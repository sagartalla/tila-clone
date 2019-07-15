import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookie from 'universal-cookie';
import _ from 'lodash';

import { Router } from '../../../../routes';
import List from './List';
import Reason from './Reason';
import CancelComplete from './CancelComplete';
import ReturnExchange from './ReturnExchange';
import ChooseAddress from './ChooseAddress';
import ReturnComplete from './ReturnComplete';
import ChoosePaymentMode from './ChoosePaymentMode';
import { ORDER_ISSUE_STEPS as STEPS, ORDER_ISSUE_TYPES } from '../../constants';
import Cookies from 'universal-cookie';
import { selectors, actionCreators } from '../../../../store/order';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from './orderIssue_en.styl';
import styles_ar from './orderIssue_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const cookies = new Cookie();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';


class Body extends Component {
  constructor(props) {
    super(props);
    this.goToNextStep = this.goToNextStep.bind(this);
  }

  getBody(step, items) {
    switch (step) {
      case STEPS.LIST: {
        return <List goToNextStep={this.goToNextStep} />;
      }
      case STEPS.REASONS: {
        return (
          <Reason goToNextStep={this.goToNextStep} query={this.props.query} />
        );
      }
      case STEPS.CANCEL_COMPLETE: {
        return <CancelComplete goToNextStep={this.goToNextStep} />;
      }
      case STEPS.CHOOSE_RETURN_EXCHANGE: {
        return (
          <ReturnExchange
            goToNextStep={this.goToNextStep}
            query={this.props.query}
          />
        );
      }
      case STEPS.CHOOSE_ADDRESS: {
        return (
          <ChooseAddress
            goToNextStep={this.goToNextStep}
            query={this.props.query}
          />
        );
      }
      case STEPS.CHOOSE_PAYMENT_MODE: {
        return (
          <ChoosePaymentMode
            goToNextStep={this.goToNextStep}
            query={this.props.query}
          />
        );
      }
      case STEPS.RETURN_COMPLETE: {
        return <ReturnComplete
                goToNextStep={this.goToNextStep}
                query={this.props.query}
              />;
      }
      default: {
        return <List goToNextStep={this.goToNextStep} />;
      }
    }
  }

  getButton(step) {
    if (step === 'cancelSuccess') {
      return 'done';
    }
    return 'continue';
  }

  closePopup() {
    this.props.resetOrderIssue();
  }

  goToNextStep() {
    const { goToNextStep, resetOrderIssue, orderIssue, getOrderDetails, query } = this.props;
    const { exchangeId } = orderIssue
    const {
      step: currentStep,
      issueType,
      returnExchangeType,
      selectedItem,
    } = orderIssue;
    let nextStep = STEPS.LIST;
    switch (currentStep) {
      case STEPS.LIST: {
        nextStep = issueType ? STEPS.REASONS : STEPS.CHOOSE_RETURN_EXCHANGE;
        break;
      }
      case STEPS.REASONS: {
        nextStep = issueType === ORDER_ISSUE_TYPES.CANCEL ? STEPS.CHOOSE_PAYMENT_MODE : STEPS.CHOOSE_ADDRESS;
        break;
      }
      case STEPS.CHOOSE_PAYMENT_MODE: {
        nextStep = issueType === ORDER_ISSUE_TYPES.CANCEL ? STEPS.CANCEL_COMPLETE : STEPS.RETURN_COMPLETE
        break;
      }
      case STEPS.CANCEL_COMPLETE: {
        nextStep = null;
        window.location.reload();
        break;
      }
      case STEPS.CHOOSE_RETURN_EXCHANGE: {
        nextStep = returnExchangeType;
        break;
      }
      case STEPS.CHOOSE_ADDRESS: {
        nextStep =
          issueType === (ORDER_ISSUE_TYPES.RETURN ||
            ORDER_ISSUE_TYPES.CANCEL)
            ? STEPS.CHOOSE_PAYMENT_MODE
            : STEPS.RETURN_COMPLETE;
        break;
      }
      case STEPS.RETURN_COMPLETE: {
        nextStep = null;
        issueType == 'EXCHANGE' ? Router.pushRoute(`/${country}/${language}/cam/orders/${exchangeId.order_id}`):
                      Router.pushRoute(`/${country}/${language}/cam/orders`)
        break;
      }
      default:

    }
    nextStep !== null
      ?
      goToNextStep({ nextStep })
      : resetOrderIssue();
  }

  render() {
    const { orderIssue } = this.props;
    const { step } = orderIssue;
    return <div className={styles['retun-exchange-right']}>{this.getBody(step)}</div>;
  }
}

const mapStateToProps = store => ({
  orderIssue: selectors.getOrderIssue(store),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      goToNextStep: actionCreators.goToNextStep,
      resetOrderIssue: actionCreators.resetOrderIssue,
      getOrderDetails: actionCreators.getOrderDetails ,
    },
    dispatch,
  );

Body.propTypes = {
  goToNextStep: PropTypes.func.isRequired,
  resetOrderIssue: PropTypes.func.isRequired,
  orderIssue: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Body);
