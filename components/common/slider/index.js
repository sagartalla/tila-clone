import React, { Component } from 'react';
import PropTypes from 'prop-types';
import lang from '../../../utils/language';


import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './index_en.styl';
import styles_ar from './index_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

class Slider extends Component {
  handleChild = (e) => {
    e.stopPropagation();
  }

  render() {
    const {
      isOpen,
      closeSlider,
      children,
      label,
      style,
    } = this.props;
    return (
      isOpen &&
      <div className={`${styles.slider} ${styles.fixed}`} style={style} onClick={closeSlider}>
        <div
          className={`${styles.sliderInner} ${styles['ht-100P']} ${styles.absolute} ${styles['align-center']} ${styles['justify-around']}`}
          onClick={this.handleChild}
        >
          <span
            className={`${styles.flex} ${styles['align-center']} ${styles['fs-40']} ${styles['justify-between']} ${styles.width100}`}
          >
            <span className={`${styles['fs-20']} ${styles['lgt-blue']} ${styles['ml-20']}`}>{label}</span>
            <span
              role="button"
              onClick={closeSlider}
              tabIndex="0"
            >
              &times;
            </span>
          </span>
          {children}
        </div>
      </div>
    );
  }
}

Slider.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.instanceOf(Object),
  closeSlider: PropTypes.func,
  label: PropTypes.string,
};

Slider.defaultProps = {
  isOpen: false,
  children: null,
  closeSlider: () => {},
  label: '',
};

export default Slider;
