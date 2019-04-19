import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Cookies from 'universal-cookie';

import { Router } from '../../../routes';

import { actionCreators, selectors } from '../../../store/auth';


import countriesData from '../../../constants/countries';

import lang from '../../../utils/language';

import styles_en from '../header_en.styl';
import styles_ar from '../header_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;

const cookies = new Cookies();

class Country extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: 'SAU',
    };
    this.changeCountry = this.changeCountry.bind(this);
    this.storeCountry = this.storeCountry.bind(this);
  }

  componentDidMount() {
    const country = cookies.get('country') || this.state.selectedItem;
    if (country) {
      this.setState({
        selectedItem: country,
      });
    }
    this.props.setCountry(country);
    this.props.getDomainCountries();
  }

  // componentWillReceiveProps(nextProps) {
  //   const { domainCountries, setShippingInfo } = this.props;
  //   const pathnameArr = window.location.pathname.split('/');
  //   const country = pathnameArr[1];
  //   if (domainCountries.length !== nextProps.domainCountries.length) {
  //     const obj = nextProps.domainCountries.length > 0 ?
  //       nextProps.domainCountries.filter(domain => domain.country.code3 === country)[0] : {};
  //     setShippingInfo({
  //       country,
  //       city: obj.city.code,
  //       displayCity: obj.city[lang === 'en' ? 'city_name' : 'city_name_ar'],
  //     });
  //   }
  // }

  changeCountry(e) {
    const id = e.currentTarget.getAttribute('data-id');
    if (id !== this.state.selectedItem) {
      confirm('Do you wish to change the country, the cart will change accordingly') ?
        this.setState({
          selectedItem: id,
        }, () => {
          this.storeCountry(id);
        }) : null;
    }
  }

  storeCountry(country) {
    const { setShippingInfo, domainCountries, setCountry } = this.props;
    const language = cookies.get('language');
    const pathnameArr = window.location.pathname.split('/');
    pathnameArr.shift();
    pathnameArr.shift();
    pathnameArr.shift(); // for Removing country and language
    const page = pathnameArr.join('/');
    const { search = '' } = window.location;
    const obj = domainCountries.length > 0 ?
      domainCountries.filter(domain => domain.country.code3 === country)[0] : {};
    setCountry(country);
    setShippingInfo({
      country,
      city: obj.city.code,
      displayCity: obj.city[lang === 'en' ? 'city_name' : 'city_name_ar'],
    }).then(() => {
      window.location = `${window.location.origin}/${country}/${language}/${page}${search}`
    });
  }

  render() {
    const { domainCountries } = this.props;
    const { selectedItem } = this.state;
    const obj = domainCountries.length > 0 ?
      domainCountries.filter(domain => domain.country.code3 === selectedItem)[0] : {};
    return (
      <Dropdown id="country-dd" className={styles['country-dd']}>
        <Dropdown.Toggle>
          <img src={countriesData[selectedItem].img} alt={obj.name} title={obj.name} />
        </Dropdown.Toggle>
        <Dropdown.Menu className={styles.item}>
          {domainCountries.length > 0 &&
            domainCountries.map(domain => (
              <MenuItem key={domain.country.code3} eventKey="1" onClick={this.changeCountry} data-id={domain.country.code3}>
                <img src={countriesData[domain.country.code3].img} title={domain.name} />
              </MenuItem>
            ))
          }
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

const mapStateToProps = store => ({
  domainCountries: selectors.getDomainCountries(store),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setCountry: actionCreators.setCountry,
    setShippingInfo: actionCreators.setCity,
    getDomainCountries: actionCreators.getDomainCountries,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Country);
