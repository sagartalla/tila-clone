import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import GeoWidget from '../../common/GeoWidget';
import SortByWidget from './SortByWidget';

import { actionCreators, selectors } from '../../../store/search';
import { languageDefinations } from '../../../utils/lang';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Search/search');

const { SEARCH_PAGE } = languageDefinations();

class SearchDetailsBar extends Component {
  render() {
    const { results } = this.props;
    return (
      <div>
        <div className={`${styles['flx-space-bw']} ${styles['pb-10']} ${styles['items-list-show']}`}>
          <h4 className={`${styles['meta-info']} ${styles['mt-0']} ${styles['mb-0']} ${styles['fontW300']}`}>{results.totalCount} {SEARCH_PAGE.NO_OF_ITEMS_FOUND}</h4>
          <div className={`${styles['flex-center']} ${styles['deliver-to-main']}`}>
            <GeoWidget />
            <SortByWidget />
          </div>
        </div>
        <div className={`${styles['suggested-tags-main']} ${styles['bg-white']} ${styles['border-radius4']} ${styles['mb-20']} ${styles['flex-center']} ${styles['p-15']}`}>
          <div className={`${styles['flex-center']} ${styles['pr-25']} ${styles['fullfill-part']}`}>
              <label className={`${styles['switch']} ${styles['m-0']}`}>
                <input className={styles['switch-check']} type="checkbox"/>
                <span className={`${styles['slider']}`}></span>
              </label>
              <span className={styles['pl-10']}>{SEARCH_PAGE.FULFILLED_BY_TILA}</span>
          </div>
          <div className={`${styles['flex-center']} ${styles['pr-25']} ${styles['all-deals-part']}`}>
            <label className={`${styles['switch']} ${styles['m-0']}`}>
              <input className={styles['switch-check']} type="checkbox"/>
              <span className={`${styles['slider']}`}></span>
            </label>
            <span className={styles['pl-10']}>{SEARCH_PAGE.ALL_DEALS}</span>
          </div>
          <span className={`${styles['flex-center']} ${styles['pl-15']} ${styles['sugest-tag']}`}>
            <span>{SEARCH_PAGE.SUGGESTED_TAGS} : </span>
            <span className={`${styles['flex']} ${styles['fs-12']} ${styles['suggest-sublist']}`}>
              <span>Full Sleeves</span>
              <span>Stripes</span>
            </span>
          </span>
        </div>
        <div className={`${styles['applied-tags']} ${styles['flex-center']} ${styles['pb-20']}`}>
          <span>{SEARCH_PAGE.APPLIED_FILTERS_TAGS} : </span>
          <div className={styles['flex']}>
            <div className={`${styles['flex-center']} ${styles['applied-tags-inn']} ${styles['ml-10']}`}><span className={`${styles['title']} ${styles['fs-12']}`}>Adidas </span><span className={`${styles['close-part']}`}>x</span></div>
            <div className={`${styles['flex-center']} ${styles['applied-tags-inn']} ${styles['ml-10']}`}><span className={`${styles['title']} ${styles['fs-12']}`}>United Colors of Benetton </span><span className={`${styles['close-part']}`}>x</span></div>
            <div className={`${styles['flex-center']} ${styles['applied-tags-inn']} ${styles['ml-10']}`}><span className={`${styles['title']} ${styles['fs-12']}`}>Mufti </span><span className={`${styles['close-part']}`}>x</span></div>
            <div className={`${styles['flex-center']} ${styles['applied-tags-inn']} ${styles['ml-10']}`}><span className={`${styles['title']} ${styles['fs-12']}`}>Puma </span><span className={`${styles['close-part']}`}>x</span></div>
          </div>
          <a href="#" className={`${styles['fs-12']} ${styles['pl-20']}`}>{SEARCH_PAGE.CLEAR_ALL}</a>
        </div>
    </div>
    );
  }
}


const mapStateToProps = (store) => ({
  results: selectors.getSearchResutls(store),
  ui: selectors.getUIState(store),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSearchResults: actionCreators.getSearchResults,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(SearchDetailsBar);
