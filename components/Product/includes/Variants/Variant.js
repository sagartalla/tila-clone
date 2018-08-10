import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Product/product');

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
    const { title, options, onSelectVariant, id, selectedOptions } = this.props;
    return (
      <div className={`${styles['pt-10']} ${styles['pb-10']} ${styles['pr-20']}`}>
        <div className={`${styles['flex-center']}`}>
          <span className={`${styles['fs-12']} ${styles['fontW600']} ${styles['pr-20']}`}>{title}</span>
          <div className={`${styles['flex-center']} ${styles['size-btn-main']}`}>
          <select id={id} data-key={id} onChange={this.onSelectVariant} className={`${styles['varient-select-part']} ${styles['fs-12']} ${styles['p-5']}`}>
          {
            options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))
          } 
          </select>
          {/* {
            options.map((option) => (
              <span key={option} className={styles['mr-5']}>
                <input id={option} type="radio" name="radio-btn" className={styles['size-btn']} value={option} checked={this.state[id] === option} onChange={this.onSelectVariant} data-key={id}/>
                <label className={`${styles['fs-12']} ${styles['fontW600']} ${styles['flex-center']} ${styles['justify-center']}`} htmlFor={option}>{option}</label>
              </span>
            ))
          } */}
          </div>
        </div>
      </div>
    );
  }
}

Variant.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onSelectVariant: PropTypes.func.isRequired,
}

export default Variant;
