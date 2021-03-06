import React from 'react';
import { languageDefinations } from '../../../utils/lang';
import { Modal } from 'react-bootstrap';
import SVGComponent from '../../common/SVGComponet';

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
    document.getElementsByTagName('BODY')[0].style.overflow = 'hidden';
    this.setState({
      slider: true,
    });
  }

  closeSlider = () => {
    this.setState({
      slider: false,
    }, () => document.getElementsByTagName('BODY')[0].style.overflow = 'scroll');
  }

  render() {
    const warranty = this.props.warranty || {};
    const warranty_display = `${warranty.duration} ${_.startCase(_.toLower(warranty.duration_unit))} ${PDP_PAGE.WARRANTY}`;
    const warranty_time = warranty.duration;
    return (
      <div className={`${styles['flex-center']} ${styles['warranty-part']}  ${styles.relative}`}>
        <span className={`${styles['flex-center']}`}>
          <span>{warranty_display}</span>
        </span>
        <a className={`${styles.fontW600} ${styles['ml-20']} ${styles['view-more-label']} ${styles['fs-12']} ${styles.pointer}`} onClick={this.openSlider}>{warranty_time > 0 ? CART_PAGE.VIEW_MORE : ''}</a>
        {this.state.slider &&
        <Modal
         show={this.state.slider}
         onHide={this.closeSlider}
         className="warranty-class-name"
       >
          <div className={`${styles['m-15']} ${styles['flex-center']} ${styles['justify-between']}`}>
            <div ><Modal.Title>{PDP_PAGE.WARRANTY}</Modal.Title></div>
              <div className={`${styles['fs-18']} ${styles.pointer}`} onClick={this.closeSlider}>X</div>
            </div>
      <div className={`${styles['warranty-modal']} ${styles['mt-25']} ${styles['ml-20']}`}>
            {warranty.summary &&
            <div className={`${styles['fs-16']}`}>{PDP_PAGE.WARRANTY_SUMMARY}
              <ul className={`${styles['mt-5']} ${styles['ml-0']}`}>
                <li>{warranty.summary}</li>
              </ul>
            </div>}
            <hr />
            {warranty.covered &&
            <div className={`${styles['fs-16']}`}>{PDP_PAGE.COVERED_IN_WARRANTY}
              <ul className={`${styles['mt-5']} ${styles['ml-0']}`}>
                <li>{warranty.covered}</li>
              </ul>
            </div>}
            <hr />
            {warranty.not_covered &&
            <div className={`${styles['fs-16']}`}>{PDP_PAGE.NOT_COVERED_IN_WARRANTY}
              <ul className={`${styles['mt-5']} ${styles['ml-0']}`}>
                <li>{warranty.not_covered}</li>
              </ul>
            </div>}
          </div>
       </Modal>
      }
      </div>);
  }
}

export default Warranty;
