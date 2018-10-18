import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import _ from 'lodash';

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
                    _.times(row=1, () => {
                      return (
                        <Col md={12}>
                          <Row>
                            {
                              _.times(col=1, () => {
                                const { type, fileURLdesktop, redirectionUrl } = content[row+col];
                                return (
                                  <div>
                                    {
                                      type === 'image'
                                      ?
                                      <a href={redirectionUrl}>
                                        <img src={fileURLdesktop} />
                                      </a>
                                      :
                                      null
                                    }
                                  </div>
                                );
                              })
                            }
                          </Row>
                        </Col>
                      )
                    })
                  }
                </Row>
              )
            });
          }
        </Grid>
      </div>
    );
  }
}
