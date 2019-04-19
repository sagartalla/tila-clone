import React, { Component, Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Cookie from 'universal-cookie';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'react-router-modal';
import { selectors as productSelectors, actionCreators as productActionCreators } from '../../../store/product';
import AddressNew from './includes/AddressNew';
import AddressBody from './includes/AddressBody';
import MiniAddress from './includes/MiniAddress';
import AddressHeader from './includes/AddressHeader';
import { languageDefinations } from '../../../utils/lang/';
import { actionCreators, selectors } from '../../../store/cam/address';
import FormValidator from '../../common/FormValidator';

import lang from '../../../utils/language';

import styles_en from './address_en.styl';
import styles_ar from './address_ar.styl';


const styles = lang === 'en' ? styles_en : styles_ar;


const cookies = new Cookie();
// TODO: better handling of cookie
const initialAddrObj = {
  address_id: 0,
  address_type: 'HOME',
  address_line_1: '',
  address_line_2: '',
  city: '',
  default: true,
  country_name: '',
  first_name: '',
  last_name: '',
  latitude: 0,
  longitude: 0,
  mobile_country_code: '',
  mobile_no: '',
  postal_code: '',
  city_code: '',
  shipping_country_code: '',
};

class ShippingAddress extends Component {
  constructor(props) {
    super(props);
    this.validations = new FormValidator([
      {
        field: 'first_name',
        method: this.validate,
        message: 'Required First Name',
        validWhen: false,
      },
      {
        field: 'last_name',
        method: this.validate,
        message: 'Required Last Name',
        validWhen: false,
      },
      {
        field: 'address_line_1',
        method: this.validate,
        message: 'Required',
        validWhen: false,
      },
      {
        field: 'country_name',
        method: this.validate,
        message: 'Required Country',
        validWhen: false,
      },
      {
        field: 'city',
        method: this.validate,
        message: 'Required City',
        validWhen: false,
      },
    ]);

    this.state = {
      addr: initialAddrObj,
      validation: this.validations.valid(),
      showNewAddr: false,
      showCitiesData: false,
      showCountriesData: false,
    };
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
    this.selectCityFromSuggesstions = this.selectCityFromSuggesstions.bind(this);
  }

  componentDidMount() {
    const { getCitiesByCountryCode, getCountries } = this.props;
    getCountries();
    getCitiesByCountryCode(cookies.get('country'));
    if (!this.props.miniAddress) { this.props.getShippingAddressResults(); }
  }

  shouldComponentUpdate(nextProps) {
    return true;
  }

  getDataFromMap(json) {
    const {
      lat, lng, cityCountryObj: {
        country, address, postal_code,
      },
    } = json;
    const addr = { ...this.state.addr };
    const { getCitiesByCountryCode } = this.props;

    addr.latitude = lat;
    addr.longitude = lng;
    addr.address_line_1 = address || '';
    addr.country_name = country.long_name || '';
    addr.shipping_country_code = country.short_name || '';
    // addr.city = city || '';
    addr.postal_code = postal_code || '';
    if (addr.shipping_country_code) {
      getCitiesByCountryCode(addr.shipping_country_code);
    }
    this.setState({ addr });
  }

  setAsDefaultLocation(e) {
    const addr = { ...this.state.addr };
    addr.default = e.target.checked;
    this.setState({ addr });
  }

  inputOnChange({ target }) {
    const { autoCompleteCity, autoCompleteCoutry } = this.props;
    const addr = { ...this.state.addr };
    let { showCitiesData, showCountriesData } = this.state;
    addr[target.name] = target.value;
    this.setState({ addr });
    if (target.name === 'city') {
      showCitiesData = true;
      autoCompleteCity(target.value);
    } else if (target.name === 'country_name') {
      showCountriesData = true;
      autoCompleteCoutry(target.value);
    }
    this.setState({
      showCitiesData,
      showCountriesData,
    });
  }

  validate = (fieldvalue) => {
    console.log(fieldvalue, 'fgkeuf');
    return fieldvalue === '';
  }

  selectCityFromSuggesstions({ target }) {
    const addr = { ...this.state.addr };
    addr[target.getAttribute('name')] = target.getAttribute('data-id') || '';
    addr.city = target.innerHTML;
    this.setState({ addr }, () => {
      this.setState({
        showCitiesData: false,
      });
    });
  }

  selectCountry = ({ target }) => {
    const { getCitiesByCountryCode } = this.props;
    const addr = { ...this.state.addr };
    addr[target.getAttribute('name')] = target.getAttribute('data-id') || '';
    addr.country_name = target.innerHTML;
    this.setState({
      addr,
      showCountriesData: false,
    }, () => {
      getCitiesByCountryCode(target.getAttribute('data-id'));
    });
  }

  deleteAddr(addrId) {
    this.props.deleteAddress(addrId);
  }

  editAddress(addrId) {
    const { getAddrById, getCitiesByCountryCode } = this.props;
    const addr = getAddrById(addrId)[0];
    getCitiesByCountryCode(addr.shipping_country_code || 'SAU');
    this.setState({
      showNewAddr: true,
      addr,
    });
  }

  makeDefaultAddress(addrId) {
    const { toggleMiniAddress } = this.props;
    if (toggleMiniAddress) toggleMiniAddress();
    this.props.makeDefaultAddress(addrId);
  }

  resetAddAdrressForm() {
    this.setState({
      addr: initialAddrObj,
    });
    this.showAddAdrressForm();
  }

  showAddAdrressForm() {
    this.setState({ showNewAddr: !this.state.showNewAddr });
  }

  // TODO if adding service fail, we should not clearuser added data. SF-25
  saveBtnClickHandler() {
    const validation = this.validations.validate(this.state.addr);
    if (validation.isValid) {
      if (this.state.addr.address_id !== 0) {
        this.props.editAddressDetails(this.state.addr);
      } else {
        this.props.sendNewAddressDetails(this.state.addr);
      }
      this.setState({ addr: initialAddrObj });
      this.showAddAdrressForm();
    }
    this.setState({ validation });
  }

  addrTypeHandler(e) {
    const addr = { ...this.state.addr };
    addr.address_type = e.currentTarget.getAttribute('data-name');
    this.setState({ addr });
  }

  render() {
    // if standalone is true, it is stand alone address page else from payment page or any other pages.
    const {
      results, standalone, handleShippingAddressContinue, miniAddress, isPdp, getAllCities, countriesData,
    } = this.props;
    const {
      showNewAddr, addr, showCitiesData, showCountriesData, validation,
    } = this.state;
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
                    <div style={{ position: 'absolute', top: '-155px', background: '#fff', width: '488px', left: '-31px' }}>
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
                        getAllCities={getAllCities}
                        countriesData={countriesData}
                        selectCityFromSuggesstions={this.selectCityFromSuggesstions}
                        showCitiesData={showCitiesData}
                        validation={validation}
                        showCountriesData={showCountriesData}
                        selectCountry={this.selectCountry}
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
                        getAllCities={getAllCities}
                        countriesData={countriesData}
                        validation={validation}
                        selectCityFromSuggesstions={this.selectCityFromSuggesstions}
                        showCitiesData={showCitiesData}
                        showCountriesData={showCountriesData}
                        selectCountry={this.selectCountry}
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
                        getAllCities={getAllCities}
                        countriesData={countriesData}
                        validation={validation}
                        selectCityFromSuggesstions={this.selectCityFromSuggesstions}
                        showCitiesData={showCitiesData}
                        selectCountry={this.selectCountry}
                        showCountriesData={showCountriesData}
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
    );
  }
}

const mapStateToProps = store => ({
  results: selectors.getShippingAddressResults(store),
  getAddrById: selectors.getAddrById(store),
  getAllCities: productSelectors.getAllCities(store),
  countriesData: productSelectors.getAllCountries(store),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getShippingAddressResults: actionCreators.getShippingAddressResults,
      sendNewAddressDetails: actionCreators.sendNewAddressDetails,
      editAddressDetails: actionCreators.editAddressDetails,
      deleteAddress: actionCreators.deleteAddress,
      makeDefaultAddress: actionCreators.makeDefaultAddress,
      autoCompleteCity: productActionCreators.autoCompleteCity,
      autoCompleteCoutry: productActionCreators.autoCompleteCoutry,
      getCitiesByCountryCode: productActionCreators.getCitiesByCountryCode,
      getCountries: productActionCreators.getCountries,
    },
    dispatch,
  );

ShippingAddress.propTypes = {
  standalone: PropTypes.bool,
  // from payment page
  handleShippingAddressContinue: PropTypes.func,
  autoCompleteCity: PropTypes.func,
};

ShippingAddress.defaultProps = {
  standalone: false,
  autoCompleteCity: f => f,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddress);
