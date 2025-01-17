import { Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { ProjectContext } from "../../App";
import "./resume.css";
export default function Resume() {
  const states = useContext(ProjectContext);
  useEffect(() => {
    states.setOpenSideBar(false);
  }, []);

  return (
    <div className="resume">
      <div className="resume-container">
        <div className="resume-download-button">
          <a
            href="https://drive.google.com/file/d/1g-wMWPzy0ZXblhYtfBmRE2SSpdVWRrqU/view?usp=sharing"
            target="_blank"
          >
            <Button variant="contained" fullWidth color="secondary">
              Download Resume
            </Button>
          </a>
        </div>

        <iframe src="https://drive.google.com/file/d/1g-wMWPzy0ZXblhYtfBmRE2SSpdVWRrqU/preview" width="640" height="480" allow="autoplay"></iframe>
      </div>
    </div>
  );
}
