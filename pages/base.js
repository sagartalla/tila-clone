import React, { Component } from 'react';
import { configureUrlQuery } from 'react-url-query';
import createHistory from 'history/createBrowserHistory';
// import Cookies from 'universal-cookie';

// import { uuidv4 } from '../store/helper/util';
import { actionCreators } from '../store/auth';
// import makeStore from '../store';

// const cookies = new Cookies();

import io from 'socket.io-client';

class Base extends Component {
  componentWillMount() {

  }
  componentDidMount() {

    this.socket = io();
    this.socket.on('now', (data) => {
      console.log('the socket data ::', data);
    });

    this.socket.on('connect', (data) =>{
      console.log("Socket ON Connect Event");
      this.socket.emit('join', 'Hello World from client');
   });

    this.socket.on('connectionSuccess',  (data) => {
        console.log("socket connection success");
        console.log(data.message);
    });

    this.socket.on('pagedataupdate', (data) => {
      console.log('Page Data Update Message');
      console.log(data.data);
    })

    const history = createHistory();
    configureUrlQuery({ history });
    // window.elasticApm.setInitialPageLoadName(this.pageName);
    // if(!cookies.get('sessionId')) {
    //   this.props.setSessionID(uuidv4())
    // }
    digitalData.page.pageInfo[ 'pageType' ]= this.pageName;
    digitalData.page.pageInfo.pageName = this.pageName;
    window.appEventData.push({
      "event": "Page Loaded",
      "page": {
        "pageType": this.pageName,
        "pageName": this.pageName,
        "pageCategory": ""
      }
    });
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
