import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory'; // createBrowserHistory doesn't work here :( 
import rootReducer from '../reducers';

/**
 * CREATE and EXPORT Router History
 * Our router history is managed inside our Redux store,
 * which we created in the first section and is passed down via something
 * called ConnectedRouter which we will implement later.
 */

export const history = createHistory();

/**
 * Set the INITIAL_STATE with Preloaded State inject into client index.ejs / index.html
 */
const initialState = window.__PRELOADED_STATE__ || {};

const enhancers = [];

/**
 * Define Redux Middleware
 * Redux Thunk is middleware for Redux that allows you to write
 * action creators that return a function instead of an action.
 */
const middleware = [
  thunk,
  routerMiddleware(history),
];

// This block of code hooks up Redux DevTools if exists
const devToolsExtension = window.devToolsExtension;
if (typeof devToolsExtension === 'function') {
  enhancers.push(devToolsExtension());
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

//Store Creation
const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
);

export default store;
