import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { decode, encode, addUrlProps, replaceInUrlQuery } from 'react-url-query';

import { actionCreators, selectors } from '../../../../store/search';
import SVGComponent from '../../../common/SVGComponet';

import { languageDefinations } from '../../../../utils/lang';
import { PanelGroup, Panel } from 'react-bootstrap';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../../search_en.styl';
import styles_ar from '../../search_ar.styl';
const { SEARCH_PAGE } = languageDefinations();

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

class AppliedFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.removeFilter = this.removeFilter.bind(this);
    this.submitQuery = this.submitQuery.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }

  removeFilter(e) {
    const { facets } = this.props;
    const target = e.currentTarget;
    const facetName = target.getAttribute('data-parentKey');
    const name = target.getAttribute('data-name');
    const value = target.getAttribute('data-key');
    // const facets = JSON.parse(decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent('facets').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1")) || '{}');
    const params = facets || {};
    params[facetName] = params[facetName] || [];
    params[facetName].splice(_.findIndex(params[facetName], param => param === name), 1);
    if (!params[facetName].length) { delete params[facetName]; }
    this.props.onChangeFacets(params);
    this.submitQuery(params);
  }

  submitQuery(params) {
    this.props.getSearchResults(this.props.getFacetfilters(params));
  }

  clearAll() {
    this.props.onChangeFacets({});
    this.submitQuery({});
  }

  changeToggle = (e) => {
    this.setState({
      open: !this.state.open,
    })
  }

  render() {
    const { appliedFilters } = this.props;
    const { open } = this.state;
    return (
      appliedFilters.length !== 0
        ?
        <div className={`${styles['applied-tags']} ${styles['flex-center']}`}>
          <span>{SEARCH_PAGE.APPLIED_FILTERS_TAGS} : </span>
          <div className={`${styles['flex-center']} ${styles['flex-wrp']}`}>
            {
              appliedFilters && appliedFilters.length > 0 && appliedFilters.slice(0, 10).map(af => (
                <div key={af.key} className={`${styles['flex-center']} ${styles['applied-tags-inn']} ${styles['ml-10']}`}>
                  {/* <div className={`${styles['filter-tooltp']} ${styles.absolute} ${styles['fs-12']}`}>{af.attributeDisplayName}</div> */}
                  <span className={`${styles.title} ${styles['fs-12']}`}>{af.displayName}</span>
                  <span onClick={this.removeFilter} data-name={af.displayName} data-parentKey={af.parentKey} data-key={af.key} className={`${styles['close-part']}`}>x</span>
                </div>
              ))
            }
           {!open && <a href="#" onClick={this.clearAll} className={`${styles['fs-12']} ${styles['pl-20']}`}>{SEARCH_PAGE.CLEAR_ALL}</a>}
          </div>
          {appliedFilters.length > 10 &&
          <div>
                  {!open && <div onClick={this.changeToggle} className={`${styles.pointer}`}>
                  <SVGComponent clsName={`${styles['filter-up-arrow']}`} src="icons/common-icon/icon-expand-down" />
                  </div>}
                {open && <div className={`${styles['flex-center']} ${styles['flex-nowrap']} ${styles['justify-between']} ${styles['header-second-filter']}`}>
                <div className={`${styles['flex-center']} ${styles['flex-wrp']}`}>
                {
                    appliedFilters.slice(11, appliedFilters.length).map(af => (
                      <div key={af.key} className={`${styles['flex-center']} ${styles['applied-tags-inn']} ${styles['ml-10']}`}>
                        <span className={`${styles.title} ${styles['fs-12']}`}>{af.displayName}</span>
                        <span onClick={this.removeFilter} data-name={af.displayName} data-parentKey={af.parentKey} data-key={af.key} className={`${styles['close-part']}`}>x</span>
                      </div>
                    ))
                  }
                  <a href="#" onClick={this.clearAll} className={`${styles['fs-12']} ${styles['pl-20']}`}>{SEARCH_PAGE.CLEAR_ALL}</a>
                  </div>                                    
                   {open && <div onClick={this.changeToggle} className={`${styles.pointer}`}>
                   <SVGComponent clsName={`${styles['filter-down-arrow']} ${styles['mr-20']}`} src="icons/common-icon/icon-expand-up" />
                  </div>}
                  </div>}
            </div>             
          }
          </div>
        :
        null
    );
  }
}

const mapStateToProps = store => ({
  appliedFilters: selectors.getAppliedFitlers(store),
  getFacetfilters: selectors.getFacetfilters(store),
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    getSearchResults: actionCreators.getSearchResults
  },
  dispatch,
);

function mapUrlToProps(url, props) {
  return {
    facets: decode((d) => JSON.parse(d || '{}'), url.facets),
  };
}

const mapUrlChangeHandlersToProps = (props) => ({
  onChangeFacets: (value) => replaceInUrlQuery('facets', encode((e) => {
    return JSON.stringify(e || {})
  }, value))
});

export default addUrlProps({ mapUrlToProps, mapUrlChangeHandlersToProps })(connect(mapStateToProps, mapDispatchToProps)(AppliedFilters));
