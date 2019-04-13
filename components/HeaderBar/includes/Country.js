import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Cookies from 'universal-cookie';

import { actionCreators } from '../../../store/auth';


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
  }

  changeCountry(e) {
    const id = e.currentTarget.getAttribute('data-id')
    if(id===this.state.selectedItem){
      return;
    }else{
      confirm('Do you wish to change the country, the cart will change accordingly') ?
      this.setState({
        selectedItem: id
      }, () => {
        this.storeCountry(id);
      }) : null
  }
  }

  storeCountry(country) {
    this.props.setCountry(country);
    location.reload();
  }

  render() {
    const { img, name } = countriesData[this.state.selectedItem];
    return (
      <Dropdown id="country-dd" className={styles['country-dd']}>
        <Dropdown.Toggle>
          <img src={img} title={name} />
        </Dropdown.Toggle>
        <Dropdown.Menu className={styles['item']}>
          {
            _.map(countriesData, country => (
              <MenuItem key={country.name} eventKey="1" onClick={this.changeCountry} data-id={country.id}>
                <img src={country.img} title={country.name} />
              </MenuItem>
            ))
          }
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
			setCountry: actionCreators.setCountry
		},
		dispatch,
	);
}

export default connect(null, mapDispatchToProps)(Country);
