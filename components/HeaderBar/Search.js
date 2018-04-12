import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import styles from './header.styl';
import { actionCreaters } from '../../store/search';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.submitQuery = this.submitQuery.bind(this);
    this.onChangeSearchInput = this.onChangeSearchInput.bind(this)
    debugger;
  }

  submitQuery() {
    this.props.getSearchResultsFromQuery({
      query: this.state.query
    });
  }

  onChangeSearchInput(e) {
    this.setState({
      query: e.target.value
    });
  }


  render() {
    return (
      <div className={styles['search-wrapper']}>
        <input
          className={styles['search-input']}
          // contentEditable
          placeholder="Search your fav item..."
          onChange={this.onChangeSearchInput}
          value={this.state.query}
        />
        {/* <button className={styles['search-btn']} onClick={this.submitQuery}>Search</button> */}
        <button className={styles['search-btn']} onClick={this.submitQuery}>Search</button>
      </div>
    )
  }
}

  
const mapStateToProps = (store) => ({
    // get query from somewhere.
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSearchResultsFromQuery: actionCreaters.getSearchResultsFromQuery,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Search);
