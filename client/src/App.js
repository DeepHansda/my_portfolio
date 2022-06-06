import React, { useEffect, createContext, useState } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import Navbar from "./Components/Navbar/Navbar";
import ContactBar from "./Components/ContactSidebar/ContactBar";
import MyRoutes from "./Util/MyRoutes";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "./Redux/Actions/projectActions";
import axios from "axios";

export const ProjectContext = createContext();
function App() {

 const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getProjects())
  },[])
  const projects = useSelector((state)=>{return state.projects})
  return (
    <ProjectContext.Provider value={projects}>
      <div className="App" style={{ "overflowX": "hidden" }}>
        {/* <Navbar /> */}
        <Sidebar />
        <ContactBar />
        <MyRoutes />
      </div>
    </ProjectContext.Provider>
  );
}

export default App;
