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
import { Router } from '../../../routes';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../search_en.styl';
import styles_ar from '../search_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const cookies = new Cookie();
const { SEARCH_PAGE } = languageDefinations();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productID:[]
    };
    this.loadMore = this.loadMore.bind(this);
    this.buyNow = this.buyNow.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.selectedProduct = this.selectedProduct.bind(this)
  }

  componentDidMount() {
    this.props.resetAddtoCart();
    this.props.getWishlist();
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

  shouldComponentUpdate(nextProps) {
    return !nextProps.ui.loading
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.buyNow == true && (nextProps.isLastAddedToCartSuccess)){
       Router.pushRoute(`/${country}/${language}/payment`);
    }
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
      results, pagiantionDetails, userDetails, notifyMe, cartButtonLoaders, isLastAddedToCartSuccess,
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
          className={`${styles['grid-cont']} ${styles['flex']} ${styles['flex-wrp']} ${styles['search-main-part']}`}

        >
          {results.items.map((item,index) => (
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
            />
          ))}
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
