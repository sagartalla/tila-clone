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

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Search/search');

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
    const { results, query, categoryId } = this.props;
    return (
      <Waypoint onEnter={this.handleWaypointEnter} onLeave={this.handleWaypointLeave}>
        <div className={styles['search-results-wrap']}>
          {
            (results.totalCount > 0 || query || categoryId) ?
              <Fragment>
                <div className={`${styles['flx-space-bw']} ${styles['pb-10']} ${styles['items-list-show']} ${styles['ipad-flex-clm']}`}>
                  <h4 className={`${styles['meta-info']} ${styles['mt-0']} ${styles['mb-0']} ${styles['fontW300']}`}>{results.totalCount} {SEARCH_PAGE.NO_OF_ITEMS_FOUND}</h4>
                  <div className={`${styles['flx-spacebw-alignc']} ${styles['deliver-to-main']}`}>
                    <GeoWidget />
                    <SortByWidget />
                  </div>
                </div>
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
                <NoSSR>
                  <AppliedFilters />
                </NoSSR>
              </Fragment>
              :
              <div className={`${styles['no-results']} ${styles['fs-40']} ${styles['flex-center']} ${styles['justify-center']}`}>
                {results.totalCount} {SEARCH_PAGE.NO_OF_ITEMS_FOUND}
              </div>
          }
        </div>
      </Waypoint>
    );
  }
}


const mapStateToProps = (store) => ({
  categoryId: selectors.getCategoryId(store),
  query: selectors.getQuery(store),
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
