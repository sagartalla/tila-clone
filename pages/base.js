import React, { Component } from 'react';
import { configureUrlQuery } from 'react-url-query';
import createHistory from 'history/createBrowserHistory';
import Cookies from 'universal-cookie';

import { uuidv4 } from '../store/helper/util';
import { actionCreators, selectors } from '../store/auth';
import makeStore from '../store';

const cookies = new Cookies();

class Base extends Component {
  componentDidMount() {
    const history = createHistory();
    configureUrlQuery({ history });
    window.elasticApm.setInitialPageLoadName(this.pageName);
    if(!cookies.get('sessionId')) {
      this.props.setSessionID(uuidv4())
    }
  }
}

export default Base;

export const baseActions = {
  setSessionID: actionCreators.setSessionID,
}
