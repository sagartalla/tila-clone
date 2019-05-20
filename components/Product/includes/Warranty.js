import React from 'react';
import { languageDefinations } from '../../../utils/lang';
import SVGCompoent from '../../common/SVGComponet';

import Slider from '../../common/slider';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../product_en.styl';
import styles_ar from '../product_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const { PDP_PAGE, CART_PAGE } = languageDefinations();


class Warranty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slider: false,
    };
  }

  openSlider = () => {
    this.setState({
      slider: true,
    });
  }

  closeSlider = () => {
    this.setState({
      slider: false,
    });
  }

  render() {
    const warranty = this.props.warranty || {};
    const warranty_display = `${warranty.duration} ${warranty.duration_unit} ${PDP_PAGE.WARRANTY}`;
    return (
      <div className={`${styles['flex-center']} ${styles['warranty-part']}  ${styles.relative} ${styles.pointer}`}>
        <span className={`${styles['flex-center']}`}><span>{warranty_display}</span></span>
        <a className={`${styles.fontW600} ${styles['ml-20']} ${styles['view-more-label']} ${styles['fs-12']}`} onClick={this.openSlider}>View More</a>
        {this.state.slider &&
        <Slider label="Warranty" isOpen={this.state.slider} closeSlider={this.closeSlider}>
          <div className={`${styles['warranty-modal']}`}>
            <hr />
            <div className={`${styles['fs-20']} ${styles['ml-20']}`}>{PDP_PAGE.WARRANTY_SUMMARY}
              <ul>
                <li>{warranty.summary}</li>
              </ul>
            </div>
            <hr />
            <div className={`${styles['fs-20']} ${styles['ml-20']}`}>{PDP_PAGE.COVERED_IN_WARRANTY}
              <ul>
                <li>{warranty.covered}</li>
              </ul>
            </div>
            <hr />
            <div className={`${styles['fs-20']} ${styles['ml-20']}`}>{PDP_PAGE.NOT_COVERED_IN_WARRANTY}
              <ul>
                <li>{warranty.not_covered}</li>
              </ul>
            </div>
          </div>
        </Slider>}
      </div>);
  }
}

export default Warranty;
