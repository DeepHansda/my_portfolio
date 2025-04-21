"use client";
import SocialContactBar from "../UI/ContactBar/ContactBar";
import ContactForm from "../UI/ContactForm/ContactForm";
import EmailNumber from "../UI/EmailNumber/EmailNumber";
import "./footer.css";
function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-title">
          <h1 className="text-5xl">contact with me</h1>
        </div>
        <div className="footer-sections">
          <div className="footer-container-section-1">
            <EmailNumber />
          </div>

          <div className="footer-container-section-2">
            <div className="get-touch-button">
              <div className="get-touch">get in touch</div>
            </div>

            <ContactForm />
            <div className="social-wrapper-container mt-4">
              <div className="w-fit md:ml-auto">
                <SocialContactBar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
