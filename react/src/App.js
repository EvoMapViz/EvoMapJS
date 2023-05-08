import React, {useState, Component } from 'react';

import raw_circle_data from "./data/circles.json"
import raw_meta_data from "./data/metadata.json"
import raw_arrow_data from "./data/arrows.json"

import OptionalDataloadPage from './Pages/OptionalDataloadPage';
import MainVizPage from './Pages/MainVizPage';

import app_settings from './app_settings.json';

import { useAtom } from 'jotai';
import {rawCircleData, rawMetaData, rawArrowData} from 'jotaiStore';

function App() {

  const [page, setPage] = useState('welcome');

  const [, locSetRawCircleData] = useAtom(rawCircleData);
  const [, locSetRawMetaData] = useAtom(rawMetaData);
  const [, locSetRawArrowData] = useAtom(rawArrowData);

  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 3000); // simulate a 3-second loading time

  const goToMainPage = () => {
    setPage('home');
  };

  if(app_settings[0]['mode'] === 'playground'){
    return (
      <div>
        {page === 'welcome' && 
        <OptionalDataloadPage onClick={goToMainPage} />}
        {page === 'home' && <MainVizPage />}
        
      </div>
    );
  }

  if(app_settings[0]['mode'] === 'production'){

    locSetRawCircleData(raw_circle_data);
    locSetRawMetaData(raw_meta_data);
    locSetRawArrowData(raw_arrow_data);

    return (
        <MainVizPage />
    );
  }
}

export default App;