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
                              query.returnExchangeType === 'RETURN' ?
                                ORDER_PAGE.REQ_RETURN :
                                ORDER_PAGE.REQ_EXCHANGE
                            }
                          </span>
                          <span className={styles['fontW600']}> {selectedItem.name} {ORDER_PAGE.REQ_SUCCESS}</span>
                        </span>
                      </div>
                      <div>
                        <span>
                          {
                            query.returnExchangeType === 'RETURN' ?
                              ORDER_PAGE.RETURN_ORDER_MSG : ''

                          }
                        </span>
                      </div>
                    </div>
                }
              </div>
            </div>
        }
        <div className={`${styles['widget-footer']} ${styles['pt-25']}`}>
          <button onClick={goToNextStep} className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['retun-btn-part']}`} disabled={loadingStatus}>{ORDER_PAGE.DONE}</button>
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
