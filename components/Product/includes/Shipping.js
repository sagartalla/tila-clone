import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import GeoWidget from '../../common/GeoWidget';
import { languageDefinations } from '../../../utils/lang';
import { actionCreators, selectors } from '../../../store/product';

const { PDP_PAGE } = languageDefinations();

class Shipping extends Component {
  render(){
    const { shipping_fees, shipping_days, shippable, acceptsReturns, maxDaysToReturn } = this.props;
    return (
      <div>
        <div>
          <div>
            <GeoWidget />
          </div>
          {
            shippable
            ?
            <div>
              <div>
                <span>Free deliver in {shipping_days} Days</span>
              </div>
              <div>
                <span>FREE Delivery by {moment().add(3, 'days').format("ddd, hA")}</span>
              </div>
              <div>
                <div>
                  {
                    acceptsReturns
                    ?
                      <span>{maxDaysToReturn} Day easy return</span>
                    :
                    'Non returnable'
                  }
                </div>
                <div>
                  <span>1 year warrenty</span>
                </div>
              </div>
            </div>
            :
            <p>Not shipping to your city.</p>

          }
        </div>
      </div>
    )
  }
}

Shipping.PropTypes = {

}

const mapStateToProps = (store) => {
  return ({});
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {},
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Shipping);
