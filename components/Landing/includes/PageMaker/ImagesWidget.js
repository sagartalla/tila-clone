import React from 'react';

const ImageWidget = (props) => {
  const { type: widgetType, title, content: innerContnet, col: widgetCol, row: widgetRow } = props;
  return (
    <Col md={Math.floor(12/col)}>
      {
        _.times(widgetRow, (wr) => {
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
        })
      }
    </Col>
  );
}

export default ImageWidget
