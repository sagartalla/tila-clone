import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from ''

class CancelExchangeWidget extends Component {
  render() {
    const { title, bodyContent, btnContent } = this.props;
    return (
      <div className={styles['back-drop']}>
        <div className={styles['widget-cont']}>
          <div className={styles['widget-head']}>
            <div>{title}</div> 
            <div>X</div>
          </div>
          <div className={styles['widget-body']}>
            {bodyContent}
          </div>
          <div className={styles['widget-footer']}>
            <button>{btnContent}</button>
          </div>
        </div>
      </div>
    )
  }
}

