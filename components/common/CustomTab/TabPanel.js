import React,{ useState } from 'react'
import PropTypes from 'prop-types';

const TabPanel = ({value,index,children, ...props}) => {
  return (
    <div className={`${ value !== index ?  props.nonactiveTabPanel : props.activeTabPanel}`}>
      {children}
    </div>
  )
}
TabPanel.propTypes = {
  nonactiveTabPanel:PropTypes.string,
  activeTabPanel:PropTypes.string
}
TabPanel.defaultProps = {
  nonactiveTabPanel:'',
  activeTabPanel:''
}
export default TabPanel
