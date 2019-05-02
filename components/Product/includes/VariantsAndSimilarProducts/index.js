import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';

import { selectors, actionCreators } from '../../../../store/product';
import Variant from './Variant';
import SimilarProducts from './SimilarProducts';
import { Router } from '../../../../routes';

import lang from '../../../../utils/language';

import styles_en from '../../product_en.styl';
import styles_ar from '../../product_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;


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
      const { selectedProductData } = this.state;
      const productId = this.props.VariantsAndSimilarProducts.productId;
      const pid = this.props.getSelectedPropductId({
        selectedProductData: this.state.selectedProductData,
        map: this.props.VariantsAndSimilarProducts.similarProducts.map,
        lastSelectionAttribute: key
      });
      if (!pid) {
        toast.warn('product not available!');
        return;
      }
      let newQuery = window.location.search;
      newQuery = newQuery.replace(productId, pid)
      this.props.setSelectedProductData({selectedProductData});
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
            return <Variant
                      onSelectVariant={this.onSelectVariant}
                      key={variantAttVal.displayName}
                      {...variantAttVal} id={variantAttKey}
                    />;
          })
        }
        {
          _.map(similarProductsDisplay, (variantAttVal, variantAttKey) => {
            return <SimilarProducts
                      onSelectProduct={this.onSelectProduct}
                      key={variantAttVal.displayName}
                      {...variantAttVal}
                      id={variantAttKey}
                    />
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (store,ownProps) => ({
  getSelectedVariantId: selectors.getSelectedVariantId,
  VariantsAndSimilarProducts: selectors.getVariantsAndSimilarProducts(ownProps.variantId,ownProps.productId)(store),
  getSelectedPropductId: selectors.getSelectedPropductId(store),
  SelectedVariantData: selectors.getSelectedVariantData(store),
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setSelectedVariant: actionCreators.setSelectedVariant,
      setSelectedProductData: actionCreators.setSelectedProductData
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(VariantsAndSimilarProducts);
