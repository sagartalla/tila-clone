import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../store/cam/wishlist';
import WishlistBody from './includes/WishlistBody';

import styles from './wishlist.styl';

class Wishlist extends Component {

  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    this.props.getWishlist();
  }

  deleteItem() {

  }

  render() {
    const { results } = this.props;
    return (
      <div className={`${styles['wishlist']} ${styles['pl-20']}`}>
        <WishlistBody
          data={results}
          deleteItem={this.deleteItem}
        />
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  results: selectors.getWishListResults(store)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getWishlist: actionCreators.getWishlist,
    },
    dispatch,
  );

Wishlist.propTypes = {

};

Wishlist.defaultProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
