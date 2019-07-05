import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import MyProvider from './components/Provider';

render(
  <MyProvider>
    <App />
  </MyProvider>,
  document.getElementById('app')
);