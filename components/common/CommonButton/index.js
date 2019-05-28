import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SVGCompoent from '../../common/SVGComponet';
import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './index_en.styl';
import styles_ar from './index_ar.styl';
const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

/* eslint-disable */
class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
  }

  onMouseEnter = value => () => {
    let { hover } = this.state;
    if (value) {
        hover = true;
    } else {
        hover = false;
    }
    this.setState({
        hover,
    });
  }
  render() {
    const { className, onClick, disabled, hoverClassName, showImage, btnText, id } = this.props;
    let { btnLoading } = this.props;
    const { hover } = this.state;
    return (
    <button
        className={hover ? ` ${styles['button-hoverstyl']} ${className} ${styles[hoverClassName]}` : `${styles['button-styl']} ${className}` }
        id={id}
        onClick={onClick}
        disabled={disabled}
        onMouseOver={this.onMouseEnter(true)}
        onMouseOut={this.onMouseEnter(false)}
    >
    {btnLoading ?
      <div className={`${styles['loader-div']}`} >
        <SVGCompoent clsName={`${styles['loader-styl']}`} src="icons/common-icon/circleLoader" />
      </div>
      :
      showImage ?
        <div className={`${styles.flex} ${styles['align-start']}`}>
          <SVGCompoent clsName={`${styles['image-icon']}`} src={showImage} />
          <span>{btnText}</span>
        </div> :
    btnText}
  </button>
);
}
}

Button.propTypes = {
  onClick: PropTypes.func,
  btnText: PropTypes.string,
  // className: PropTypes.object,
  btnLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  style: PropTypes.object,
};
Button.defaultProps = {
  onClick: f => f,
  btnText: '',
  className: {},
  btnLoading: false,
  disabled: false,
  id: '',
  style: {},
};
export default Button;
