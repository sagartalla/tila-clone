import React, { Component } from 'react';
import PropType from 'prop-types';

import constants from '../../../../constants';

import styles from './orderIssue.styl';

class Reason extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getReasons();
  }

  render() {
    const { orderIssue, reasons, goToNextStep } = this.props;
    const { selectedItem: itemData } = orderIssue;
    const { img, name } = itemData;

    return (
      <div>
        <div className={styles['flx-spacebw-alignc']}>
          <div className={styles['back-btn']}>*</div>
          <div className={styles['img-cont']}>
            <img src={`${constants.mediaDomain}/${img}`} />
          </div>
          <div className={styles['title-cont']}>
            <span>{name}</span>
          </div>
        </div>
        <div className={styles['reason-cont']}>
          <div className={styles['instruction-txt']}>
            Please select a reason fro your cancellation and we'll take care of it!
          </div>
          <div className={styles['dd-cont']}>
            <select>
              {
                reasons.map((reason) => <option key={reason} value={reason}>{reason}</option>)
              }
            </select>
          </div>
          <div className={styles['comment-cont']}>
            <textarea />
          </div>
        </div>
        <div className={`${styles['widget-footer']} ${styles['box']} ${styles['pt-24']}`}>
          <button onClick={goToNextStep} className={`${styles['m-0-auto']} ${styles['fs-16']}`}>Continue</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return ({
    orderIssue: selectors.getOrderIssue(store),
    reasons: selectors.getReasons(store)
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { getReasons: actionCreators.getReasons },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Reason);