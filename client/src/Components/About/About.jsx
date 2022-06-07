import React, { useContext, useEffect } from "react";
import "./about.css";
import SocialContactBar from "../UI/ContactBar/ContactBar";
import EmailNumber from "../UI/EmailNumber/EmailNumber";
import aboutData from "../../Data/AboutData";
import { ProjectContext } from "../../App";

function About() {
  const states = useContext(ProjectContext);
  useEffect(() => {
    states.setOpenSideBar(false);
  }, []);
  return (
    <div className="about">
      <div className="about-text">
        <div className="about-title">
          <h1>about myself</h1>
        </div>

        <div className="about-intro-myself">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
            quia molestiae impedit aspernatur. Qui fuga voluptatem accusantium
            esse cupiditate odit quaerat a quibusdam at eos incidunt ratione
            minus, ex maxime eius laboriosam omnis, facere illo!
          </p>
        </div>
      </div>

      <div className="myTimeline">
        <div class="bg-gradient_solid">
          <div class="container">
            <div class="section-header">
              <h2>Education</h2>
              <hr />
            </div>
            <div class="steps">
              {aboutData.map((d) => {
                return (
                  <div class="steps-container">
                    <div class="content">
                      <h2>{d.course}</h2>
                      <p>{d.university}</p>
                    </div>
                    <i class="step-line"></i>
                    <div class="date">{d.date}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="emailNumber-container">
        <EmailNumber />
      </div>
      <div className="about-social-wrapper-container">
        <SocialContactBar />
      </div>
    </div>
  );
}

export default About;
