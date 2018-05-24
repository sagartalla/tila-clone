import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import styles from '../search.styl';
import {FormControl} from 'react-bootstrap';

class RangeFitler extends Component {
  static getClosest(values, goal) {
    return values.reduce((prev, curr) => (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev))
  }

  constructor(props) {
    super(props);
    const { filter, selectedFilters } = props;
    const [min, max] = selectedFilters ? selectedFilters[0].param.match(/\[(.*)\]/)[1].split(' TO ').map((val) => parseInt(val)): [ null, null ];
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
      <li>
        <div>{filter.name}</div>
        <FormControl componentClass="select" placeholder="select" onChange={this.minChange} value={this.state.value.min}>
          <option value="select">select (minimum)</option>
          {filter.children[0].values.map((value) => <option value={value} key={value}>{value}</option>)}
        </FormControl>
        <FormControl componentClass="select" placeholder="select" onChange={this.maxChange} value={this.state.value.max}>
          <option value="select">select (maximum)</option>
          {filter.children[0].values.map((value) => <option value={value} key={value}>{value}</option>)}
        </FormControl>
        <div className={styles['range-fitler-wrap']}>
          <InputRange
            maxValue={max}
            minValue={min}
            value={this.state.value}
            onChange={value => this.onChangeRange(value)}
          />
        </div>
      </li>
    );
  }
}

RangeFitler.propTypes = {
  selectedFilters: PropTypes.array.isRequired,
  onChangeHandle: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
}

export default RangeFitler;