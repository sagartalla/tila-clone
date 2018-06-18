import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from "react-slick";

import constants from '../../constants';

import { mergeCss } from '../../utils/cssUtil';
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
      <div className={`${styles['box']}`}>
        <div className={`${styles['display-item-wrap']} ${styles['pt-24']}`}>
          <Slider
            asNavFor={this.state.nav2}
            ref={slider => (this.slider1 = slider)}
            lazyLoad={true}
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
        <Slider
          asNavFor={this.state.nav1}
          ref={slider => (this.slider2 = slider)}
          slidesToShow={4}
          swipeToSlide={true}
          focusOnSelect={true}
          lazyLoad={true}
        >
          {imgs.map(({url}) => (
            <div className={styles['carousel-item-wrap']} key={url}>
              <img src={`${constants.mediaDomain}/${url}`} />
            </div>
         ))}
        </Slider>
      </div>
    );
  }
}

Display.propTypes = {
  imgs: PropTypes.array.isRequired
}

export default Display;