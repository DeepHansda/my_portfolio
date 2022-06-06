import React, { createContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import projectAPIHandler from "./apiService/apiHandle"
export const ProjectAPI = createContext();
ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <ProjectAPI.Provider value={projectAPIHandler}>
        <App />
      </ProjectAPI.Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
