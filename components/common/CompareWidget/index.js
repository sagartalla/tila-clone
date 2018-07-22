import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators, selectors } from '../../../store/compare';

import { languageDefinations } from '../../../utils/lang';
const { COMPARE } = languageDefinations();

class CompareWidget extends Component {
  render() {
    (
      <div>
        <div>{COMPARE.COMPARE} {compareCount}</div>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  compareCount: selectors.getCompareCount(store),
});

export default connect(mapStateToProps, null)(CompareWidget);
