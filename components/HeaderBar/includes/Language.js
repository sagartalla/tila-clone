import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, MenuItem } from "react-bootstrap";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Cookies from 'universal-cookie';
import { decode, encode, addUrlProps, replaceInUrlQuery } from 'react-url-query';

import { actionCreators, selectors } from '../../../store/auth';


import languageData from '../../../constants/languages';

import lang from '../../../utils/language';

import styles_en from '../header_en.styl';
import styles_ar from '../header_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;
const cookies = new Cookies();

class Language extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: 'en'
    };
    this.changeLanguage = this.changeLanguage.bind(this);
    this.storeLanguage = this.storeLanguage.bind(this);
  }

  componentDidMount() {
  	const language = cookies.get('language') || this.state.selectedItem;
  	if(language){
  	  this.setState({
        selectedItem: language
      });
  	}
    this.storeLanguage(language);
	}

  componentWillReceiveProps(nextProps) {
    if(nextProps.language !== this.state.selectedItem) {
      const currentURl = window.location.href;
      window.location.href = currentURl.replace(`/${this.state.selectedItem}`, `/${nextProps.language}`);
    }
  }

  changeLanguage(e) {
    const id = e.currentTarget.getAttribute('data-id');
    this.storeLanguage(id);
  }

  storeLanguage(language) {
    this.props.setLanguage(language);
  }

  render() {
    const { img, name } = languageData[this.state.selectedItem];
    return (
      <Dropdown id="language-dd" className={styles['language-dd']}>
        <Dropdown.Toggle>
          <span>{name}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu className={styles['item']}>
          {
            _.map(languageData, (language) => (
              <MenuItem key={language.name} eventKey="1" onClick={this.changeLanguage} data-id={language.id}>
                {/*<img src={language.img} title={language.name}/>*/}
                <span>{language.name}</span>
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
			setLanguage: actionCreators.setLanguage
		},
		dispatch,
	);
}


const mapStateToProps = (store) => ({
  language: selectors.getLanguage(store),
});

export default connect(mapStateToProps, mapDispatchToProps)(Language);
