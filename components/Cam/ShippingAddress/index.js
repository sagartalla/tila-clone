import React, { Component, Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Cookie from 'universal-cookie';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'react-router-modal';
import { selectors as productSelectors, actionCreators as productActionCreators } from '../../../store/product';
import { selectors as cartSelectors } from '../../../store/cart';
import AddressNew from './includes/AddressNew';
import AddressBody from './includes/AddressBody';
import MiniAddress from './includes/MiniAddress';
import AddressHeader from './includes/AddressHeader';
import { languageDefinations } from '../../../utils/lang/';
import { actionCreators, selectors } from '../../../store/cam/address';
import FormValidator from '../../common/FormValidator';
import Slider from '../../common/slider';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './address_en.styl';
import styles_ar from './address_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};


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
        method: this.validateNames,
        message: 'Should be between 3 to 20 characters',
        validWhen: false,
      },
      {
        field: 'last_name',
        method: this.validateNames,
        message: 'Should be between 3 to 20 characters',
        validWhen: false,
      },
      {
        field: 'address_line_1',
        method: this.validate,
        message: 'Required',
        validWhen: false,
      },
      {
        field: 'shipping_country_code',
        method: this.validate,
        message: 'Select Country from list',
        validWhen: false,
      },
      {
        field: 'country_name',
        method: this.validate,
        message: 'Select Country',
        validWhen: false,
      },
      {
        field: 'city',
        method: this.validate,
        message: 'Required City',
        validWhen: false,
      },
      {
        field: 'city_code',
        method: this.validate,
        message: 'Select City from list',
        validWhen: false,
      },
      {
        field: 'mobile_no',
        method: this.mobileValidation,
        message: 'Minimum 6 and maximum 12 digits',
        validWhen: false,
      },
      // {
      //   field: 'mobile_no',
      //   method: this.validate,
      //   message: 'Required Mobile Number',
      //   validWhen: false,
      // },
    ]);

    this.state = {
      addr: initialAddrObj,
      validation: this.validations.valid(),
      showNewAddr: false,
      showSlider: true,
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
    this.selectDeliverToAddress = this.selectDeliverToAddress.bind(this);
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
    const { getCitiesByCountryCode, countriesData } = this.props;

    addr.latitude = lat;
    addr.longitude = lng;
    addr.address_line_1 = address || '';
    addr.country_name = country.long_name || '';
    addr.shipping_country_code = country.short_name || '';
    // addr.city = city || '';
    addr.postal_code = postal_code || '';
    countriesData.forEach((ctr) => {
      if (ctr.code === country.short_name) {
        addr.mobile_country_code = ctr.country_phone_code;
        addr.country_name = ctr.country_name || '';
        addr.shipping_country_code = ctr.code3 || '';
      }
    });
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
    if (target.name === 'city') {
      showCitiesData = true;
      autoCompleteCity(target.value);
    } else if (target.name === 'country_name') {
      showCountriesData = true;
      addr.city = '';
      addr.shipping_country_code = '';
      autoCompleteCoutry(target.value);
    }
    this.setState({
      addr,
      showCitiesData,
      showCountriesData,
    });
  }

  validate = (fieldvalue) => {
    return fieldvalue === '';
  }

  mobileValidation = (fieldValue) => {
    return !(/^([0-9]){6,12}$/.test(fieldValue));
  }

  validateNames = (fieldValue) => {
    return !(/^([a-zA-z0-9]){3,20}$/.test(fieldValue));
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
    addr.mobile_country_code = target.getAttribute('data-code');
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

  closeSlider = () => {
    this.setState({ showSlider: false });
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
    const { isFromCart } = this.props;
    this.setState({
      showNewAddr: isFromCart ? true : !this.state.showNewAddr,
      validation: this.validations.valid(),
      showSlider: true,
    });
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
    this.setState({
      validation,
      showCitiesData: false,
      showCountriesData: false,
    });
  }

  addrTypeHandler(e) {
    const addr = { ...this.state.addr };
    addr.address_type = e.currentTarget.getAttribute('data-name');
    this.setState({ addr });
  }

  selectDeliverToAddress(addId) {
    this.props.selectDeliverToAddress(addId)
  }

  render() {
    // if standalone is true, it is stand alone address page else from payment page or any other pages.
    const {
      results, standalone, handleShippingAddressContinue, miniAddress, isPdp, getAllCities, countriesData, cartResults, showNonShippable, isPaymentPage
    } = this.props;
    const {
      showNewAddr, addr, showCitiesData, showCountriesData, validation, showSlider,
    } = this.state;
    const { DELIVERY_ADDR_PAGE } = languageDefinations();
    return (
      <div className={`${styles['address-container']} ${standalone !== true ? '' : `${styles.box} ${styles['ml-5']}`} `}>
        {!cartResults.cart_shippable && (cartResults.cart_shippable !== undefined) && showNonShippable &&
        <div className={`${styles['not-shippable']} ${styles.flex} ${styles['mb-20']} ${styles['p-10']}`}>
          <Col md={2} sm={3} xs={3} className={`${styles['thick-red-clr']} ${styles.fontW600} ${styles['not-shipping-font']}`}>{DELIVERY_ADDR_PAGE.NOT_SHIPPABLE}</Col>
          <Col md={10} sm={9} xs={9} className={`${styles['fs-12']} ${styles.fontW600}`}>{DELIVERY_ADDR_PAGE.UNFORTUNATELY_WE_CANNOT_DELIVER_REMOVE_ITEM}</Col>
        </div>}
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
                    <div style={{ position: 'absolute', zIndex: 10, top: '-120px', background: '#fff', width: '500px', left: '-31px' }}>
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
                    <>
                      <div onClick={this.closeSlider} className={showSlider ? `${styles['modalContainer']} ${styles['showDiv']}` : `${styles['modalContainer']} ${styles['hideDiv']}`}>
                        <div className={`${styles['disabled']}`}>
                        </div>
                      </div>
                      <div className={`${styles['overflow-y-auto']} ${showSlider ? `${styles['openModal']}` : `${styles['closeModal']}`}`}>
                        <div className={styles['p-40']}>
                          <h4 className={`${styles['flx-spacebw-alignc']} ${styles['m-0']} ${styles['mb-20']}`}>
                            <span>{DELIVERY_ADDR_PAGE.ADD_NEW_ADDR_HEAD}</span>
                            <a onClick={this.closeSlider} className={`${styles['fs-22']} ${styles['black-color']}`}>X</a>
                          </h4>
                          <div>
                            <AddressNew
                              hideTitle
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
                          </div>
                        </div>
                      </div>
                    </>
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
                    selectDeliverToAddress={this.selectDeliverToAddress}
                    standalone={standalone}
                    isPaymentPage={isPaymentPage}
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
                      <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['add-button']}`} disabled={cartResults.cart_shippable !== undefined && !cartResults.cart_shippable} onClick={handleShippingAddressContinue}>{DELIVERY_ADDR_PAGE.CONTINUE}</button>
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
  cartResults: cartSelectors.getCartResults(store),
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
      selectDeliverToAddress: actionCreators.selectDeliverToAddress
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
