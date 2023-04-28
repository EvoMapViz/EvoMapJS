import React, {useState, Component } from 'react';

import Welcome from './Pages/Welcome';
import Home from './Pages/Home';

import app_settings from './app_settings.json';

function App() {

  const [page, setPage] = useState('welcome');

    const goToMainPage = () => {
      setPage('home');
    };

  if(app_settings[0]['mode'] === 'playground'){
    return (
      <div>
        {page === 'welcome' && <Welcome onClick={goToMainPage} />}
        {page === 'home' && <Home />}
      </div>
    );
  }

  if(app_settings[0]['mode'] === 'production'){
    return (
        <Home />
    );
  }
}

export default App;