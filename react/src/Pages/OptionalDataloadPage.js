import React, { useEffect, useRef } from 'react';

import Button from '@material-ui/core/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import BubbleChartOutlinedIcon from '@material-ui/icons/BubbleChartOutlined';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import ClipLoader from "react-spinners/ClipLoader";
import { DropzoneDialog } from 'material-ui-dropzone';
import { useState } from 'react';
import CustomizedSnackbars from './SnackbarWithCloseButton.js'
import './Animation.css'
import './OptionalDataloadPage.css'

import myVideo from './background.mov'

import {rawCircleData, rawMetaData, rawArrowData } from 'jotaiStore.js';
import {useAtom} from 'jotai'

const OptionalDataloadPage = ({ onClick }) => {

  console.log('Welcome')

  const [openDialog, setOpenDialog] = useState(false);

  const [loadAnim, setLoadingAnim] = useState(false);
  const [demoLoad, setDemoLoad] = useState(false)

  const [loadedCircles, setLoadedCircles] = useState(false);
  const [loadedMetadata, setLoadedMetadata] = useState(false);
  const [loadedArrows, setLoadedArrows] = useState(false);

  const [openSubmitRejectSnackbar, setOpenSubmitRejectSnackbar] = useState(false);
  const [submitRejectSnackbarMessage, setSubmitRejectSnackbarMessage] = useState(null);

  const [locRawCircleData, locSetRawCircleData] = useAtom(rawCircleData);
  const [locRawMetaData, locSetRawMetaData] = useAtom(rawMetaData);
  const [locRawArrowData, locSetRawArrowData] = useAtom(rawArrowData);

  const didMountRef = useRef(false);

  ////
  // Effects of data upload
  ////

  const handleSave = (files) => {

      let valid_sub = true
      didMountRef.current = true;

      const names = files.map(file => file.name)
      const poss_names = ["circles.json", "metadata.json", "arrows.json"]

      if(
        (
        !names.every(d => poss_names.includes(d))
        ) | 
        (
          files.length !== 3 && files.length !== 2
        ) |
        (
          (!names.includes('circles.json')) | (!names.includes('metadata.json'))
        ) 
        ){
        setSubmitRejectSnackbarMessage(
        <div>
        The app requires two .json named "circles.json" and "metadata.json". 
        You can also add an optional .json called "arrow.json". 
        No other files can be uploaded.
        See the <a href="https://evomapviz.github.io/EvoMapJS/docs/inputs_details/inputs_details/">EvoMapJS documentation </a> 
        for more details.
        </div>
        )
        valid_sub = false
      }

      if(valid_sub){

        if(!names.includes("arrows.json")){
          locSetRawArrowData([])
        }

        setOpenDialog(false);
        document.getElementById('progress_container').style.visibility = 'visible'
        files.map(d => {
          if(d.name === "circles.json"){
            console.log('circles.json')
            d.text().then(function(e){
              locSetRawCircleData(JSON.parse(e))
            })
          }
          if(d.name === "metadata.json"){
            console.log('metadata.json')
            d.text().then(function(e){
              locSetRawMetaData(JSON.parse(e))
            })
          }
          if(d.name === "arrows.json"){
            console.log('arrows.json')
            d.text().then(function(e){
              locSetRawArrowData(JSON.parse(e))
            })
          }
        })
      } else {
        setOpenSubmitRejectSnackbar(true)
      }
    }

  // Update load indicator states

  useEffect(() => {
    if(didMountRef.current){ setLoadedCircles(true)}
  }, [locRawCircleData]); 

  useEffect(() => {
    if(didMountRef.current){ setLoadedMetadata(true)}
  }, [locRawMetaData]);

  useEffect(() => {
    if(didMountRef.current){ setLoadedArrows(true)  }
  }, [locRawArrowData]);

  // Once all load indicator are true, switch to MainViz page

  useEffect(() => {
    if(didMountRef.current && loadedCircles && loadedMetadata && loadedArrows){
      onClick();
    }
  }, [loadedCircles,loadedMetadata,loadedArrows]); // last json to be loaded

  ////
  // Effects of demo data
  ////

  useEffect(() => {
    console.log('loadAnim EFFECT')
    if(loadAnim){
      console.log('loadAnim EFFECT 2')
      document.getElementById('progress_container').style.visibility = 'visible'
      setDemoLoad(true)
    }
    didMountRef.current = true;
  }, [loadAnim]);

  useEffect(() => {
    if(didMountRef.current && loadAnim && demoLoad){
      console.log('load EFFECT')

      const raw_circle_data =  require("data/circles.json")
      const raw_meta_data = require("data/metadata.json")
      let raw_arrow_data = []
      try{
        raw_arrow_data = require("data/arrows.json")
      } catch(e){
        console.log('No arrows data supplied')
      }

      locSetRawCircleData(raw_circle_data)
      locSetRawMetaData(raw_meta_data)
      locSetRawArrowData(raw_arrow_data)
      onClick()
    }   
  }, [demoLoad]);

  return (
    <div>

      <div className="background-video-container">  

      <video loop autoPlay muted
        id="background-video"
        className="background-video"
        >
        <source src={myVideo} type="video/mp4" />
      </video>

      <div id = 'progress_container'>
          <ClipLoader color="#3f51b5" />
      </div>

      <div  className = 'button_container' 
          style = {{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              width: '100vw',
            }}>

        <div className = 'welcome_box'>
          
          <h1 style ={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginTop: '15px',
            marginBottom: '10px',
            marginLeft: '10px',
            marginRight: '10px',
          }}> EvoMapJS </h1>

          <p style ={{
            fontSize: '10px',
            paddingLeft: '20px',
            paddingRight: '20px',
            textAlign: 'center'
          }}>
          A JS Toolbox for Mapping Evolving Relationship Data 
          </p>

          <Button
          elevation={0}
          variant='contained'
          style = {{width: '160px',
                    marginTop: '10px',}}
          onClick = {() => {
            window.open(
              'https://github.com/EvoMapViz/EvoMapJS',
              '_blank' // <- This is what makes it open in a new tab/window.
            );
          }}
          >
            <span style = {{paddingLeft: '5px', paddingRight: '5px'}}> Github </span>
            <GitHubIcon/>

          </Button>

          <Button
          elevation={0}
          variant='contained'
          style = {{width: '160px',
                    marginTop: '10px',}}
          onClick = {() => {
            window.open(
              'https://evomapviz.github.io/EvoMapJS/',
              '_blank' // <- This is what makes it open in a new tab/window.
            );
          }}
          >
            <span style = {{paddingLeft: '5px', paddingRight: '5px'}}> Doc </span>
            <InfoOutlined/>

          </Button>
          
          <Button 
          elevation={0}
            style = {{marginTop: '10px',
                      width : '160px',  }}
            variant="contained"
            color = "primary"
            onClick={function(){ setLoadingAnim(true) }}>
            <span style = {{paddingLeft: '5px', paddingRight: '5px'}}> Demo Data </span>
            <BubbleChartOutlinedIcon/>
          </Button>

          <Button 
          elevation={0}
          style = {{marginTop: '10px',
                    marginBottom: '15px',
                    width : '160px'}}
          variant="contained" 
          color="primary" 
          onClick={() => setOpenDialog(true)}>
           <span style = {{paddingLeft: '5px', paddingRight: '5px'}}> Upload Data </span>
           <CloudUploadOutlinedIcon/>
          </Button>
        </div> 
      </div>



      <DropzoneDialog
          acceptedFiles={['.json']}
          filesLimit={3}
          dialogTitle= {
            <div>
              The app requires two .json named "circles.json" and "metadata.json". 
              You can also add an optional .json called "arrow.json". 
              No other files can be uploaded.
              See the <a href="https://evomapviz.github.io/EvoMapJS/docs/inputs_details/inputs_details/">EvoMapJS documentation </a> 
              for more details.
            </div>
          }
          cancelButtonText={"cancel"}
          submitButtonText={"submit"}
          maxFileSize={5000000}
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onSave={(files) => handleSave(files)}
          showPreviews={true}
          showFileNamesInPreview={true}
        />

        <CustomizedSnackbars
          open = {openSubmitRejectSnackbar}
          message = {submitRejectSnackbarMessage}
        />

      </div>
  </div>
  );
};

export default OptionalDataloadPage;