import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';


const Btn = props => (
  <Button
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
