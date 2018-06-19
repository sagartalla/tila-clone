import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectors, actionCreators } from '../../../../store/order';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Order/includes/OrderIssueWidget/orderIssue');

class CancelComplete extends Component {

  componentDidMount() {
    const { orderIssue, submitCancelRequest } = this.props;
    const { selectedItem, selectedReasons } = orderIssue;
    submitCancelRequest({
      orderItemId: selectedItem.id,
      reason: selectedReasons.reason,
      comment: selectedReasons.comment,
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
        'loading'
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
                  <span>has been Cancelled Successfully</span>
                </div>
                <div>
                  <span>Sorry that you had to cancel, we will work on reason for your cancellation</span>
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

CancelComplete.propTypes = {
  orderIssue: PropTypes.object.isRequired,
  loadingStatus: PropTypes.bool.isRequired,
  errorMessege: PropTypes.string.isRequired,
  goToNextStep: PropTypes.func.isRequired,
}

const mapStateToProps = (store) => {
  return ({
    cancelStatus: selectors.getCancelStatus(store),
    errorMessege: selectors.getErrorMessege(store),
    loadingStatus: selectors.getLoadingStatus(store),
    orderIssue: selectors.getOrderIssue(store),
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      submitCancelRequest: actionCreators.submitCancelRequest
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CancelComplete);
