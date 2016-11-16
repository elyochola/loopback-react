import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {Router, Route, Link , browserHistory} from 'react-router';
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import {createStore, applyMiddleware} from 'redux'
import {rootReducer} from './reducers'
import {Routes} from './routes'
import api from './middlewares/api'

// url="api/alerts" pollInterval={2000}
// const loggerMiddleware = applyMiddleware(logger())
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore)
const store = createStoreWithMiddleware(rootReducer)

store.subscribe(() => {
  console.log(store.getState());
});


ReactDOM.render(
  <Provider store={store}>
      <Routes />
  </Provider>,
  document.getElementById('content')
);

