import React from 'react';
import { languageDefinations } from '../../../utils/lang';
import SVGCompoent from '../../common/SVGComponet';
import { mergeCss } from '../../../utils/cssUtil';
import Slider from '../../common/slider';

const styles = mergeCss('components/Product/product');
const { PDP_PAGE } = languageDefinations();


class Warranty extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      slider: false
    }
  }

  openSlider = () => {
    this.setState({
      slider: true
    })
  }

  closeSlider = () => {
    this.setState({
      slider: false,
    });
  }

  render(){
    const {warranty} = this.props;
    const warranty_display = warranty.duration + " " + warranty.duration_unit + " " + PDP_PAGE.WARRANTY
    return (
    <div className={`${styles['flex-center']} ${styles['display-inline']}`}>
      <span >{warranty_display}</span>{this.props.break ? <br/> : null}
      <a className={`${styles['fontW600']} ${styles['ml-20']}`} onClick={this.openSlider}>View More</a>
      {this.state.slider && <Slider label="Warranty" isOpen={this.state.slider} closeSlider={this.closeSlider}>
        <div className={`${styles['warranty-modal']}`}>
        <hr/>
            <div className={`${styles['fs-20']} ${styles['ml-20']}`}>Warranty Summary
              <ul>
                <li>{warranty.summary}</li>
              </ul>
            </div>
            <hr/>
            <div className={`${styles['fs-20']} ${styles['ml-20']}`}>Covered in Warranty
              <ul>
                <li>{warranty.covered}</li>
              </ul>
            </div>
            <hr/>
            <div className={`${styles['fs-20']} ${styles['ml-20']}`}>Not Covered in Warranty
              <ul>
                <li>{warranty.not_covered}</li>
              </ul>
            </div>
        </div>
      </Slider>}
  </div>);
  }
}

export default Warranty