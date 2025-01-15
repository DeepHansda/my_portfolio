import React from "react";
import "./footer.css";
import SocialContactBar from "../UI/ContactBar/ContactBar";
import EmailNumber from "../UI/EmailNumber/EmailNumber";
import Form from "../UI/Form/Form";
function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-title">
          <h1>contact with me</h1>
        </div>
        <div className="footer-sections">
        <div className="footer-container-section-1">
            <EmailNumber />
           
          </div>

          <div className="footer-container-section-2">
            <div className="get-touch-button">
              <div className="get-touch">get in touch</div>
            </div>

            <Form />
            <div className="social-wrapper-container">
              <SocialContactBar />
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default Footer;
