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

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../../product_en.styl';
import styles_ar from '../../product_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';
const shippingData = cookies.get('shippingInfo');
const { city: shippingCity, country: shippingCountry } = shippingData || {};

class VariantsAndSimilarProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVariantData: {
        ...props.SelectedVariantData,
      },
      selectedProductData: {},
    };
    this.onSelectVariant = this.onSelectVariant.bind(this);
    this.onSelectProduct = this.onSelectProduct.bind(this);
  }

  onSelectVariant(e) {
    const [key, val] = [e.target.id, e.target.value];
    this.setState({
      selectedVariantData: {
        ...this.state.selectedVariantData,
        [key]: val,
      },
    }, () => {
      const { selectedVariantData } = this.state;
      const { itemType, catalogId, variants } = this.props.variantsAndSimilarProducts;
      const variantId = this.props.getSelectedVariantId({
        selectedVariantData: this.state.selectedVariantData,
        map: variants.map,
        lastSelectionAttribute: key,
      });
      this.props.setSelectedVariant({
        selectedVariantData, itemType, catalogId, variantId,
      });
      this.props.setVariantId(variantId);
    });
  }

  onSelectProduct(e) {
    const [key, val] = [e.target.id, e.target.value];

    this.setState({
      selectedProductData: {
        ...this.state.selectedProductData,
        [key]: val,
      },
    }, () => {
      const { selectedProductData } = this.state;
      const { isSearchPreview, variantId, variantsAndSimilarProducts, listing_id } = this.props
      const productId = variantsAndSimilarProducts.productId;
      const pid = this.props.getSelectedPropductId({
        selectedProductData: this.state.selectedProductData,
        map: variantsAndSimilarProducts.similarProducts.map,
        lastSelectionAttribute: key,
      });
      if (!pid) {
        toast.warn('product not available!');
        return;
      }
      const options = {
        city_code: shippingCity,
        country_code: country || 'SAU',
        flags: {
          catalog_details: true,
          category_tree_bread_crumb: true,
          category_tree_finance: true,
          include_offers: true,
          include_policies: true,
          include_related_products: true,
          shipping: true,
        },
        language,
        product_ids: [
          pid,
        ],
        size: 'LARGE',
      };
      let newQuery = window.location.href.split("pdp/")[1];
      newQuery = newQuery.replace(productId, pid)
      this.props.setSelectedProductData({selectedProductData});
      if(isSearchPreview) {
          this.props.getProduct(options);
          this.props.setProductId(pid);
          window.open(`/${language}/pdp/${name ? name.split(' ').join('-').toLowerCase(): ''}/c/${VariantsAndSimilarProducts.catalogId}/p/${pid}/l/${listing_id}/v/${variantId ? `${variantId}` : ''}`)
      } else {
        Router.pushRoute(`/${language}/pdp/${newQuery}`);
      }
    });
  }

  render() {
    const { variantsAndSimilarProducts, isSearchPreview } = this.props;
    const { variants, itemType, similarProducts } = variantsAndSimilarProducts;
    const { display: variantsDisplay } = variants;
    const { display: similarProductsDisplay, order: similarProductsAttrOrder } = similarProducts;
    return (
      <div className={`${styles['flex-center']} ${styles['border-b']} ${styles['flex-wrp']}`}>
        {
          _.map(similarProductsAttrOrder, (variantAttKey) => {
              const variantAttVal = similarProductsDisplay[variantAttKey];
              return variantAttVal.values.length ?
                (<SimilarProducts
                  onSelectProduct={this.onSelectProduct}
                  key={variantAttVal.displayName}
                  {...variantAttVal}
                  id={variantAttKey}
                />)
                :
                null
            }
          )
        }
        {
          _.map(variantsDisplay, (variantAttVal, variantAttKey) => (<Variant
            onSelectVariant={this.onSelectVariant}
            key={variantAttVal.displayName}
            {...variantAttVal}
            id={variantAttKey}
          />))
        }
      </div>
    );
  }
}

const mapStateToProps = (store, ownProps) => ({
  getSelectedVariantId: selectors.getSelectedVariantId,
  variantsAndSimilarProducts: selectors.getVariantsAndSimilarProducts(ownProps.variantId, ownProps.productId)(store),
  getSelectedPropductId: selectors.getSelectedPropductId(store),
  SelectedVariantData: selectors.getSelectedVariantData(store),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setSelectedVariant: actionCreators.setSelectedVariant,
    setSelectedProductData: actionCreators.setSelectedProductData,
    getProduct: actionCreators.getProduct,
    setProductId: actionCreators.setProductId,
    setVariantId: actionCreators.setVariantId,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(VariantsAndSimilarProducts);
