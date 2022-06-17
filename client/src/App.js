import React, { useEffect, createContext, useState } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import Navbar from "./Components/Navbar/Navbar";
import ContactBar from "./Components/ContactSidebar/ContactBar";
import MyRoutes from "./Util/MyRoutes";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "./Redux/Actions/projectActions";
import axios from "axios";
import img from "./pexels-frank-cone-3279307.jpg"

export const ProjectContext = createContext();
function App() {
const [openSideBar,setOpenSideBar] = useState(false)
 const dispatch = useDispatch()
 const [offset, setOffset] = useState(0)

  useEffect(()=>{
    dispatch(getProjects())
  },[])



  useEffect(()=>{
    function handleScroll() {
      setOffset(window.pageYOffset)
    }
    
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  },[])
  

  const projects = useSelector((state)=>{return state.projects})
  const states ={
    projects: projects,
    setOpenSideBar: setOpenSideBar,
    offset: offset,
  }
  return (
    <ProjectContext.Provider value={states}>
      
      <div className="App" style={{ "overflowX": "hidden"}}>
      <div className="universalBackground">
        <img src={img} alt='background' style={{transform: `translateY(${offset * 0.4}px)`}}/>
      </div>
        <Navbar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar}/>
        <Sidebar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar}/>
        <ContactBar />
        <MyRoutes />
      </div>
    </ProjectContext.Provider>
  );
}

export default App;
