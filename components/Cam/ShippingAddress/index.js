import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { languageDefinations } from '../../../utils/lang/';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../store/cam/address';

import AddressHeader from './includes/AddressHeader';
import AddressBody from './includes/AddressBody';
import AddressNew from './includes/AddressNew';

import styles from './address.styl';
const initialAddrObj = {
  address_id: 0,
  first_name: '',
  last_name: '',
  city: '',
  address_line_1: '',
  address_line_2: '',
  mobile_no: '',
  mobile_country_code: '',
  latitude: 0,
  longitude: 0,
  default: true,
  address_type: 'home',
  postal_code: "",
  shipping_country_code: "IND",
  state: ""
}
class ShippingAddress extends Component {

  constructor(props) {
    super(props);

    this.state = {
      addr: initialAddrObj,
      showNewAddr: false,
      homeButton: true,
      editAddrId: ''
    }
    this.inputOnChange = this.inputOnChange.bind(this);
    this.saveBtnClickHandler = this.saveBtnClickHandler.bind(this);
    this.showAddAdrressForm = this.showAddAdrressForm.bind(this);
    this.deleteAddr = this.deleteAddr.bind(this);
    this.editAddress = this.editAddress.bind(this);
    this.makeDefaultAddress = this.makeDefaultAddress.bind(this);
    this.updateAddressFromGoogleMap = this.updateAddressFromGoogleMap.bind(this);
    this.setAsDefaultLocation = this.setAsDefaultLocation.bind(this);
    this.addrTypeHandler = this.addrTypeHandler.bind(this);
  }

  componentDidMount() {
    this.props.getShippingAddressResults();
  }

  shouldComponentUpdate(nextProps) {
    return true;
  }

  inputOnChange(e) {
    const addr = { ...this.state.addr };
    addr[e.target.name] = e.target.value;
    this.setState({ addr });
  }

  deleteAddr(addrId) {
    this.props.deleteAddress(addrId);
  }

  editAddress(addrId) {
    this.setState({ editAddrId: addrId });
    this.setState({ addr: this.props.getAddrById(addrId)[0] });
    this.setState({ showNewAddr: true })
  }

  makeDefaultAddress(addrId) {
    this.props.makeDefaultAddress(addrId)
  }

  showAddAdrressForm(e) {
    this.setState({ showNewAddr: !this.state.showNewAddr })
  }

  //TODO if adding service fail, we should not clearuser added data. SF-25
  saveBtnClickHandler() {
    if (this.state.addr.address_id !== 0) {
      this.props.editAddressDetails(this.state.addr);
    } else {
      this.props.sendNewAddressDetails(this.state.addr);
    }

    this.setState({ addr: initialAddrObj });
    this.showAddAdrressForm();
  }

  setAsDefaultLocation(e) {
    const addr = { ...this.state.addr };
    addr['default'] = e.target.checked;
    this.setState({ addr });
  }

  updateAddressFromGoogleMap(json) {
    let { lat, lng, address } = json;
    const addr = { ...this.state.addr };

    addr['latitude'] = lat;
    addr['longitude'] = lng;
    addr['address_line_1'] = address;

    this.setState({ addr });
  }

  addrTypeHandler(e) {
    const addr = { ...this.state.addr };
    addr['address_type'] = e.target.name;
    this.setState({ addr });
  }

  render() {
    // if standalone is true, it is stand alone address page else from payment page or any other pages.
    const { results, standalone, handleShippingAddressContinue } = this.props;
    let { showNewAddr, addr } = this.state;
    const { DELIVERY_ADDR_PAGE } = languageDefinations();

    return (
      <div className={`${styles['address-container']} ${standalone !== true ? '' : `${styles['box']} ${styles['ml-5']}`} `}>
        {
          standalone === true ?
            <AddressHeader /> :
            null
        }
        <Row>
          <Col md={12} sm={12} xs={12}>
            <AddressBody
              data={results}
              showAddAdrressForm={this.showAddAdrressForm}
              deleteAddr={this.deleteAddr}
              editAddress={this.editAddress}
              makeDefaultAddress={this.makeDefaultAddress}
              standalone={standalone}
            />
          </Col>
          <Col md={12} sm={12} xs={12}>
            {
              showNewAddr ?
                <AddressNew
                  inputOnChange={this.inputOnChange}
                  saveBtnClickHandler={this.saveBtnClickHandler}
                  data={addr}
                  showNewAddr={showNewAddr}
                  homeButton={this.homeButton}
                  updateAddressFromGoogleMap={this.updateAddressFromGoogleMap}
                  setAsDefaultLocation={this.setAsDefaultLocation}
                  addrTypeHandler={this.addrTypeHandler}
                  showAddAdrressForm={this.showAddAdrressForm}
                /> : ''
            }
          </Col>
          {
            standalone !== true ?
              <Col md={12} sm={12} xs={12} className={`${styles['pl-15']}`}>
                <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']}`} onClick={handleShippingAddressContinue}>{DELIVERY_ADDR_PAGE.CONTINUE}</button>
              </Col>
              : null
          }
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  results: selectors.getShippingAddressResults(store),
  getAddrById: selectors.getAddrById(store)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getShippingAddressResults: actionCreators.getShippingAddressResults,
      sendNewAddressDetails: actionCreators.sendNewAddressDetails,
      editAddressDetails: actionCreators.editAddressDetails,
      deleteAddress: actionCreators.deleteAddress,
      makeDefaultAddress: actionCreators.makeDefaultAddress,
    },
    dispatch,
  );

ShippingAddress.propTypes = {
  standalone: PropTypes.bool,

  //from payment page
  handleShippingAddressContinue: PropTypes.func
};

ShippingAddress.defaultProps = {
  standalone: false
};

export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddress);