import React, {useState, Component } from 'react';

import raw_circle_data from "./data/circles.json"
import raw_meta_data from "./data/metadata.json"
import raw_arrow_data from "./data/arrows.json"

import Welcome from './Pages/Welcome';
import Home from './Pages/Home';

import app_settings from './app_settings.json';

import { useAtom } from 'jotai';
import {rawCircleData, rawMetaData, rawArrowData} from 'jotaiStore';

function App() {

  const [page, setPage] = useState('welcome');

  const [, locSetRawCircleData] = useAtom(rawCircleData);
  const [, locSetRawMetaData] = useAtom(rawMetaData);
  const [, locSetRawArrowData] = useAtom(rawArrowData);

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

    locSetRawCircleData(raw_circle_data);
    locSetRawMetaData(raw_meta_data);
    locSetRawArrowData(raw_arrow_data);

    return (
        <Home />
    );
  }
}

export default App;