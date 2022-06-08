import React, { useState } from "react";
import {
  Container,
  TextField,
  CircularProgress,
  Button,
  Snackbar,
  Alert,
  Fade,
} from "@mui/material";
// import "./form.css";
import { useDispatch, useSelector } from "react-redux";
import { createContact } from "../../../Redux/Actions/contactActions";
export default function Form() {
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(false);
  const [open, setOpen] = useState(false);
  const [dis, setDis] = useState(false);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("hello");
    const data = {
      fullName: fullName,
      email: email,
      contactNumber: contactNumber,
      message: message,
    };
    setProgress(true);
    dispatch(createContact(data))
      .then((res) => {
        if (res.success === 1) {
          setProgress(false);
          setOpen(true);
          setDis(true);
        } else if (res.success === 0) {
          setProgress(false);
          setOpen(true);
          setDis(false);
          console.log(res.error);
        } else {
          setProgress(false);
          setOpen(true);
          setDis(false);
        }
      })
      .catch((err) => {
        setProgress(false);
        setOpen(true);
        setDis(false);
        console.log(err);
      });
  };
  // const data = useSelector(state=>state.contacts)
  // console.log(data)

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="from-component">
      <Snackbar
        TransitionComponent={Fade}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          variant="filled"
          onClose={handleClose}
          severity={dis ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {dis ? "Message Sent !" : "Message Failed !"}
        </Alert>
      </Snackbar>
      <form onSubmit={submitHandler}>
        <Container>
          <TextField
            id="standard-basic"
            label="Full Name"
            variant="outlined"
            margin="normal"
            fullWidth
            size="small"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            sx={{
              label: {
                color: "rgba(225, 225, 225, 0.5)",
              },
              fieldset: {
                borderColor: "rgba(255, 255, 255, 0.4)",
              },
              input:{
                color: 'primary.main'
              }
            }}
          />
          <TextField
            id="standard-basic"
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            size="small"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              label: {
                color: "rgba(225, 225, 225, 0.5)",
              },
              fieldset: {
                borderColor: "rgba(255, 255, 255, 0.4)",
              },
              input:{
                color: 'primary.main'
              }
              
            }}
          />
          <TextField
            id="standard-basic"
            label="Phone Number"
            variant="outlined"
            type="number"
            margin="normal"
            fullWidth
            size="small"
            // defaultValue="secondary"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            sx={{
              label: {
                color: "rgba(225, 225, 225, 0.5)",
              },
              fieldset: {
                borderColor: "rgba(255, 255, 255, 0.4)",
              },
              input:{
                color: 'primary.main'
              }
            }}
          />
          <TextField
            id="outlined-multiline-static"
            label="Message"
            multiline
            rows={4}
            variant="outlined"
            margin="normal"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{
              label: {
                color: "rgba(225, 225, 225, 0.5)",
              },
              fieldset: {
                borderColor: "rgba(255, 255, 255, 0.4)",
              },
              textarea:{
                color: 'primary.main'
              }
            }}
          />
          <div
            className="from-button-container"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Button
              variant="contained"
              type="submit"
              color="secondary"
              sx={{ marginRight: "10px" }}
            >
              Submit
            </Button>
            {progress && <CircularProgress color="secondary" size="30px" />}
          </div>
        </Container>
      </form>
    </div>
  );
}
