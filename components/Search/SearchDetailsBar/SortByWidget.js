import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown, MenuItem } from 'react-bootstrap';

import { languageDefinations } from '../../../utils/lang';
import { actionCreators } from '../../../store/search';
import SVGComponent from '../../common/SVGComponet';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../search_en.styl';
import styles_ar from '../search_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const { SEARCH_PAGE } = languageDefinations();

const sortValues = [{ value: 0, text: SEARCH_PAGE.BEST_MATCH },
  { value: 1, text: SEARCH_PAGE.PRICE_LOW_TO_HIGH },
  { value: 2, text: SEARCH_PAGE.PRICE_HIGH_TO_LOW }];


class SortByWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortValue: SEARCH_PAGE.BEST_MATCH,
    };
    this.sortSelect = this.sortSelect.bind(this);
  }
  fireAnalyticEvent = (value) => {
    digitalData.filter['sortBy'] = `sort:${value}`
    var event = new CustomEvent('event-sort-click');
    document.dispatchEvent(event);
  }
  sortSelect(e) {
    const data = e.currentTarget.getAttribute('data');
    const index = e.currentTarget.getAttribute('value');
    this.setState({
      sortValue: data,
    }, () => this.fireAnalyticEvent(this.state.sortValue));
    this.props.getSearchResults({
      sort: this.getSortParam(index),
    });
  }

  getSortParam(selectedValue) {
    return {
      2: { 'sellingPrice': 'desc' },
      1: { 'sellingPrice': 'asc' },
    }[selectedValue];
  }

  render() {
    return (
      <div className={`${styles['flex-center']} ${styles['sort-part-inn']} ${styles['pl-15']}`}>
        <span className={`${styles['mb-0']} ${styles['fontW600']} ${styles['flex-center']}`}>
          <SVGComponent clsName={`${styles['sort-arrow']}`} src="icons/common-icon/sort" />
          <span className={`${styles['pl-5']} ${styles['pr-5']}`}>{SEARCH_PAGE.SORT_BY}: </span>
        </span>
        <div className={styles['select-mn']}>
          {/* <select className={styles['select-text']} required value={this.state.value} onChange={this.sortSelect}> */}
            {/*<option value="1">{SEARCH_PAGE.BEST_MATCH}</option>
          <option value="2">{SEARCH_PAGE.BEST_OFFERS}</option>*/}
            {/* <option value="best_match">{SEARCH_PAGE.BEST_MATCH}</option>
            <option value="selling_price_lo_to_hi">{SEARCH_PAGE.PRICE_LOW_TO_HIGH}</option>
            <option value="selling_price_hi_to_lo">{SEARCH_PAGE.PRICE_HIGH_TO_LOW}</option>
          </select> */}

          <Dropdown id="sort-toggle" className={`${styles.width100}`}>
            <Dropdown.Toggle id="dropdown-custom-components" className={styles['pl-0']}>
              <span>{this.state.sortValue}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className={`${styles.width100} ${styles['p-0']} ${styles['m-0']} ${styles['sort-drop-down']}`}>
              {sortValues.map((value, index) => (
                  <MenuItem className={styles['search-suggestion']} data={value.text} value={value.value} onClick={this.sortSelect} eventKey={index + 1} key={value.value}>
                    <a className={`${styles['black-color']}`}>
                      <span>{value.text}</span>
                    </a>
                  </MenuItem>))
              }
            </Dropdown.Menu>
          </Dropdown>
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
