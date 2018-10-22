import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import _ from 'lodash';

import ImagesWidget from './ImagesWidget';

class PageMaker extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <Grid>
          {
            data.map(({row=1, col=1, content}) => {
              return (
                <Row>
                  {
                    _.times(row, (r) => {
                      return (
                        <Col md={12}>
                          <Row>
                            {
                              _.times(col, (c) => {
                                const { type: widgetType, title, content: innerContnet, col: widgetCol, row: widgetRow } = content[r+c];
                                switch (widgetType) {
                                  case 'singleImage':
                                  case 'multiImage':
                                    const props = content[r+c];
                                    return <ImagesWidget />
                                    break;
                                }
                              })
                            }
                          </Row>
                        </Col>
                      )
                    })
                  }
                </Row>
              )
            })
          }
        </Grid>
      </div>
    );
  }
}
