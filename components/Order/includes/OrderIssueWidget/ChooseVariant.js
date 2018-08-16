import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { selectors, actionCreators } from '../../../../store/order';
import {languageDefinations} from '../../../../utils/lang'

const {ORDER_PAGE}=languageDefinations()

class ChooseVariant extends Component {
  constructor(props) {
    super(props)
    this.selectVariant = this.selectVariant.bind(this);
  }

  selectVariant(e) {
    const variantAttrKey = e.target.id;
    const variantAttrValue = e.target.value;
    const { exchangeOptions: computedExchangeOptions } = this.props;
    if(variantAttrValue  !== '') {
      this.props.setVariantOption({
        variantAttrKey,
        variantAttrValue,
        computedExchangeOptions,
      });
    }
  }

  componentDidMount() {
    const { orderIssue, getExchangeVariants } = this.props;
    const { selectedItem } = orderIssue;
    getExchangeVariants({
      orderItemId: selectedItem.id
    });
  }

  render() {
    const { exchangeOptions } = this.props;
    const { listingDetails, variantDetails } = exchangeOptions;
    return (
      <div>
        <div>{ORDER_PAGE.SELECT_TYPE_EXCHANGE}</div>
        {
          _.map(variantDetails, (value, key) => (
            <div>
              <label for={key}>{value.name}</label>
              <select id={key} key={key} onChange={this.selectVariant}>
                <option value={''}>{ORDER_PAGE.SELECT_VARIANT}</option>
                {
                  value.attrValues.map((value, index) => <option key={value} value={value}>{value}</option>)
                }
              </select>
            </div>
          ))
        }
      </div>
    );
    return null;
  }
}

ChooseVariant.propTypes = {
  orderIssue: PropTypes.object.isRequired,
  getExchangeVariants: PropTypes.func.isRequired,
  variants: PropTypes.array.isRequired,
}

const mapStateToProps = (store) => {
	return ({
    exchangeOptions: selectors.getExchangeOptions(store),
    orderIssue: selectors.getOrderIssue(store),
  })
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
      getExchangeVariants: actionCreators.getExchangeVariants,
      setVariantOption: actionCreators.setVariantOption
    },
		dispatch,
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseVariant);
