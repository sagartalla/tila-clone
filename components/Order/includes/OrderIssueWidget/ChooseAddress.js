import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { selectors, actionCreators } from '../../../../store/order';
import { selectors as addressSelectors, actionCreators as addressActionCreators } from '../../../../store/cam/address';
import { languageDefinations } from '../../../../utils/lang'
import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Order/includes/OrderIssueWidget/orderIssue');
const { ORDER_PAGE } = languageDefinations()
class ChooseAddress extends Component {
  constructor(props) {
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
    if (!this.state.choosenAddress && addresses.length) {
      this.setState({
        choosenAddress: addresses[0].id
      })
    }
  }

  chooseAddress(e) {
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
    const { addresses } = this.props;
    const { choosenAddress } = this.state;
    return (
      <div>
        <h4 className={`${styles['fs-20']} ${styles['fontW400']} ${styles['pb-15']}`}>{ORDER_PAGE.ADDRESS_PICKUP}</h4>
        {
          addresses.map((address) => (
            <div key={address.id} className={`${styles['generic-radio']} ${styles['flex']} ${styles['pb-10']}`}>
              <input onChange={this.chooseAddress} id="return-item" className={styles['radio-btn']} name="exch-retrn-add" type="radio" value={address.id} checked={choosenAddress === address.id} />
              <label for="return-item" className={styles['pl-10']}>
                <h4 className={`${styles['fs-16']} ${styles['fontW600']} ${styles['m-0']}`}>{address.name}</h4>
                <div className={`${styles['fs-12']} ${styles['light-gry-clr']} ${styles['fontW300']}`}>{address.address}</div>
                <span className={`${styles['fs-14']} ${styles['fontW400']} ${styles['thick-gry-clr']}`}>{address.phone}</span>
              </label>
            </div>
          ))
        }
        <div className={`${styles['widget-footer']} ${styles['pt-15']}`}>
          <button onClick={this.saveAndgoToNextStep} className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['retun-btn-part']}`} >{ORDER_PAGE.CONTINUE}</button>
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
