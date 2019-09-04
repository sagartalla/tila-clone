import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectors, actionCreators } from '../../../../store/order';
import { languageDefinations } from '../../../../utils/lang';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from './orderIssue_en.styl';
import styles_ar from './orderIssue_ar.styl';

const { ORDER_PAGE } = languageDefinations();

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

class CancelComplete extends Component {
  componentDidMount() {
    const { orderIssue, submitCancelRequest } = this.props;
    const { selectedItem, selectedReasons } = orderIssue;
    submitCancelRequest({
      orderItemId: selectedItem.id,
      reason: selectedReasons.reason,
      comment: selectedReasons.comment,
      subReason: selectedReasons.subReason,
      refund_mode: orderIssue.cancelRefundMode || undefined,
    });
    this.props.track({
      event: 'CANCEL_ORDER',
      orderData: this.props,
    });
  }

  render() {
    const { orderIssue, loadingStatus, errorMessege, goToNextStep } = this.props;
    const { selectedItem } = orderIssue;
    return (
      <div className={styles['width100']}>
      {
        loadingStatus
        ?
        `${ORDER_PAGE.LOADING}`
        :
        <div>
          <div>
            {
              errorMessege
              ?
              <span className={`${styles['p-20']} ${styles['flex']}`}>{errorMessege}</span>
              :
              <div>
                {/* insert image here */}
                <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['cancel-success-inn']}`}>
                  <div className={`${styles['cancel-success-img']}`}>
                    <img src="/static/img/bg-img/cancel-sucessfull.jpg" className={styles['img-responsive']}/>
                  </div>
                  <div className={`${styles['pt-20']} ${styles['t-c']} ${styles['cancel-success-label']}`}>
                    <span className={styles['fs-12']}>{ORDER_PAGE.YOUR_ORDER}&nbsp;<span className={styles['fontW600']}>{selectedItem.name}</span>&nbsp;{ORDER_PAGE.SUCCESSFULL_CANCEL}</span>
                  </div>
                </div>
                {/* <div>
                  <span>has been Cancelled Successfully</span>
                </div> */}
                <div className={`${styles['mt-20']} ${styles['pt-10']} ${styles['pb-10']} ${styles['t-c']} ${styles['cancel-success-text']}`}>
                  <span className={styles['fs-12']}>{ORDER_PAGE.CANCEL_REFUND_MSG}</span>
                </div>
              </div>
            }
          </div>
        </div>
      }
      <div className={`${styles['widget-footer']} ${styles['flex-center']} ${styles['justify-center']} ${styles['box']} ${styles['pt-24']}`}>
        <button onClick={goToNextStep} className={`${styles['fp-btn']} ${styles['fp-btn-primary']}`} disabled={loadingStatus}>{ORDER_PAGE.DONE}</button>
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
};

const mapStateToProps = (store) => {
  return ({
    cancelStatus: selectors.getCancelStatus(store),
    errorMessege: selectors.getErrorMessege(store),
    loadingStatus: selectors.getLoadingStatus(store),
    orderIssue: selectors.getOrderIssue(store),
  });
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      track: actionCreators.track,
      submitCancelRequest: actionCreators.submitCancelRequest,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CancelComplete);
