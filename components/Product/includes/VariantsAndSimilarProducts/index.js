import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import Cookies from 'universal-cookie';

import { selectors, actionCreators } from '../../../../store/product';
import Variant from './Variant';
import SimilarProducts from './SimilarProducts';
import { Router } from '../../../../routes';
import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Product/product');

const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

class VariantsAndSimilarProducts extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedVariantData: {
        ...props.SelectedVariantData
      },
      selectedProductData: {}
    }
    this.onSelectVariant = this.onSelectVariant.bind(this);
    this.onSelectProduct = this.onSelectProduct.bind(this);
  }

  onSelectVariant(e) {
    const [key, val] = [e.target.id, e.target.value];
    this.setState({
      selectedVariantData: {
        ...this.state.selectedVariantData,
        [key]: val,
      }
    }, () => {
      const { selectedVariantData } = this.state;
      const { itemType, catalogId, variants } = this.props.VariantsAndSimilarProducts;
      const variantId = this.props.getSelectedVariantId({
        selectedVariantData: this.state.selectedVariantData,
        map: variants.map,
        lastSelectionAttribute: key
      });
      this.props.setSelectedVariant({selectedVariantData, itemType, catalogId, variantId});
    });
  }

  onSelectProduct(e) {
    const [key, val] = [e.target.id, e.target.value];
    this.setState({
      selectedProductData: {
        ...this.state.selectedProductData,
        [key]: val,
      }
    }, () => {
      const productId = this.props.VariantsAndSimilarProducts.productId;
      const pid = this.props.getSelectedPropductId({
        selectedProductData: this.state.selectedProductData,
        map: this.props.VariantsAndSimilarProducts.similarProducts.map,
        lastSelectionAttribute: key
      });
      if(!pid){
        alert('product not available!');
        return;
      }
      let newQuery = window.location.search;
      newQuery = newQuery.replace(productId, pid)
      Router.pushRoute(`/${country}/${language}/product${newQuery}`);
    });
  }

  render() {
    const { VariantsAndSimilarProducts } = this.props;
    const { variants, itemType, similarProducts } = VariantsAndSimilarProducts;
    const { display: variantsDisplay } = variants;
    const { display: similarProductsDisplay } = similarProducts;
    return (
      <div className={`${styles['flex-center']} ${styles['border-b']} ${styles['flex-wrp']}`}>
        {
          _.map(variantsDisplay, (variantAttVal, variantAttKey) => {
            return <Variant onSelectVariant={this.onSelectVariant} key={variantAttVal.displayName} {...variantAttVal} id={variantAttKey} />;
          })
        }
        {
          _.map(similarProductsDisplay, (variantAttVal, variantAttKey) => {
            return <SimilarProducts onSelectProduct={this.onSelectProduct} key={variantAttVal.displayName} {...variantAttVal} id={variantAttKey} />
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  getSelectedVariantId: selectors.getSelectedVariantId,
  VariantsAndSimilarProducts: selectors.getVariantsAndSimilarProducts(store),
  getSelectedPropductId: selectors.getSelectedPropductId,
  SelectedVariantData: selectors.getSelectedVariantData(store),
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { setSelectedVariant: actionCreators.setSelectedVariant },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(VariantsAndSimilarProducts);
