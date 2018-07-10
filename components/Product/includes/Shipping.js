import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GeoWidget from '../../common/GeoWidget';
import { languageDefinations } from '../../../utils/lang';

const { PDP_PAGE } = languageDefinations();

class Shipping extends Component {
  render(){
    return (
      <div>
        <div>
          <div>
            <GeoWidget />
          </div>
          <div>
            <span>Free deliver in 3 Days</span>
          </div>
          <div>
            <span>FREE Delivery by Thursday 9pm Order within 2hrs 16mins</span>
          </div>
          <div>
            <div>
              <span>30 Day easy return</span>
            </div>
            <div>
              <span>1 year warrenty</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Shipping;
