import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';
import styles from './header.styl';
import { actionCreaters } from '../../store/search';
import { selectors } from '../../store/search';

const urlPropsQueryConfig = {
  searchText: { type: UrlQueryParamTypes.string, queryParam: 'search' }
};

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: props.query
    };
    this.submitQuery = this.submitQuery.bind(this);
    this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
  }

  submitQuery(e) {
    e.preventDefault();
    const flushFilters = true;
    this.props.onChangeSearchText(this.state.query);
    this.props.getSearchResults({
      query: this.state.query
    }, null, flushFilters);
  }

  onChangeSearchInput(e) {
    this.setState({
      query: e.target.value
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
          <button type="submit" className={styles['search-btn']}>Search</button>
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
    query: selectors.getQuery(store)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSearchResults: actionCreaters.getSearchResults,
    },
    dispatch,
  );

export default addUrlProps({ urlPropsQueryConfig })(connect(mapStateToProps, mapDispatchToProps)(Search));
// export default connect(mapStateToProps, mapDispatchToProps)(Search);
