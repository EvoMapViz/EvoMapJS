import React, { useEffect, useRef } from 'react';

import Button from '@material-ui/core/Button';
import { DropzoneDialog } from 'material-ui-dropzone';
import { useState } from 'react';
import CustomizedSnackbars from './SnackbarWithCloseButton.js'

import { woRawCircleData, rawCircleData, rawMetaData, rawArrowData } from 'jotaiStore.js';
import {useAtom} from 'jotai'

import raw_circle_data from "../data/circles.json"
import raw_meta_data from "../data/metadata.json"
import raw_arrow_data from "../data/arrows.json"

const Welcome = ({ onClick }) => {

  console.log('Welcome')

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

      } else {
        setOpenSubmitRejectSnackbar(true)
      }
    }

  useEffect(() => {
    if(didMountRef.current){
      setOpenDialog(false);
      onClick();
    }
    didMountRef.current = true;
  }, [locRawArrowData]); // last json to be loaded

  return (
    <div>
      <Button 
        variant="contained"
        color = "primary"
        onClick={function(){
          locSetRawCircleData(raw_circle_data)
          locSetRawMetaData(raw_meta_data)
          locSetRawArrowData(raw_arrow_data)
          onClick()
        }}>
          Use Demo Data
      </Button>

      <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
        Upload Data
      </Button>

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

  <div>
      <h2>JSON content:</h2>
      <pre>{JSON.stringify(jsonContent, null, 2)}</pre>
  </div>

    </div>
  );
};

export default Welcome;