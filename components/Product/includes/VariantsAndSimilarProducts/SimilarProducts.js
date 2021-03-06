import React, { Component } from 'react';
import PropTypes from 'prop-types';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../../product_en.styl';
import styles_ar from '../../product_ar.styl';
const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

class Variant extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSelectProduct = this.onSelectProduct.bind(this);
  }
  onSelectProduct(e) {
    this.setState({
      [e.currentTarget.getAttribute('data-key')]: e.currentTarget.value
    })
    this.props.onSelectProduct(e);
  }
  render() {
    const { displayName, values, onSelectProduct, id } = this.props;
    return (
      <div className={`${styles['pt-5']} ${styles['pb-5']} ${styles['pr-15']}`}>
        <div className={`${styles['flex-center']}`}>
          <span className={`${styles['fs-12']} ${styles['fontW600']} ${styles['pr-15']}`}>{displayName}</span>
          <div className={values.length < 2 ? `${styles['flex-center']}` : `${styles['flex-center']} ${styles['size-btn-main']}`}>
          <select id={id} data-key={id} onChange={this.onSelectProduct} className={`${styles['varient-select-part']} ${styles['fs-12']} ${styles['p-5']}`}>
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
