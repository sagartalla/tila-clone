import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { decode, encode, addUrlProps, replaceInUrlQuery } from 'react-url-query';
import { PanelGroup, Panel } from 'react-bootstrap';
import { actionCreators, selectors } from '../../../store/search';
import CheckboxFacet from './CheckboxFacet';
import ExcludeOOS from './ExcludeOOS';
import LinkFacet from './LinkFacet';
import RangeFitler from './RangeFacet';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../search_en.styl';
import styles_ar from '../search_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

class CategoriesAndFacets extends Component {
  constructor(props) {
    super(props);
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.submitQuery = _.debounce(this.submitQuery.bind(this), 300);
  }

  onChangeHandle(facetName, facetType) {
    const curryHandler = (value, e) => {
      const params = JSON.parse(decodeURIComponent(window.location.search.replace(new RegExp('^(?:.*[&\\?]' + encodeURIComponent('facets').replace(/[\.\+\*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1')) || '{}');
      params[facetName] = params[facetName] || [];
      digitalData.filter.leftnavfilters = `${facetName}:${value.name}`;
      // if (facetType === 'PERCENTILE') {
      //   params[facetName] = [value];
      // } else {
      if (e.target.checked) {
        params[facetName].push(value);
      } else {
        params[facetName].splice(params[facetName].indexOf(value), 1);
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
    const { filters, facets } = this.props;
    console.log(filters, facets);
    return (
      <PanelGroup accordion>
        {filters.category.map((filter, index) => (
          filter.children.length ? <Panel eventKey={`${`${index}l`}`} key={filter.id}><LinkFacet filter={filter} /></Panel> : null
        ))}
        {
        filters.facets.map((filter, index) => {
          // if (filter.type === 'PERCENTILE') {
          //   let selectedFilters = facets[filter.attributeName];
          //   return filter.children.length ? <RangeFitler filter={filter} key={filter.id} onChangeHandle={this.onChangeHandle(filter.attributeName, filter.type)} selectedFilters={selectedFilters || []}/> : null;
          // }
          let selectedFilters = facets[filter.attributeName];
          selectedFilters = selectedFilters ? selectedFilters.map(item => item.name) : [];
          return filter.children.length ?
            <CheckboxFacet
              attributeName={filter.attributeName}
              facets={facets}
              filter={filter}
              onChangeHandle={this.onChangeHandle(filter.attributeName, filter.type)}
              selectedFilters={selectedFilters}
              index={index}
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
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSearchResults: actionCreators.getSearchResults,
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

export default addUrlProps({ mapUrlToProps, mapUrlChangeHandlersToProps })(connect(mapStateToProps, mapDispatchToProps)(CategoriesAndFacets));
