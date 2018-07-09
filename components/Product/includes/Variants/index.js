import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectors } from '../../../../store/product';
import Variant from './Variant';

class Variants extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.onSelectVariant = this.onSelectVariant.bind(this);
  }

  onSelectVariant() {
    debugger;
  }

  render() {
    const { variantsData } = this.props;
    const { variantsForDisplay } = variantsData;
    return (
      <div>
        {
          variantsForDisplay.map((variant) => <Variant onSelectVariant={this.onSelectVariant} key={variant.title} {...variant} />)
        }
      </div>
    );
  }
}

Variants.propTypes = {
  variantsData: PropTypes.object.isRequired,
}

const mapStateToProps = (store) => ({
  variantsData: selectors.getVariants(store)
});


export default connect(mapStateToProps, null)(Variants);
