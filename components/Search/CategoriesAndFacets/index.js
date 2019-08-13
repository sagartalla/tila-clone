import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookie from 'universal-cookie';
import _ from 'lodash';
import { Router } from '../../../routes';
import { decode, encode, addUrlProps, replaceInUrlQuery } from 'react-url-query';
import { PanelGroup, Panel } from 'react-bootstrap';
import { actionCreators, selectors } from '../../../store/search';
import CheckboxFacet from './CheckboxFacet';
import ExcludeOOS from './ExcludeOOS';
import LinkFacet from './LinkFacet';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../search_en.styl';
import styles_ar from '../search_ar.styl';

const cookies = new Cookie();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

class CategoriesAndFacets extends Component {
  constructor(props) {
    super(props);
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.submitQuery = _.debounce(this.submitQuery.bind(this), 300);
  }

  onChangeHandle(facetName, facetType) {
    debugger;
    const { search, facets } = this.props;
    const curryHandler = (value, e) => {
      // Router.pushRoute(`/${language}/srp?facets.${facetName}=${value.name}&search=${search.q}&${Object.entries(this.props.optionalParams).map(([key, val]) => `${key}=${val}`).join('&')}`);
      // const params = JSON.parse(decodeURIComponent(window.location.search.replace(new RegExp('^(?:.*[&\\?]' + encodeURIComponent('facets').replace(/[\.\+\*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1')) || '{}');
      const params = facets;
      // const params = `/${language}/srp?facets`;
      params[facetName] = params[facetName] || [];
      digitalData.filter.leftnavfilters = `${facetName}:${value.name}`;
      // if (facetType === 'PERCENTILE') {
      //   params[facetName] = [value];
      // } else {
      if (e.target.checked) {
        params[facetName].push(value.name);
      } else {
        params[facetName] = params[facetName].filter((item) => item !== value.name)
        if (!params[facetName].length) { delete params[facetName]; }
      }
      // }
      this.props.onChangeFacets(params);
      this.submitQuery(params);
    };
    return curryHandler;
  }

  submitQuery(params) {
    this.props.getSearchResults(this.props.getFacetfilters(params));
  }

  render() {
    const { filters, facets, search, selectedVal } = this.props;
    return (
      <PanelGroup accordion id="categories-panel" className={`${styles['relative']}`}>
        {filters.category.map((filter, index) => (
          filter.children.length ? <Panel eventKey={`${`${index}l`}`} key={filter.id}><LinkFacet filter={filter} /></Panel> : null
        ))}
        {
        filters.facets.map((filter, index) => {
          // if (filter.type === 'PERCENTILE') {
          //   let selectedFilters = facets[filter.attributeName];
          //   return filter.children.length ? <RangeFitler filter={filter} key={filter.id} onChangeHandle={this.onChangeHandle(filter.attributeName, filter.type)} selectedFilters={selectedFilters || []}/> : null;
          // }
          const selectedFilters = facets[filter.attributeName];
          return filter.children.length ?
            <CheckboxFacet
              attributeName={filter.attributeName}
              facets={facets}
              filter={filter}
              search={search}
              onChangeHandle={this.onChangeHandle(filter.attributeName, filter.type)}
              selectedFilters={selectedFilters}
              index={index}
              key={filter.id}
              showBrandsModal={this.props.showBrandsModal}
              selectedCheckbox={this.props.selectedCheckbox}
              selectedVal={selectedVal}
              showPopup={this.props.showPopup}
              clearSelectedItem={this.props.clearSelectedItem}
            />
            : null;
        })
      }
        <ExcludeOOS />
      </PanelGroup>
    );
  }
}

const mapStateToProps = store => ({
  filters: selectors.getSearchFilters(store),
  getFacetfilters: selectors.getFacetfilters(store),
  optionalParams: selectors.optionParams(store),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSearchResults: actionCreators.getSearchResults,
    },
    dispatch,
  );

function mapUrlToProps(url) {
  return {
    facets: decode((d) => JSON.parse(d || '{}'), url.facets),
  };
}

const mapUrlChangeHandlersToProps = () => ({
  onChangeFacets: (value) => replaceInUrlQuery('facets', encode((e) => {
    return JSON.stringify(e || {})
  }, value))
});

export default addUrlProps({ mapUrlToProps, mapUrlChangeHandlersToProps })(connect(mapStateToProps, mapDispatchToProps)(CategoriesAndFacets));
