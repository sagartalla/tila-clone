import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from "react-slick";

import styles from './product.styl';
import constants from '../../constants';

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
      <div>
        <div className={styles['display-item-wrap']}>
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