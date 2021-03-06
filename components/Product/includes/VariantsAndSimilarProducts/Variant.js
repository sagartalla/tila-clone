import React, { Component } from 'react';
import _ from 'lodash';
import lang from '../../../../utils/language';


import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../../product_en.styl';
import styles_ar from '../../product_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

class Variant extends Component {
  constructor(props) {
    super(props);
    // this.sizeChart = ['S', 'XS', 'XXS', 'M', 'L', '2XL', '3XL', '4XL', '5XL', '6XL', '7XL'];
    this.state = {
      [props.id]: props.selected,
      chartValues: props.values, // this.sortSizeChart(props.values)
    };
    this.onSelectVariant = this.onSelectVariant.bind(this);
  }

  onSelectVariant(e) {
    this.setState({
      [e.currentTarget.getAttribute('data-key')]: e.currentTarget.value,
    });
    this.props.onSelectVariant(e);
  }

  // sortSizeChart(values) {
  //   if (this.props.id === 'size') {
  //     let result = [];
  //     this.sizeChart.forEach((item) => {
  //       if (values.indexOf(item) !== -1) {
  //         result.push(item);
  //       }
  //     });
  //     result = _.uniq([...result, ...values]);
  //     return result;
  //   }
  //   return values;
  // }

  render() {
    const {
      displayName, values, onSelectVariant, id,
    } = this.props;

    return (
      <div className={`${styles['pt-10']} ${styles['pb-10']} ${styles['pr-15']}`}>
        <div className={`${styles['flex-center']}`}>
          <span className={`${styles['fs-12']} ${styles.fontW600} ${styles['pr-15']}`}>{displayName}</span>
          <div className={values.length < 2 ? `${styles['flex-center']}` : `${styles['flex-center']} ${styles['size-btn-main']}`}>
            <select id={id} data-key={id} onChange={this.onSelectVariant} className={`${styles['varient-select-part']} ${styles['fs-12']} ${styles['p-5']}`}>
              {this.state.chartValues.map(option => (
                <option
                  key={option}
                  value={option}
                  selected={this.state[id] === option}
                >
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default Variant;
