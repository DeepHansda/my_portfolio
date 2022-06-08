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
const [openSideBar,setOpenSideBar] = useState(false)
 const dispatch = useDispatch()
 const [backValue,setBackValue] = useState([])
//  let backValue = window.scrollY;

  useEffect(()=>{
    dispatch(getProjects())
  },[])

  
  window.addEventListener('scroll',()=>{
    let value = window.scrollY
    setBackValue(value*-0.3)
  })
  const projects = useSelector((state)=>{return state.projects})
  const states ={
    projects: projects,
    setOpenSideBar: setOpenSideBar,
  }
  return (
    <ProjectContext.Provider value={states}>
      <div className="App" style={{ "overflowX": "hidden" ,"backgroundPositionY": `${backValue}px`}}>
        <Navbar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar}/>
        <Sidebar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar}/>
        <ContactBar />
        <MyRoutes />
      </div>
    </ProjectContext.Provider>
  );
}

export default App;
