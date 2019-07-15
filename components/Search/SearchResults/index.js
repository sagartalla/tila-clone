import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfiniteScroll from 'react-infinite-scroller';
import _ from 'lodash'
import Cookie from 'universal-cookie';

import Product from "./Product";
import { languageDefinations } from '../../../utils/lang';
import SVGComponent from '../../common/SVGComponet';
import { actionCreators, selectors } from '../../../store/search';
import { actionCreators as cartActionCreators, selectors as cartSelector } from '../../../store/cart';
import { actionCreators as wishlistActionCreators } from '../../../store/cam/wishlist';
import { actionCreators as productActionCreators } from '../../../store/product'
import { selectors as authSelectors } from '../../../store/auth'
import { Router } from '../../../routes';

import lang from '../../../utils/language';
import QuickViewBase from '../../common/QuickViewComponent';
import QuickViewContent from '../../common/QuickViewComponent/quickView';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../search_en.styl';
import styles_ar from '../search_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const cookies = new Cookie();
const { SEARCH_PAGE } = languageDefinations();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';
const shippingData = cookies.get('shippingInfo')
const { city: shippingCity, country: shippingCountry } = shippingData || {};

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productID:[],
      renderQuickView:false
    };
    this.loadMore = this.loadMore.bind(this);
    this.buyNow = this.buyNow.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.selectedProduct = this.selectedProduct.bind(this)
    this.fetchResults = this.fetchResults.bind(this)
    this.renderQuickView = this.renderQuickView.bind(this)
    this.renderNext = this.renderNext.bind(this)
    this.renderPrev = this.renderPrev.bind(this)
    this.onClose = this.onClose.bind(this)
    this.renderProductPage = this.renderProductPage.bind(this)
    this.productIndex = {};
    this.variantId={};
    this.rowNumber = null;
    this.itemNum = null;
  }

  componentDidMount() {
    this.props.resetAddtoCart();
    //console.log('searchlogin',this.props.isLoggedIn);
    if(this.props.isLoggedIn) {
      this.props.getWishlist();
    }

  }
  onClose() {
    this.rowNumber = null
    this.itemNum = null
    this.setState({
      renderQuickView:false
    })
  }
  async loadMore() {
    if (!this.props.pagiantionDetails.hasMore){
      return;
    }
    const { pageNum } = this.props.pagiantionDetails;
    const loadMore = true;
    await this.props.getSearchResults({
      pageNum: pageNum + 1
    }, loadMore);
  }
  renderQuickView(itemNum,row,vid) {

    this.rowNumber = row;
    this.itemNum = itemNum
    let productId = this.productIndex[`index${this.itemNum}`]
    this.variantId[productId] = vid
    this.setState({
      renderQuickView:true
    })
  }
  shouldComponentUpdate(nextProps) {
    return !nextProps.ui.loading
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.buyNow == true && (nextProps.isLastAddedToCartSuccess)){
       Router.pushRoute(`/${country}/${language}/payment`);
    }
  }
  renderProductPage(options) {
    window.open(`/${country}/${language}/product?productId=${options.productId}${options.variantId ? `&variantId=${options.variantId}`: ''}&catalogId=${options.catalogId}&itemType=${options.itemType}`)
  }
  renderNext() {
    const { results } = this.props;
    if(this.itemNum === results.items.length - 1) {
      this.itemNum = results.items.length - 1
    } else {
      this.itemNum += 1
      this.rowNumber = Math.floor(this.itemNum/4) + 1
      this.setState({
        renderQuickView: true
      })
    }
  }
  renderPrev()  {
    if(this.itemNum === 0) {
      this.itemNum = 0;
    } else {
      this.itemNum -= 1
      this.rowNumber = Math.floor(this.itemNum/4) + 1
      this.setState({
        renderQuickView:true
      })
    }

  }
  fetchResults(product) {
    const { renderQuickView } = this.state;

    const {
      results, pagiantionDetails, userDetails, notifyMe, cartButtonLoaders, isLastAddedToCartSuccess,
    } = this.props;
    const { pageNum } = this.props.pagiantionDetails;
    let options = {}
    let elementNo = (this.rowNumber * 4) - 1;
    if(elementNo > product.length - 1) {
      elementNo = product.length - 1
    }
    let productId = this.productIndex[`index${this.itemNum}`]
    let productVariantId = this.variantId[productId]
    let productOptions = {
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
        productId,
      ],
      size: 'LARGE',
    }
    let totalresults = product.map((item,index) => {
      this.productIndex[`index${index}`] = item.id
      this.variantId[item.id] = this.variantId[item.id] || (item.variants.length > 0 && item.variants[0].variantId)
      return (
        <>
          <Product
            key={item.id}
            {...item}
            buyNow={this.buyNow}
            addToCart={this.addToCart}
            index={`${item.id}_${index}`}
            pageNum={pageNum}
            cartButtonLoaders={cartButtonLoaders}
            userDetails={userDetails}
            notifyMe={notifyMe}
            productID={item.id}
            selectedProduct={this.selectedProduct}
            selectedID={this.state.productID}
            row={Math.floor(index/4) + 1}
            itemNum={index}
            showQuickView={this.renderQuickView}
            isQuickView={renderQuickView && this.itemNum === index}
          />
        {
          (renderQuickView && elementNo === index) ?
          <QuickViewBase
            elementNo = {this.itemNum}
            renderQuickView ={renderQuickView}
            index={index}
            options={productOptions}
            productVariantId={productVariantId}
            prev={this.renderPrev}
            next={this.renderNext}
            onClose={this.onClose}
            productId={productId}
            renderProductPage={this.renderProductPage}
          /> : null
        }
        </>
      )
    })

    return totalresults
  }
  selectedProduct(productID) {
    this.setState({
      productID
    });
  }
  buyNow(listingId,productId) {
    this.setState({
      buyNow: true
    }, () => {
      this.addToCart(listingId,productId);
    });
  }

  addToCart(listingId,productId) {
    this.setState({
      productID:[]
    })
    this.props.addToCartAndFetch({
      listing_id: listingId, product_id: productId,
    });
  }

  render() {
    const { search, isCategoryTree, choosenCategoryName } = this.props;
    let finalQuery = search ? search : isCategoryTree ? choosenCategoryName : '';
    finalQuery = finalQuery.split('-').join(' ');
    const {
      results, pagiantionDetails
    } = this.props;
    if(results.totalCount === 0) {
      return (
        <div className={`${styles['caption']}`}>
          <div className={`${styles['no-results']} ${styles['fs-40']} ${styles['fontW600']} ${styles['justify-center']}`}>
              {SEARCH_PAGE.SORRY_NO_RESULTS}<br/>
              <div className={`${styles.flex} ${styles['flex-center']}  ${styles['flex-colum']}`}>
              <span  className={`${styles['fontW300']} ${styles['fs-20']}`}>{SEARCH_PAGE.FOR}</span>
              <div className={`${styles.ellipsis} ${styles['fontW300']} ${styles['fs-20']}`} title={`"${finalQuery}"`}>"{finalQuery}"</div>
              </div>
          </div>
          <div className={`${styles['no-search']}`}>
            <SVGComponent src={"errors-img/noSearch"} />
          </div>
        </div>
      )
    }
    const { pageNum } = this.props.pagiantionDetails;
    return (
      <div>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.loadMore}
          hasMore={pagiantionDetails.hasMore}
          loader={<div className={styles['loader']} key={0}>{SEARCH_PAGE.LOADING}</div>}
          threshold={2000}
          className={`${styles['grid-cont']} ${styles['flex']} ${styles['flex-wrp']} ${styles['search-main-part']}`}
        >
         {this.fetchResults(results.items)}
        </InfiniteScroll>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  results: selectors.getSearchResutls(store),
  pagiantionDetails: selectors.getPaginationDetails(store),
  ui: selectors.getUIState(store),
  isLastAddedToCartSuccess: cartSelector.isLastAddedToCartSuccess(store),
  userDetails: selectors.getUserDetails(store),
  cartButtonLoaders: selectors.getCartButtonLoaders(store),
  isCategoryTree: selectors.getIsCategoryTree(store),
  choosenCategoryName: selectors.getChoosenCategoryName(store),
  isLoggedIn:authSelectors.getLoggedInStatus(store)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSearchResults: actionCreators.getSearchResults,
      addToCartAndFetch: cartActionCreators.addToCartAndFetch,
      resetAddtoCart: cartActionCreators.resetAddtoCart,
      getWishlist: wishlistActionCreators.getWishlist,
      notifyMe: wishlistActionCreators.notifyMe,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
