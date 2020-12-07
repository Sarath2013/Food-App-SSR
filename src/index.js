import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';

const recipes = window.recipes;
delete window.recipes;

ReactDOM.hydrate(
  <Router>
    <App recipes={recipes} />
  </Router>,
  document.getElementById('root')
);
