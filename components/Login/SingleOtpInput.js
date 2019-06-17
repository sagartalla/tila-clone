import React, { Component } from 'react';

import lang from '../../utils/language';

import { languageDefinations } from '../../utils/lang';
import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './login_en.styl';
import styles_ar from './login_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };
const { LOGIN_PAGE } = languageDefinations();

const isStyleObject = obj => typeof obj === 'object';


class SingleOtpInput extends Component {
  componentDidMount() {
    const {
      input,
      props: { focus, shouldAutoFocus },
    } = this;

    if (input && focus && shouldAutoFocus) {
      input.focus();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      input,
      props: { focus },
    } = this;

    if (prevProps.focus !== focus && (input && focus)) {
      input.focus();
      input.select();
    }
  }

  getClasses = (...classes) =>
    classes.filter(c => !isStyleObject(c) && c !== false).join(' ');

  render() {
    const {
      index,
      separator,
      isLastChild,
      inputStyle,
      focus,
      isDisabled,
      hasErrored,
      errorStyle,
      focusStyle,
      disabledStyle,
      shouldAutoFocus,
      isInputNum,
      value,
      ...rest
    } = this.props;

    const numValueLimits = isInputNum ? { min: 0, max: 9 } : {};

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          data-id={index}
          style={Object.assign(
            { width: '2em', textAlign: 'center' },
            isStyleObject(inputStyle) && inputStyle,
            focus && isStyleObject(focusStyle) && focusStyle,
            isDisabled && isStyleObject(disabledStyle) && disabledStyle,
            hasErrored && isStyleObject(errorStyle) && errorStyle,
          )}
          className={`${styles['fs-20']} ${styles.otpInput} ${this.getClasses(
            inputStyle,
            focus && focusStyle,
            isDisabled && disabledStyle,
            hasErrored && errorStyle,
          )}`}
          type={isInputNum ? 'number' : 'tel'}
          {...numValueLimits}
          maxLength="1"
          ref={(input) => {
            this.input = input;
          }}
          disabled={isDisabled}
          value={value}
          {...rest}
        />
        {!isLastChild && separator}
      </div>
    );
  }
}

export default SingleOtpInput;
