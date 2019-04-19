import React, { Component } from 'react';
import PropTypes from 'prop-types';

import lang from '../../../../utils/language';

import styles_en from '../../product_en.styl';
import styles_ar from '../../product_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;


class Variant extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSelectVariant = this.onSelectVariant.bind(this);
  }
  onSelectVariant(e) {
    this.setState({
      [e.currentTarget.getAttribute('data-key')]: e.currentTarget.value
    })
    this.props.onSelectVariant(e);
  }
  render() {
    const { displayName, values, onSelectVariant, id } = this.props;
    return (
      <div className={`${styles['pt-10']} ${styles['pb-10']} ${styles['pr-15']}`}>
        <div className={`${styles['flex-center']}`}>
          <span className={`${styles['fs-12']} ${styles['fontW600']} ${styles['pr-15']}`}>{displayName}</span>
          <div className={`${styles['flex-center']} ${styles['size-btn-main']}`}>
          <select id={id} data-key={id} onChange={this.onSelectVariant} className={`${styles['varient-select-part']} ${styles['fs-12']} ${styles['p-5']}`}>
          {
            values.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))
          }
          </select>
          </div>
        </div>
      </div>
    );
  }
}

export default Variant;
