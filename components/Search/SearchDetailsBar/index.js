import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Waypoint from 'react-waypoint';
import NoSSR from 'react-no-ssr';
import GeoWidget from '../../common/GeoWidget';
import SortByWidget from './SortByWidget';
import SearchFilters from '../../common/SearchFilters';
import AppliedFilters from './includes/AppliedFilters';

import { actionCreators, selectors } from '../../../store/search';
import { languageDefinations } from '../../../utils/lang';

import lang from '../../../utils/language';

import styles_en from '../search_en.styl';
import styles_ar from '../search_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;


const { SEARCH_PAGE } = languageDefinations();

class SearchDetailsBar extends Component {
  constructor(props) {
    super(props);
    this.handleWaypointEnter = this.handleWaypointEnter.bind(this);
    this.handleWaypointLeave = this.handleWaypointLeave.bind(this);
  }

  handleWaypointEnter() {
    this.props.hideSearchBarFitlers();
  }

  handleWaypointLeave() {
    this.props.showSearchBarFilters();
  }

  render() {
    const { results, query, categoryId,categoryQuery } = this.props;
    const finalQuery = query || categoryQuery;
    return (
      <Waypoint onEnter={this.handleWaypointEnter} onLeave={this.handleWaypointLeave}>
        <div className={styles['search-results-wrap']}>
          <Fragment>
              <div className={`${styles['flx-space-bw']} ${styles['pb-10']} ${styles['items-list-show']} ${styles['ipad-flex-clm']}`}>
                <h4 className={`${styles['mt-0']} ${styles['mb-0']} ${styles['fontW300']}`}>{results.totalCount} {SEARCH_PAGE.NO_OF_ITEMS_FOUND_FOR} <div className={`${styles['no-h1']} ${styles.ellipsis} ${styles.margin}`} title={finalQuery && finalQuery.split('-').join(' ')}>{finalQuery && finalQuery.split('-').join(' ')}</div></h4>
                <div className={`${styles['flx-spacebw-alignc']} ${styles['deliver-to-main']}`}>
                  <GeoWidget />
                  <SortByWidget />
                </div>
              </div>
              {/*
                <div className={`${styles['suggested-tags-main']} ${styles['bg-white']} ${styles['border-radius4']} ${styles['mb-20']} ${styles['flex-center']} ${styles['p-15']}`}>
                  <SearchFilters/>
                  <span className={`${styles['flex-center']} ${styles['pl-15']} ${styles['sugest-tag']}`}>
                    <span>{SEARCH_PAGE.SUGGESTED_TAGS} : </span>
                    <span className={`${styles['flex']} ${styles['fs-12']} ${styles['suggest-sublist']}`}>
                      <span>Full Sleeves</span>
                      <span>Stripes</span>
                    </span>
                  </span>
                </div>
              */}
              <NoSSR>
                <AppliedFilters />
              </NoSSR>
            </Fragment>
        </div>
      </Waypoint>
    );
  }
}


const mapStateToProps = (store) => ({
  categoryId: selectors.getCategoryId(store),
  query: selectors.getQuery(store),
  categoryQuery:selectors.getCategorySearchQuery(store),
  results: selectors.getSearchResutls(store),
  ui: selectors.getUIState(store),
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      hideSearchBarFitlers: actionCreators.hideSearchBarFitlers,
      showSearchBarFilters: actionCreators.showSearchBarFilters,
    },
    dispatch,
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchDetailsBar);
