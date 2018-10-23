import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import _ from 'lodash';

const ImageWidget = (props) => {
  const { type: widgetType, title, content: innerContnet, col: widgetCol, row: widgetRow } = props;
  return _.times(widgetRow, (wr) => {
    return (
        <Row>
          {
            _.times(widgetCol, (wc) => {
              const { type, redirectUrl, 'fileURL-desktop': fileURLDesktop } = innerContnet[wr+wc]
              return (
                <Col md={Math.floor(12/widgetCol)}>
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
                </Col>
              )
            })
          }
        </Row>
    )
  });
}

export default ImageWidget
