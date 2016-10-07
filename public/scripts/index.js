import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import { Router, Route, Link } from 'react-router';
import {Alert} from './home';
import {AlertBox} from './home';
import {AlertList} from './home';
import {AlertForm} from './home';
import {AlertModal} from './home';



ReactDOM.render(
  <AlertBox url="api/alerts" pollInterval={2000}  />,
  document.getElementById('content')
);