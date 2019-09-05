import React,{ useState } from 'react'
import PropTypes from 'prop-types';

const Tabs = ({ children, onCallback,value,...props }) => {
  let childIndex = 0;
  const childrenProp = React.Children.map(children, child => {
    if(!React.isValidElement(child)){
      return null
    }
    const childValue = child.props.value === undefined ? childIndex : child.props.value
    const selected = childValue === value

    childIndex += 1

    return React.cloneElement(child, {
      selected,
      onCallback,
      value:childValue
    })
  })
  return (
    <div className={props.tabsClass}>
      {
        childrenProp
      }
    </div>
  )
}
Tabs.propTypes = {
  tabsClass: PropTypes.string
}
Tabs.defaultProps = {
  tabsClass:''
}
export default Tabs
