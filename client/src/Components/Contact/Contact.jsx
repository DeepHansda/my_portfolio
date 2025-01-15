import React, { useContext, useEffect } from "react";
import "./contact.css";
import ContactBar from "../UI/ContactBar/ContactBar";
import Form from "../UI/Form/Form";
import EmailNumber from "../UI/EmailNumber/EmailNumber";
import { ProjectContext } from "../../App";
function Contact() {
  const states = useContext(ProjectContext);
  useEffect(() => {
    states.setOpenSideBar(false);
  }, []);

  return (
    <div className="contact">
      <div class="background">
        <div class="container">
          <div class="screen">
            <div class="screen-header"></div>
            <div class="screen-body">
              <div class="screen-body-item left">
                <div class="app-title">
                  <span>CONTACT</span>
                  <span>ME</span>
                </div>
                <div className="app-main-content">
                  <EmailNumber />
                </div>
                <div class="app-contact">
                  <ContactBar />
                </div>
              </div>
              <div class="screen-body-item">
                <div class="app-form">
                  <Form />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
