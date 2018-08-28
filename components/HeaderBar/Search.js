import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addUrlProps, UrlQueryParamTypes, pushInUrlQuery } from 'react-url-query';
import { actionCreators, selectors } from '../../store/search';
import { Router } from '../../routes';
import SVGComponent from '../common/SVGComponet';

import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/HeaderBar/header');

const urlPropsQueryConfig = {
  searchText: { type: UrlQueryParamTypes.string, queryParam: 'search', }
};

class Search extends Component {

  constructor(props) {
    super(props);
    const { query, isCategoryTree, choosenCategoryName } = props;
    this.state = {
      query: query ? query : isCategoryTree ? choosenCategoryName : ''
    };
    this.submitQuery = this.submitQuery.bind(this);
    this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
  }

  submitQuery(e) {
    e.preventDefault();
    const flushFilters = true;
    Router.pushRoute(`/srp?search=${this.state.query}&${Object.entries(this.props.optionalParams).map(([key, val]) => `${key}=${val}`).join('&')}`);
  }

  onChangeSearchInput(e) {
    this.setState({
      query: e.target.value,
      searchInput: true
    });
  }

  componentWillReceiveProps(nextProps) {
    const { isCategoryTree, choosenCategoryName } = nextProps;
    const { query, searchInput } = this.state;
    this.setState({
      query: searchInput ? query : isCategoryTree ? choosenCategoryName : query,
      searchInput: false
    });
  }

  render() {
    return (
      <div className={styles['search-wrapper']}>
        <form onSubmit={this.submitQuery}>
          <input
            className={styles['search-input']}
            placeholder="Search your fav item..."
            onChange={this.onChangeSearchInput}
            value={this.state.query}
           />
          <button type="submit" className={styles['search-btn']}><SVGComponent clsName={`${styles['searching-icon']}`} src="icons/search/search-white-icon" /></button>
        </form>
      </div>
    )
  }
}

Search.propTypes = {
  getSearchResults: PropTypes.func,
  searchText: PropTypes.string,
  onChangeSearchText: PropTypes.func,
}


const mapStateToProps = (store) => ({
    query: selectors.getQuery(store),
    isCategoryTree: selectors.getIsCategoryTree(store),
    choosenCategoryName: selectors.getChoosenCategoryName(store),
    optionalParams: selectors.optionParams(store)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSearchResults: actionCreators.getSearchResults,
    },
    dispatch,
  );

export default addUrlProps({ urlPropsQueryConfig })(connect(mapStateToProps, mapDispatchToProps)(Search));
