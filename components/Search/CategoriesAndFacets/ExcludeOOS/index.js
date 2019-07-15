import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { addUrlProps, UrlQueryParamTypes, pushInUrlQuery } from 'react-url-query';
import { Router } from '../../../../routes';
import { languageDefinations } from '../../../../utils/lang';

import ToggleBtn from '../../../common/ToggleBtn';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../../search_en.styl';
import styles_ar from '../../search_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const { PDP_PAGE } = languageDefinations();

const urlPropsQueryConfig = {
  excludeOOS: { type: UrlQueryParamTypes.string, queryParam: 'isListed', }
};

class ExcludeOOS extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const query = e.target.checked
      ?
        window.location.search.replace('isListed=false', 'isListed=true')
      :
        window.location.search.replace('isListed=true', 'isListed=false')
    Router.pushRoute(`${window.location.pathname}${query}`);
  }

  render() {
    return (
      <Panel>
        <div className={`${styles['category-list-title']} ${styles['black-color']} ${styles['fontW600']} ${styles['flx-spacebw-alignc']}`}>
          <span>{PDP_PAGE.HIDE_OUT_OF_STOCK}</span>
          <ToggleBtn handleClick={this.handleClick} checked={this.props.excludeOOS === 'true'}/>
        </div>
      </Panel>
    )
  }
}

export default addUrlProps({ urlPropsQueryConfig })(ExcludeOOS);
