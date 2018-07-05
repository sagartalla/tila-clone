import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { decode, encode, addUrlProps, replaceInUrlQuery } from 'react-url-query';
import { actionCreators, selectors } from '../../../store/search';

import CheckboxFacet from './CheckboxFacet';
import LinkFacet from './LinkFacet';
import RangeFitler from './RangeFacet';
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Search/search');

class CategoriesAndFacets extends Component {
  constructor(props) {
    super(props);
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.submitQuery = _.debounce(this.submitQuery.bind(this), 300);
  }

  onChangeHandle(facetName, facetType) {
    const curryHandler = (value, e) => {
      const params = this.props.facets || {};
      params[facetName] = params[facetName] || [];
      if (facetType === 'PERCENTILE') {
        params[facetName] = [value];
      } else {
        if (e.target.checked) {
          params[facetName].push(value);
        } else {
          params[facetName].splice(params[facetName].indexOf(value), 1);
          if (!params[facetName].length) { delete params[facetName]; }
        }  
      }
      this.props.onChangeFacets(params);
      this.submitQuery();
    }
    return curryHandler;
  }

  submitQuery() {
    this.props.getSearchResults({ facetFilters: this.props.getFacetfilters(this.props.facets) });
  }

  render() {
    const { filters, facets } = this.props;
    return (<ul className={`${styles['pl-0']} ${styles['mb-0']}`}>
      {
        filters.category.map((filter) => {
          return filter.children.length ? <LinkFacet filter={filter} key={filter.id} /> : null;
        })
      }
      {
        filters.facets.map((filter) => {
          if (filter.type === 'PERCENTILE') {
            let selectedFilters = facets[filter.attributeName];
            return filter.children.length ? <RangeFitler filter={filter} key={filter.id} onChangeHandle={this.onChangeHandle(filter.attributeName, filter.type)} selectedFilters={selectedFilters || []}/> : null;
          }
          let selectedFilters = facets[filter.attributeName];
          selectedFilters = selectedFilters ? selectedFilters.map((item) => item.name) : [];
          return filter.children.length ? <CheckboxFacet filter={filter} key={filter.id} onChangeHandle={this.onChangeHandle(filter.attributeName, filter.type)} selectedFilters={selectedFilters}/> : null;
        })
      }
    </ul>);
  }
}

const mapStateToProps = (store) => ({
  filters: selectors.getSearchFilters(store),
  getFacetfilters: selectors.getFacetfilters(store),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSearchResults: actionCreators.getSearchResults
    },
    dispatch,
  );

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

export default addUrlProps({ mapUrlToProps, mapUrlChangeHandlersToProps })(connect(mapStateToProps, mapDispatchToProps)(CategoriesAndFacets));


