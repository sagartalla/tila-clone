import React from 'react';
import InlineSVG from 'svg-inline-react';


const SVGComponent = ({ src, clsName }) => {
  return (
    <InlineSVG src={require(`static/img/${src}.svg`)} className={clsName} />
  )
}

export default SVGComponent;