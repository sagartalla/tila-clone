import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreaters, selectors } from '../../../store/cam/address';

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
    if(this.state.addr.address_id !== 0){
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
    const { results } = this.props;
    let { showNewAddr, addr } = this.state;

    return (
      <div className={styles['address-container']}>
        <AddressHeader />
        <Row>
          <Col md={12} sm={12} xs={12}>
            <AddressBody
              data={results}
              showAddAdrressForm={this.showAddAdrressForm}
              deleteAddr={this.deleteAddr}
              editAddress={this.editAddress}
              makeDefaultAddress={this.makeDefaultAddress}
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
      getShippingAddressResults: actionCreaters.getShippingAddressResults,
      sendNewAddressDetails: actionCreaters.sendNewAddressDetails,
      editAddressDetails: actionCreaters.editAddressDetails,
      deleteAddress: actionCreaters.deleteAddress,
      makeDefaultAddress: actionCreaters.makeDefaultAddress,
    },
    dispatch,
  );


export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddress);