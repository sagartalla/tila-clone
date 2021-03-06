import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import {FormControl, Panel, Heading, Body, Title} from 'react-bootstrap';
import SVGCompoent from '../../common/SVGComponet';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../search_en.styl';
import styles_ar from '../search_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

class RangeFitler extends Component {
  static getClosest(values, goal) {
    return values.reduce((prev, curr) => (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev))
  }

  constructor(props) {
    super(props);
    const { filter, selectedFilters } = props;
    const [min, max] = selectedFilters.length ? selectedFilters[0].param.match(/\[(.*)\]/)[1].split(' TO ').map((val) => parseInt(val)): [ null, null ];
    this.state = {
      static: {
        min: Math.min.apply(null, filter.children[0].values),
        max: Math.max.apply(null, filter.children[0].values),
      },
      value: {
        min: min || Math.min.apply(null, filter.children[0].values),
        max: max || Math.max.apply(null, filter.children[0].values),
      },
    };
    this.minChange = this.minChange.bind(this);
    this.maxChange = this.maxChange.bind(this);
    this.getParam = this.getParam.bind(this);
    this.onChangeRange = this.onChangeRange.bind(this);
  }

  getParam() {
    const { filter } = this.props;
    let { param } = filter.children[0];
    param = param.replace('{start}', this.state.value.min);
    param = param.replace('{end}', this.state.value.max);
    return param;
  }

  minChange(e) {
    const { filter } = this.props;
    this.setState({
      value: Object.assign({}, this.state.value, { min: parseInt(e.target.value) })
    }, () => {
      this.props.onChangeHandle({ name: filter.name, param: this.getParam() }, e);
    });
  }

  maxChange(e) {
    const { filter } = this.props;
    this.setState({
      value: Object.assign({}, this.state.value, { max: parseInt(e.target.value) })
    }, () => {
      this.props.onChangeHandle({ name: filter.name, param: this.getParam() }, e);
    });
  }

  onChangeRange(value) {
    const { filter } = this.props;
    const values = filter.children[0].values;
    const closest = {
      min: RangeFitler.getClosest(values, value.min),
      max: RangeFitler.getClosest(values, value.max),
    };
    this.setState({
      value: closest
    }, () => {
      this.props.onChangeHandle({ name: filter.name, param: this.getParam()});
    });
  }

  render () {
    const { filter } = this.props;
    const { min, max } = this.state.static;
    return (
      <Panel eventKey="6" key={filter.id}>
      <li className={`${styles['category-list']}`}>
        <Panel.Heading className={styles['category-list-head']}>
        {/* <Panel.Title toggle className={`${styles['category-list-title']} ${styles['black-color']} ${styles['fontW600']} ${styles['p-10-20']} ${styles['flx-spacebw-alignc']}`}>
            {filter.name}
            <SVGCompoent clsName={`${styles['expand-icon']}`} src="icons/common-icon/down-arrow-circle" />
          </Panel.Title> */}
        <Panel.Title toggle className={`${styles['category-list-title']} ${styles['black-color']} ${styles['fontW600']} ${styles['flx-spacebw-alignc']}`}>
          <span className={styles['flt-lbl']}>{filter.name}</span>
          <SVGCompoent clsName={`${styles['expand-icon']}`} src="icons/common-icon/down-arrow-circle" />
        </Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible className={`${styles['mb-15']} ${styles['mt-15']} ${styles['border-b']}`}>
        <div className={`${styles['flx-spacebw-alignc']} ${styles['p-10-20']}`}>
          <select className={styles['price-select-list']} componentclass="select" placeholder="select" onChange={this.minChange} value={this.state.value.min}>
            {filter.children[0].values.map((value) => <option value={value} key={value}>{value}</option>)}
          </select>
          <span className={`${styles['pl-10']} ${styles['pr-10']}`}>to</span>
          <select className={styles['price-select-list']} componentclass="select" placeholder="select" onChange={this.maxChange} value={this.state.value.max}>
            {filter.children[0].values.map((value) => <option value={value} key={value}>{value}</option>)}
          </select>
        </div>
        <div className={`${styles['range-fitler-wrap']} ${styles['p-20']}`}>
          <InputRange
            maxValue={max}
            minValue={min}
            value={this.state.value}
            onChange={value => this.onChangeRange(value)}
          />
        </div>
        </Panel.Body>
      </li>
      </Panel>
    );
  }
}

RangeFitler.propTypes = {
  selectedFilters: PropTypes.array.isRequired,
  onChangeHandle: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
}

export default RangeFitler;
