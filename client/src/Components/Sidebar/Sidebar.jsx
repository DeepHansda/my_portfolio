import React from 'react';
import './sidebar.css'
import {Link} from 'react-router-dom'
import SocialContactBar from '../UI/ContactBar/ContactBar';
function Sidebar (){
    return(
        <div className="sidebar">
            <div className="side-container">
                <ul className="side-items">
                    <Link to="/"><li className="side-item"><p>home</p></li></Link>
                    <Link to="/resume"><li className="side-item"><p>resume</p></li></Link>
                    <Link to="/contact"><li className="side-item"><p>contact</p></li></Link>
                    <Link to="/about"><li className="side-item"><p>about</p></li></Link>
                </ul>

                <div className="side-contact-container">
                    <SocialContactBar/>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;