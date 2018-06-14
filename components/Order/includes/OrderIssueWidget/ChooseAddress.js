import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { selectors, actionCreators } from '../../../../store/order';
import { selectors as addressSelectors, actionCreators as addressActionCreators } from '../../../../store/cam/address';

import styles from './orderIssue.styl';

class ChooseAddress extends Component {
  constructor(props){
    super(props)
    this.state = {};
    this.saveAndgoToNextStep = this.saveAndgoToNextStep.bind(this);
    this.chooseAddress = this.chooseAddress.bind(this);
  }

  componentDidMount() {
    this.props.getShippingAddressResults();
  }

  componentWillReceiveProps(nextProps) {
    const { addresses } = nextProps;
    if(!this.state.choosenAddress && addresses.length) {
      this.setState({
        choosenAddress: addresses[0].id
      })
    }
  }

  chooseAddress (e) {
    this.setState({
      choosenAddress: e.target.value
    })
  }

  saveAndgoToNextStep() {
    const { selectAddressForReturnExchange, goToNextStep, addresses } = this.props;
    selectAddressForReturnExchange({
      addressId: this.state.choosenAddress || addresses[0].id
    });
    goToNextStep();
  }

  render() {
    const { addresses } = this.props
    return (
      <div>
      <div>Please Choose Address for Pick Up</div>
      {
        addresses.map((address) => (
          <div key={address.id} className={styles['generic-radio']}>
            <input onChange={this.chooseAddress} id="return-item" name="exch-retrn-add" type="radio" value={address.id} checked={this.state.choosenAddress === address.id}/>
            <label for="return-item">
              <div>
                <div>{address.name}</div>
                <div>{address.address}</div>
                <div>{address.phone}</div>
              </div>
            </label>
          </div>
        ))
      }
      <div className={`${styles['widget-footer']} ${styles['box']} ${styles['pt-24']}`}>
        <button onClick={this.saveAndgoToNextStep} className={`${styles['m-0-auto']} ${styles['fs-16']}`} >Continue</button>
      </div>
      </div>
    );
  }
}

ChooseAddress.propTypes = {
  selectAddressForReturnExchange: PropTypes.func.isRequired,
  goToNextStep: PropTypes.func.isRequired,
  addresses: PropTypes.array.isRequired,
}

const mapStateToProps = (store) => {
  return ({
    addresses: addressSelectors.getAddressWithNameAndPhone(store)
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getShippingAddressResults: addressActionCreators.getShippingAddressResults,
      selectAddressForReturnExchange: actionCreators.selectAddressForReturnExchange,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseAddress);
