import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectors, actionCreators } from '../../../../store/order';
import SVGComponent from '../../../common/SVGComponet';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from './orderIssue_en.styl';
import styles_ar from './orderIssue_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

import { languageDefinations } from '../../../../utils/lang';
const { ORDER_PAGE } = languageDefinations();

class ReturnComplete extends Component {

  getExchangeType = (issueType) => (
    {
      RETURN: ORDER_PAGE.REQ_RETURN,
      REPLACE: ORDER_PAGE.REQ_RETURN,
      EXCHANGE: ORDER_PAGE.REQ_EXCHANGE,
      CLAIMWARRANTY: ORDER_PAGE.YOUR_ORDER,
      DAMAGEWARRANTY:ORDER_PAGE.YOUR_ORDER,
    }[issueType]
  )
  getSuccessMessageType = (issueType) => (
    {
      RETURN:ORDER_PAGE.REQ_SUCCESS,
      REPLACE: ORDER_PAGE.REQ_SUCCESS,
      EXCHANGE:ORDER_PAGE.REQ_EX_SUCCESS,
      CLAIMWARRANTY: ORDER_PAGE.CLAIM_WARRANTY_MSG,
      DAMAGEWARRANTY:ORDER_PAGE.CLAIM_WARRANTY_MSG,
    }[issueType]
  )
  getExchangeMsgType = (issueType) => (
    {
      RETURN:ORDER_PAGE.RETURN_ORDER_MSG,
      EXCHANGE:ORDER_PAGE.RETURN_ORDER_MSG,
    }[issueType]
  )
  render() {

    const { orderIssue, loadingStatus, errorMessege, goToNextStep, query } = this.props;
    const { selectedItem } = orderIssue;
    return (
      <div className={styles['retun-sucess-meg']}>
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
                        <h4 className={`${styles['flex-center']} ${styles['pb-20']}`}>
                          <SVGComponent clsName={`${styles['bg-tick-mark-icon']}`} src="icons/common-icon/bg-tick-mark" />
                          <span className={styles['pl-15']}>{ORDER_PAGE.SUCCESS}</span>
                        </h4>
                        <span>
                          <span>
                            {
                              this.getExchangeType(orderIssue.issueType)
                            }
                          </span>
                          <span><span className={styles['fontW600']}>{selectedItem.name}</span> {this.getSuccessMessageType(orderIssue.issueType)}</span>
                        </span>
                      </div>
                      <div>
                        <span>
                          <div>{this.getExchangeMsgType(orderIssue.issueType)}</div>
                          {
                            orderIssue.issueType === 'RETURN' ?
                            <div>
                              <div>{ORDER_PAGE.RETURN_ORDER_MSG_NOTE}</div>
                            </div>
                              : ''
                          }
                             {
                            orderIssue.issueType === 'EXCHANGE' ?
                            <div>
                              <div>{ORDER_PAGE.EXCHANGE_ORDER_MSG_NOTE}</div>
                            </div>
                              : ''
                          }
                          {
                            orderIssue.issueType === 'REPLACE' ?
                            <div>
                              <div>{ORDER_PAGE.RETURN_ORDER_MSG}</div>
                              <div>{ORDER_PAGE.REPLACE_ORDER_MSG_NOTE}</div>
                            </div>
                              : ''

                          }
                        </span>
                      </div>
                    </div>
                }
              </div>
            </div>
        }
        <div className={`${styles['widget-footer']} ${styles['pt-25']}`}>
          <button onClick={goToNextStep} className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['retun-btn-part']}`} disabled={loadingStatus}>{ORDER_PAGE.CONTINUE_SHOPPING}</button>
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
