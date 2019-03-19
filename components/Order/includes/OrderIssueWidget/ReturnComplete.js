import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectors, actionCreators } from '../../../../store/order';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Order/includes/OrderIssueWidget/orderIssue');
import {languageDefinations} from '../../../../utils/lang';
const {ORDER_PAGE} = languageDefinations();

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
    const { orderIssue, loadingStatus, errorMessege, goToNextStep,query } = this.props;
    const { selectedItem } = orderIssue;
    return (
      <div>
      {
        loadingStatus
        ?
        ORDER_PAGE.LOADING
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
                  <span>{ORDER_PAGE.YOUR_ORDER}{selectedItem.name}</span>
                </div>
                <div>
                  <span>
                    {
                      query.returnExchangeType === 'Return' ?
                      ORDER_PAGE.REQ_RETURN_SUCCESS :
                      ORDER_PAGE.REQ_EXCHANGE_SUCCESS
                  }
                  </span>
                </div>
                <div>
                  <span>
                    {
                      query.returnExchangeType === 'Return' ?
                      ORDER_PAGE.RETURN_MESSAGE : ''

                    }
                  </span>
                </div>
              </div>
            }
          </div>
        </div>
      }
      <div className={`${styles['widget-footer']} ${styles['box']} ${styles['pt-24']}`}>
        <button onClick={goToNextStep} className={`${styles['m-0-auto']} ${styles['fs-16']}`} disabled={loadingStatus}>{ORDER_PAGE.DONE}</button>
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
