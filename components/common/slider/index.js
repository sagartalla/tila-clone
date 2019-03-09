import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeCss } from '../../../utils/cssUtil';

const styles = mergeCss('components/common/slider/index');


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
    } = this.props;
    return (
      isOpen &&
      <div className={`${styles.slider} ${styles.fixed}`} onClick={closeSlider}>
        <div
          className={`${styles.sliderInner} ${styles.flex} ${styles.width50} ${styles['ht-100P']} ${styles.absolute} ${styles['align-center']} ${styles['justify-around']}`}
          onClick={this.handleChild}
        >
          <span
            role="button"
            onClick={closeSlider}
            tabIndex="0"
            className={`${styles.cross} ${styles.absolute} ${styles.flex} ${styles['align-center']} ${styles['fs-40']}`}
          >
            &times;{<div className={`${styles['fs-20']} ${styles['lgt-blue']} ${styles['ml-20']}`}>{label}</div>}
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
