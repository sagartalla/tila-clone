import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { decode, encode, addUrlProps, UrlQueryParamTypes, replaceInUrlQuery } from 'react-url-query';
import { actionCreaters, selectors } from '../../../store/search';

import CheckboxFacet from './CheckboxFacet';
import LinkFacet from './LinkFacet';

class CategoriesAndFacets extends Component {
  constructor(props) {
    super(props);
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.submitQuery = _.debounce(this.submitQuery.bind(this), 300);
  }

  submitQuery() {
    this.props.getSearchResults({ facetFilters: this.props.getFacetfilters(this.props.facets) });
  }

  onChangeHandle(facetName) {
    const curryHandler = (value, e) => {
      const params = this.props.facets || {};
      params[facetName] = params[facetName] || [];
      if(e.target.checked){
        params[facetName].push(value);
      } else {
        params[facetName].splice(params[facetName].indexOf(value), 1);
        if (!params[facetName].length) { delete params[facetName]; }
      }
      this.props.onChangeFacets(params);
      this.submitQuery();
    }
    return curryHandler;
  }

  render() {
    const { filters, facets } = this.props;
    return (<ul>
      {
        filters.category.map((filter) => {
          return <LinkFacet filter={filter} key={filter.id} />
        })
      }
      {
        filters.facets.map((filter) => {
          return <CheckboxFacet filter={filter} key={filter.id} onChangeHandle={this.onChangeHandle(filter.attributeName)} selectedFilters={facets[filter.attributeName] || []}/>
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
      getSearchResults: actionCreaters.getSearchResults
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


