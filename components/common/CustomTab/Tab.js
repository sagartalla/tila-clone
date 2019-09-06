import React,{ useState } from 'react'
import PropTypes from 'prop-types';

const Tab = ({ value, tabType, label,selected, name,onCallback,...props }) => {
  const onInputChange = (e) => {
    if(onCallback) {
      onCallback(e, value)
    }
  }
  const renderTabType = () => {
    if(tabType === 'radioInput') {
      return (
        <div className={`${props.tabClass}`}>
          <input
            type='radio'
            name={name}
            onChange={onInputChange}
            value={value}
            checked={selected}
            className={props.btnStyle}
          />
        <label>
          {label}
        </label>
        </div>
      )
    }
    if(tabType === 'tab') {
      return (
        <div
        className={`${props.tabClass} ${ selected === true ? props.activeClass : props.nonActiveClass}`}
        onClick={onInputChange}
        >
          {label}
        </div>
      )
    }
  }
  return (
    <div>
      {renderTabType()}
    </div>
  )
}
Tab.propTypes = {
  tabClass:PropTypes.string,
  activeClass:PropTypes.string,
  nonActiveClass:PropTypes.string,
  btnStyle:PropTypes.string
}
Tab.defaultProps = {
  tabClass:'',
  activeClass:'',
  nonActiveClass:'',
  btnStyle:''
}
export default Tab
