import React from 'react';
import InlineSVG from 'svg-inline-react';


const SVGComponent = ({ src, clsName, style }) => {
  return (
    <InlineSVG src={require(`../../static/img/${src}.svg`)} className={clsName} style={style}/>
  );
}

export default SVGComponent;
