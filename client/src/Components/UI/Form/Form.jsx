import React, { useState } from "react";
import {
  Snackbar,
  Alert,
  Fade,
  CircularProgress,
} from "@mui/material";
import "./form.css";
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
          <div className="form">
            {progress && <CircularProgress />}
            <div className="input-container ic1">
              <input
                id="firstname"
                className="input"
                type="text"
                placeholder=" "
                required
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
              <div className="cut"></div>
              <label for="firstname" className="placeholder">
                Full Name
              </label>
            </div>
            <div className="input-container ic2">
              <input
                id="lastname"
                className="input"
                type="email"
                placeholder=" "
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <div className="cut"></div>
              <label for="lastname" className="placeholder">
                Email
              </label>
            </div>
            <div className="input-container ic2">
              <input
                id="phone"
                className="input"
                type="number"
                placeholder=" "
                required
                value={contactNumber}
                onChange={(e) => {
                  setContactNumber(e.target.value);
                }}
              />
              <div className="cut cut-short"></div>
              <label for="email" className="placeholder">
                Mobile Number
              </label>
            </div>

            <div
              className="input-container ic2"
              style={{ width: "100%", height: "150px" }}
            >
              <textarea
                id="message"
                className="input"
                placeholder=" "
                required
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              ></textarea>
              <div className="cut cut-short"></div>
              <label for="email" className="placeholder">
                Message
              </label>
            </div>
            <button type="text" className="submit">
              submit
            </button>
          </div>
        </form>
      </div>
  );
}
