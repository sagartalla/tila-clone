import React,{ Component } from 'react'
import { connect } from 'react-redux';
import { selectors } from '../../../store/product'
import lang from '../../../utils/language'
import { languageDefinations } from '../../../utils/lang'
import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './quickview_en.styl';
import styles_ar from './quickview_ar.styl';
import getProductComponent from '../../Product'
import SVGComponent from '../SVGComponet';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const { PDP_PAGE, PAYMENT_PAGE, SEARCH_PAGE } = languageDefinations()

class QuickView extends Component {
  constructor(props){
    super(props)
    this.renderProductPage = this.renderProductPage.bind(this)
    this.product = getProductComponent(false,null)
  }
  findVariantId(id) {
    const { isProductLoaded } = this.props;
    if(isProductLoaded.productDetails.variant_preferred_listings[id]){
      return true;
    }
    return false;
  }
  renderProductPage() {
    const {
      isProductLoaded,
      productVariantId,
      newVariantId,
      renderProductPage
    } = this.props;
    const { productDetails } = isProductLoaded;
    const { catalog_details, product_id } = productDetails.product_details
    const { catalog_id, item_type_name } = catalog_details
    let variantId = newVariantId ? (this.findVariantId(newVariantId) ? newVariantId : productVariantId) : productVariantId
    const options = {
      catalogId:catalog_id,
      itemType:item_type_name,
      productId:product_id,
      variantId
    }
    renderProductPage(options)
  }
  render() {
    const {
            isProductLoaded,
            getErrorMessage,
            prev,
            next,
            productVariantId,
            productId,
            onClose,renderProductPage, newproductId } = this.props

    if(!isProductLoaded.isProductLoaded) {
      return <div className={`${styles['mr-20']} ${styles['quick-view']}`}>{`${PAYMENT_PAGE.PLEASE_WAIT} ${PDP_PAGE.PRODUCT_DETAILS} ${PAYMENT_PAGE.LOADING}`}</div>
    }
    if(getErrorMessage) {
      return <div className={`${styles['mr-20']} ${styles['quick-view']}`}>{getErrorMessage}</div>
    }
    if(isProductLoaded.productDetails && (isProductLoaded.productDetails.product_id !== productId && isProductLoaded.productDetails.product_id !== newproductId)) {
      return <div className={`${styles['mr-20']} ${styles['quick-view']}`}>{`${PAYMENT_PAGE.PLEASE_WAIT} ${SEARCH_PAGE.SEARCH_RESULTS_FOR} ${SEARCH_PAGE.DATA}`}</div>
    }
    const Product = this.product

    return (
      <div className={`${styles['mr-20']} ${styles['quick-view']}`}>
        <div
          onClick={onClose}
          className={
            ` ${styles['absolute']}
              ${styles['close-styl']}
              ${styles['fs-20']}
              ${styles['pointer']}`}>
              X
        </div>
        <div
          className={
            `${styles['absolute']}
             ${styles['pointer']}
             ${styles['prev-styl']}
             ${styles['fs-20']}`
           }
          onClick={prev}>
          <SVGComponent src={'landing-home/c-left'} />
        </div>
        <div
          className={
            `${styles['absolute']}
             ${styles['pointer']}
             ${styles['next-styl']}
             ${styles['fs-20']}`
           }
          onClick={next}>
          <SVGComponent
            src={'landing-home/c-right'}
            clsName={`${styles['opacity-3']}`}
         />
        </div>
        <Product
          variantId={productVariantId}
          productId={productId}
          isSearchPreview={true}
        />
      <div
        className={
          `${styles['fullPage-btn']}
           ${styles['fs-18']}
           ${styles['fontW800']}
           ${styles['pointer']}`
         }
         onClick={this.renderProductPage}
        >
        VIEW AS A FULL PAGE
      </div>
    </div>
    )
  }
}
const mapStateToProps = store => {
  return {
    isProductLoaded:selectors.isProductLoaded(store),
    getErrorMessage:selectors.getErrorMessage(store),
    newproductId:selectors.getProductId(store),
    newVariantId:selectors.getVariantId(store),
  }
}

export default connect(mapStateToProps)(QuickView)
