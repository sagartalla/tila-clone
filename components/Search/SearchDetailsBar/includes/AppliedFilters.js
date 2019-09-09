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

  render() {
    const { appliedFilters } = this.props;
    return (
      appliedFilters.length !== 0
        ?
        <div className={`${styles['applied-tags']} ${styles['flex-center']}`}>
          <span>{SEARCH_PAGE.APPLIED_FILTERS_TAGS} : </span>
          <div className={`${styles.flex} ${styles['flex-wrp']} ${styles['applied-tags-i']}`}>
            {
              appliedFilters.map(af => (
                <div key={af.key} className={`${styles['flex-center']} ${styles['applied-tags-inn']} ${styles['ml-10']}`}>
                  <div className={`${styles['filter-tooltp']} ${styles.absolute} ${styles['fs-12']}`}>{af.attributeDisplayName}</div>
                  <span className={`${styles.title} ${styles['fs-12']}`}>{af.displayName}</span>
                  <span onClick={this.removeFilter} data-name={af.displayName} data-parentKey={af.parentKey} data-key={af.key} className={`${styles['close-part']}`}>x</span>
                </div>
              ))
            }
          </div>
          {appliedFilters.length > 13 &&
          <PanelGroup accordion id="product-details">
              <Panel eventKey="1">
                <Panel.Heading>
                  <Panel.Title toggle className={styles['key-feature-inn']}>
                     ffhgfhgf
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  <p className={`${styles['fs-12']} ${styles.fontW300} ${styles['sub-decryption']}`}>asasasas</p>
                </Panel.Body>
              </Panel>
            </PanelGroup>}
          <a href="#" onClick={this.clearAll} className={`${styles['fs-12']} ${styles['pl-20']}`}>{SEARCH_PAGE.CLEAR_ALL}</a>
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
