import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, MenuItem } from "react-bootstrap";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Cookies from 'universal-cookie';
import { decode, encode, addUrlProps, replaceInUrlQuery } from 'react-url-query';

import { actionCreators } from '../../../store/auth';

import { mergeCss } from '../../../utils/cssUtil';
import languageData from '../../../constants/languages';

const styles = mergeCss('components/HeaderBar/header');
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
  	this.props.setLanguage(language);
    this.props.onChangeLanguage(language);
	}

  changeLanguage(e) {
    const id = e.currentTarget.getAttribute('data-id')
    this.setState({
      selectedItem: id
    }, () => {
      this.storeLanguage(id);
    });
  }

  storeLanguage(language) {
    this.props.setLanguage(language);
    this.props.onChangeLanguage(language);
    location.reload();
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


function mapUrlToProps(url, props) {
  return {
    language: url.language,
  };
}

const mapUrlChangeHandlersToProps = (props) => {
  return {
    onChangeLanguage: (value) => replaceInUrlQuery('language', value)
  };
}

export default addUrlProps({ mapUrlToProps, mapUrlChangeHandlersToProps })(connect(null, mapDispatchToProps)(Language));
