import React, { Component } from 'react';

import SingleOtpInput from './SingleOtpInput';
import { languageDefinations } from '../../utils/lang';
import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './login_en.styl';
import styles_ar from './login_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };
const { LOGIN_PAGE } = languageDefinations();

// keyCode constants
const BACKSPACE = 8;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DELETE = 46;

const isStyleObject = obj => typeof obj === 'object';

class OtpInput extends Component {
  static defaultProps = {
    numInputs: 4,
    onChange: otp => console.log(otp),
    isDisabled: false,
    shouldAutoFocus: false,
  };

  state = {
    activeInput: 0,
    otp: [],
  };

  getOtp = () => {
    const { onChange, isInputNum } = this.props;
    const otp = this.state.otp.join('');
    onChange(isInputNum ? Number(otp) : otp);
  };

  focusInput = (input) => {
    const { numInputs } = this.props;
    const activeInput = Math.max(Math.min(numInputs - 1, input), 0);
    this.setState({
      activeInput,
    });
  };

  focusNextInput = () => {
    const { activeInput } = this.state;
    this.focusInput(activeInput + 1);
  };

  focusPrevInput = () => {
    const { activeInput } = this.state;
    this.focusInput(activeInput - 1);
  };

  changeCodeAtFocus = (value) => {
    const { activeInput, otp } = this.state;
    otp[activeInput] = value[0] || '';

    this.setState({
      otp,
    });
    this.getOtp();
  };

  handleOnPaste = (e) => {
    e.preventDefault();
    const { numInputs } = this.props;
    const { activeInput, otp } = this.state;

    const pastedData = e.clipboardData
      .getData('text/plain')
      .slice(0, numInputs - activeInput)
      .split('');

    for (let pos = 0; pos < numInputs; pos += 1) {
      if (pos >= activeInput && pastedData.length > 0) {
        otp[pos] = pastedData.shift();
      }
    }
    this.setState({
      otp,
    });

    this.getOtp();
  };

  handleOnChange = ({ target }) => {
    this.changeCodeAtFocus(target.value);
    this.focusNextInput();
  };

  handleOnFocus = ({ target }) => {
    this.setState({
      activeInput: Number(target.getAttribute('data-id')),
    });
    target.select();
  };

  handleOnBlur = () => this.setState({ activeInput: -1 });

  handleOnKeyDown = (e) => {
    switch (e.keyCode) {
      case BACKSPACE:
        e.preventDefault();
        this.changeCodeAtFocus('');
        this.focusPrevInput();
        break;
      case DELETE:
        e.preventDefault();
        this.changeCodeAtFocus('');
        break;
      case LEFT_ARROW:
        e.preventDefault();
        this.focusPrevInput();
        break;
      case RIGHT_ARROW:
        e.preventDefault();
        this.focusNextInput();
        break;
      default:
        break;
    }
  };

  renderInputs = () => {
    const { activeInput, otp } = this.state;
    const {
      numInputs,
      inputStyle,
      focusStyle,
      separator,
      isDisabled,
      disabledStyle,
      hasErrored,
      errorStyle,
      shouldAutoFocus,
      isInputNum,
    } = this.props;
    const inputs = [];
    for (let i = 0; i < numInputs; i += 1) {
      inputs.push(<SingleOtpInput
        key={i}
        index={i}
        focus={activeInput === i}
        value={otp && otp[i]}
        onChange={this.handleOnChange}
        onKeyDown={this.handleOnKeyDown}
        onPaste={this.handleOnPaste}
        onFocus={this.handleOnFocus}
        onBlur={this.handleOnBlur}
        separator={separator}
        inputStyle={inputStyle}
        focusStyle={focusStyle}
        isLastChild={i === numInputs - 1}
        isDisabled={isDisabled}
        disabledStyle={disabledStyle}
        hasErrored={hasErrored}
        errorStyle={errorStyle}
        shouldAutoFocus={shouldAutoFocus}
        isInputNum={isInputNum}
      />);
    }
    return inputs;
  };

  render() {
    const { containerStyle } = this.props;

    return (
      <div
        style={Object.assign(
          {},
          isStyleObject(containerStyle) && containerStyle,
        )}
        className={`${styles.width100} ${styles.flex} ${!isStyleObject(containerStyle) && containerStyle}`}
      >
        {this.renderInputs()}
      </div>
    );
  }
}

export default OtpInput;
