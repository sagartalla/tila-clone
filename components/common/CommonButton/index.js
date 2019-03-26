import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SVGCompoent from '../../common/SVGComponet';
import { mergeCss } from '../../../utils/cssUtil';

const styles = mergeCss('components/common/CommonButton/index');
/* eslint-disable */


class Button extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      hover: '',
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
    const { className, style, onClick, disabled, hoverClassName, showImage, btnLoading, btnText } = this.props;
    const { hover } = this.state;
    console.log('get class', hoverClassName);
    return (
    <button
        className={hover ? `${styles[hoverClassName]} ${styles['button-hoverstyl']} ${className}` : `${styles['button-styl']} ${className}` }
        style={style}
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
        <div className={`${styles.flex}`}>
          <SVGCompoent clsName={`${styles['image-icon']}`} src={showImage} />
          {btnText}
        </div> :
    btnText}
  </button>
);
}
}

Button.propTypes = {
  onClick: PropTypes.func,
  btnText: PropTypes.string,
  className: PropTypes.object,
  btnLoading: PropTypes.bool,
  disabled: PropTypes.bool,
};
Button.defaultProps = {
  onClick: f => f,
  btnText: '',
  className: {},
  btnLoading: false,
  disabled: false,
};
export default Button;
