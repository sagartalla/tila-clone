import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { languageDefinations } from '../../../utils/lang';
import { actionCreators } from '../../../store/search';
import SVGComponent from '../../common/SVGComponet';

import lang from '../../../utils/language';

import styles_en from '../search_en.styl';
import styles_ar from '../search_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;


const { SEARCH_PAGE } = languageDefinations();

class SortByWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.sortSelect = this.sortSelect.bind(this);
  }
  fireAnalyticEvent = (value) => {
    digitalData.filter['sortBy'] = `sort:${value}`
    var event = new CustomEvent('event-sort-click');
    document.dispatchEvent(event);
  }
  sortSelect(e) {
    this.setState({
      value: e.target.value
    }, () => this.fireAnalyticEvent(this.state.value));
    this.props.getSearchResults({
      sort: this.getSortParam(e.target.value)
    });
  }

  getSortParam(selectedValue) {
    return {
      selling_price_hi_to_lo: { 'sellingPrice': 'desc' },
      selling_price_lo_to_hi: { 'sellingPrice': 'asc' },
    }[selectedValue];
  }

  render() {
    return (
      <div className={`${styles['flex-center']} ${styles['sort-part-inn']}`}>
        <span className={`${styles['mb-0']} ${styles['fontW600']} ${styles['flex-center']}`}>
          <SVGComponent clsName={`${styles['sort-arrow']}`} src="icons/common-icon/sort" />
          <span className={`${styles['pl-5']} ${styles['pr-5']}`}>{SEARCH_PAGE.SORT_BY}: </span> 
        </span>
        <div className={styles['select-mn']}>
          <select className={styles['select-text']} required value={this.state.value} onChange={this.sortSelect}>
            {/*<option value="1">{SEARCH_PAGE.BEST_MATCH}</option>
          <option value="2">{SEARCH_PAGE.BEST_OFFERS}</option>*/}
            <option value="best_match">{SEARCH_PAGE.BEST_MATCH}</option>
            <option value="selling_price_lo_to_hi">{SEARCH_PAGE.PRICE_LOW_TO_HIGH}</option>
            <option value="selling_price_hi_to_lo">{SEARCH_PAGE.PRICE_HIGH_TO_LOW}</option>
          </select>
        </div>
      </div>
    );
  }
}

SortByWidget.propTypes = {
  getSearchResults: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSearchResults: actionCreators.getSearchResults,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(SortByWidget);
