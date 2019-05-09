import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const Btn = props => (
  <Button
    className={props.className}
    style={{ width: props.btnWidth, background: props.backGround, color: props.color }}
    onClick={props.onClick}
  >
    {props.btnText}
  </Button>
);

Btn.propTypes = {
  btnWidth: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.string,
  backGround: PropTypes.string,
  btnText: PropTypes.string,
};
Btn.defaultProps = {
  btnWidth: '',
  color: '',
  backGround: '',
  onClick: () => {},
  btnText: '',
};
export default Btn;
