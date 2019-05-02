import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { languageDefinations } from '../../../../utils/lang/';
import Slider from '../../../common/slider';

import lang from '../../../../utils/language';

import styles_en from '../../product_en.styl';
import styles_ar from '../../product_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;


const { FOOTER_PAGE } = languageDefinations();

class SizeChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSlider: false,
    };
    this.imageUrl = {
      Women: '/static/img/icons/women.jpg',
      Men: '/static/img/icons/men.jpg',
      Boy: '/static/img/icons/kids.jpg',
      Girl: '/static/img/icons/kids.jpg',
      'Baby Boy': '/static/img/icons/kids.jpg',
      'Baby Girl': '/static/img/icons/kids.jpg',
      Kids: '/static/img/icons/kids.jpg',
    };
  }

  openSlider = () => {
    this.setState({
      showSlider: true,
    });
  }

  closeSlider = () => {
    this.setState({
      showSlider: false,
    });
  }
  render() {
    const { productInfo } = this.props;
    const { showSlider } = this.state;
    return (
      <div>
        <div className={`${styles['flex-center']}`}>
          {productInfo.sizeChart.showSizeChart &&
          <div className={`${styles['pt-10']} ${styles['pb-10']} ${styles['pr-15']}`}>
            <span>Try our&nbsp;</span><span className={`${styles['lgt-blue']} ${styles.pointer}`} onClick={this.openSlider}>{FOOTER_PAGE.SIZE_CHART}</span>
          </div>
        }
        </div>
        {showSlider &&
          <Slider
            closeSlider={this.closeSlider}
            isOpen={showSlider}
            label={
              <div className={`${styles['black-color']}`}>
                {`${productInfo.sizeChart.sizeChartImgName}` + ' ' + FOOTER_PAGE.SIZE_GUIDE}
              </div>}
          >
            <div className={`${styles['size-chart-image']}`}>
              <img src={this.imageUrl[productInfo.sizeChart.sizeChartImgName]} alt="image" />
            </div>
          </Slider>
        }
      </div>
    );
  }
}

SizeChart.propTypes = {
  productInfo: PropTypes.object,
};

SizeChart.defaultProps = {
  productInfo: {},
};


export default SizeChart;
