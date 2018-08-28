import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
// import { mergeCss } from '../../utils/cssUtil';

const Btn = props => (
  <Button
    className={props.className}
    style={{ width: props.btnWidth, background: props.backGround, color: props.color }}
    onClick={props.BtnClickHandler}
  >
    {props.btnText}
  </Button>
);

Btn.propTypes = {
  btnWidth: PropTypes.string,
  BtnClickHandler: PropTypes.func,
  color: PropTypes.string,
  backGround: PropTypes.string,
  btnText: PropTypes.string,
};
Btn.defaultProps = {
  btnWidth: '',
  color: '',
  backGround: '',
  BtnClickHandler: () => {},
  btnText: '',
};
export default Btn;
