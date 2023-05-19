import React, {useState, Component } from 'react';

// import raw_circle_data from "./data/circles.json"
// import raw_meta_data from "./data/metadata.json"
// import raw_arrow_data from "./data/arrows.json"

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

    const raw_circle_data =  require("data/circles.json")
    const raw_meta_data = require("data/metadata.json")
    let raw_arrow_data = []
    try{
      raw_arrow_data = require("data/arrows.json")
    } catch(e){
      console.log('No arrows data supplied')
    }

    locSetRawCircleData(raw_circle_data);
    locSetRawMetaData(raw_meta_data);
    locSetRawArrowData(raw_arrow_data);

    return (
        <MainVizPage />
    );
  }
}

export default App;