import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DeliverToWidget from './DeliverToWidget';

import { actionCreators, selectors } from '../../../store/search';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Search/search');

class SearchDetailsBar extends Component {
  render() {
    const { results } = this.props;
    return (
      <div>
        <div className={styles['meta-info']}>{results.totalCount} no of items found</div>
        <div>
          <DeliverToWidget />
        </div>
        <div>
          <label>Sort By:</label>
          <select>
            <option>best match</option>
            <option>price low to high</option>
            <option>price high to low</option>
          </select>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (store) => ({
  results: selectors.getSearchResutls(store),
  ui: selectors.getUIState(store),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSearchResults: actionCreators.getSearchResults,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(SearchDetailsBar);
