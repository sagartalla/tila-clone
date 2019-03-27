import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { addUrlProps, UrlQueryParamTypes, pushInUrlQuery } from 'react-url-query';

import { Router } from '../../../../routes';
import { mergeCss } from '../../../../utils/cssUtil';

const styles = mergeCss('components/Search/search');

const urlPropsQueryConfig = {
  excludeOOS: { type: UrlQueryParamTypes.string, queryParam: 'isListed', }
};

class ExcludeOOS extends Component {
  constructor(props) {
    super(props);
    this.excludeOOS = this.excludeOOS.bind(this);
  }

  excludeOOS(e) {
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
        <div className={`${styles['category-list-title']} ${styles['black-color']} ${styles['fontW600']} ${styles['p-10-20']} ${styles['flx-spacebw-alignc']}`}>
          <span>Hide Out of Stock</span>
          <input onClick={this.excludeOOS} type="checkbox" checked={this.props.excludeOOS === 'true'}/>
        </div>
      </Panel>
    )
  }
}

export default addUrlProps({ urlPropsQueryConfig })(ExcludeOOS);
