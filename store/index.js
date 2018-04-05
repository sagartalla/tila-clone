import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import createBrowserHistory from 'history/createBrowserHistory';
import 'react-router-modal/css/react-router-modal.css';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducer';

// import N from './common/NotificationPortal/NotificationPortalContainer';
// import errorMiddleware from './middleware/errorMiddleware';
// import './assets/scss/app.scss';

const history = createBrowserHistory();

// This creates the store from reducers
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware, promiseMiddleware())),
);

export default (store);

ReactDOM.render(
  <Provider store={store}>
    <Routes history={history} />
  </Provider>,
  document.getElementById('app'),
);


registerServiceWorker();
