import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectors, actionCreators } from '../../../../store/order';

import styles from './orderIssue.styl';

class ReturnComplete extends Component {

  componentDidMount() {
    const { orderIssue, submitReturnRequest } = this.props;
    const { selectedItem, selectedReasons } = orderIssue;
    submitReturnRequest({
      orderItemId: selectedItem.id,
      reason: selectedReasons.reason,
      comment: selectedReasons.comment,
      addressId: orderIssue.returnExchangeAddressId,
    });
  }

  render() {
    const { orderIssue, loadingStatus, errorMessege, goToNextStep } = this.props;
    const { selectedItem } = orderIssue;
    return (
      <div>
      {
        loadingStatus
        ?
        'loading...'
        :
        <div>
          <div>
            {
              errorMessege
              ?
              errorMessege
              :
              <div>
                {/* insert image here */}
                <div>
                  <span>Your order {selectedItem.name}</span>
                </div>
                <div>
                  <span>has been Requested for Return Successfully</span>
                </div>
                <div>
                  <span>Sorry that you had to Return, we will work on reason for your Return</span>
                </div>
              </div>
            }
          </div>
        </div>
      }
      <div className={`${styles['widget-footer']} ${styles['box']} ${styles['pt-24']}`}>
        <button onClick={goToNextStep} className={`${styles['m-0-auto']} ${styles['fs-16']}`} disabled={loadingStatus}>Done</button>
      </div>
      </div>
    );
  }

}

ReturnComplete.propTypes = {
  orderIssue: PropTypes.object.isRequired,
  submitReturnRequest: PropTypes.func.isRequired,
  loadingStatus: PropTypes.bool.isRequired,
  errorMessege: PropTypes.string.isRequired,
  goToNextStep: PropTypes.func.isRequired,
}

const mapStateToProps = (store) => {
  return ({
    returnStatus: selectors.getReturnStatus(store),
    errorMessege: selectors.getErrorMessege(store),
    loadingStatus: selectors.getLoadingStatus(store),
    orderIssue: selectors.getOrderIssue(store),
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      submitReturnRequest: actionCreators.submitReturnRequest
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ReturnComplete);