import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

document.documentElement.style.setProperty('--vh', `${window.innerHeight.toString()}px`);

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);
