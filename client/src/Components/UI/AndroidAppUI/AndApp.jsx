import React from "react";
import "./andapp.css";
import img from '../AndroidAppUI/img.png'
function AndApp() {
  return (
    <div className="andProject">
      <div className="and-project-img">
        <img src={img} alt="" />
      </div>

      <div className="andProject-text-container">
        <div className="andProject-title">
          <h2>funny meme app</h2>
        </div>

        <div className="andProject-desc">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab vel
            eaque obcaecati tempore voluptatum laudantium accusamus, qui facilis
            beatae accusantium!
          </p>
        </div>
      </div>

      <div className="andProject-tech-list-container">
          <div className="andProject-tech-list">
              <li><img src="https://res.cloudinary.com/manjiro/image/upload/v1644467233/mywebsite/weapons_img/react-brands_izffaj.svg"
              alt="tech" />
              </li>
              <li><img src="https://res.cloudinary.com/manjiro/image/upload/v1644467233/mywebsite/weapons_img/react-brands_izffaj.svg"
              alt="tech" />
              </li>
              <li><img src="https://res.cloudinary.com/manjiro/image/upload/v1644467233/mywebsite/weapons_img/react-brands_izffaj.svg"
              alt="tech" />
              </li>
          </div>
      </div>

      <div className="andProject-visit-button">
          <button>visit</button>
      </div>
    </div>
  );
}

export default AndApp;
