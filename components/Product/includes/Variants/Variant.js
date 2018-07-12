import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { mergeCss } from '../../../../utils/cssUtil';
// const styles = mergeCss('components/Product/includes/Variants/variants');
const styles = mergeCss('components/Product/product');

// const Variant = ({ title, options, onSelectVariant, id, selectedOptions }) => {
//   // return (
//   //   <div>
//   //     <div className={styles['v-title']}>{title}</div>
//   //     <select onChange={onSelectVariant} data-key={id}>
//   //       {
//   //         options.map((option) => <option key={option} value={option}>{option}</option> )
//   //       }
//   //     </select>
//   //   </div>
//   // );
//   return (
//     <div className={`${styles['pt-10']} ${styles['pb-10']} ${styles['border-b']}`}>
//       <div className={`${styles['flex-center']}`}>
//         <span className={`${styles['fs-12']} ${styles['fontW600']} ${styles['pr-20']}`}>{title}</span>
//         <div className={`${styles['flex-center']} ${styles['color-btn-main']}`}>
//           {
//             options.map((option) => (
//               <span className={styles['mr-5']}>
//                 <input type="radio" name="radio-btn" className={styles['size-btn']} value="M" onChange={onSelectVariant} data-key={id}/>
//                 <label className={`${styles['fs-12']} ${styles['fontW600']} ${styles['flex-center']} ${styles['justify-center']}`} htmlFor="medium">M</label>
//               </span>
//             ))
//           }
//         </div>
//       </div>
//     </div>
//   );
// }

class Variant extends Component {
  onSelectVariant(e) {
    this.setState({
      [e.currentTarget.getAttribute('data-key')]: e.currentTarget.value
    })
    this.props.onSelectVariant(e);
  }
  render() {
    const { title, options, onSelectVariant, id, selectedOptions } = this.props;
    return (
      <div className={`${styles['pt-10']} ${styles['pb-10']} ${styles['border-b']}`}>
        <div className={`${styles['flex-center']}`}>
          <span className={`${styles['fs-12']} ${styles['fontW600']} ${styles['pr-20']}`}>{title}</span>
          <div className={`${styles['flex-center']} ${styles['color-btn-main']}`}>
            {
              options.map((option) => (
                <span className={styles['mr-5']}>
                  <input type="radio" name="radio-btn" className={styles['size-btn']} value={option} checked={this.state[id] === option} onChange={this.onSelectVariant} data-key={id}/>
                  <label className={`${styles['fs-12']} ${styles['fontW600']} ${styles['flex-center']} ${styles['justify-center']}`} htmlFor="medium">{option}</label>
                </span>
              ))
            }
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
