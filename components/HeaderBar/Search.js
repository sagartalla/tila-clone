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
    this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
  }

  submitQuery(e) {
    e.preventDefault();
    this.props.getSearchResults({
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

  
const mapStateToProps = (store) => ({
    // get query from somewhere.
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSearchResults: actionCreaters.getSearchResults,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Search);
