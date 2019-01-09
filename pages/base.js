import React, { Component } from 'react';
import { configureUrlQuery } from 'react-url-query';
import createHistory from 'history/createBrowserHistory';
import Cookies from 'universal-cookie';

import { uuidv4 } from '../store/helper/util';
import { actionCreators, selectors } from '../store/auth';
import makeStore from '../store';

const cookies = new Cookies();

class Base extends Component {
  componentWillMount() {

  }
  componentDidMount() {
    const history = createHistory();
    configureUrlQuery({ history });
    // window.elasticApm.setInitialPageLoadName(this.pageName);
    if(!cookies.get('sessionId')) {
      this.props.setSessionID(uuidv4())
    }
    digitalData.page.pageInfo[ 'pageType' ]= this.pageName;
    digitalData.page.pageInfo.pageName = this.pageName;

    this.fireViewEndCustomEvent();

    digitalData.user = this.pageName;

    this.fireViewStartCustomEvent();

  }
  fireViewEndCustomEvent = () => {
    var event = new CustomEvent('event-view-end', {
      data: 'testing'
    });
    document.dispatchEvent(event);
  }
  fireViewStartCustomEvent = () => {
    var event = new CustomEvent('event-view-start', {
      data: 'testing view start'
    });
    document.dispatchEvent(event);
  }
}

export default Base;

export const baseActions = {
  setSessionID: actionCreators.setSessionID,
}
