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
    const { className, style, onClick, disabled, hoverClassName, showImage, btnText, id } = this.props;
    let { btnLoading } = this.props;
    const { hover } = this.state;
    return (
    <button
        className={hover ? ` ${styles['button-hoverstyl']} ${className} ${styles[hoverClassName]}` : `${styles['button-styl']} ${className}` }
        style={style}
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
        <div className={`${styles.flex} ${styles['align-center']}`}>
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
  id: PropTypes.string,
};
Button.defaultProps = {
  onClick: f => f,
  btnText: '',
  className: {},
  btnLoading: false,
  disabled: false,
  id: '',
};
export default Button;
