import React from 'react';
import { render } from 'react-dom';
import App from './components/app/App';
import AppProvider from './components/app/Provider';
import Admin from './components/admin/Admin';
import View from './components/View';


render(
  <View />
  // <>
  //   <AppProvider>
  //     <App />
  //   </AppProvider>
  //   <Admin />
  // </>
  ,
  document.getElementById('app')
);