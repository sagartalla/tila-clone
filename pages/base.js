import { Component } from 'react';
import { configureUrlQuery } from 'react-url-query';
import { createBrowserHistory } from 'history';

import inactiveMonitor from '../utils/inactiveMonitor';
// import Cookies from 'universal-cookie';

// import { uuidv4 } from '../store/helper/util';
import { actionCreators } from '../store/auth';
// import makeStore from '../store';
// const createHistory = require('history').createBrowserHistory;

// const cookies = new Cookies();

// import io from 'socket.io-client';

class Base extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.fireViewEndCustomEvent = this.fireViewEndCustomEvent.bind(this);
    this.fireViewStartCustomEvent = this.fireViewStartCustomEvent.bind(this);
  }

  componentDidMount() {
    window.addEventListener('pageshow', function(event) {
      var historyTraversal = event.persisted || (typeof window.performance !=
        'undefined' && window.performance.navigation.type === 2);
      if (historyTraversal) {
        // Handle page restore.
        window.location.reload();
      }
    });
    inactiveMonitor();
    // const history = createHistory();
    configureUrlQuery({ history: createBrowserHistory() });

    digitalData.page.pageInfo.pageType = this.pageName;
    digitalData.page.pageInfo.pageName = this.pageName;
    window.appEventData.push({
      event: 'Page Loaded',
      page: {
        pageType: this.pageName,
        pageName: this.pageName,
        pageCategory: '',
      },
    });
    this.fireViewEndCustomEvent();
    digitalData.user = this.pageName;
    this.fireViewStartCustomEvent();
  }

  fireViewEndCustomEvent() {
    var event = new CustomEvent('event-view-end', {
      data: 'testing',
    });
    document.dispatchEvent(event);
  }
  fireViewStartCustomEvent() {
    var event = new CustomEvent('event-view-start', {
      data: 'testing view start',
    });
    document.dispatchEvent(event);
  }
}

export default Base;

export const baseActions = {
  setSessionID: actionCreators.setSessionID,
}
