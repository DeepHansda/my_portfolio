import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Fire from "../Fire/Fire";
import Projects from "../Projects/Projects";
import Footer from "../Footer/Footer";
import { ProjectContext } from "../../App";
import { useContext, useEffect } from "react";

function Main() {
  const states = useContext(ProjectContext);
  useEffect(() => {
    states.setOpenSideBar(false);
  }, []);

  return (
    <div className="main">
      <Home />
      <Fire />
      <Projects />
      <Footer />
    </div>
  );
}

export default Main;
