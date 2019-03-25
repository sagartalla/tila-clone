import React, { Component, Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Cookie from 'universal-cookie';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from "react-router-modal";

import AddressNew from './includes/AddressNew';
import AddressBody from './includes/AddressBody';
import MiniAddress from './includes/MiniAddress';
import AddressHeader from './includes/AddressHeader';
import { languageDefinations } from '../../../utils/lang/';
import { actionCreators, selectors } from '../../../store/cam/address';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Cam/ShippingAddress/address');

const cookies = new Cookie();
//TODO: better handling of cookie
const initialAddrObj = {
  address_id: 0,
  address_type: 'home',
  address_line_1: '',
  address_line_2: '',
  city: '',
  default: true,
  country_name: "",
  first_name: '',
  last_name: '',
  latitude: 0,
  longitude: 0,
  mobile_country_code: '',
  mobile_no: '',
  postal_code: '',
  shipping_country_code: '',
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
    this.getDataFromMap = this.getDataFromMap.bind(this);
    this.setAsDefaultLocation = this.setAsDefaultLocation.bind(this);
    this.addrTypeHandler = this.addrTypeHandler.bind(this);
    this.resetAddAdrressForm = this.resetAddAdrressForm.bind(this);
  }

  componentDidMount() {
    if (!this.props.miniAddress)
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
    const { toggleMiniAddress } = this.props;
    if(toggleMiniAddress) toggleMiniAddress();
    this.props.makeDefaultAddress(addrId)
  }

  resetAddAdrressForm() {
    this.setState({
      addr: initialAddrObj,
    });
    this.showAddAdrressForm();
  }

  showAddAdrressForm() {
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
    addr.default = e.target.checked;
    this.setState({ addr });
  }

  getDataFromMap(json) {
    const {
      lat, lng, cityCountryObj: { country, city, address, postal_code },
    } = json;
    const addr = { ...this.state.addr };

    addr.latitude = lat;
    addr.longitude = lng;
    addr.address_line_1 = address || '';
    addr.country_name = country || '';
    addr.city = city || '';
    addr.postal_code = postal_code || '';
    this.setState({ addr });
  }

  addrTypeHandler(e) {
    const addr = { ...this.state.addr };
    addr.address_type = e.currentTarget.getAttribute('data-name');
    this.setState({ addr });
  }

  render() {
    // if standalone is true, it is stand alone address page else from payment page or any other pages.
    const { results, standalone, handleShippingAddressContinue, miniAddress, isPdp } = this.props;
    let { showNewAddr, addr } = this.state;
    const { DELIVERY_ADDR_PAGE } = languageDefinations();

    return (
      <div className={`${styles['address-container']} ${standalone !== true ? '' : `${styles.box} ${styles['ml-5']}`} `}>
        {
          miniAddress ?
            <Fragment>
              <MiniAddress
                data={results}
                makeDefaultAddress={this.makeDefaultAddress}
                showAddAdrressForm={this.showAddAdrressForm}
              />
              {
                showNewAddr
                  ?
                  isPdp ?
                    <div style={{ position: 'absolute', 'top': '-155px', 'background': '#fff', 'width': '488px', 'left': '-31px' }}>
                      <AddressNew
                        inputOnChange={this.inputOnChange}
                        saveBtnClickHandler={this.saveBtnClickHandler}
                        data={addr}
                        showNewAddr={showNewAddr}
                        homeButton={this.homeButton}
                        getDataFromMap={this.getDataFromMap}
                        setAsDefaultLocation={this.setAsDefaultLocation}
                        addrTypeHandler={this.addrTypeHandler}
                        resetAddAdrressForm={this.resetAddAdrressForm}
                      />
                    </div>
                    :
                    <Modal className={`react-router-modal__modal ${styles['right-side-modal']}`}>
                      <AddressNew
                        inputOnChange={this.inputOnChange}
                        saveBtnClickHandler={this.saveBtnClickHandler}
                        data={addr}
                        showNewAddr={showNewAddr}
                        homeButton={this.homeButton}
                        getDataFromMap={this.getDataFromMap}
                        setAsDefaultLocation={this.setAsDefaultLocation}
                        resetAddAdrressForm={this.resetAddAdrressForm}
                        addrTypeHandler={this.addrTypeHandler}
                        showAddAdrressForm={this.showAddAdrressForm}
                      />
                    </Modal>
                  : ''
              }
            </Fragment>
            :
            <Fragment>
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
                    resetAddAdrressForm={this.resetAddAdrressForm}
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
                        getDataFromMap={this.getDataFromMap}
                        setAsDefaultLocation={this.setAsDefaultLocation}
                        addrTypeHandler={this.addrTypeHandler}
                        resetAddAdrressForm={this.resetAddAdrressForm}
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
            </Fragment>
        }
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
