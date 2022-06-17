import React, { useState } from "react";
import {
  Container,
  TextField,
  CircularProgress,
  Button,
  Snackbar,
  Alert,
  Fade,
  ThemeProvider,
  SnackbarContent,
  AlertTitle,
} from "@mui/material";
// import "./form.css";
import { useDispatch, useSelector } from "react-redux";
import { createContact } from "../../../Redux/Actions/contactActions";
import { theme } from "../../../Util/customTheme";

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
    <ThemeProvider theme={theme}>
      <div className="from-component">
        <SnackbarContent
          TransitionComponent={Fade}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <AlertTitle
            variant="filled"
            onClose={handleClose}
            severity={dis ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {dis ? "Message Sent !" : "Message Failed !"}
          </AlertTitle>
        </SnackbarContent>
        <form onSubmit={submitHandler}>
          <div class="center">
            <div class="container">
              <div class="card">
                <h1 class="card_title">Login to your account</h1>
                <p class="card_title-info">Pen By Anna Batura</p>
                <div class="input">
                  <input type="text" class="input_field" required />
                  <label class="input_label">Full name</label>
                </div>
                <div class="input">
                  <input type="text" class="input_field" required />
                  <label class="input_label">Email</label>
                </div>
                <div class="input">
                  <input type="password" class="input_field" required />
                  <label class="input_label">Password</label>
                  <span class="input_eye">
                    <svg
                      viewBox="0 0 146 74"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M143 37C143 45.4902 136.139 53.9606 123.263 60.487C110.554 66.9283 92.7879 71 73 71C53.2121 71 35.446 66.9283 22.7375 60.487C9.86096 53.9606 3 45.4902 3 37C3 28.5098 9.86096 20.0394 22.7375 13.513C35.446 7.07167 53.2121 3 73 3C92.7879 3 110.554 7.07167 123.263 13.513C136.139 20.0394 143 28.5098 143 37Z"
                        stroke-width="6"
                      />
                      <circle cx="73" cy="37" r="34" stroke-width="6" />
                    </svg>
                  </span>
                </div>
                <button class="card_button">Get started</button>
                <div class="card_info">
                  <p>
                    Not registered? <a href="#">Create an account</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </ThemeProvider>
  );
}
