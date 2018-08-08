import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectors } from '../../../../store/product';
import Variant from './Variant';
import { Router } from '../../../../routes';
import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Product/product');

class Variants extends Component {
  constructor(props){
    super(props);
    this.onSelectVariant = this.onSelectVariant.bind(this);
  }

  componentDidMount() {
    const { variantsData } = this.props;
    const { variantsForDisplay } = variantsData;
    const selectedVariantData = variantsForDisplay.reduce((acc, opt) => ({ ...acc, [opt.id]: opt.options[0] }), {})
    this.setState({
      selectedVariantData,
    });
  }

  onSelectVariant(e) {
    const key = e.target.getAttribute('data-key');
    const value = e.target.value;
    const { selectedVariantData } = this.state;
    const { getSelectedVariantId, variantsData } = this.props;
    this.setState({
      selectedVariantData: {
        ...selectedVariantData,
        [key]: value,
      }
    }, () => {
      const { selectedVariantData } = this.state;
      const { pId, vId } = this.props.getSelectedVariantId({
        variants: variantsData.variants,
        selectedVariantData,
      });
      Router.pushRoute(`/product?productId=${pId}&catalogId=CMOBU8FKGUCHLBAH2V&itemType=mobile`);
    });
  }

  render() {
    const { variantsData } = this.props;
    const { variantsForDisplay } = variantsData;
    return (
      <div className={`${styles['flex-center']} ${styles['border-b']}`}>
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
  variantsData: selectors.getVariants(store),
  getSelectedVariantId: selectors.getSelectedVariantId(store)
});


export default connect(mapStateToProps, null)(Variants);
