import React from "react";
import { FiMenu } from "react-icons/fi";
import "./navbar.css";

export default function Navbar({setOpenSideBar}) {
  return (
    <div className="portfolio-navbar">
      <ul className="navbar-container">
        <li className="nav-item item-one">
          <p>
            <FiMenu onClick={()=>{setOpenSideBar(true)}}/>
          </p>
        </li>
        <li className="nav-item item-two">
          <p>deep hansda</p>
        </li>
      </ul>
    </div>
  );
}
