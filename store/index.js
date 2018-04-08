import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from './reducer';
// const winObj = window ? ;
const reduxDevtools = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__() && window.__REDUX_DEVTOOLS_EXTENSION__();
const composeEnhancers = reduxDevtools || compose;

const makeStore = (initialState) => {
	return createStore(
		reducers,
		initialState,
		composeEnhancers(applyMiddleware(thunkMiddleware, promiseMiddleware())),
	);
};

export default makeStore;