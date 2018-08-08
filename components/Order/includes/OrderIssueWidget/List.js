import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectors, actionCreators } from '../../../../store/order';
import constants from '../../../../constants'

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Order/includes/OrderIssueWidget/orderIssue');

const List = ({ orderIssue, goToNextStep, setSelectedItem }) => {
  const { items } = orderIssue

  const selectItem = (e) => {
    setSelectedItem({
      selectedItem: _.find(orderIssue.items, { id: e.target.value })
    });
  }

  return (
    <div>
      <div className={styles['widget-body']}>
      {
        items.map((item) => {
          return (
            <div key={item.id} className={`${styles['item-cont']} ${styles['flex-center']} ${styles['p-20']}`}>
              <div className={styles['radio-cont']}>
                <input type="radio" className={styles['radio-btn']} name="orderissueitem" onChange={selectItem} value={item.id}/> 
              </div>
              <div className={`${styles['img-cont']} ${styles['flex-center']} ${styles['justify-center']}`}>
                <img src={`${constants.mediaDomain}/${item.img}`} />
              </div>
              <div className={styles['title-cont']}>
                <span>{item.name}</span>
              </div>
            </div>
          );
        })
      }
      </div>
      <div className={`${styles['widget-footer']} ${styles['box']} ${styles['flex-center']} ${styles['justify-center']}`}>
        <button onClick={goToNextStep} className={`${styles['fp-btn']} ${styles['fp-btn-primary']}`} disabled={!orderIssue.selectedItem}>Continue</button>
      </div>
    </div>
  );
};

List.propTypes = {
  orderIssue: PropTypes.object.isRequired,
  goToNextStep: PropTypes.func.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
}

const mapStateToProps = (store) => {
  return ({
    orderIssue: selectors.getOrderIssue(store)
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { setSelectedItem: actionCreators.setSelectedItem },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
