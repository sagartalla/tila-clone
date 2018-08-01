import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from "react-slick";
import { Grid, Row, Col } from 'react-bootstrap';
import constants from '../../../constants';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Product/product');

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }

  render() {
    const { imgs } = this.props;
    return (
      <div className={`${styles['ht-100per']}`}>
        <div className={`${styles['display-item-wrap']}`}>
          <Slider
            asNavFor={this.state.nav2}
            ref={slider => (this.slider1 = slider)}
            lazyLoad={true}
            className={styles['ht-100per']}
          >
            {imgs.map(({url}) => {
              return (
                <div className={styles['selected-item-wrap']} key={url}>
                  <img src={`${constants.mediaDomain}/${url}`} />
                </div>
              )
            })}
          </Slider>
        </div>
        <div className={`${styles['bottom-slider']} ${styles['flex']} ${styles['border-t']}`}>
          <Col md={4}>
            <Slider
              asNavFor={this.state.nav1}
              ref={slider => (this.slider2 = slider)}
              slidesToShow={imgs.length > 4 ? 4 : imgs.length}
              swipeToSlide={true}
              focusOnSelect={true}
              lazyLoad={true}
              className="sub-slider"
            >
              {
                imgs.map(({url}, index) => {
                  return (
                    <div className={styles['carousel-item-wrap']} key={url}>
                      <img src={`${constants.mediaDomain}/${url}`} />
                    </div>
                  );
                })
              }
            </Slider>
          </Col>
          <Col md={4}>
            <div className={`${styles['thick-gry-clr']} ${styles['copon-code']} ${styles['pl-15']}`}>
              <h5 className={`${styles['mb-5']} ${styles['fontW600']}`}>10% EXTRA DISCOUNT</h5>
              <span className={styles['fs-12']}>Buy fashion for AED 1000/- and get 10% Extra Discount</span>
            </div>
          </Col>
          <Col md={4}>
            <div className={`${styles['thick-gry-clr']} ${styles['copon-code']} ${styles['pl-15']}`}>
              <h5 className={`${styles['mb-5']} ${styles['fontW600']}`}>10% EXTRA DISCOUNT</h5>
              <span className={styles['fs-12']}>Buy fashion for AED 1000/- and get 10% Extra Discount</span>
            </div>
          </Col>
        </div>
      </div>
    );
  }
}

Display.propTypes = {
  imgs: PropTypes.array.isRequired
}

export default Display;