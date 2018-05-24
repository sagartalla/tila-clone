import React, { Component } from 'react';
import { configureUrlQuery } from 'react-url-query';
import createHistory from 'history/createBrowserHistory';

class Base extends Component {
    componentDidMount() {
        const history = createHistory();
        configureUrlQuery({ history });
    }
}

export default Base;
