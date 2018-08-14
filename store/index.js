import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducer';
import { refHandler } from './refHandler';
import './helper/interceptors';

const makeStore = (initialState) => {
	return createStore(
		reducers,
		initialState,
		composeWithDevTools(applyMiddleware(thunkMiddleware, promiseMiddleware(), refHandler)),
	);
};

export default makeStore;
