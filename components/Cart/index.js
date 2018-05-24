import React, { Component } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../store/cart';

import HeaderBar from '../HeaderBar/index';
import CartBody from './includes/CartBody';

import styles from './cart.styl';

class Cart extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCartResults();
  }

  render() {
    const {results} = this.props;
    console.log(results)
    return (
      <div>
        <HeaderBar />
        <Grid>
          <CartBody 
            data={results}
          />
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  results: selectors.getCartResults(store),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCartResults: actionCreators.getCartResults
    },
    dispatch,
  );


export default connect(mapStateToProps, mapDispatchToProps)(Cart);
