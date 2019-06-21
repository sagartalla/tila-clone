import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Waypoint from 'react-waypoint';
import Cookie from 'universal-cookie';
import NoSSR from 'react-no-ssr';
import GeoWidget from '../../common/GeoWidget';
import SortByWidget from './SortByWidget';
import { Router } from '../../../routes';
// import SearchFilters from '../../common/SearchFilters';
import AppliedFilters from './includes/AppliedFilters';

import { actionCreators, selectors } from '../../../store/search';
import { languageDefinations } from '../../../utils/lang';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../search_en.styl';
import styles_ar from '../search_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};


const cookies = new Cookie();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';


const { SEARCH_PAGE } = languageDefinations();

class SearchDetailsBar extends Component {
  constructor(props) {
    super(props);
    this.handleWaypointEnter = this.handleWaypointEnter.bind(this);
    this.handleWaypointLeave = this.handleWaypointLeave.bind(this);
    this.capitalize = this.capitalize.bind(this);
  }

  querySearch = (e) => {
    let dataSearchQuery = e.currentTarget.dataset.querysearch;
    Router.pushRoute(`/${country}/${language}/srp?search=${dataSearchQuery}&disableSpellCheck=true&${Object.entries(this.props.optionalParams).map(([key, val]) => `${key}=${val}`).join('&')}`);
  }

  handleWaypointEnter() {
    this.props.hideSearchBarFitlers();
  }

  handleWaypointLeave() {
    this.props.showSearchBarFilters();
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    const { results, query,categoryQuery, spellCheckResp } = this.props;
    const finalQuery = query || categoryQuery;
    return (
      <Waypoint onEnter={this.handleWaypointEnter} onLeave={this.handleWaypointLeave}>
        <div className={styles['search-results-wrap']}>
          <Fragment>
              <div className={`${styles['flx-space-bw']} ${styles['pb-15']} ${styles['items-list-show']} ${styles['ipad-flex-clm']}`}>
                <div className={`${styles['flex-center']} ${styles['search-val-part']}`}>
                  <h4 className={`${styles['meta-info']} ${styles['mt-0']} ${styles['mb-0']} ${styles['pr-10']} ${styles['fs-14']} ${styles['fontW300']}`}>
                    {
                      spellCheckResp ?
                      <a href="javascript: void(0)" onClick={this.querySearch} className={`${styles['black-color']} ${styles['fontW600']}`} data-querysearch={spellCheckResp[query]}>
                        <b className={styles['fs-14']}>{`${spellCheckResp[query]}`}</b>
                        <span className={`${styles['fs-10']} ${styles['textColor']}`}>({ SEARCH_PAGE.AUTO_CORRECTED }):</span>
                      </a>
                      :
                      <div className={`${styles['no-h1']} ${styles['fs-14']}`}>{finalQuery && this.capitalize(finalQuery.split('-').join(' '))}<span className={styles['fontW300']}>:</span> </div>
                    }
                    <span className={`${styles['pl-5']} ${styles['fs-14']}`}>{ results.totalCount.toLocaleString('en') } { SEARCH_PAGE.SEARCH_ITEMS }</span>
                  </h4>
                  {
                    spellCheckResp &&
                    <h4 className={`${styles['pl-10']} ${styles['fs-14']} ${styles['sple-check-prt']}`}>
                      <span>{ SEARCH_PAGE.YOUR_ENTERED }: </span>
                      <a href="javascript: void(0)" onClick={this.querySearch} className={`${styles['fontW600']} ${styles['lgt-blue']}`} data-querysearch={finalQuery && finalQuery.split('-').join(' ')}>
                        {finalQuery && this.capitalize(finalQuery.split('-').join(' '))}
                      </a>
                    </h4>
                  }
                </div>
                <div className={`${styles['flex']} ${styles['deliver-to-main']}`}>
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
  query: selectors.getQuery(store),
  categoryQuery:selectors.getCategorySearchQuery(store),
  results: selectors.getSearchResutls(store),
  ui: selectors.getUIState(store),
  spellCheckResp:selectors.getSpellCheckResponse(store),
  optionalParams: selectors.optionParams(store)
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
