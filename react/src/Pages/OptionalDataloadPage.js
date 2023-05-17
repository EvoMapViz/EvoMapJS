import React, { useEffect, useRef } from 'react';

import Button from '@material-ui/core/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import BubbleChartOutlinedIcon from '@material-ui/icons/BubbleChartOutlined';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import { CircularProgress } from '@material-ui/core';
import ClipLoader from "react-spinners/ClipLoader";
import { DropzoneDialog } from 'material-ui-dropzone';
import { useState } from 'react';
import CustomizedSnackbars from './SnackbarWithCloseButton.js'
import './Animation.css'
import './OptionalDataloadPage.css'

import myVideo from './background.mov'

import { woRawCircleData, rawCircleData, rawMetaData, rawArrowData } from 'jotaiStore.js';
import {useAtom} from 'jotai'

const OptionalDataloadPage = ({ onClick }) => {

  console.log('Welcome')

  const raw_circle_data =  require("data/circles.json")
  const raw_meta_data = require("data/metadata.json")
  let raw_arrow_data = []
  try{
    raw_arrow_data = require("data/arrows.json")
  } catch(e){
    console.log('No arrows data supplied')
  }

  const [openDialog, setOpenDialog] = useState(false);
  const [openSubmitRejectSnackbar, setOpenSubmitRejectSnackbar] = useState(false);
  const [submitRejectSnackbarMessage, setSubmitRejectSnackbarMessage] = useState(null);
  const [jsonContent, setJsonContent] = useState(null);

  const [, locSetRawCircleData] = useAtom(woRawCircleData);
  const [, locSetRawMetaData] = useAtom(rawMetaData);
  const [locRawArrowData, locSetRawArrowData] = useAtom(rawArrowData);

  const didMountRef = useRef(false);

  const handleSave = (files) => {

      let valid_sub = true

      const names = files.map(file => file.name)

      if(!names.every(d => names.includes(d))){
        setSubmitRejectSnackbarMessage(
        <div>
        The app requires three .json named "circles.json", "metadata.json", and "arrow.json". 
        See the <a href="https://evomapviz.github.io/EvoMapJS/docs/inputs_details/inputs_details/">EvoMapJS documentation </a> 
        for more details.
        </div>
        )
        valid_sub = false
      }
      
      if(files.length !== 3){
        setSubmitRejectSnackbarMessage(
        <div>
        The app requires three .json named "circles.json", "metadata.json", and "arrow.json". 
        See the <a href="https://evomapviz.github.io/EvoMapJS/docs/inputs_details/inputs_details/">EvoMapJS documentation </a> 
        for more details.
        </div>
        )
        valid_sub = false
      }

      if(valid_sub){

        let file = files.filter(d => d.name === "circles.json")[0]
        const circleReader = new FileReader();
        circleReader.onload = () => {
          const content = JSON.parse(circleReader.result);
          locSetRawCircleData(content);
        };
        circleReader.readAsText(file);

        file = files.filter(d => d.name === "metadata.json")[0]
        const metaReader = new FileReader();
        metaReader.onload = () => {
          const content = JSON.parse(metaReader.result);
          locSetRawMetaData(content);
        };
        metaReader.readAsText(file);

        file = files.filter(d => d.name === "arrows.json")[0]
        const arrowReader = new FileReader();
        arrowReader.onload = () => {
          const content = JSON.parse(arrowReader.result);
          locSetRawArrowData(content)
        };
        arrowReader.readAsText(file);

        setOpenDialog(false);
        document.getElementById('progress_container').style.visibility = 'visible'

      } else {
        setOpenSubmitRejectSnackbar(true)
      }
    }

  useEffect(() => {
    if(didMountRef.current){
      onClick();
    }
    didMountRef.current = true;
  }, [locRawArrowData]); // last json to be loaded

  const [loadAnim, setLoadingAnim] = useState(false);
  const [load, setLoad] = useState(false)

  useEffect(() => {
    if(didMountRef.current && loadAnim){
      console.log('loadAnim EFFECT')
      document.getElementById('progress_container').style.visibility = 'visible'
      setLoad(true)
    }
  }, [loadAnim]); // last json to be loaded

  useEffect(() => {
    if(didMountRef.current && loadAnim && load){
      console.log('load EFFECT')
      locSetRawCircleData(raw_circle_data)
      locSetRawMetaData(raw_meta_data)
      locSetRawArrowData(raw_arrow_data)
      onClick()
    } 
  }, [load]);

  return (
    <div>

      <div className="background-video-container">  

      <video loop autoPlay muted
        // style = {{transform: 'translateX(-50%) translateY(-50%)'}}
        id="background-video"
        className="background-video"
        >
        <source src={myVideo} type="video/mp4" />
      </video>

      <div id = 'progress_container'>
         {/* <CircularProgress/> */}
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
          onClick = {() => {window.location.href = 'https://github.com/EvoMapViz/EvoMapJS'}}
          >
            <span style = {{paddingLeft: '5px', paddingRight: '5px'}}> Github </span>
            <GitHubIcon/>

          </Button>

          <Button
          elevation={0}
          variant='contained'
          style = {{width: '160px',
                    marginTop: '10px',}}
          onClick = {() => {window.location.href = 'https://evomapviz.github.io/EvoMapJS/'}}
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
            onClick={function(){
              console.log('CLICKED!')
              setLoadingAnim(true)
            }}>
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
           {/* <span style = {{float: 'right'}}>  </span> */}
           <CloudUploadOutlinedIcon/>
          </Button>
        </div> 
      </div>



      <DropzoneDialog
          acceptedFiles={['.json']}
          filesLimit={3}
          dialogTitle= {
            <div>
              The app requires three .json named "circles.json", "metadata.json", and "arrow.json". 
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