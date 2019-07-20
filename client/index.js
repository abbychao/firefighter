import React from 'react';
import { render } from 'react-dom';
import App from './components/app/App';
import AppProvider from './components/app/Provider';

render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById('app')
);