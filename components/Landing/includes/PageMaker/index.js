import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import _ from 'lodash';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Landing/includes/Electronics/electronics');

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
                                const titleArray = title.split(' ');
                                switch (widgetType) {
                                  case 'singleImage':
                                  case 'multiImage':
                                    const props = content[r+c];
                                    return (
                                      <Col md={Math.floor(12/col)}>
                                        {
                                          title ?
                                            <h4 className={`${styles['fontW600']} ${styles['text-uppercase']}`}>
                                              <span className={`${styles['populat-cat-title']} ${styles['thick-border-bottom']}`}>{titleArray.shift()}</span> {titleArray.join(' ')}
                                            </h4>
                                            :
                                            null
                                        }
                                        <ImagesWidget {...props} />
                                      </Col>
                                    );
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

export default PageMaker;
