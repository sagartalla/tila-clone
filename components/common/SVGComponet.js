import React from 'react';
import InlineSVG from 'svg-inline-react';


const SVGComponent = ({ src }) => {
  return (
    <InlineSVG src={require(`static/img/${src}.svg`)} />   
  )
}

export default SVGComponent;