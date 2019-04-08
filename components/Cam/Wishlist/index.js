import React, { Component, Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../store/cam/wishlist';
import { selectors as cartSelectors } from '../../../store/cart';

import WishlistBody from './includes/WishlistBody';
import CartBottomPopup from './includes/CartBottomPopup';
import CartMiniWishList from './includes/CartMiniWishList';
import  Pagination from '../../common/Pagination'

// import { isAddedToCart } from '../../../store/cart/selectors';
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Cam/Wishlist/wishlist');

class Wishlist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showCartPageBtmPopup: false,
      currentPage:0,
      renderWishlist:true
    }
    this.deleteItem = this.deleteItem.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.showCartPageBtmPopup = this.showCartPageBtmPopup.bind(this);
    this.onPageChanged = this.onPageChanged.bind(this)
  }

  componentDidMount() {
    this.props.track({
      eventName: "WishList View"
    });
    this.props.getWishlist(this.state.currentPage);
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.getPageDetails.number !== this.state.currentPage) {
      this.setState({
        currentPage:nextProps.getPageDetails.number,
        renderWishlist:true
      })
    }
    if(nextProps.getPageDetails.number_of_elements === 0
      && nextProps.getPageDetails.total_elements > 0 && this.state.renderWishlist) {
        this.setState({
          renderWishlist:false
        },() => this.props.getWishlist(nextProps.getPageDetails.number - 1))
      }

  }
  deleteItem(e) {
    const { currentPage } = this.state
    this.props.deleteWishlist(e.currentTarget.id, { showToast: true },currentPage)
  }

  showCartPageBtmPopup() {
    this.setState({
      showCartPageBtmPopup: !this.state.showCartPageBtmPopup
    });
  }
  onPageChanged(currentPage) {
    this.setState({
      currentPage
    },() => this.props.getWishlist(currentPage))
  }
  addToCart(e) {
    this.props.addToCart({
      listing_id: e.target.id,
    }, e.target.getAttribute('data-wish-id'), e.target.getAttribute('data-cart-res'));
  }

  notify = ({ target }) => {
    const { notifyMe } = this.props;
    notifyMe({
      product_id: target.getAttribute('data-product-id'),
    });
  }

  render() {
    const { results, cartMiniWishList, cartData,getPageDetails } = this.props;
    const { showCartPageBtmPopup,currentPage } = this.state;
    return (
      <div className={`${styles['wishlist']} ${styles['pl-5']}`}>
        {
          cartMiniWishList ?
            <Fragment>
              <CartMiniWishList
                data={results}
                showCartPageBtmPopup={this.showCartPageBtmPopup}
              />
              {
                showCartPageBtmPopup ?
                  <CartBottomPopup
                    data={results}
                    addToCart={this.addToCart}
                    showCartPageBtmPopup={this.showCartPageBtmPopup}
                  />
                  : null
              }
            </Fragment>
            :
            <WishlistBody
              data={results}
              deleteItem={this.deleteItem}
              addToCart={this.addToCart}
              notifyMe={this.notify}
            />
        }
        <Pagination
          totalSize={getPageDetails.total_pages > 1 ? (getPageDetails.total_pages - 1): 0}
          pageNeighbours={0}
          onPageChanged = {this.onPageChanged}
          currentPage={currentPage}
        >
        </Pagination>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  results: selectors.getWishListResults(store),
  getPageDetails:selectors.getPaginationDetails(store)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getWishlist: actionCreators.getWishlist,
      deleteWishlist: actionCreators.deleteWishlist,
      addToCart: actionCreators.addToCart,
      notifyMe: actionCreators.notifyMe,
      track: actionCreators.track,
    },
    dispatch,
  );

Wishlist.propTypes = {
  results: PropTypes.array,
};

Wishlist.defaultProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
