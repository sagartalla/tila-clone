import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { decode, encode, addUrlProps, replaceInUrlQuery } from 'react-url-query';

import { actionCreators, selectors } from '../../../../store/search';

import { languageDefinations } from '../../../../utils/lang';
const { SEARCH_PAGE } = languageDefinations();

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Search/search');

class AppliedFilters extends Component {
  constructor(props) {
    super(props);
    this.removeFilter = this.removeFilter.bind(this);
    this.submitQuery = this.submitQuery.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }

  removeFilter(e) {
    const target = e.currentTarget;
    const facetName = target.getAttribute('data-parentKey');
    const name = target.getAttribute('data-name');
    const value = target.getAttribute('data-key');
    const facets = JSON.parse(decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent('facets').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1")) || '{}');
    const params = facets || {};
    params[facetName] = params[facetName] || [];
    params[facetName].splice(_.findIndex(params[facetName], { name: name }), 1);
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

  render() {
    const { appliedFilters } = this.props;
    return (
      appliedFilters.length !== 0
        ?
        <div className={`${styles['applied-tags']} ${styles['flex-center']} ${styles['pb-20']}`}>
          <span>{SEARCH_PAGE.APPLIED_FILTERS_TAGS} : </span>
          <div className={`${styles.flex} ${styles['flex-wrp']} ${styles.width70}`}>
            {
              appliedFilters.map((af) => (
                <div key={af.key} className={`${styles['flex-center']} ${styles['applied-tags-inn']} ${styles['ml-10']}`}>
                  <span className={`${styles['title']} ${styles['fs-12']}`}>{af.displayName}</span>
                  <span onClick={this.removeFilter} data-name={af.displayName} data-parentKey={af.parentKey} data-key={af.key} className={`${styles['close-part']}`}>x</span>
                </div>
              ))
            }
          </div>
          <a href="#" onClick={this.clearAll} className={`${styles['fs-12']} ${styles['pl-20']}`}>{SEARCH_PAGE.CLEAR_ALL}</a>
        </div>
        :
        null
    );
  }
}

const mapStateToProps = (store) => ({
  appliedFilters: selectors.getAppliedFitlers(store),
  getFacetfilters: selectors.getFacetfilters(store)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getSearchResults: actionCreators.getSearchResults
    },
    dispatch,
  );
}

function mapUrlToProps(url, props) {
  return {
    facets: decode((d) => {
      return JSON.parse(d || '{}')
    }, url.facets),
  };
}

const mapUrlChangeHandlersToProps = (props) => {
  return {
    onChangeFacets: (value) => replaceInUrlQuery('facets', encode((e) => {
      return JSON.stringify(e || {})
    }, value))
  };
}

export default addUrlProps({ mapUrlToProps, mapUrlChangeHandlersToProps })(connect(mapStateToProps, mapDispatchToProps)(AppliedFilters))
