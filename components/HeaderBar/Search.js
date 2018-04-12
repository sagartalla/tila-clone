import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import styles from './header.styl';


class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.submitQuery = this.submitQuery.bind(this);
    this.onChangeSearchInput = this.onChangeSearchInput.bind(this)
  }

  submitQuery() {
    
  }

  onChangeSearchInput(e) {
    this.setState({
      query: e.target.value
    });
  }

  render() {
    return (
      <div className={styles['search-wrapper']}>
        <div
          className={styles['search-input']}
          contentEditable
          placeholder="Search your fav item..."
          onChange={this.onChangeSearchInput}
          value={this.state.query}
        ></div>
        <span className={styles['search-btn']} onClick={this.submitQuery}>Search</span>
      </div>
    )
  }
}

  
const mapStateToProps = (store) => ({
    // get query from somewhere.
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {},
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Search);
