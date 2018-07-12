import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { mergeCss } from '../../../utils/cssUtil';
import { languageDefinations } from '../../../utils/lang';
import { actionCreators } from '../../../store/search';

const styles = mergeCss('components/Search/search');
const { SEARCH_PAGE } = languageDefinations();

class SortByWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.sortSelect = this.sortSelect.bind(this);
  }

  sortSelect(e) {
    this.setState({
      value: e.target.value
    });
    this.props.getSearchResults({
      sort: this.getSortParam(e.target.value)
    });
  }

  getSortParam(selectedValue) {
    return {
        selling_price_hi_to_lo: {'sellingPrice': 'desc'},
        selling_price_lo_to_hi: {'sellingPrice': 'asc'},
    }[selectedValue];
  }

  render() {
    return (
      <div className={`${styles['flex-center']} ${styles['sort-part-inn']}`}>
        <label className={`${styles['mb-0']} ${styles['fontW600']}`}>{SEARCH_PAGE.SORT_BY} : </label>
        <div className={styles['select']}>
          <select className={styles['select-text']} required value={this.state.value} onChange={this.sortSelect}>
            {/*<option value="1">{SEARCH_PAGE.BEST_MATCH}</option>
          <option value="2">{SEARCH_PAGE.BEST_OFFERS}</option>*/}
            <option value="selling_price_hi_to_lo">{SEARCH_PAGE.PRICE_LOW_TO_HIGH}</option>
            <option value="selling_price_lo_to_hi">{SEARCH_PAGE.PRICE_HIGH_TO_LOW}</option>
          </select>
          <span className={styles['select-highlight']}></span>
          <span className={styles['select-bar']}></span>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSearchResults: actionCreators.getSearchResults,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(SortByWidget);
