import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectors, actionCreators } from '../../../../store/order';
import constants from '../../../../constants';
import { ORDER_ISSUE_TYPES } from '../../constants';

import styles from './orderIssue.styl';

class ReturnExchange extends Component {
  constructor(props) {
    super(props);
    this.setType = this.setType.bind(this);
  }

  setType(e) {
    this.props.setReturnExchangeType({ returnExchangeType: e.target.value });
  }

  render() {
    const { orderIssue, goToNextStep } = this.props;
    const { selectedItem: itemData, reasons, returnExchangeType } = orderIssue;
    const { img, name } = itemData;
    
    return (
      <div>
        <div className={`${styles['flx-spacebw-alignc']} ${styles['m-20']} ${styles['pb-20']} ${styles['reasons-item-wrap']}`}>
          <div className={styles['back-btn']}>*</div>
          <div className={styles['img-cont']}>
            <img src={`${constants.mediaDomain}/${img}`} />
          </div>
          <div className={styles['title-cont']}>
            <span>{name}</span>
          </div>
        </div>
        <div className={styles['ret-ex-radio']}>
          <input onChange={this.setType} id="return-item" name="exch-retrn" type="radio" value={ORDER_ISSUE_TYPES.RETURN} />
          <label for="return-item">
            {/* insert image here */}
            <div>
              <span>Return</span>
            </div>
            <p></p>
          </label>
        </div>
        <div className={styles['ret-ex-radio']}>
          <input onChange={this.setType} id="exch-item" name="exch-retrn" type="radio" value={ORDER_ISSUE_TYPES.EXCHANGE} />
          <label for="exch-item">
            {/* insert image here */}
            <div>
              <span>Exchange</span>
            </div>
            <p></p>
          </label>
        </div>
        <div className={`${styles['widget-footer']} ${styles['box']} ${styles['pt-24']}`}>
          <button onClick={goToNextStep} className={`${styles['m-0-auto']} ${styles['fs-16']}`} disabled={!orderIssue.returnExchangeType}>Continue</button>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (store) => {
  return ({
    orderIssue: selectors.getOrderIssue(store)
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { setReturnExchangeType: actionCreators.setReturnExchangeType },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ReturnExchange);
