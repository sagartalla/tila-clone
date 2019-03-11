import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Product/product');

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
      <div className={`${styles['pt-10']} ${styles['pb-10']} ${styles['pr-15']}`}>
        <div className={`${styles['flex-center']}`}>
          <span className={`${styles['fs-12']} ${styles['fontW600']} ${styles['pr-15']}`}>{displayName}</span>
          <div className={`${styles['flex-center']} ${styles['size-btn-main']}`}>
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
