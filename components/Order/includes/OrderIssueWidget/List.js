import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectors, actionCreators } from '../../../../store/order';
import constants from '../../../../constants'

import styles from './orderIssue.styl';

const List = ({ orderIssue, goToNextStep, setSelectedItem }) => {
  const { items } = orderIssue

  const selectItem = (e) => {
    setSelectedItem({
      selectedItem: _.find(orderIssue.items, { id: e.target.value })
    });
  }

  return (
    <div>
      {
        items.map((item) => {
          return (
            <div key={item.id} className={`${styles['item-cont']} ${styles['flx-spacebw-alignc']} ${styles['p-20']}`}>
              <div className={styles['radio-cont']}>
                <input name="orderissueitem" onChange={selectItem} type='radio' value={item.id}  />
              </div>
              <div className={styles['img-cont']}>
                <img src={`${constants.mediaDomain}/${item.img}`} />
              </div>
              <div className={styles['title-cont']}>
                <span>{item.name}</span>
              </div>
            </div>
          );
        })
      }
      <div className={`${styles['widget-footer']} ${styles['box']} ${styles['pt-24']}`}>
        <button onClick={goToNextStep} className={`${styles['m-0-auto']} ${styles['fs-16']}`} disabled={!orderIssue.selectedItem}>Continue</button>
      </div>
    </div>
  );
};


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
