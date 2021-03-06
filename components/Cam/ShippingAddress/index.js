import React, { Component, Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Cookie from 'universal-cookie';
import { Modal } from 'react-router-modal';
import { connect } from 'react-redux';
import dynamic from 'next/dynamic';
import { bindActionCreators } from 'redux';

import { selectors as productSelectors, actionCreators as productActionCreators } from '../../../store/product';
import { selectors as cartSelectors } from '../../../store/cart';
import MiniAddress from './includes/MiniAddress';
import AddressHeader from './includes/AddressHeader';
import { languageDefinations } from '../../../utils/lang/';
import { actionCreators, selectors } from '../../../store/cam/address';
import FormValidator from '../../common/FormValidator';
import Button from '../../common/CommonButton';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './address_en.styl';
import styles_ar from './address_ar.styl';

const AddressBody = dynamic(import('./includes/AddressBody'));
const AddressNew = dynamic(import('./includes/AddressNew'));

const { DELIVERY_ADDR_PAGE } = languageDefinations();

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

let validCountry = null;
let validCity = null;
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
        message: DELIVERY_ADDR_PAGE.MINIMUM_THREE_CHARACTERS,
        validWhen: false,
      },
      {
        field: 'last_name',
        method: this.validateNames,
        message: DELIVERY_ADDR_PAGE.MINIMUM_THREE_CHARACTERS,
        validWhen: false,
      },
      {
        field: 'address_line_1',
        method: this.validate,
        message: DELIVERY_ADDR_PAGE.REQUIRED,
        validWhen: false,
      },
      {
        field: 'shipping_country_code',
        method: this.validate,
        message: DELIVERY_ADDR_PAGE.SELECT_COUNTRY_FROM_LIST,
        validWhen: false,
      },
      {
        field: 'country_name',
        method: this.validate,
        message: DELIVERY_ADDR_PAGE.SELECT_COUNTRY,
        validWhen: false,
      },
      {
        field: 'city',
        method: this.validate,
        message: DELIVERY_ADDR_PAGE.REQUIRED_CITY,
        validWhen: false,
      },
      {
        field: 'city_code',
        method: this.validate,
        message: DELIVERY_ADDR_PAGE.SELECT_COUNTRY_FROM_LIST,
        validWhen: false,
      },
      {
        field: 'mobile_no',
        method: this.validate,
        validWhen: false,
        message: DELIVERY_ADDR_PAGE.PHONE_NUMBER_CANNOT_EMPTY,
      },
      {
        field: 'mobile_no',
        method: this.mobileValidation,
        validWhen: false,
        message: DELIVERY_ADDR_PAGE.ENTER_VALID_MOBILE_NUMBER,
      },
      {
        field: 'mobile_no',
        method: this.mobileWithZeroValidation,
        validWhen: false,
        message: DELIVERY_ADDR_PAGE.ENTER_VALID_MOBILE_NUMBER,
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
      isEditAddr: false,
      showCitiesData: false,
      showCountriesData: false,
      slider: false,
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
    this.addAddressForm = this.addAddressForm.bind(this);
  }

  componentDidMount() {
    const { getCitiesByCountryCode, getCountries } = this.props;
    getCountries();
    getCitiesByCountryCode(cookies.get('country'));
    if (!this.props.miniAddress) { this.props.getShippingAddressResults(); }
  }

  getDataFromMap(json) {
    const {
      lat, lng, cityCountryObj: {
        country, address, postal_code, city,
      },
    } = json;
    const addr = { ...this.state.addr };
    const { getCitiesByCountryCode, countriesData } = this.props;

    addr.latitude = lat;
    addr.longitude = lng;
    addr.address_line_1 = address || '';
    addr.country_name = country.long_name || '';
    addr.shipping_country_code = country.short_name || '';
    addr.city = '';
    addr.city_code = '';
    addr.postal_code = postal_code || '';
    countriesData.forEach((ctr) => {
      if (ctr.code === country.short_name) {
        addr.mobile_country_code = ctr.country_phone_code;
        addr.country_name = ctr.country_name || '';
        addr.shipping_country_code = ctr.code3 || '';
      }
    });
    if (addr.shipping_country_code) {
      getCitiesByCountryCode(addr.shipping_country_code).then((res) => {
        res.value.data.forEach((cityObj) => {
          if (cityObj.city_name === city) {
            addr.city = cityObj.city_name;
            addr.city_code = cityObj.city_code;
          }
        });
        this.setState({ addr });
      });
    }
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
    addr[target.name] = target.value.replace(/^\s+/g, '');
    if (target.name === 'city') {
      showCitiesData = true;
      autoCompleteCity(target.value);
    } else if (target.name === 'country_name') {
      showCountriesData = true;
      addr.city = '';
      addr.city_code = '';
      addr.shipping_country_code = '';
      autoCompleteCoutry(target.value);
    }
    this.setState({
      addr,
      showCitiesData,
      showCountriesData,
    }, () => {
        const validation = this.validations.validateOnBlur({ [target.name]: target.value });
        if(target.name === 'country_name' || target.name === 'city'){
          validCountry = this.validations.validateOnBlur({ 'shipping_country_code': addr.shipping_country_code })
          validCity = this.validations.validateOnBlur({ 'city_code': addr.city_code })
        }
        this.setState({
          validation: Object.assign(
            {},
            this.state.validation,
            { ...validation },
            { ...validCountry },
            { ...validCity },
          )
        })
    }
    );
  }

  validate = (fieldvalue) => {
    return fieldvalue === '';
  }

  mobileWithZeroValidation = (fieldValue) => {
    if (fieldValue && (Number(fieldValue[0]) === 0 && Number(fieldValue[1]) === 5 && fieldValue.length === 10)) {
      return false;
    } else if (fieldValue && Number(fieldValue[0]) !== 0) {
      return false;
    } return true;
  }
  mobileValidation = (fieldValue) => {
    if (fieldValue && (Number(fieldValue[0]) === 5 && fieldValue.length === 9)) {
      return false;
    } else if (fieldValue && Number(fieldValue[0]) === 0) {
      return false;
    } return true;
  }

  validateNames = (fieldValue) => {
    return !(/^([a-zA-z0-9\s]){3,20}$/.test(fieldValue));
  }

  selectCityFromSuggesstions({ target }) {
    const addr = { ...this.state.addr };
    addr[target.getAttribute('name')] = target.getAttribute('data-id') || '';
    addr.city = target.innerHTML;
    this.setState({ addr }, () => {
      if(addr.city_code !== ''){
        validCity = this.validations.validateOnBlur({ 'city_code': addr.city_code })
      }
      this.setState({
        showCitiesData: false,
        validation: Object.assign(
          {},
          this.state.validation,
          { ...validCity }
        )
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
      if(addr.shipping_country_code !== ''){
        validCountry = this.validations.validateOnBlur({ 'shipping_country_code': addr.shipping_country_code })
      }
      this.setState({
        validation: Object.assign(
          {},
          this.state.validation,
          { ...validCountry }
        )
      })
      getCitiesByCountryCode(target.getAttribute('data-id'));
    });
  }

  deleteAddr(addrId) {
    this.props.deleteAddress(addrId).then(() => {
      this.resetAddAdrressForm();
    });
  }

  closeSlider = () => {
    document.getElementsByTagName('BODY')[0].style.overflow = 'auto';
    this.setState({ showSlider: false });
  }

  editAddress(addrId) {
    const { getAddrById, getCitiesByCountryCode } = this.props;
    const addr = getAddrById(addrId)[0];
    getCitiesByCountryCode(addr.shipping_country_code || 'SAU');
    this.setState({
      showNewAddr: true,
      addr,
      isEditAddr: true,
    }, () => setTimeout(() => {
      document.getElementById('content').scrollIntoView({ behavior: 'smooth' });
    }, 500));
  }

  makeDefaultAddress(addrId) {
    const { toggleMiniAddress } = this.props;
    if (toggleMiniAddress) toggleMiniAddress();
    this.props.makeDefaultAddress(addrId);
  }

  resetAddAdrressForm() {
    window.scrollTo(0, 0);
    this.setState({
      addr: initialAddrObj,
      isEditAddr: false,
      showNewAddr: false,
    }, () => this.showAddAdrressForm());
  }

  addAddressForm() {
    this.setState({
      addr: initialAddrObj,
      showNewAddr: true,
      isEditAddr: false,
    }, () => setTimeout(() => {
      this.showAddAdrressForm();
      document.getElementById('content').scrollIntoView({ behavior: 'smooth' });
    }, 100));
  }

  showAddAdrressForm = (key) => {
    // const { isFromCart } = this.props;
    if (key === 'pdp') {
      document.getElementsByTagName('BODY')[0].style.overflow = 'hidden';
    }
    this.setState({
      showNewAddr: key === 'pdp' ? true : this.state.showNewAddr,
      validation: this.validations.valid(),
      slider: true,
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
     validation.isValid ? window.scrollTo(0, 0) : document.getElementById('content').scrollIntoView({ behavior: 'smooth' });
      this.setState({ addr: initialAddrObj, showNewAddr: false }, () => this.showAddAdrressForm());
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

  openSlider = () => {
    document.getElementsByTagName('BODY')[0].style.overflow = 'hidden';
    this.setState({
      slider: true,
    });
  }

  closeSlider = () => {
    document.getElementsByTagName('BODY')[0].style.overflow = 'auto';
    this.setState({
      slider: false,
    });
  }

  render() {
    // if standalone is true, it is stand alone address page else from payment page or any other pages.
    const {
      results, standalone, handleShippingAddressContinue, miniAddress, isPdp, getAllCities, countriesData, cartResults, showNonShippable, isPaymentPage, selectedAddress
    } = this.props;
    const {
      showNewAddr, addr, showCitiesData, showCountriesData, validation, showSlider, isEditAddr, slider,
    } = this.state;
    return (
      <div className={`${styles['address-container']} ${styles['pt-15']} ${standalone !== true ? '' : `${styles.box} ${styles['ml-5']}`} `}>
        {cartResults.address !== null && !cartResults.cart_shippable && (cartResults.cart_shippable !== undefined) && showNonShippable &&
        <div className={`${styles['not-shippable']} ${styles.flex} ${styles['mb-20']} ${styles['p-10']}`}>
          <Col md={2} sm={3} xs={3} className={`${styles['thick-red-clr']} ${styles.fontW600} ${styles['not-shipping-font']}`}>{DELIVERY_ADDR_PAGE.NOT_SHIPPABLE}</Col>
          <Col md={10} sm={9} xs={9} className={`${styles['fs-12']}`}>{DELIVERY_ADDR_PAGE.UNFORTUNATELY_WE_CANNOT_DELIVER_REMOVE_ITEM}</Col>
        </div>}
        {
          miniAddress ?
            <Fragment>
              <MiniAddress
                data={results}
                makeDefaultAddress={this.makeDefaultAddress}
                showAddAdrressForm={this.showAddAdrressForm}
                selectDeliverToAddress={this.selectDeliverToAddress}
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
                        addAddressForm={this.addAddressForm}
                        getAllCities={getAllCities}
                        countriesData={countriesData}
                        selectCityFromSuggesstions={this.selectCityFromSuggesstions}
                        showCitiesData={showCitiesData}
                        validation={validation}
                        showCountriesData={showCountriesData}
                        selectCountry={this.selectCountry}
                        isEditAddr={isEditAddr}
                      />
                    </div>
                    :
                    <>
                      {slider &&
                      <Modal
                        label={DELIVERY_ADDR_PAGE.ADD_NEW_ADDR_HEAD}
                        isOpen={this.state.slider}
                        onBackdropClick={this.closeSlider}
                        className="test-class-name"
                      >
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
                          addAddressForm={this.addAddressForm}
                          addrTypeHandler={this.addrTypeHandler}
                          showAddAdrressForm={this.showAddAdrressForm}
                          getAllCities={getAllCities}
                          countriesData={countriesData}
                          validation={validation}
                          selectCityFromSuggesstions={this.selectCityFromSuggesstions}
                          showCitiesData={showCitiesData}
                          showCountriesData={showCountriesData}
                          selectCountry={this.selectCountry}
                          isEditAddr={isEditAddr}
                        />
                      </Modal>}
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
                    addAddressForm={this.addAddressForm}
                    selectDeliverToAddress={this.selectDeliverToAddress}
                    standalone={standalone}
                    isPaymentPage={isPaymentPage}
                    selectedAddress={selectedAddress}
                  />
                </Col>
                <Col md={12} sm={12} xs={12} id="content">
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
                        addAddressForm={this.addAddressForm}
                        showAddAdrressForm={this.showAddAdrressForm}
                        getAllCities={getAllCities}
                        countriesData={countriesData}
                        validation={validation}
                        selectCityFromSuggesstions={this.selectCityFromSuggesstions}
                        showCitiesData={showCitiesData}
                        selectCountry={this.selectCountry}
                        showCountriesData={showCountriesData}
                        isEditAddr={isEditAddr}
                      /> : ''
                  }
                </Col>
                {
                  standalone !== true ?
                    <Col md={12} sm={12} xs={12} className={`${styles['pl-15']}`}>
                      <Button
                        className={`${styles['left-radius']} ${styles['text-uppercase']} ${styles['disable-button']}`}
                        btnText={DELIVERY_ADDR_PAGE.CONTINUE}
                        disabled={cartResults.cart_shippable !== undefined && !cartResults.cart_shippable}
                        onClick={handleShippingAddressContinue}
                      />
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
      selectDeliverToAddress: actionCreators.selectDeliverToAddress,
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
