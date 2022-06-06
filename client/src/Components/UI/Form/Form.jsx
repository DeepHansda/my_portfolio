import React, { useState } from "react";
import { Container, TextField, CircularProgress, Button } from "@mui/material";
// import "./form.css";
export default function Form() {
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("hello");
    // const data = {
    //   fullName: fullName,
    //   email: email,
    //   contactNumber: contactNumber,
    //   message: message,
    // };
  };

  return (
    <div className="from-component">
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
            <CircularProgress color="secondary" size="30px" />
          </div>
        </Container>
      </form>
    </div>
  );
}
