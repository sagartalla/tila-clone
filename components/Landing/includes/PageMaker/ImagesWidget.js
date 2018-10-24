import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import _ from 'lodash';

const ImageWidget = (props) => {
  const { type: widgetType, title, content: innerContnet, col: widgetCol, row: widgetRow } = props;
  return _.times(widgetRow, (wr) => {
    return (
        <div>
          {
            _.times(widgetCol, (wc) => {
              const { type, redirectUrl, 'fileURL-desktop': fileURLDesktop } = innerContnet[wr+wc]
              const inlineStyle = {
                width:  `${100/widgetCol}%`,
                display: 'inline-block'
              }
              return (
                <div style={inlineStyle}>
                  <div>
                    {
                      type === 'image'
                      ?
                      <a href={redirectUrl}>
                        <img src={fileURLDesktop} />
                      </a>
                      :
                      null
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
    )
  });
}

export default ImageWidget
  // {/*<div md={Math.floor(12/widgetCol)} className={`${`width-${100/widgetCol}`}`} >*/}
