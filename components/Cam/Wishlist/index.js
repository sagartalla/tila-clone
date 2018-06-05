import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../store/cam/wishlist';

class Wishlist extends Component {

  componentDidMount(){
    this.props.getWishlist();
  }

  render(){
    return(
      <div>
        Wish List
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  
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
