import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Snackbar,
  IconButton,
  Alert
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import axios from "axios";
import React, { useContext, useState } from "react";
import "./App.css";
import { techs } from "./utils/checkdata";
const client = axios.create({
  baseURL: "https://my-portfolio-backend-deephansda.vercel.app/api",
});

function App() {
  const [type, setType] = React.useState("female");
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [checkedState, setCheckedState] = useState([]);
  const [visit, setVisit] = useState("");
  const [git, setGit] = useState("");
  const [duration, setDuration] = useState("");
  const [open,setOpen] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("type", type);
    for (let image of images) {
      form.append("img", image);
    }
    form.append("title", title);
    form.append("description", desc);
    for (let tech of checkedState) {
      form.append("tech_list", tech);
    }
    // form.append("tech_list", checkedState);
    form.append("visit_link", visit);
    form.append("git_link", git);
    form.append("duration", duration);

    client
      .post("/uploadProject", form, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response);
        setOpen(true)
      })
      .catch(function (error) {
        console.log(error);
        setOpen(false)

      });
  };

  const handleRadioChange = (event) => {
    setType(event.target.value);
  };

  const handleMultipleImages = (event) => {
    const imgFiles = [];
    const selectedImgs = event.target.files;
    const selectedImgsobj = [...selectedImgs];
    selectedImgsobj.map((file) => {
      return imgFiles.push(file);
    });

    setImages(imgFiles);
  };

  const handleOnChange = (event) => {
    var updatedList = [...checkedState];
    if (event.target.checked) {
      const tech = JSON.stringify({
        tech: event.target.value,
        name: event.target.name,
      });
      updatedList = [...checkedState, tech];
    } else {
      updatedList.splice(checkedState.indexOf(event.target.value), 1);
    }
    setCheckedState(updatedList);
  };


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };



  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="App" style={{ "overflow-x": "hidden" }}>
      <Snackbar
        anchorOrigin={{vertical:'bottom',horizontal:'left'}}
        open={open}
        onClose={handleClose}
        action={action}
        autoHideDuration={5000}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        Project Uploaded successfully 
        </Alert>
      </Snackbar>
      <form onSubmit={submitHandler} enctype="multipart/form-data">
        <Container maxWidth="sm">
          <Paper elevation={4}>
            <Box sx={{ padding: "20px" }}>
              <Typography variant="h2">Project Upload Form</Typography>
            </Box>
          </Paper>
          <Paper>
            <Box sx={{ margin: "20px 0px", padding: "20px" }}>
              <FormControl
                required
                component="fieldset"
                sx={{ m: 3 }}
                variant="standard"
              >
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Type
                </FormLabel>
                <RadioGroup
                  name="controlled-radio-buttons-group"
                  value={type}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="webApp"
                    control={<Radio size="small" />}
                    label="Web App"
                  />
                  <FormControlLabel
                    value="androidApp"
                    control={<Radio size="small" />}
                    label="Android App"
                  />
                </RadioGroup>
              </FormControl>

              <Button
                id="standard-basic"
                fullWidth
                variant="outlined"
                size="small"
                margin="normal"
              >
                <input
                  type="file"
                  multiple="multiple"
                  accept="img/*"
                  margin="normal"
                  name="img"
                  onChange={handleMultipleImages}
                />
              </Button>

              <TextField
                id="standard-basic"
                label="Title"
                fullWidth
                size="small"
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                id="standard-basic"
                label="Description"
                fullWidth
                size="small"
                multiline
                rows={4}
                margin="normal"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <FormControl
                required
                component="fieldset"
                sx={{ m: 3 }}
                variant="standard"
              >
                <FormLabel component="legend">Select Technologies</FormLabel>
                <FormGroup sx={{ display: "flex" }}>
                  {techs.map((tech, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        sx={{ textTransform: "capitalize" }}
                        control={
                          <Checkbox
                            onChange={handleOnChange}
                            name={tech.name}
                            size="small"
                            value={tech.link}
                          />
                        }
                        label={tech.name}
                      />
                    );
                  })}
                </FormGroup>
              </FormControl>

              <TextField
                id="standard-basic"
                label="Visit Link"
                fullWidth
                size="small"
                margin="normal"
                value={visit}
                onChange={(e) => setVisit(e.target.value)}
              />

              <TextField
                id="standard-basic"
                label="Git Link"
                fullWidth
                size="small"
                margin="normal"
                value={git}
                onChange={(e) => setGit(e.target.value)}
              />
              <TextField
                id="standard-basic"
                label="Duration"
                fullWidth
                size="small"
                margin="normal"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                size="medium"
                variant="contained"
                sx={{ marginTop: "10px", backgroundColor: "green" }}
              >
                Submit
              </Button>
            </Box>
          </Paper>
        </Container>
      </form>
    </div>
  );
}

export default App;
