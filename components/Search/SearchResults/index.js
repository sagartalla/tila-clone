import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfiniteScroll from 'react-infinite-scroller';
import _ from 'lodash'
import Product from "./Product";
import SVGCompoent from '../../common/SVGComponet';
import { actionCreators, selectors } from '../../../store/search';
import { actionCreators as cartActionCreators, selectors as cartSelector } from '../../../store/cart'
import { actionCreators as wishlistActionCreators } from '../../../store/cam/wishlist'
import { mergeCss } from '../../../utils/cssUtil';
import { Router } from '../../../routes';
const styles = mergeCss('components/Search/search');

class SearchResults extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.loadMore = this.loadMore.bind(this);
    this.buyNow = this.buyNow.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  async loadMore(){
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
    if(this.state.buyNow == true && (nextProps.isAddedToCart)){
       Router.pushRoute('/payment');
    }
  }

  componentDidMount(){
    this.props.resetAddtoCart();
    this.props.getWishlist();
  }

  buyNow(listingId) {
    this.setState({
      buyNow: true
    }, () => {
      this.addToCart(listingId);
    });
  }

  addToCart(listingId) {
    this.props.addToCartAndFetch({
      listing_id: listingId
    });
  }

  render() {
    const { results, pagiantionDetails } = this.props;
    const { pageNum } = this.props.pagiantionDetails;
    return (
      <div>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.loadMore}
          hasMore={pagiantionDetails.hasMore}
          loader={<div className={styles['loader']} key={0}>Loading ...</div>}
          className={`${styles['grid-cont']} ${styles['flex']} ${styles['flex-wrp']}`}

        >
          {results.items.map((item,index) => (
            <Product
              key={item.id}
              {...item}
              buyNow={this.buyNow}
              addToCart={this.addToCart}
              index={`${item.id}_${index}`}
              pageNum={pageNum}
            />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  results: selectors.getSearchResutls(store),
  pagiantionDetails: selectors.getPaginationDetails(store),
  ui: selectors.getUIState(store),
  isAddedToCart: cartSelector.isAddedToCart(store),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSearchResults: actionCreators.getSearchResults,
      addToCartAndFetch: cartActionCreators.addToCartAndFetch,
      resetAddtoCart: cartActionCreators.resetAddtoCart,
      getWishlist: wishlistActionCreators.getWishlist,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
