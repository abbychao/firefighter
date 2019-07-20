import React, { useState } from 'react'
import App from './app/App';
import AppProvider from './app/Provider';
import Admin from './admin/Admin';
import AdminProvider from './admin/Provider';


const View = () => {
  const [view, setView] = useState('player');

  return (
    <>
      {view === 'player' &&
        <AppProvider setView={setView}>
          <App />
        </AppProvider>
      }
      {view === 'admin' &&
        <AdminProvider setView={setView}>
          <Admin />
        </AdminProvider>}
    </>
  );
}

export default View;