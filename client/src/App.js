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
 const [offset, setOffset] = useState(0)
//  let backValue = window.scrollY;

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
  
  // window.addEventListener('scroll',()=>{
  //   let value = window.scrollY
  //   setBackValue(value*-0.3)
  // })
  const projects = useSelector((state)=>{return state.projects})
  const states ={
    projects: projects,
    setOpenSideBar: setOpenSideBar,
    offset: offset,
  }
  return (
    <ProjectContext.Provider value={states}>
      <div className="App" style={{ "overflowX": "hidden",backgroundPositionY:`${offset*-0.5}px` }}>
        <Navbar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar}/>
        <Sidebar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar}/>
        <ContactBar />
        <MyRoutes />
      </div>
    </ProjectContext.Provider>
  );
}

export default App;
