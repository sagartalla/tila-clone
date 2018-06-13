import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectors, actionCreators } from '../../../../store/order';

class ChooseVariant extends Component {
  selectVariant() {
    debugger;
  }

  componentDidMount() {
    const { orderIssue, getExchangeVariants } = this.props;
    const { selectedItem } = orderIssue;
    getExchangeVariants({
      orderItemId: selectedItem.id
    })
  }

  render() {
    const { variants } = this.props;
    return (
      <div>
        <div>Select Variant to Exchange</div>
        {
          <select onChange={this.selectVariant}>
            <option>Select Variant</option>
            {
              variants.map((variant) => <option value={variant}>{variant}</option>)
            }
          </select>
        }
      </div>
    );
  }
}

const mapStateToProps = (store) => {
	return ({
    variants: selectors.getVariants(store),
    orderIssue: selectors.getOrderIssue(store),
  })
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
      getExchangeVariants: actionCreators.getExchangeVariants
    },
		dispatch,
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseVariant);
